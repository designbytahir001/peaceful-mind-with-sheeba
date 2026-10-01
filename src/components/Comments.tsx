import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Comment } from '../data/sampleArticles';

interface CommentFormProps {
  onSubmit: (name: string, comment: string) => Promise<boolean>;
  isSubmitting: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim() || !comment.trim()) {
      setError('Both Name and Comment are required.');
      return;
    }

    if (comment.length < 5) {
      setError('Please provide a meaningful comment (at least 5 characters).');
      return;
    }

    const success = await onSubmit(name.trim(), comment.trim());
    if (success) {
      setSubmitted(true);
      setName('');
      setComment('');
      // Auto dismiss success notice after 10s
      setTimeout(() => setSubmitted(false), 10000);
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-white border border-sage/10 p-6 sm:p-8 rounded-2xl shadow-sm">
      <div className="flex items-center space-x-2.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-sage/10 text-sage flex items-center justify-center">
          <MessageSquare size={16} />
        </div>
        <h4 className="font-serif text-lg font-bold text-slate-dark">Join the Conversation</h4>
      </div>

      {submitted ? (
        <div className="bg-sage/5 border border-sage/20 text-slate-dark p-5 rounded-xl space-y-2 text-sm sm:text-base animate-fadeIn">
          <div className="flex items-center space-x-2 text-sage font-bold">
            <CheckCircle size={18} />
            <span>Comment Submitted</span>
          </div>
          <p className="text-slate-dark/80 text-xs sm:text-sm leading-relaxed">
            Thank you for sharing your thoughts! Your comment has been received and is currently <strong className="text-sage">pending moderation</strong>. It will be displayed publicly once reviewed and approved by Sheeba.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-pink text-xs font-semibold bg-pink/5 border border-pink/15 p-3 rounded-lg">
              {error}
            </p>
          )}

          <div className="space-y-1.5">
            <label htmlFor="commenter-name" className="text-xs font-semibold tracking-wide text-slate-dark/70 uppercase">
              Your Name
            </label>
            <input
              type="text"
              id="commenter-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Arifa Jan"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="comment-text" className="text-xs font-semibold tracking-wide text-slate-dark/70 uppercase">
              Your Comment
            </label>
            <textarea
              id="comment-text"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your respectful thoughts, reflections, or feedback here..."
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-sage hover:bg-slate-dark text-cream text-sm font-semibold transition-all duration-300 shadow-md active:scale-98 disabled:opacity-50 space-x-2"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send size={14} />
                <span>Submit Comment</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 bg-cream/10 border border-dashed border-sage/10 rounded-xl">
        <p className="text-slate-dark/50 text-sm">No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-serif text-lg font-bold text-slate-dark mb-4">
        Comments ({comments.length})
      </h4>
      <div className="space-y-4.5">
        {comments.map((c) => {
          const commentDate = new Date(c.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div key={c.id} className="bg-white border border-sage/10 p-5 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-dark">{c.name}</span>
                <span className="text-[11px] text-slate-dark/50">{commentDate}</span>
              </div>
              <p className="text-slate-dark/80 text-sm leading-relaxed whitespace-pre-wrap">
                {c.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
