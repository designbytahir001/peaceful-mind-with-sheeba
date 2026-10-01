import React, { useEffect, useState } from 'react';
import { db } from '../../lib/supabase';
import { Comment, Article } from '../../data/sampleArticles';
import { LoadingState, EmptyState } from '../../components/States';
import { Check, X, Trash2, Calendar, MessageSquare, Filter, RefreshCw } from 'lucide-react';

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [posts, setPosts] = useState<Article[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'pending' | 'approved' | 'rejected' | 'all'>('pending');

  const loadData = async () => {
    setLoading(true);
    try {
      const allComments = await db.getComments('all', 'all');
      setComments(allComments);
      
      const allPosts = await db.getPosts({ includeDrafts: true });
      setPosts(allPosts);
    } catch (e) {
      console.error("Error loading moderation comments:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Review Comments | Peaceful Mind Admin";
    loadData();
  }, []);

  // Filter queue whenever comments or activeFilter changes
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredComments(comments);
    } else {
      setFilteredComments(comments.filter(c => c.status === activeFilter));
    }
  }, [comments, activeFilter]);

  const handleUpdateStatus = async (commentId: string, status: 'approved' | 'rejected') => {
    const word = status === 'approved' ? 'approve' : 'reject';
    if (window.confirm(`Are you sure you want to ${word} this comment?`)) {
      try {
        const success = await db.updateCommentStatus(commentId, status);
        if (success) {
          await loadData();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm("CRITICAL: Are you sure you want to permanently delete this comment record?\n\nThis action cannot be undone.")) {
      try {
        const success = await db.deleteComment(commentId);
        if (success) {
          await loadData();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const getPostTitle = (postId: string) => {
    const found = posts.find(p => p.id === postId);
    return found ? found.title : 'Deleted or Unknown Article';
  };

  const filterTabs = [
    { name: 'Pending Moderation', key: 'pending', count: comments.filter(c => c.status === 'pending').length },
    { name: 'Approved', key: 'approved', count: comments.filter(c => c.status === 'approved').length },
    { name: 'Rejected', key: 'rejected', count: comments.filter(c => c.status === 'rejected').length },
    { name: 'All Comments', key: 'all', count: comments.length },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-dark">Comments Moderation Center</h1>
          <p className="text-xs sm:text-sm text-slate-dark/60 mt-1">
            Review thoughts and feedback from public readers. Comments must be approved before appearing publicly under articles.
          </p>
        </div>
        <button
          onClick={loadData}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-sage/15 text-slate-dark hover:text-sage transition-all text-xs font-semibold space-x-1"
        >
          <RefreshCw size={12} />
          <span>Reload Feed</span>
        </button>
      </div>

      {/* Filter Tabs Card */}
      <div className="bg-white border border-sage/10 rounded-2xl p-4.5 sm:p-5.5 shadow-xs">
        <div className="flex flex-wrap gap-2.5">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 border ${
                  isActive
                    ? 'bg-sage border-sage text-cream shadow-sm'
                    : 'bg-cream/10 border-sage/10 text-slate-dark/75 hover:border-sage/40 hover:text-sage'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-cream' : 'bg-slate-dark/5 text-slate-dark/50'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid listing comments */}
      {loading ? (
        <LoadingState message="Processing comments list and associations..." />
      ) : filteredComments.length > 0 ? (
        <div className="space-y-5">
          {filteredComments.map((c) => {
            const commentDate = new Date(c.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div 
                key={c.id} 
                className={`bg-white border rounded-2xl p-5.5 shadow-xs flex flex-col sm:flex-row justify-between gap-5 transition-all ${
                  c.status === 'pending' ? 'border-pink/30 bg-pink/2' : 'border-sage/10'
                }`}
              >
                {/* Info Text */}
                <div className="space-y-3.5 flex-grow">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-bold text-slate-dark text-sm sm:text-base">{c.name}</span>
                    <span className="text-[11px] text-slate-dark/45 flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{commentDate}</span>
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                      c.status === 'approved' ? 'bg-sage/15 text-sage' :
                      c.status === 'rejected' ? 'bg-pink/15 text-pink' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <p className="text-slate-dark/85 text-sm leading-relaxed italic bg-cream/10 p-4 rounded-xl border border-sage/5">
                    "{c.comment}"
                  </p>

                  <div className="text-[11px] font-medium text-slate-dark/55 flex items-center space-x-1.5">
                    <MessageSquare size={13} className="text-sage" />
                    <span>On Article:</span>
                    <strong className="text-slate-dark">{getPostTitle(c.post_id)}</strong>
                  </div>
                </div>

                {/* Moderate Buttons Column */}
                <div className="flex sm:flex-col justify-end items-center gap-2.5 shrink-0 sm:border-l sm:border-sage/5 sm:pl-5">
                  {c.status !== 'approved' && (
                    <button
                      onClick={() => handleUpdateStatus(c.id, 'approved')}
                      className="w-full sm:w-28 inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-sage hover:bg-slate-dark text-cream text-xs font-bold rounded-xl transition-all shadow-sm"
                      title="Approve Comment for Live Website"
                    >
                      <Check size={14} />
                      <span>Approve</span>
                    </button>
                  )}
                  {c.status !== 'rejected' && (
                    <button
                      onClick={() => handleUpdateStatus(c.id, 'rejected')}
                      className="w-full sm:w-28 inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-cream hover:bg-slate-dark/10 border border-sage/15 text-slate-dark text-xs font-bold rounded-xl transition-all"
                      title="Reject Comment"
                    >
                      <X size={14} />
                      <span>Reject</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-full sm:w-28 inline-flex items-center justify-center space-x-1.5 px-3 py-2.5 bg-white border border-pink/10 hover:bg-pink/10 text-pink text-xs font-bold rounded-xl transition-all"
                    title="Permanently Delete Comment"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title={`No ${activeFilter} comments`}
          description="The current comment filter list is clear. Tap on other tabs to moderate different queues."
        />
      )}

    </div>
  );
}
