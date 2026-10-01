import { createClient } from '@supabase/supabase-js';
import { SAMPLE_ARTICLES, SAMPLE_COMMENTS, Article, Comment } from '../data/sampleArticles';

// Check for environment variables
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder') && !supabaseUrl.includes('YOUR_');

// Initialize client if configured
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Print configuration status
console.log(`[Peaceful Mind Database] ${isSupabaseConfigured ? 'Connected to live Supabase Instance ✅' : 'Running in Offline LocalStorage Fallback Mode 🚀 (Settings/Articles persistent in browser)'}`);

// Default Settings
export interface SiteSettings {
  siteName: string;
  professionalName: string;
  professionalTitle: string;
  whatsappNumber: string;
  instagramUsername: string;
  instagramUrl: string;
  shortDescription: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Peaceful Mind with Sheeba",
  professionalName: "Sheeba Mohi-ud-Din",
  professionalTitle: "Clinical Psychologist | Mental Health & Wellbeing Professional",
  whatsappNumber: "+91 97971 47673",
  instagramUsername: "@peaceful_mind_with.sheeba",
  instagramUrl: "https://www.instagram.com/peaceful_mind_with.sheeba/",
  shortDescription: "Sheeba Mohi-ud-Din is a clinical psychologist committed to emotional wellbeing, personal growth, and healthy relationships."
};

// HELPER FOR LOCAL STORAGE OPERATIONS
const getLocalData = <T>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data) as T;
  } catch (e) {
    return defaultValue;
  }
};

const setLocalData = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

