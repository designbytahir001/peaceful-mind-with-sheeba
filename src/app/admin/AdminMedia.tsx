import React, { useEffect, useState } from 'react';
import { db } from '../../lib/supabase';
import { LoadingState, EmptyState } from '../../components/States';
import { UploadCloud, Copy, Trash2, Clipboard, Check, Calendar, File } from 'lucide-react';

export default function AdminMedia() {
  const [mediaList, setMediaList] = useState<Array<{ id: string; url: string; name: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const items = await db.getMedia();
      setMediaList(items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Media Library | Peaceful Mind Admin";
    fetchMedia();
  }, []);

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Invalid format. Please choose an image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    setUploading(true);
    try {
      await db.uploadMedia(file);
      await fetchMedia();
      alert("Media image uploaded and saved successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    if (window.confirm("Are you sure you want to delete this media image from your storage?\n\nAny articles referencing this exact URL will have broken images!")) {
      try {
        await db.deleteMedia(id, url);
        await fetchMedia();
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
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-dark">Media Library</h1>
          <p className="text-xs sm:text-sm text-slate-dark/60 mt-1">
            Upload and copy public image URLs to easily add premium graphics inside your article editor body.
          </p>
        </div>

        {/* Action Upload Trigger */}
        <label className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-sage hover:bg-slate-dark text-cream text-sm font-semibold transition-all shadow-sm space-x-2 cursor-pointer ${
          uploading ? 'opacity-50 pointer-events-none' : ''
        }`}>
          <UploadCloud size={16} />
          <span>{uploading ? 'Uploading image...' : 'Upload New Image'}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Main Grid display of files */}
      {loading ? (
        <LoadingState message="Fetching stored media records..." />
      ) : mediaList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaList.map((media) => {
            const formattedDate = new Date(media.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            });

            const isCopied = copiedId === media.id;

            return (
              <div 
                key={media.id} 
                className="group bg-white rounded-2xl overflow-hidden border border-sage/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Visual Image Box */}
                <div className="aspect-[4/3] bg-cream border-b border-sage/5 overflow-hidden relative">
                  <img
                    src={media.url}
                    alt={media.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Floating Action buttons hover state */}
                  <div className="absolute inset-0 bg-slate-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3.5">
                    <button
                      onClick={() => handleCopyLink(media.id, media.url)}
                      className="p-2.5 bg-white text-slate-dark hover:text-sage hover:scale-105 transition-all rounded-xl shadow"
                      title="Copy public URL to clipboard"
                    >
                      {isCopied ? <Check size={16} className="text-sage" /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => handleDelete(media.id, media.url)}
                      className="p-2.5 bg-white text-slate-dark hover:text-pink hover:scale-105 transition-all rounded-xl shadow"
                      title="Delete image file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Captions / Details */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-dark line-clamp-1" title={media.name}>
                      {media.name}
                    </p>
                    <div className="flex items-center text-slate-dark/45 space-x-1">
                      <Calendar size={11} />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  {/* Clipboard manual copy button */}
                  <button
                    onClick={() => handleCopyLink(media.id, media.url)}
                    className={`w-full py-2.5 px-3 rounded-xl border text-[11px] font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                      isCopied
                        ? 'bg-sage/10 border-sage text-sage font-bold'
                        : 'bg-cream/35 border-sage/10 text-slate-dark/60 hover:border-sage/40 hover:text-sage'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={12} />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Clipboard size={12} />
                        <span>Copy Public Link</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          title="Your media library is empty"
          description="Click 'Upload New Image' to save your first clinical header graphics or article illustration!"
        />
      )}

    </div>
  );
}
