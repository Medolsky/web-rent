/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Globe,
  Lock,
  RefreshCw,
  Database,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { initialBuses, initialBlogs, initialBanners, initialStats, initialMessages, initialPhotos, initialHeroBackgrounds } from './data/initialData';
import { BusArmada, BlogPost, AdBanner, VisitorStat, ContactMessage, AppViewMode, VehiclePhoto, HeroBackground } from './types';
import CreatorWorkspace from './components/CreatorWorkspace';
import PublicWebsite from './components/PublicWebsite';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { apiBuses, apiBlogs, apiBanners, apiMessages, apiStats, apiPhotos, apiBackgrounds } from './api';

// ── Mapper: konversi field snake_case PHP → camelCase TypeScript ─────────────
function mapBus(b: any): BusArmada {
  let fitur: string[] = [];
  if (Array.isArray(b.fitur)) {
    fitur = b.fitur;
  } else if (typeof b.fitur === 'string') {
    try { fitur = JSON.parse(b.fitur); } catch { fitur = []; }
  }
  return {
    id: b.id,
    nama: b.nama,
    kategori: b.kategori,
    kapasitas: Number(b.kapasitas),
    hargaSewa: Number(b.harga_sewa ?? b.hargaSewa),
    fitur,
    foto: b.foto,
    deskripsi: b.deskripsi,
    status: b.status,
  };
}

function mapBlog(b: any): BlogPost {
  return {
    id: b.id,
    judul: b.judul,
    ringkasan: b.ringkasan,
    konten: b.konten,
    tanggal: b.tanggal,
    penulis: b.penulis,
    foto: b.foto,
    status: b.status,
    views: Number(b.views),
  };
}

function mapBanner(b: any): AdBanner {
  return {
    id: b.id,
    judul: b.judul,
    deskripsi: b.deskripsi,
    foto: b.foto,
    link: b.link,
    posisi: b.posisi,
    status: b.status,
    klikCount: Number(b.klik_count ?? b.klikCount ?? 0),
  };
}

function mapMessage(m: any): ContactMessage {
  return {
    id: m.id,
    nama: m.nama,
    email: m.email,
    telepon: m.telepon,
    subjek: m.subjek,
    pesan: m.pesan,
    tanggal: m.tanggal,
    dibaca: m.dibaca === 1 || m.dibaca === true,
  };
}

function mapStat(s: any): VisitorStat {
  return {
    tanggal: s.tanggal,
    views: Number(s.views),
    pengunjungUtama: Number(s.pengunjung_utama ?? s.pengunjungUtama ?? 0),
    bookingDirect: Number(s.booking_direct ?? s.bookingDirect ?? 0),
    kontakFormSubmit: Number(s.kontak_form_submit ?? s.kontakFormSubmit ?? 0),
  };
}

function mapPhoto(p: any): VehiclePhoto {
  return {
    id: p.id,
    foto: p.foto,
    created_at: p.created_at
  };
}

function mapBackground(bg: any): HeroBackground {
  return {
    id: bg.id,
    foto: bg.foto,
    isActive: bg.is_active === 1 || bg.is_active === true || bg.isActive === true,
    created_at: bg.created_at
  };
}

// ── Mapper balik: camelCase → snake_case untuk dikirim ke PHP ─────────────────
function busToAPI(bus: Partial<BusArmada>) {
  return {
    nama: bus.nama,
    kategori: bus.kategori,
    kapasitas: bus.kapasitas,
    hargaSewa: bus.hargaSewa,
    fitur: bus.fitur,
    foto: bus.foto,
    deskripsi: bus.deskripsi,
    status: bus.status,
  };
}

