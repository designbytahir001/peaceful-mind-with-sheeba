import React, { useEffect, useState } from 'react';
import { db } from '../../lib/supabase';
import { LoadingState } from '../../components/States';
import { 
  FileText, 
  MessageSquare, 
  Heart, 
  Sparkles, 
  Image as ImageIcon, 
  Settings as SettingsIcon,
  PlusCircle,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Article, Comment } from '../../data/sampleArticles';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    pendingComments: 0,
    totalLikes: 0,
  });
  const [recentPosts, setRecentPosts] = useState<Article[]>([]);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Dashboard | Peaceful Mind with Sheeba";
    
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const currentStats = await db.getStats();
        setStats(currentStats);

        const posts = await db.getPosts({ includeDrafts: true });
        setRecentPosts(posts.slice(0, 3));

        const comments = await db.getComments('all', 'pending');
        setRecentComments(comments.slice(0, 3));
      } catch (err) {
        console.error("Error loading admin dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <LoadingState message="Calculating dashboard statistics and activities..." />;
  }

  const statCards = [
    { name: 'Total Articles', value: stats.totalPosts, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Published', value: stats.publishedPosts, icon: Sparkles, color: 'text-sage', bg: 'bg-sage/10' },
    { name: 'Drafts', value: stats.draftPosts, icon: FileText, color: 'text-slate-dark/50', bg: 'bg-slate-dark/5' },
    { name: 'Pending Comments', value: stats.pendingComments, icon: MessageSquare, color: 'text-pink', bg: 'bg-pink/10', warning: stats.pendingComments > 0 },
    { name: 'Total Likes', value: stats.totalLikes, icon: Heart, color: 'text-[#E1306C]', bg: 'bg-[#E1306C]/10' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-dark">Control Center Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-dark/60 mt-1">
            Get an instant bird's eye view of your mental-health website articles, feedback, and settings.
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

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.name} 
              className={`bg-white border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4 ${
                card.warning ? 'border-pink/30 shadow-sm animate-pulse' : 'border-sage/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-dark/50 uppercase tracking-wider">
                  {card.name}
                </span>
                <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                  <Icon size={16} />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-dark">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white border border-sage/10 rounded-2xl p-6.5 shadow-xs space-y-4">
        <h3 className="font-serif font-bold text-slate-dark text-base">Quick Shortcuts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            to="/admin/posts/new"
            className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-dashed border-sage/20 hover:border-sage hover:bg-sage/5 transition-all space-y-2 text-center"
          >
            <PlusCircle size={20} className="text-sage" />
            <span className="font-semibold text-slate-dark text-xs sm:text-sm">Create Article</span>
          </Link>
          <Link
            to="/admin/posts"
            className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-dashed border-sage/20 hover:border-sage hover:bg-sage/5 transition-all space-y-2 text-center"
          >
            <FileText size={20} className="text-sage" />
            <span className="font-semibold text-slate-dark text-xs sm:text-sm">Manage Articles</span>
          </Link>
          <Link
            to="/admin/comments"
            className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-dashed border-sage/20 hover:border-sage hover:bg-sage/5 transition-all space-y-2 text-center"
          >
            <MessageSquare size={20} className="text-sage" />
            <span className="font-semibold text-slate-dark text-xs sm:text-sm">Review Comments</span>
          </Link>
          <Link
            to="/admin/media"
            className="flex flex-col items-center justify-center p-4.5 rounded-xl border border-dashed border-sage/20 hover:border-sage hover:bg-sage/5 transition-all space-y-2 text-center"
          >
            <ImageIcon size={20} className="text-sage" />
            <span className="font-semibold text-slate-dark text-xs sm:text-sm">Upload Images</span>
          </Link>
        </div>
      </div>

      {/* Dual Column Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent published list */}
        <div className="lg:col-span-7 bg-white border border-sage/10 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-slate-dark text-base">Recent Content</h3>
            <Link to="/admin/posts" className="text-xs font-semibold text-sage hover:underline uppercase tracking-wide">
              See All Posts
            </Link>
          </div>

          <div className="space-y-4">
            {recentPosts.length > 0 ? (
              <div className="divide-y divide-sage/5">
                {recentPosts.map((post) => (
                  <div key={post.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center gap-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-3.5 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-cream/50 overflow-hidden shrink-0 border border-sage/10">
                        <img 
                          src={post.featured_image || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=100'} 
                          alt="" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-slate-dark truncate">{post.title}</p>
                        <p className="text-[10px] text-slate-dark/45 uppercase font-semibold mt-0.5">{post.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                        post.status === 'published' 
                          ? 'bg-sage/15 text-sage border border-sage/10' 
                          : 'bg-slate-dark/5 text-slate-dark/50'
                      }`}>
                        {post.status}
                      </span>
                      <button
                        onClick={() => navigate(`/admin/posts/${post.id}/edit`)}
                        className="text-xs text-sage hover:text-slate-dark font-bold hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-dark/50 text-xs text-center py-6">No articles found. Try writing one!</p>
            )}
          </div>
        </div>

        {/* Pending comments moderation list */}
        <div className="lg:col-span-5 bg-white border border-sage/10 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-slate-dark text-base">Pending Feedback</h3>
            <Link to="/admin/comments" className="text-xs font-semibold text-sage hover:underline uppercase tracking-wide">
              Moderate Queue
            </Link>
          </div>

          <div className="space-y-4">
            {recentComments.length > 0 ? (
              <div className="space-y-3.5">
                {recentComments.map((comment) => (
                  <div key={comment.id} className="bg-cream/10 border border-sage/5 p-4 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-dark">{comment.name}</span>
                      <span className="text-[9px] font-semibold text-pink uppercase tracking-widest bg-pink/5 border border-pink/10 px-2 py-0.5 rounded-full">
                        pending
                      </span>
                    </div>
                    <p className="text-slate-dark/75 italic line-clamp-2 leading-relaxed">
                      "{comment.comment}"
                    </p>
                    <div className="pt-2 flex justify-end space-x-2.5">
                      <button
                        onClick={async () => {
                          await db.updateCommentStatus(comment.id, 'rejected');
                          window.location.reload();
                        }}
                        className="text-[10px] font-bold text-slate-dark/50 hover:text-pink hover:underline"
                      >
                        Reject
                      </button>
                      <button
                        onClick={async () => {
                          await db.updateCommentStatus(comment.id, 'approved');
                          window.location.reload();
                        }}
                        className="text-[10px] font-bold text-sage hover:underline"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-cream/10 border border-dashed border-sage/10 rounded-xl">
                <p className="text-slate-dark/50 text-xs">No pending feedback! Nice and clean.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
