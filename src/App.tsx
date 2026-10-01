import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';

// Public Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './app/Home';
import About from './app/About';
import Blog from './app/Blog';
import BlogPost from './app/BlogPost';
import Booking from './app/Booking';
import Contact from './app/Contact';

// Admin Pages & Layout
import AdminLayout from './components/AdminLayout';
import AdminLogin from './app/admin/AdminLogin';
import AdminDashboard from './app/admin/AdminDashboard';
import AdminPosts from './app/admin/AdminPosts';
import AdminPostEditor from './app/admin/AdminPostEditor';
import AdminMedia from './app/admin/AdminMedia';
import AdminComments from './app/admin/AdminComments';
import AdminSettings from './app/admin/AdminSettings';

// Public Pages Wrapper Layout (renders Navbar & Footer)
function PublicLayoutWrapper() {
  return (
    <div className="flex flex-col min-h-screen bg-cream/30 text-slate-dark">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Admin Pages Wrapper Layout (renders Sidebar panel & protects with Auth)
function AdminLayoutWrapper() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayoutWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Authentication Login route (No Navbar/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Secure Administrative CMS Panel Routes */}
          <Route element={<AdminLayoutWrapper />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/posts/new" element={<AdminPostEditor />} />
            <Route path="/admin/posts/:id/edit" element={<AdminPostEditor />} />
            <Route path="/admin/media" element={<AdminMedia />} />
            <Route path="/admin/comments" element={<AdminComments />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback wildcard redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
