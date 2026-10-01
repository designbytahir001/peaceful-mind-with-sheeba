import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { db } from '../lib/supabase';
import { Article, Comment } from '../data/sampleArticles';
import { LoadingState } from '../components/States';
import { Calendar, Clock, Heart, ChevronLeft, ArrowLeft, ArrowRight, User } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { CommentForm, CommentList } from '../components/Comments';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  useEffect(() => {
    if (!slug) return;
    window.scrollTo({ top: 0 });
    
    const loadPostData = async () => {
      setLoading(true);
      try {
        const post = await db.getPostBySlug(slug);
        if (post) {
          setArticle(post);
          document.title = `${post.title} | Peaceful Mind with Sheeba`;
          
          // Load comments
          const approvedComments = await db.getComments(post.id, 'approved');
          setComments(approvedComments);

          // Load related articles
          const allPosts = await db.getPosts({ includeDrafts: false });
          const filtered = allPosts
            .filter(p => p.id !== post.id && (p.category === post.category || p.category !== post.category))
            .slice(0, 2);
          setRelatedArticles(filtered);
        } else {
          setArticle(null);
        }
      } catch (err) {
        console.error("Error loading blog details:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [slug]);

  const handleLike = async () => {
    if (!article || isLiking) return;
    setIsLiking(true);
    try {
      const newCount = await db.likePost(article.id);
      setArticle(prev => prev ? { ...prev, likes_count: newCount } : null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (name: string, commentText: string): Promise<boolean> => {
    if (!article || commentSubmitting) return false;
    setCommentSubmitting(true);
    try {
      await db.addComment(article.id, name, commentText);
      // Comments added are initially pending, so we don't immediately append to the visible list!
      // But we return true to indicate the form succeeded and can show the pending message!
      return true;
    } catch (err) {
      console.error("Error adding comment:", err);
      return false;
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) {
    return <div className="py-24"><LoadingState message="Fetching article contents..." /></div>;
  }

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center space-y-6">
        <h2 className="font-serif text-3xl font-bold text-slate-dark">Article Not Found</h2>
        <p className="text-slate-dark/70 text-sm">
          We couldn't find the article you are looking for. It might have been deleted, moved, or set to draft.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-sage hover:text-slate-dark font-bold transition-all text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Articles list</span>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isLiked = db.isPostLiked(article.id);

  return (
    <article className="py-12 sm:py-20 bg-cream/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-sage hover:text-slate-dark font-semibold text-xs uppercase tracking-wider mb-8 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Back to Articles</span>
        </Link>

        {/* Content Wrapper */}
        <div className="bg-white border border-sage/10 rounded-3xl shadow-md overflow-hidden relative">
          
          {/* Header metadata area */}
          <div className="p-6 sm:p-10 space-y-5 border-b border-sage/5">
            <span className="inline-block bg-sage/10 text-sage text-xs font-bold px-3 py-1.5 rounded-full border border-sage/5 uppercase tracking-wider">
              {article.category}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-dark leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-dark/60 text-xs sm:text-sm font-medium">
              <div className="flex items-center space-x-1.5">
                <Calendar size={15} />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock size={15} />
                <span>{article.reading_time || '4 min read'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <User size={15} />
                <span>By Sheeba Mohi-ud-Din</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-[21/9] bg-cream">
            <img
              src={article.featured_image || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200'}
              alt={article.title}
              className="w-full h-full object-cover grayscale-[5%] brightness-[96%]"
            />
          </div>

          {/* Main Body Content */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-8">
            
            {/* HTML Article Content */}
            <div 
              className="prose prose-sage max-w-none text-slate-dark/90 leading-relaxed text-sm sm:text-base space-y-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Interaction Row (Likes + Shares) */}
            <div className="pt-8 border-t border-sage/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              
              {/* Like Button */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  disabled={isLiking}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${
                    isLiked
                      ? 'bg-pink text-cream hover:bg-pink/90'
                      : 'bg-cream text-slate-dark/70 border border-sage/15 hover:border-pink hover:text-pink'
                  }`}
                >
                  <Heart size={16} className={isLiked ? "fill-current" : ""} />
                  <span>{isLiked ? 'Liked ♥' : 'Like ♡'}</span>
                </button>
                <span className="text-xs font-semibold text-slate-dark/60 tracking-wider uppercase">
                  {article.likes_count || 0} clicks of appreciation
                </span>
              </div>

              {/* Share buttons widget */}
              <ShareButtons title={article.title} />

            </div>

          </div>
        </div>

        {/* Comments Section Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submit Comment */}
          <div className="lg:col-span-5">
            <CommentForm onSubmit={handleCommentSubmit} isSubmitting={commentSubmitting} />
          </div>

          {/* List Comment */}
          <div className="lg:col-span-7">
            <CommentList comments={comments} />
          </div>

        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-sage/15 space-y-6">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-dark">
              Other Reflections You May Enjoy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div key={rel.id} className="bg-white border border-sage/10 rounded-2xl p-5 hover:border-sage/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold tracking-wider text-sage uppercase">{rel.category}</span>
                    <h4 className="font-serif font-bold text-slate-dark text-base hover:text-sage transition-colors">
                      <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-dark/75 line-clamp-2 leading-relaxed">{rel.excerpt}</p>
                  </div>
                  <Link
                    to={`/blog/${rel.slug}`}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-sage hover:text-slate-dark transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
