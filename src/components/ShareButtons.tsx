import React, { useState } from 'react';
import { Send, Share2, Link, Check, Clipboard, Info } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showInstaInfo, setShowInstaInfo] = useState(false);

  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleWhatsAppShare = () => {
    const text = `Read this insightful article: "${title}" at Peaceful Mind with Sheeba: ${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-slate-dark/70 text-xs font-semibold uppercase tracking-wider">
        <Share2 size={14} />
        <span>Share this Article</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {/* WhatsApp */}
        <button
          onClick={handleWhatsAppShare}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 text-xs font-semibold transition-all"
          title="Share via WhatsApp"
        >
          <Send size={14} className="rotate-45" />
          <span>WhatsApp</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-sage/10 border border-sage/20 text-sage hover:bg-sage/20 text-xs font-semibold transition-all"
          title="Copy post link"
        >
          {copied ? <Check size={14} /> : <Link size={14} />}
          <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
        </button>

        {/* Instagram Graceful Platform limit */}
        <button
          onClick={() => setShowInstaInfo(!showInstaInfo)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] hover:bg-[#E1306C]/20 text-xs font-semibold transition-all"
          title="How to share on Instagram"
        >
          <span>Instagram Share</span>
        </button>
      </div>

      {showInstaInfo && (
        <div className="bg-cream/50 border border-[#E1306C]/20 rounded-xl p-3.5 text-xs text-slate-dark/80 space-y-2.5 animate-fadeIn">
          <div className="flex items-start space-x-2">
            <Info size={14} className="text-[#E1306C] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Instagram does not support direct links in regular posts. To share, you can <strong>copy the link</strong> and add it to your <strong>Instagram Story</strong> using the "Link" sticker, tagging Sheeba at <strong className="text-sage">@peaceful_mind_with.sheeba</strong>!
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`Insightful article on "${title}" from @peaceful_mind_with.sheeba - ${currentUrl}`);
              setCopied(true);
              setTimeout(() => setCopied(false), 3000);
            }}
            className="inline-flex items-center space-x-1 text-[10px] uppercase font-bold text-[#E1306C] hover:underline"
          >
            <Clipboard size={10} />
            <span>Copy Story Caption Text</span>
          </button>
        </div>
      )}
    </div>
  );
}