export default function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('PUBLIC_SITE');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() =>
    sessionStorage.getItem('admin_logged_in') === 'true'
  );

  // Loading & error state untuk API
  const [loading, setLoading] = useState(true);
  const [adminLoading, setAdminLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Data states
  const [buses, setBuses] = useState<BusArmada[]>(initialBuses);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [banners, setBanners] = useState<AdBanner[]>(initialBanners);
  const [stats, setStats] = useState<VisitorStat[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [photos, setPhotos] = useState<VehiclePhoto[]>([]);
  const [heroBackgrounds, setHeroBackgrounds] = useState<HeroBackground[]>(() => {
    const local = localStorage.getItem('hero_backgrounds');
    if (local) {
      try {
        return JSON.parse(local);
      } catch {
        return initialHeroBackgrounds;
      }
    }
    return initialHeroBackgrounds;
  });

  useEffect(() => {
    try {
      localStorage.setItem('hero_backgrounds', JSON.stringify(heroBackgrounds));
    } catch (e) {
      console.warn('LocalStorage quota exceeded (Base64 image size too large). Skipping local persistence.', e);
    }
  }, [heroBackgrounds]);

  // ── Hash router ────────────────────────────────────────────────────────────
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (hash === '#/admin-abdi-transindo') setViewMode('ADMIN_PANEL');
      else if (hash === '#/workspace') setViewMode('WORKSPACE');
      else setViewMode('PUBLIC_SITE');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // ── Load data publik dari API saat pertama kali mount ───────────────────────
  const loadPublicData = useCallback(async () => {
    setLoading(true);
    setApiError(null);
    try {
      const [rawBuses, rawBlogs, rawBanners, rawBackgrounds] = await Promise.all([
        apiBuses.getAll(),
        apiBlogs.getAll(),
        apiBanners.getAll(),
        apiBackgrounds.getAll().catch(() => []),
      ]);
      setBuses(rawBuses.map(mapBus));
      setBlogs(rawBlogs.map(mapBlog));
      setBanners(rawBanners.map(mapBanner));
      if (rawBackgrounds && rawBackgrounds.length > 0) {
        setHeroBackgrounds(rawBackgrounds.map(mapBackground));
      }
    } catch (err: any) {
      console.warn('API tidak tersedia, pakai data lokal:', err.message);
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPublicData();
  }, [loadPublicData]);

  // ── Load data admin jika login aktif ───────────────────────────────────────
  const loadAdminData = useCallback(async () => {
    setAdminLoading(true);
    try {
      const [rawMessages, rawStats, rawPhotos] = await Promise.all([
        apiMessages.getAll(),
        apiStats.getAll(),
        apiPhotos.getAll().catch(() => []),
      ]);
      setMessages(rawMessages.map(mapMessage));
      setStats(rawStats.map(mapStat));
      if (rawPhotos && rawPhotos.length > 0) {
        setPhotos(rawPhotos.map(mapPhoto));
      } else {
        setPhotos(initialPhotos);
      }
    } catch (err: any) {
      console.warn('Gagal memuat data admin dari API, pakai data lokal:', err.message);
      setMessages(initialMessages);
      setStats(initialStats);
      setPhotos(initialPhotos);
    } finally {
      setAdminLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      loadAdminData();
    }
  }, [isLoggedIn, loadAdminData]);

  const handleRefreshData = async () => {
    await loadPublicData();
    await loadAdminData();
  };

  // ── Login / Logout ─────────────────────────────────────────────────────────
  const handleLoginSuccess = () => {
    sessionStorage.setItem('admin_logged_in', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in');
    setIsLoggedIn(false);
    window.location.hash = '#/';
  };

  // ── CRUD Buses ─────────────────────────────────────────────────────────────
  const handleUpdateBuses = async (newBuses: BusArmada[]) => {
    const prev = buses;
    setBuses(newBuses); // optimistic update

    try {
      // Cari yang ditambah
      const added = newBuses.filter(n => !prev.find(p => p.id === n.id));
      for (const b of added) {
        await apiBuses.create(busToAPI(b));
      }
      // Cari yang diupdate
      const updated = newBuses.filter(n => {
        const old = prev.find(p => p.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });
      for (const b of updated) {
        await apiBuses.update(b.id, busToAPI(b));
      }
      // Cari yang dihapus
      const removed = prev.filter(p => !newBuses.find(n => n.id === p.id));
      for (const b of removed) {
        await apiBuses.remove(b.id);
      }
    } catch (err: any) {
      console.error('Gagal sync buses ke API:', err.message);
    }
  };

  // ── CRUD Blogs ─────────────────────────────────────────────────────────────
  const handleUpdateBlogs = async (newBlogs: BlogPost[]) => {
    const prev = blogs;
    setBlogs(newBlogs);

    try {
      const added = newBlogs.filter(n => !prev.find(p => p.id === n.id));
      for (const b of added) {
        await apiBlogs.create({ ...b });
      }
      const updated = newBlogs.filter(n => {
        const old = prev.find(p => p.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });
      for (const b of updated) {
        await apiBlogs.update(b.id, { ...b });
      }
      const removed = prev.filter(p => !newBlogs.find(n => n.id === p.id));
      for (const b of removed) {
        await apiBlogs.remove(b.id);
      }
    } catch (err: any) {
      console.error('Gagal sync blogs ke API:', err.message);
    }
  };

  // ── CRUD Banners ───────────────────────────────────────────────────────────
  const handleUpdateBanners = async (newBanners: AdBanner[]) => {
    const prev = banners;
    setBanners(newBanners);

    try {
      const added = newBanners.filter(n => !prev.find(p => p.id === n.id));
      for (const b of added) {
        await apiBanners.create({ ...b });
      }
      const updated = newBanners.filter(n => {
        const old = prev.find(p => p.id === n.id);
        return old && JSON.stringify(old) !== JSON.stringify(n);
      });
      for (const b of updated) {
        // Deteksi toggle status saja
        const old = prev.find(p => p.id === b.id);
        if (old && old.status !== b.status &&
            old.judul === b.judul && old.deskripsi === b.deskripsi) {
          await apiBanners.toggleStatus(b.id);
        } else {
          await apiBanners.update(b.id, { ...b });
        }
      }
      const removed = prev.filter(p => !newBanners.find(n => n.id === p.id));
      for (const b of removed) {
        await apiBanners.remove(b.id);
      }
    } catch (err: any) {
      console.error('Gagal sync banners ke API:', err.message);
    }
  };

  // ── CRUD Messages ──────────────────────────────────────────────────────────
  const handleUpdateMessages = async (newMessages: ContactMessage[]) => {
    const prev = messages;
    setMessages(newMessages);

    try {
      const removed = prev.filter(p => !newMessages.find(n => n.id === p.id));
      for (const m of removed) {
        await apiMessages.remove(m.id);
      }
      const toggled = newMessages.filter(n => {
        const old = prev.find(p => p.id === n.id);
        return old && old.dibaca !== n.dibaca;
      });
      for (const m of toggled) {
        await apiMessages.toggleDibaca(m.id);
      }
    } catch (err: any) {
      console.error('Gagal sync messages ke API:', err.message);
    }
  };

  // Helper to format date like PHP's date('d M')
  const getTodayPHPFormat = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = months[d.getMonth()];
    return `${day} ${month}`;
  };

  // ── Analytics ─────────────────────────────────────────────────────────────
  const handleIncrementAnalytics = useCallback((type: 'views' | 'bookingDirect' | 'kontakFormSubmit') => {
    setStats(prev => {
      const todayEng = getTodayPHPFormat();
      const todayId = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }).replace('.', '');
      
      const index = prev.findIndex(s => 
        s.tanggal === todayEng || 
        s.tanggal === todayId || 
        s.tanggal.toLowerCase() === todayEng.toLowerCase() || 
        s.tanggal.toLowerCase() === todayId.toLowerCase()
      );

      if (index !== -1) {
        return prev.map((s, idx) => {
          if (idx === index) {
            return {
              ...s,
              views:              type === 'views'            ? s.views + 1            : s.views,
              bookingDirect:      type === 'bookingDirect'    ? s.bookingDirect + 1    : s.bookingDirect,
              kontakFormSubmit:   type === 'kontakFormSubmit' ? s.kontakFormSubmit + 1 : s.kontakFormSubmit,
            };
          }
          return s;
        });
      }
      return prev;
    });
    // Kirim ke API (fire and forget)
    apiStats.increment(type).catch(() => {});
  }, []);

  const handleIncrementBannerClick = (bannerId: string) => {
    setBanners(prev => prev.map(b => b.id === bannerId ? { ...b, klikCount: b.klikCount + 1 } : b));
    apiBanners.incrementKlik(bannerId).catch(() => {});
    handleIncrementAnalytics('bookingDirect');
  };

  const handleAddMessage = async (newMsg: ContactMessage) => {
    setMessages(prev => [newMsg, ...prev]);
    try {
      await apiMessages.create({ ...newMsg });
    } catch (err: any) {
      console.error('Gagal kirim pesan ke API:', err.message);
    }
  };

  const handleAddPhoto = async (fotoStr: string) => {
    const tempId = `photo-${Date.now()}`;
    const newPhoto: VehiclePhoto = { id: tempId, foto: fotoStr };
    setPhotos(prev => [newPhoto, ...prev]);

    try {
      const res = await apiPhotos.create({ foto: fotoStr });
      if (res && res.id) {
        setPhotos(prev => prev.map(p => p.id === tempId ? { ...p, id: res.id } : p));
        return res.id;
      }
    } catch (err: any) {
      console.error('Gagal simpan foto ke API:', err.message);
    }
    return tempId;
  };

  const handleDeletePhoto = async (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
    try {
      await apiPhotos.remove(id);
    } catch (err: any) {
      console.error('Gagal hapus foto dari API:', err.message);
    }
  };

  const handleAddBackground = async (fotoStr: string) => {
    const tempId = `bg-${Date.now()}`;
    const newBg: HeroBackground = { id: tempId, foto: fotoStr, isActive: true };
    setHeroBackgrounds(prev => [newBg, ...prev]);

    try {
      const res = await apiBackgrounds.create({ foto: fotoStr, isActive: true });
      if (res && res.id) {
        setHeroBackgrounds(prev => prev.map(bg => bg.id === tempId ? { ...bg, id: res.id } : bg));
        return res.id;
      }
    } catch (err: any) {
      console.error('Gagal simpan background ke API:', err.message);
    }
    return tempId;
  };

  const handleToggleBackgroundActive = async (id: string) => {
    setHeroBackgrounds(prev => prev.map(bg => bg.id === id ? { ...bg, isActive: !bg.isActive } : bg));
    try {
      await apiBackgrounds.toggleActive(id);
    } catch (err: any) {
      console.error('Gagal toggle status background:', err.message);
    }
  };

  const handleDeleteBackground = async (id: string) => {
    setHeroBackgrounds(prev => prev.filter(bg => bg.id !== id));
    try {
      await apiBackgrounds.remove(id);
    } catch (err: any) {
      console.error('Gagal hapus background dari API:', err.message);
    }
  };

  const handleResetDatabase = () => {
    if (confirm('Reset database ke data awal? Seluruh data kustom akan hilang.')) {
      setBuses(initialBuses);
      setBlogs(initialBlogs);
      setBanners(initialBanners);
      setStats(initialStats);
      setMessages(initialMessages);
      alert('Database direset ke data awal.');
    }
  };

  // ── Loading screen ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-brand-500 animate-spin" />
        <p className="text-white/60 text-sm font-sans">Memuat data dari server...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans" id="main-application-shell">

      {/* API error banner — hanya muncul kalau gagal konek */}
      {apiError && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2 text-xs text-amber-800 font-sans">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <span>Mode offline — API belum terhubung. Data menggunakan data lokal. ({apiError})</span>
        </div>
      )}

      {/* Workspace Header */}
      {viewMode === 'WORKSPACE' && (
        <header className="h-20 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between gap-4 shrink-0 z-[9999] shadow-sm overflow-x-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">B</div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">BusWisata Blueprint</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Developer Workspace Alur Web</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { window.location.hash = '#/'; }} className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-pointer">
              <Globe className="w-3.5 h-3.5" /><span>Web Publik</span>
            </button>
            <button onClick={() => { window.location.hash = '#/admin-abdi-transindo'; }} className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center gap-1.5 cursor-pointer">
              <Lock className="w-3.5 h-3.5" /><span>Admin Portal</span>
            </button>
          </div>
          <button onClick={handleResetDatabase} className="text-slate-500 hover:text-slate-950 px-3 py-2 text-xs font-mono border border-slate-200 hover:border-slate-300 bg-white rounded-xl flex items-center gap-1.5 transition-all shadow-sm shrink-0">
            <RefreshCw className="w-3.5 h-3.5" /><span>Reset Database</span>
          </button>
        </header>
      )}

      <div className="flex-1 flex flex-col">
        {viewMode === 'WORKSPACE' && <CreatorWorkspace />}

        {viewMode === 'PUBLIC_SITE' && (
          <PublicWebsite
            buses={buses}
            blogs={blogs}
            banners={banners}
            heroBackgrounds={heroBackgrounds}
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
              photos={photos}
              heroBackgrounds={heroBackgrounds}
              isLoadingAdminData={adminLoading}
              onRefreshData={handleRefreshData}
              onUpdateBuses={handleUpdateBuses}
              onUpdateBlogs={handleUpdateBlogs}
              onUpdateBanners={handleUpdateBanners}
              onUpdateMessages={handleUpdateMessages}
              onAddPhoto={handleAddPhoto}
              onDeletePhoto={handleDeletePhoto}
              onAddBackground={handleAddBackground}
              onToggleBackgroundActive={handleToggleBackgroundActive}
              onDeleteBackground={handleDeleteBackground}
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