// INITIALIZE STORE WITH SAMPLE DATA IF EMPTY
if (!localStorage.getItem('peaceful_posts')) {
  localStorage.setItem('peaceful_posts', JSON.stringify(SAMPLE_ARTICLES));
}
if (!localStorage.getItem('peaceful_comments')) {
  localStorage.setItem('peaceful_comments', JSON.stringify(SAMPLE_COMMENTS));
}
if (!localStorage.getItem('peaceful_settings')) {
  localStorage.setItem('peaceful_settings', JSON.stringify(DEFAULT_SETTINGS));
}
if (!localStorage.getItem('peaceful_media')) {
  localStorage.setItem('peaceful_media', JSON.stringify([
    { id: 'img-1', url: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600', name: 'Meditation.jpg', created_at: new Date().toISOString() },
    { id: 'img-2', url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600', name: 'Hands-Heart.jpg', created_at: new Date().toISOString() },
    { id: 'img-3', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600', name: 'Yoga-Sunset.jpg', created_at: new Date().toISOString() }
  ]));
}

// DATABASE LAYER
export const db = {
  // SETTINGS
  getSettings: async (): Promise<SiteSettings> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('settings').select('*').single();
        if (error) throw error;
        if (data) {
          return {
            siteName: data.site_name,
            professionalName: data.professional_name,
            professionalTitle: data.professional_title,
            whatsappNumber: data.whatsapp_number,
            instagramUsername: data.instagram_username,
            instagramUrl: data.instagram_url,
            shortDescription: data.short_description
          };
        }
      } catch (err) {
        console.warn("Supabase settings error, using local fallback:", err);
      }
    }
    return getLocalData<SiteSettings>('peaceful_settings', DEFAULT_SETTINGS);
  },

  saveSettings: async (settings: SiteSettings): Promise<SiteSettings> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          site_name: settings.siteName,
          professional_name: settings.professionalName,
          professional_title: settings.professionalTitle,
          whatsapp_number: settings.whatsappNumber,
          instagram_username: settings.instagramUsername,
          instagram_url: settings.instagramUrl,
          short_description: settings.shortDescription,
          updated_at: new Date().toISOString()
        };
        const { error } = await supabase.from('settings').upsert({ id: 1, ...payload });
        if (error) throw error;
        return settings;
      } catch (err) {
        console.error("Supabase settings write error:", err);
      }
    }
    setLocalData('peaceful_settings', settings);
    return settings;
  },

  // POSTS
  getPosts: async (options?: { includeDrafts?: boolean; search?: string; category?: string }): Promise<Article[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('posts').select('*').order('created_at', { ascending: false });
        if (!options?.includeDrafts) {
          query = query.eq('status', 'published');
        }
        if (options?.category && options.category !== 'All') {
          query = query.eq('category', options.category);
        }
        const { data, error } = await query;
        if (error) throw error;
        let posts: Article[] = (data || []).map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          content: p.content,
          category: p.category,
          tags: Array.isArray(p.tags) ? p.tags : (p.tags ? p.tags.split(',') : []),
          featured_image: p.featured_image,
          reading_time: p.reading_time,
          status: p.status,
          created_at: p.created_at,
          updated_at: p.updated_at,
          published_at: p.published_at,
          likes_count: p.likes_count || 0
        }));

        if (options?.search) {
          const s = options.search.toLowerCase();
          posts = posts.filter(p => 
            p.title.toLowerCase().includes(s) || 
            p.excerpt.toLowerCase().includes(s) || 
            p.content.toLowerCase().includes(s)
          );
        }
        return posts;
      } catch (err) {
        console.warn("Supabase posts read error, using local fallback:", err);
      }
    }

    // LOCAL FALLBACK
    let posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
    if (!options?.includeDrafts) {
      posts = posts.filter(p => p.status === 'published');
    }
    if (options?.category && options.category !== 'All') {
      posts = posts.filter(p => p.category.toLowerCase() === options.category?.toLowerCase());
    }
    if (options?.search) {
      const s = options.search.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(s) || 
        p.excerpt.toLowerCase().includes(s) || 
        p.content.toLowerCase().includes(s)
      );
    }
    // Sort by created_at desc
    return posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  getPostBySlug: async (slug: string): Promise<Article | null> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).maybeSingle();
        if (error) throw error;
        if (data) {
          return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',') : []),
            featured_image: data.featured_image,
            reading_time: data.reading_time,
            status: data.status,
            created_at: data.created_at,
            updated_at: data.updated_at,
            published_at: data.published_at,
            likes_count: data.likes_count || 0
          };
        }
      } catch (err) {
        console.warn("Supabase post read by slug error, using local fallback:", err);
      }
    }
    const posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
    return posts.find(p => p.slug === slug) || null;
  },

  getPostById: async (id: string): Promise<Article | null> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();
        if (error) throw error;
        if (data) {
          return {
            id: data.id,
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            category: data.category,
            tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',') : []),
            featured_image: data.featured_image,
            reading_time: data.reading_time,
            status: data.status,
            created_at: data.created_at,
            updated_at: data.updated_at,
            published_at: data.published_at,
            likes_count: data.likes_count || 0
          };
        }
      } catch (err) {
        console.warn("Supabase post read by id error, using local fallback:", err);
      }
    }
    const posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
    return posts.find(p => p.id === id) || null;
  },

  savePost: async (postData: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'published_at'> & { id?: string; created_at?: string; published_at?: string | null }): Promise<Article> => {
    const id = postData.id || `art-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const isNew = !postData.id;

    const finalPost: Article = {
      id,
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt,
      content: postData.content,
      category: postData.category,
      tags: postData.tags,
      featured_image: postData.featured_image,
      reading_time: postData.reading_time,
      status: postData.status,
      created_at: postData.created_at || timestamp,
      updated_at: timestamp,
      published_at: postData.status === 'published' ? (postData.published_at || timestamp) : null,
      likes_count: postData.likes_count || 0
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const payload = {
          title: finalPost.title,
          slug: finalPost.slug,
          excerpt: finalPost.excerpt,
          content: finalPost.content,
          category: finalPost.category,
          tags: finalPost.tags,
          featured_image: finalPost.featured_image,
          reading_time: finalPost.reading_time,
          status: finalPost.status,
          updated_at: finalPost.updated_at,
          published_at: finalPost.published_at,
          likes_count: finalPost.likes_count
        };

        if (isNew) {
          const { data, error } = await supabase.from('posts').insert({
            ...payload,
            created_at: finalPost.created_at
          }).select().single();
          if (error) throw error;
          if (data) return { ...finalPost, id: data.id };
        } else {
          const { error } = await supabase.from('posts').update(payload).eq('id', id);
          if (error) throw error;
        }
        return finalPost;
      } catch (err) {
        console.error("Supabase post save error:", err);
      }
    }

    // LOCAL STORE SAVE
    let posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
    const existingIndex = posts.findIndex(p => p.id === id);
    if (existingIndex > -1) {
      posts[existingIndex] = finalPost;
    } else {
      posts.push(finalPost);
    }
    setLocalData('peaceful_posts', posts);
    return finalPost;
  },

  deletePost: async (id: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('posts').delete().eq('id', id);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase delete post error:", err);
      }
    }
    let posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
    const initialLen = posts.length;
    posts = posts.filter(p => p.id !== id);
    setLocalData('peaceful_posts', posts);
    return posts.length < initialLen;
  },

  // LIKE SYSTEM
  likePost: async (postId: string): Promise<number> => {
    // Check local liked state to prevent abuse
    const likedPosts = getLocalData<string[]>('peaceful_liked_list', []);
    if (likedPosts.includes(postId)) {
      // Already liked, toggle like off (unlike)
      const updatedLiked = likedPosts.filter(id => id !== postId);
      setLocalData('peaceful_liked_list', updatedLiked);

      let newCount = 0;
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.rpc('decrement_likes', { post_id: postId });
          if (!error && data !== null) {
            return data;
          }
          // Fallback if RPC fails
          const { data: post } = await supabase.from('posts').select('likes_count').eq('id', postId).single();
          newCount = Math.max(0, (post?.likes_count || 1) - 1);
          await supabase.from('posts').update({ likes_count: newCount }).eq('id', postId);
          return newCount;
        } catch (err) {
          console.error("Supabase decrement error:", err);
        }
      }

      // LOCAL FALLBACK
      let posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
      const postIdx = posts.findIndex(p => p.id === postId);
      if (postIdx > -1) {
        posts[postIdx].likes_count = Math.max(0, posts[postIdx].likes_count - 1);
        newCount = posts[postIdx].likes_count;
        setLocalData('peaceful_posts', posts);
      }
      return newCount;
    } else {
      // Add like
      likedPosts.push(postId);
      setLocalData('peaceful_liked_list', likedPosts);

      let newCount = 0;
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.rpc('increment_likes', { post_id: postId });
          if (!error && data !== null) {
            return data;
          }
          // Fallback if RPC fails
          const { data: post } = await supabase.from('posts').select('likes_count').eq('id', postId).single();
          newCount = (post?.likes_count || 0) + 1;
          await supabase.from('posts').update({ likes_count: newCount }).eq('id', postId);
          return newCount;
        } catch (err) {
          console.error("Supabase increment error:", err);
        }
      }

      // LOCAL FALLBACK
      let posts = getLocalData<Article[]>('peaceful_posts', SAMPLE_ARTICLES);
      const postIdx = posts.findIndex(p => p.id === postId);
      if (postIdx > -1) {
        posts[postIdx].likes_count = (posts[postIdx].likes_count || 0) + 1;
        newCount = posts[postIdx].likes_count;
        setLocalData('peaceful_posts', posts);
      }
      return newCount;
    }
  },

  isPostLiked: (postId: string): boolean => {
    const likedPosts = getLocalData<string[]>('peaceful_liked_list', []);
    return likedPosts.includes(postId);
  },

  // COMMENTS SYSTEM
  getComments: async (postId: string | 'all', status?: 'pending' | 'approved' | 'rejected' | 'all'): Promise<Comment[]> => {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('comments').select('*');
        if (postId !== 'all') {
          query = query.eq('post_id', postId);
        }
        if (status && status !== 'all') {
          query = query.eq('status', status);
        }
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        return (data || []).map(c => ({
          id: c.id,
          post_id: c.post_id,
          name: c.name,
          comment: c.comment,
          created_at: c.created_at,
          status: c.status
        }));
      } catch (err) {
        console.warn("Supabase comments error, using local fallback:", err);
      }
    }

    // LOCAL FALLBACK
    let comments = getLocalData<Comment[]>('peaceful_comments', SAMPLE_COMMENTS);
    if (postId !== 'all') {
      comments = comments.filter(c => c.post_id === postId);
    }
    if (status && status !== 'all') {
      comments = comments.filter(c => c.status === status);
    }
    return comments.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  addComment: async (postId: string, name: string, commentText: string): Promise<Comment> => {
    const comment: Comment = {
      id: `comm-${Date.now()}`,
      post_id: postId,
      name,
      comment: commentText,
      created_at: new Date().toISOString(),
      status: 'pending' // New comments initially pending!
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('comments').insert({
          post_id: comment.post_id,
          name: comment.name,
          comment: comment.comment,
          status: 'pending'
        }).select().single();
        if (error) throw error;
        if (data) return { ...comment, id: data.id };
      } catch (err) {
        console.error("Supabase save comment error:", err);
      }
    }

    let comments = getLocalData<Comment[]>('peaceful_comments', SAMPLE_COMMENTS);
    comments.push(comment);
    setLocalData('peaceful_comments', comments);
    return comment;
  },

  updateCommentStatus: async (commentId: string, status: 'approved' | 'rejected'): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('comments').update({ status }).eq('id', commentId);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase update comment status error:", err);
      }
    }
    let comments = getLocalData<Comment[]>('peaceful_comments', SAMPLE_COMMENTS);
    const commentIdx = comments.findIndex(c => c.id === commentId);
    if (commentIdx > -1) {
      comments[commentIdx].status = status;
      setLocalData('peaceful_comments', comments);
      return true;
    }
    return false;
  },

  deleteComment: async (commentId: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('comments').delete().eq('id', commentId);
        if (error) throw error;
        return true;
      } catch (err) {
        console.error("Supabase delete comment error:", err);
      }
    }
    let comments = getLocalData<Comment[]>('peaceful_comments', SAMPLE_COMMENTS);
    const initialLen = comments.length;
    comments = comments.filter(c => c.id !== commentId);
    setLocalData('peaceful_comments', comments);
    return comments.length < initialLen;
  },

  // MEDIA
  getMedia: async (): Promise<Array<{ id: string; url: string; name: string; created_at: string }>> => {
    if (isSupabaseConfigured && supabase) {
      try {
        // Query from a custom media table if existing, or list buckets
        const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn("Supabase media table query error, fallback to storage list or local storage:", err);
      }
    }
    return getLocalData<Array<{ id: string; url: string; name: string; created_at: string }>>('peaceful_media', []);
  },

  uploadMedia: async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

    if (isSupabaseConfigured && supabase) {
      try {
        // Upload to bucket 'media'
        const { data, error } = await supabase.storage
          .from('media')
          .upload(fileName, file, { cacheControl: '3600', upsert: true });
        
        if (error) throw error;
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
        
        // Record in media table for easier view
        try {
          await supabase.from('media').insert({ name: file.name, url: publicUrl, created_at: new Date().toISOString() });
        } catch (e) {
          // Ignore if table doesn't exist yet, we still return the publicUrl
        }
        
        return publicUrl;
      } catch (err) {
        console.error("Supabase upload error, using local fallback:", err);
      }
    }

    // LOCAL STORE FALLBACK
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Url = reader.result as string;
        const localMedia = getLocalData<Array<{ id: string; url: string; name: string; created_at: string }>>('peaceful_media', []);
        const newMediaItem = {
          id: `img-${timestamp}`,
          url: base64Url,
          name: file.name,
          created_at: new Date().toISOString()
        };
        localMedia.unshift(newMediaItem);
        setLocalData('peaceful_media', localMedia);
        resolve(base64Url);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  },

  deleteMedia: async (id: string, url: string): Promise<boolean> => {
    if (isSupabaseConfigured && supabase) {
      try {
        // Parse filename from URL
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        await supabase.storage.from('media').remove([filename]);
        await supabase.from('media').delete().eq('id', id);
        return true;
      } catch (err) {
        console.warn("Supabase delete media err:", err);
      }
    }
    let localMedia = getLocalData<Array<{ id: string; url: string; name: string; created_at: string }>>('peaceful_media', []);
    localMedia = localMedia.filter(m => m.id !== id);
    setLocalData('peaceful_media', localMedia);
    return true;
  },

  // STATS
  getStats: async () => {
    const posts = await db.getPosts({ includeDrafts: true });
    const comments = await db.getComments('all', 'all');

    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.status === 'published').length;
    const draftPosts = posts.filter(p => p.status === 'draft').length;
    const pendingComments = comments.filter(c => c.status === 'pending').length;
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes_count || 0), 0);

    return {
      totalPosts,
      publishedPosts,
      draftPosts,
      pendingComments,
      totalLikes
    };
  }
};
