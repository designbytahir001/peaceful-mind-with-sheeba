import React, { useEffect, useState } from 'react';
import { db } from '../../lib/supabase';
import { Article } from '../../data/sampleArticles';
import { LoadingState, EmptyState } from '../../components/States';
import { useNavigate, Link } from 'react-router-dom';
import { Search, PlusCircle, Edit3, Trash2, Globe, FileCheck, RefreshCw } from 'lucide-react';

export default function AdminPosts() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await db.getPosts({ includeDrafts: true });
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    } catch (e) {
      console.error("Error loading posts lists:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Manage Articles | Peaceful Mind Admin";
    fetchPosts();
  }, []);

  // Filter list
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = posts.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  const handleStatusToggle = async (post: Article) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    const msg = `Are you sure you want to change status of "${post.title}" to ${newStatus}?`;
    if (window.confirm(msg)) {
      try {
        await db.savePost({
          ...post,
          status: newStatus,
        });
        await fetchPosts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (post: Article) => {
    const msg = `CRITICAL WARNING: Are you sure you want to delete the article: "${post.title}"?\n\nThis action is permanent and cannot be undone.`;
    if (window.confirm(msg)) {
      try {
        const success = await db.deletePost(post.id);
        if (success) {
          await fetchPosts();
        } else {
          alert("Failed to delete post. Please try again.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-dark">Articles Catalog</h1>
          <p className="text-xs sm:text-sm text-slate-dark/60 mt-1">
            Publish, edit, draft, or delete therapeutic thoughts and wellbeing articles.
          </p>
        </div>
        <Link
          to="/admin/posts/new"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-sage hover:bg-slate-dark text-cream text-sm font-semibold transition-all shadow-sm space-x-1.5 shrink-0"
        >
          <PlusCircle size={16} />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Toolbar Search / Stats */}
      <div className="bg-white border border-sage/10 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4 justify-between">
        
        {/* Search bar */}
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-dark/40">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search catalog titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream/10 border border-sage/15 text-slate-dark text-xs sm:text-sm focus:outline-none focus:border-sage placeholder-slate-dark/40"
          />
        </div>

        {/* Counter */}
        <div className="text-xs font-semibold text-slate-dark/60 uppercase tracking-wider shrink-0 flex items-center space-x-2">
          <span>Found {filteredPosts.length} matches</span>
          <button 
            onClick={fetchPosts} 
            className="p-1 hover:text-sage transition-colors" 
            title="Reload content"
          >
            <RefreshCw size={13} />
          </button>
        </div>

      </div>

      {/* Main Table Display */}
      {loading ? (
        <LoadingState message="Fetching core article records..." />
      ) : filteredPosts.length > 0 ? (
        <div className="bg-white border border-sage/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-sage/10 bg-cream/30 text-slate-dark/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  <th className="py-4.5 px-6">Image</th>
                  <th className="py-4.5 px-6">Title / Category</th>
                  <th className="py-4.5 px-6 text-center">Status</th>
                  <th className="py-4.5 px-6 text-center">Likes</th>
                  <th className="py-4.5 px-6 text-center">Created Date</th>
                  <th className="py-4.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage/5 text-xs sm:text-sm text-slate-dark/90">
                {filteredPosts.map((post) => {
                  const createdDate = new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });

                  return (
                    <tr key={post.id} className="hover:bg-cream/10 transition-colors">
                      
                      {/* Image Thumbnail */}
                      <td className="py-4 px-6 shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-cream overflow-hidden border border-sage/10 shrink-0">
                          <img
                            src={post.featured_image || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=100'}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      </td>

                      {/* Title & Category */}
                      <td className="py-4 px-6 max-w-xs sm:max-w-md">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-dark leading-snug line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-[10px] font-bold text-sage uppercase tracking-wider">
                            {post.category}
                          </p>
                        </div>
                      </td>

                      {/* Status badge toggler */}
                      <td className="py-4 px-6 text-center shrink-0">
                        <button
                          onClick={() => handleStatusToggle(post)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                            post.status === 'published'
                              ? 'bg-sage/15 text-sage border border-sage/10 hover:bg-sage/20'
                              : 'bg-slate-dark/10 text-slate-dark/50 hover:bg-slate-dark/15'
                          }`}
                          title="Click to toggle Status"
                        >
                          {post.status}
                        </button>
                      </td>

                      {/* Likes count */}
                      <td className="py-4 px-6 text-center font-semibold text-xs sm:text-sm">
                        {post.likes_count || 0}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-6 text-center text-xs text-slate-dark/60 shrink-0">
                        {createdDate}
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-6 text-right shrink-0">
                        <div className="flex items-center justify-end space-x-3">
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-dark/40 hover:text-sage transition-colors rounded-lg hover:bg-cream/50"
                            title="Preview Article on Live Website"
                          >
                            <Globe size={15} />
                          </a>
                          <button
                            onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                            className="p-2 text-slate-dark/40 hover:text-sage transition-colors rounded-lg hover:bg-cream/50"
                            title="Edit Article"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(post)}
                            className="p-2 text-slate-dark/40 hover:text-pink transition-colors rounded-lg hover:bg-cream/50"
                            title="Delete Article"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No articles match query"
          description="Try removing the active filters or write your first article by clicking 'Write New Article'."
          action={
            <Link
              to="/admin/posts/new"
              className="px-5 py-2.5 bg-sage text-cream text-xs font-semibold rounded-full hover:bg-slate-dark transition-all"
            >
              Write First Article
            </Link>
          }
        />
      )}

    </div>
  );
}
