import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Heart, ArrowRight } from 'lucide-react';
import { Article } from '../data/sampleArticles';

interface BlogCardProps {
  article: Article;
  onLikeToggle?: (id: string) => void;
  isLiked?: boolean;
}

export default function BlogCard({ article, onLikeToggle, isLiked = false }: BlogCardProps) {
  const formattedDate = new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-sage/10 hover:border-sage/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Featured Image Container */}
      <div className="aspect-[16/10] overflow-hidden bg-cream relative">
        <img
          src={article.featured_image || 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600'}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
        {/* Category Label */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-sage text-xs font-semibold px-3 py-1 rounded-full border border-sage/10 uppercase tracking-wider">
          {article.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center space-x-4 text-slate-dark/50 text-xs">
            <span className="flex items-center space-x-1">
              <Calendar size={13} className="stroke-[1.5]" />
              <span>{formattedDate}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock size={13} className="stroke-[1.5]" />
              <span>{article.reading_time || '4 min read'}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-dark leading-snug group-hover:text-sage transition-colors duration-300">
            <Link to={`/blog/${article.slug}`}>{article.title}</Link>
          </h3>

          {/* Excerpt */}
          <p className="text-slate-dark/75 text-sm line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer Row */}
        <div className="pt-4 border-t border-sage/5 flex items-center justify-between">
          {/* Like Stats */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onLikeToggle) onLikeToggle(article.id);
            }}
            className={`flex items-center space-x-1.5 text-xs font-semibold transition-colors py-1 px-2.5 rounded-full ${
              isLiked 
                ? 'text-pink bg-pink/10 hover:bg-pink/15' 
                : 'text-slate-dark/50 hover:text-pink hover:bg-pink/5'
            }`}
            title={isLiked ? "Unlike article" : "Like article"}
          >
            <Heart size={14} className={isLiked ? "fill-current" : ""} />
            <span>{article.likes_count || 0}</span>
          </button>

          {/* Read Link */}
          <Link
            to={`/blog/${article.slug}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-sage group-hover:text-slate-dark transition-colors duration-300"
          >
            <span>Read Article</span>
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </article>
  );
}
