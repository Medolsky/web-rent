/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Globe, 
  Lock, 
  RefreshCw,
  Sparkles,
  Award,
  Settings,
  X,
  Database
} from 'lucide-react';
import { 
  initialBuses, 
  initialBlogs, 
  initialBanners, 
  initialStats, 
  initialMessages 
} from './data/initialData';
import { BusArmada, BlogPost, AdBanner, VisitorStat, ContactMessage, AppViewMode } from './types';
import CreatorWorkspace from './components/CreatorWorkspace';
import PublicWebsite from './components/PublicWebsite';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('PUBLIC_SITE');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });
  const [showDevTools, setShowDevTools] = useState<boolean>(false);

  // Router Berbasis Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        setViewMode('ADMIN_PANEL');
      } else if (hash === '#/workspace') {
        setViewMode('WORKSPACE');
      } else {
        setViewMode('PUBLIC_SITE');
      }
    };

    // Sinkronisasi saat load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLoginSuccess = () => {
    sessionStorage.setItem('admin_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    setIsLoggedIn(false);
    window.location.hash = '#/';
  };

  // Core synchronized persistent states
  const [buses, setBuses] = useState<BusArmada[]>(() => {
    const saved = localStorage.getItem('sewabus_buses');
    return saved ? JSON.parse(saved) : initialBuses;
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('sewabus_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [banners, setBanners] = useState<AdBanner[]>(() => {
    const saved = localStorage.getItem('sewabus_banners');
    return saved ? JSON.parse(saved) : initialBanners;
  });

  const [stats, setStats] = useState<VisitorStat[]>(() => {
    const saved = localStorage.getItem('sewabus_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('sewabus_messages');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  // Backup states to localStorage upon changes
  useEffect(() => {
    localStorage.setItem('sewabus_buses', JSON.stringify(buses));
  }, [buses]);

  useEffect(() => {
    localStorage.setItem('sewabus_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('sewabus_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('sewabus_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('sewabus_messages', JSON.stringify(messages));
  }, [messages]);

  // Reset database values easily
  const handleResetDatabase = () => {
    if (confirm('Apakah Anda yakin ingin menyetel ulang database pariwisata ke bawaan default awal? Seluruh CRUD & inbox kustom akan dihapus.')) {
      setBuses(initialBuses);
      setBlogs(initialBlogs);
      setBanners(initialBanners);
      setStats(initialStats);
      setMessages(initialMessages);
      alert('Database pariwisata sukses disetel ulang ke bawaan awal!');
    }
  };

  // --- ANALYTICS TRACKING LOGIC ---
  const handleIncrementAnalytics = (type: 'views' | 'bookingDirect' | 'kontakFormSubmit') => {
    // Increment today's date record (30 Mei in initial stats)
    setStats(prevStats => {
      return prevStats.map(stat => {
        if (stat.tanggal === '30 Mei') {
          return {
            ...stat,
            views: type === 'views' ? stat.views + 1 : stat.views,
            bookingDirect: type === 'bookingDirect' ? stat.bookingDirect + 1 : stat.bookingDirect,
            kontakFormSubmit: type === 'kontakFormSubmit' ? stat.kontakFormSubmit + 1 : stat.kontakFormSubmit
          };
        }
        return stat;
      });
    });
  };

  const handleIncrementBannerClick = (bannerId: string) => {
    setBanners(prevBanners => {
      return prevBanners.map(b => b.id === bannerId ? { ...b, klikCount: b.klikCount + 1 } : b);
    });
    handleIncrementAnalytics('bookingDirect'); // Count towards booking analytics chart
  };

  const handleAddMessage = (newMsg: ContactMessage) => {
    setMessages(prev => [newMsg, ...prev]);
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans selection:bg-orange-500 selection:text-white" id="main-application-shell">
      
      {/* 1. MASTER WORKSPACE HEADER (HANYA MUNCUL DI WORKSPACE SEBAGAI LAYOUT KHUSUS BLUEPRINT) */}
      {viewMode === 'WORKSPACE' && (
        <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between gap-4 shrink-0 z-[9999] select-none shadow-sm overflow-x-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">B</div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">BusWisata Blueprint</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5 whitespace-nowrap">
                Developer Workspace Alur Web
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { window.location.hash = '#/'; }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Lihat Web Publik</span>
            </button>
            <button
              onClick={() => { window.location.hash = '#/admin'; }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Buka Admin Portal</span>
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden lg:inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              Project Phase: Planning
            </span>
            <button
              onClick={handleResetDatabase}
              title="Reset storage to default initial data"
              className="text-slate-500 hover:text-slate-950 px-3 py-2 text-xs font-mono border border-slate-200 hover:border-slate-300 bg-white rounded-xl flex items-center gap-1.5 transition-all select-none shadow-sm shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Database</span>
            </button>
          </div>
        </header>
      )}

      {/* 2. RENDER SUB-VIEWS DYNAMICALLY */}
      <div className="flex-1 flex flex-col bg-slate-50 border-none">
        {viewMode === 'WORKSPACE' && (
          <CreatorWorkspace />
        )}

        {viewMode === 'PUBLIC_SITE' && (
          <PublicWebsite 
            buses={buses}
            blogs={blogs}
            banners={banners}
            onAddMessage={handleAddMessage}
            onIncrementBannerClick={handleIncrementBannerClick}
            onIncrementAnalytics={handleIncrementAnalytics}
          />
        )}

        {viewMode === 'ADMIN_PANEL' && (
          isLoggedIn ? (
            <AdminPanel 
              buses={buses}
              blogs={blogs}
              banners={banners}
              stats={stats}
              messages={messages}
              onUpdateBuses={setBuses}
              onUpdateBlogs={setBlogs}
              onUpdateBanners={setBanners}
              onUpdateMessages={setMessages}
              onLogout={handleLogout}
            />
          ) : (
            <AdminLogin onLoginSuccess={handleLoginSuccess} />
          )
        )}
      </div>

    </div>
  );
}
