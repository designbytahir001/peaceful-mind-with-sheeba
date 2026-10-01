import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  X, 
  Globe, 
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { LoadingState } from './States';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, loading, logout, isOfflineMode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Authentication guard
  if (loading) {
    return (
      <div className="min-h-screen bg-cream/30 flex items-center justify-center">
        <LoadingState message="Checking administrator authentication..." />
      </div>
    );
  }

  if (!user) {
    // If not authenticated, navigate to login
    React.useEffect(() => {
      navigate('/admin/login');
    }, [navigate]);
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Articles', path: '/admin/posts', icon: FileText },
    { name: 'Comments', path: '/admin/comments', icon: MessageSquare },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out of the administration panel?")) {
      await logout();
      navigate('/admin/login');
    }
  };

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-cream/10 flex">
      
      {/* Mobile Sidebar overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-dark/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-dark text-cream transform lg:translate-x-0 lg:static lg:flex lg:flex-col transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header Brand */}
        <div className="h-20 border-b border-cream/10 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles size={18} className="text-sage" />
            <div className="flex flex-col">
              <span className="font-serif text-sm font-bold tracking-wide">Peaceful Mind</span>
              <span className="text-[10px] tracking-widest text-sage uppercase font-semibold">CMS Area</span>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-cream/70 hover:text-cream focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status Mode Banner */}
        {isOfflineMode && (
          <div className="mx-4 mt-4 bg-sage/10 border border-sage/20 rounded-xl p-3 text-xs text-cream/80 space-y-1">
            <div className="flex items-center space-x-1 font-bold text-sage">
              <AlertTriangle size={13} />
              <span>Offline Test Mode</span>
            </div>
            <p className="text-[10px] leading-relaxed text-cream/60">
              Changes persist in local browser storage. Configure Supabase variables to switch to database.
            </p>
          </div>
        )}

        {/* Links */}
        <nav className="flex-grow py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-sage text-cream font-semibold'
                    : 'text-cream/70 hover:bg-cream/5 hover:text-cream'
                }`}
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-cream/10 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-xs text-cream/75 hover:text-sage transition-colors"
          >
            <Globe size={14} />
            <span>Go to Public Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs text-pink/85 hover:bg-pink/10 hover:text-pink transition-colors text-left"
          >
            <LogOut size={14} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        {/* Admin Header */}
        <header className="h-20 border-b border-sage/15 px-4 sm:px-8 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-dark hover:text-sage p-2 rounded-md transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-slate-dark">
              Administration Center
            </h2>
          </div>

          {/* Connected User identity */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col text-right text-xs">
              <span className="font-semibold text-slate-dark">Sheeba Mohi-ud-Din</span>
              <span className="text-[10px] text-slate-dark/50">{user.email}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-cream text-xs font-bold font-serif shadow-sm">
              S
            </div>
          </div>
        </header>

        {/* Page Content Workspace */}
        <main className="flex-grow p-4 sm:p-8">
          <div className="max-w-6xl mx-auto animate-fadeIn">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
