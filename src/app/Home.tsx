import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import AboutPreview from '../components/AboutPreview';
import FocusAreas from '../components/FocusAreas';
import BlogCard from '../components/BlogCard';
import { db } from '../lib/supabase';
import { Article } from '../data/sampleArticles';
import { LoadingState } from '../components/States';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    
    const fetchLatestArticles = async () => {
      try {
        const posts = await db.getPosts({ includeDrafts: false });
        // Display latest 3 published articles
        setArticles(posts.slice(0, 3));
      } catch (e) {
        console.error("Error loading homepage articles:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  const handleLikeToggle = async (postId: string) => {
    const newCount = await db.likePost(postId);
    setArticles((prev) =>
      prev.map((art) => (art.id === postId ? { ...art, likes_count: newCount } : art))
    );
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <Hero />

      {/* About Preview Section */}
      <AboutPreview />

      {/* Focus Areas Grid */}
      <FocusAreas />

      {/* Latest Articles Section */}
      <section className="py-20 bg-cream/10 border-t border-sage/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs tracking-widest text-sage font-bold uppercase block">
                Insightful Reads
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-slate-dark">
                Latest Published Articles
              </h2>
              <div className="w-12 h-1 bg-sage rounded-full mt-3" />
            </div>

            <Link
              to="/blog"
              className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-sage font-bold hover:text-slate-dark transition-colors duration-300 group"
            >
              <span>Explore All Articles</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Grid list */}
          {loading ? (
            <LoadingState message="Fetching latest articles..." />
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((art) => (
                <BlogCard
                  key={art.id}
                  article={art}
                  isLiked={db.isPostLiked(art.id)}
                  onLikeToggle={handleLikeToggle}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/50 border border-dashed border-sage/15 rounded-2xl">
              <p className="text-slate-dark/60 text-sm">
                No articles published yet. Stay tuned for upcoming emotional wellbeing insights!
              </p>
            </div>
          )}

          {/* Dynamic Quote Banner */}
          <div className="mt-20 bg-sage rounded-3xl p-8 sm:p-12 text-cream text-center relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-cream/5 -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-cream/5 -ml-16 -mb-16 pointer-events-none" />
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <Sparkles size={32} className="mx-auto text-pink stroke-[1.5]" />
              <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed">
                "A peaceful mind begins with a safe space to be heard, understood, and accepted."
              </p>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest font-bold text-pink">
                  Sheeba Mohi-ud-Din
                </p>
                <p className="text-[10px] text-cream/70 uppercase tracking-wider">
                  Clinical Psychologist | Mental Health &amp; Wellbeing Professional
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
