import React, { useEffect, useState } from 'react';
import { db } from '../lib/supabase';
import { Article } from '../data/sampleArticles';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { LoadingState, EmptyState } from '../components/States';
import { Sparkles, Calendar, Heart, MessageCircle } from 'lucide-react';

const CATEGORIES = [
  "All",
  "Children & Adolescents",
  "Emotional Wellbeing",
  "Stress & Anxiety",
  "Relationship Concerns",
  "Self-Esteem",
  "Women’s Emotional Wellbeing",
  "Personal Growth"
];

export default function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = "Insights & Articles | Peaceful Mind with Sheeba";
    
    const fetchArticles = async () => {
      try {
        const posts = await db.getPosts({ includeDrafts: false });
        setArticles(posts);
        setFilteredArticles(posts);
      } catch (e) {
        console.error("Error loading blog posts:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter logic whenever query or category changes
  useEffect(() => {
    let result = [...articles];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(art => 
        art.title.toLowerCase().includes(q) || 
        art.excerpt.toLowerCase().includes(q) || 
        art.content.toLowerCase().includes(q) ||
        art.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(art => 
        art.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredArticles(result);
  }, [searchQuery, selectedCategory, articles]);

  const handleLikeToggle = async (postId: string) => {
    const newCount = await db.likePost(postId);
    // Update both states to stay in sync
    const update = (prev: Article[]) =>
      prev.map((art) => (art.id === postId ? { ...art, likes_count: newCount } : art));
    setArticles(update);
  };

  return (
    <div className="bg-cream/20 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs tracking-widest text-sage font-bold uppercase block">
            Articles &amp; Reflection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-dark">
            Mental Health &amp; Wellbeing Insights
          </h1>
          <div className="w-12 h-1 bg-sage mx-auto mt-4 rounded-full" />
          <p className="text-slate-dark/70 text-sm sm:text-base mt-3 leading-relaxed">
            Thoughtful articles, reflections, and guidance on emotional regulation, self-compassion, relational security, and everyday mental wellness.
          </p>
        </div>

        {/* Filter bar card */}
        <div className="bg-white border border-sage/10 p-5 sm:p-6.5 rounded-3xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            
            {/* Search */}
            <div className="lg:col-span-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Filter tags header */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3.5">
              <span className="text-xs font-bold text-slate-dark/65 uppercase tracking-wider shrink-0">
                Filter Topics:
              </span>
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

          </div>
        </div>

        {/* Listings */}
        {loading ? (
          <LoadingState message="Fetching mental health insights..." />
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <BlogCard
                key={art.id}
                article={art}
                isLiked={db.isPostLiked(art.id)}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No insights match your selection"
            description="Try modifying your search queries or clearing the active category filters to see other articles."
            action={
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2.5 bg-sage text-cream font-semibold rounded-full text-xs hover:bg-slate-dark transition-all shadow-md"
              >
                Reset Search Filters
              </button>
            }
          />
        )}

      </div>
    </div>
  );
}
