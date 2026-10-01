import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { Sparkles, Key, Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const { user, login, isOfflineMode } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password) {
      setError('Please provide both email address and password.');
      return;
    }

    setLoading(true);
    const result = await login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Soothing background effects */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-sage/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Header brand details */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-sage flex items-center justify-center text-cream mx-auto shadow-md">
            <Sparkles size={24} className="stroke-[1.5]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-dark">
            Peaceful Mind
          </h1>
          <p className="text-xs tracking-widest text-sage font-bold uppercase">
            Administration Portal
          </p>
        </div>

        {/* Login form Card */}
        <div className="bg-white border border-sage/10 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center">
            <h3 className="font-bold text-slate-dark text-lg">Sign In</h3>
            <p className="text-xs text-slate-dark/50 mt-1">
              Authorized admin sign-in only. Use your private console credentials.
            </p>
          </div>

          {/* Fallback Mode Informational Notice Box */}
          {isOfflineMode && (
            <div className="bg-sage/5 border border-sage/20 rounded-2xl p-4 text-xs text-slate-dark/80 space-y-1.5 leading-relaxed">
              <div className="flex items-center space-x-1.5 text-sage font-bold">
                <CheckCircle size={14} />
                <span>Running in Local Mode</span>
              </div>
              <p className="text-[11px] text-slate-dark/75">
                The application is running in persistent offline test mode. Use the following testing credentials to login:
              </p>
              <div className="bg-white/90 p-2.5 rounded-xl border border-sage/10 font-mono text-[10px] sm:text-xs space-y-1">
                <div><span className="text-slate-dark/50">Email:</span> <strong className="text-slate-dark">admin@peacefulmind.com</strong></div>
                <div><span className="text-slate-dark/50">Pass:</span> <strong className="text-slate-dark">sheebapeace</strong></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-pink/5 border border-pink/15 p-3.5 rounded-xl text-xs text-pink flex items-start space-x-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-dark/40">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sheeba@peacefulmind.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream/10 border border-sage/15 text-slate-dark placeholder-slate-dark/40 text-sm focus:outline-none focus:border-sage"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold tracking-wide text-slate-dark/70 uppercase">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-dark/40">
                  <Key size={16} />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream/10 border border-sage/15 text-slate-dark placeholder-slate-dark/40 text-sm focus:outline-none focus:border-sage"
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-sage hover:bg-slate-dark text-cream font-bold transition-all duration-300 shadow-md active:scale-98 disabled:opacity-60 text-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In as Administrator'}
            </button>

          </form>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs text-slate-dark/50 hover:text-sage transition-colors font-medium"
          >
            <ArrowLeft size={13} />
            <span>Return to Public Website</span>
          </a>
        </div>

      </div>
    </div>
  );
}
