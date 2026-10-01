import React, { useEffect, useState } from 'react';
import { db, SiteSettings } from '../../lib/supabase';
import { LoadingState } from '../../components/States';
import { Save, RefreshCw, Send, Instagram, FileText, Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Individual Form fields state
  const [siteName, setSiteName] = useState('');
  const [professionalName, setProfessionalName] = useState('');
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [shortDescription, setShortDescription] = useState('');

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await db.getSettings();
      setSettings(data);
      setSiteName(data.siteName);
      setProfessionalName(data.professionalName);
      setProfessionalTitle(data.professionalTitle);
      setWhatsappNumber(data.whatsappNumber);
      setInstagramUsername(data.instagramUsername);
      setInstagramUrl(data.instagramUrl);
      setShortDescription(data.shortDescription);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Site Settings | Peaceful Mind Admin";
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!siteName.trim() || !professionalName.trim() || !whatsappNumber.trim()) {
      setError('Site Name, Professional Name, and WhatsApp Number are required settings.');
      return;
    }

    setSaving(true);
    try {
      const updated = {
        siteName: siteName.trim(),
        professionalName: professionalName.trim(),
        professionalTitle: professionalTitle.trim(),
        whatsappNumber: whatsappNumber.trim(),
        instagramUsername: instagramUsername.trim(),
        instagramUrl: instagramUrl.trim(),
        shortDescription: shortDescription.trim()
      };
      
      await db.saveSettings(updated);
      setSuccess('Identity and contact settings saved successfully!');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err) {
      console.error(err);
      setError('An error occurred while saving configurations.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Fetching system and profile settings..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-dark">Identity &amp; Contacts Panel</h1>
          <p className="text-xs sm:text-sm text-slate-dark/60 mt-1">
            Configure default site names, titles, and WhatsApp/Instagram URLs rendered across your public platform.
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-sage/15 text-slate-dark hover:text-sage transition-all text-xs font-semibold space-x-1"
        >
          <RefreshCw size={12} />
          <span>Reload Settings</span>
        </button>
      </div>

      {error && (
        <p className="text-pink text-xs font-semibold bg-pink/5 border border-pink/15 p-4 rounded-xl">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sage text-xs font-semibold bg-sage/5 border border-sage/15 p-4 rounded-xl">
          {success}
        </p>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core Settings Column */}
        <div className="lg:col-span-8 bg-white border border-sage/10 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          
          <div className="flex items-center space-x-2 pb-2 border-b border-sage/5">
            <SettingsIcon size={16} className="text-sage" />
            <h3 className="font-serif font-bold text-slate-dark text-base">Website Brand Identity</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Site Name */}
            <div className="space-y-1.5">
              <label htmlFor="site-name" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                Website Platform Name *
              </label>
              <input
                type="text"
                id="site-name"
                required
                disabled={saving}
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage"
              />
            </div>

            {/* Professional Name */}
            <div className="space-y-1.5">
              <label htmlFor="prof-name" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                Professional Practitioner Name *
              </label>
              <input
                type="text"
                id="prof-name"
                required
                disabled={saving}
                value={professionalName}
                onChange={(e) => setProfessionalName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage"
              />
            </div>
          </div>

          {/* Professional title */}
          <div className="space-y-1.5">
            <label htmlFor="prof-title" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Clinical &amp; Professional Title *
            </label>
            <input
              type="text"
              id="prof-title"
              required
              disabled={saving}
              value={professionalTitle}
              onChange={(e) => setProfessionalTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label htmlFor="short-desc" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Website Short Description
            </label>
            <textarea
              id="short-desc"
              rows={4}
              disabled={saving}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage"
            />
          </div>

        </div>

        {/* Contacts & Social integration Settings */}
        <div className="lg:col-span-4 bg-white border border-sage/10 p-6 rounded-3xl shadow-sm space-y-6">
          
          <div className="flex items-center space-x-2 pb-2 border-b border-sage/5">
            <Send size={16} className="text-sage" />
            <h3 className="font-serif font-bold text-slate-dark text-base">Client Integrations</h3>
          </div>

          {/* Whatsapp Number */}
          <div className="space-y-1.5">
            <label htmlFor="settings-wa" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              WhatsApp Contact Number *
            </label>
            <input
              type="text"
              id="settings-wa"
              required
              disabled={saving}
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage font-mono"
            />
            <p className="text-[10px] text-slate-dark/40 italic">Must match international format with country code (e.g. +91 97971 47673)</p>
          </div>

          {/* Instagram Username */}
          <div className="space-y-1.5">
            <label htmlFor="settings-insta-user" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Instagram @Username
            </label>
            <input
              type="text"
              id="settings-insta-user"
              disabled={saving}
              value={instagramUsername}
              onChange={(e) => setInstagramUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage font-mono"
            />
          </div>

          {/* Instagram URL */}
          <div className="space-y-1.5">
            <label htmlFor="settings-insta-url" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
              Instagram Full URL
            </label>
            <input
              type="url"
              id="settings-insta-url"
              disabled={saving}
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream/20 border border-sage/15 text-slate-dark text-sm focus:outline-none focus:border-sage font-mono"
            />
          </div>

          {/* Save trigger */}
          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-sage hover:bg-slate-dark text-cream text-sm font-semibold transition-all duration-300 shadow-md active:scale-98 disabled:opacity-50 space-x-2"
          >
            <Save size={15} />
            <span>{saving ? 'Saving changes...' : 'Save Settings'}</span>
          </button>

        </div>

      </form>

    </div>
  );
}
