import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Newspaper, 
  Image, 
  Inbox, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Check, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Globe, 
  Calendar, 
  X, 
  Compass,
  ExternalLink, 
  Briefcase,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Eye,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Quote,
  List as ListIcon,
  Type,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { BusArmada, BlogPost, AdBanner, VisitorStat, ContactMessage } from '../types';

interface AdminPanelProps {
  buses: BusArmada[];
  blogs: BlogPost[];
  banners: AdBanner[];
  stats: VisitorStat[];
  messages: ContactMessage[];
  onUpdateBuses: (newBuses: BusArmada[]) => void;
  onUpdateBlogs: (newBlogs: BlogPost[]) => void;
  onUpdateBanners: (newBanners: AdBanner[]) => void;
  onUpdateMessages: (newMessages: ContactMessage[]) => void;
  onLogout?: () => void;
}

export default function AdminPanel({
  buses,
  blogs,
  banners,
  stats,
  messages,
  onUpdateBuses,
  onUpdateBlogs,
  onUpdateBanners,
  onUpdateMessages,
  onLogout
}: AdminPanelProps) {
  const [activeSubMenu, setActiveSubMenu] = useState<'dash' | 'bus' | 'blog' | 'banner' | 'inbox'>('dash');

  // --- MODAL & EDITOR STATES ---
  const [showBusModal, setShowBusModal] = useState(false);
  const [editingBus, setEditingBus] = useState<BusArmada | null>(null);
  
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [showBannerModal, setShowBannerModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdBanner | null>(null);

  // --- IMAGE UPLOAD BASE64 STATES ---
  const [busImageBase64, setBusImageBase64] = useState<string>('');
  const [blogImageBase64, setBlogImageBase64] = useState<string>('');
  const [bannerImageBase64, setBannerImageBase64] = useState<string>('');

  // --- RICH TEXT EDITOR STATES ---
  const [blogContent, setBlogContent] = useState<string>('');

  // --- IMAGE FILE READERS ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'bus' | 'blog' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (target === 'bus') setBusImageBase64(base64String);
      if (target === 'blog') setBlogImageBase64(base64String);
      if (target === 'banner') setBannerImageBase64(base64String);
    };
    reader.readAsDataURL(file);
  };

  // --- RICH TEXT INSERT HELPER ---
  const insertMarkup = (type: 'bold' | 'italic' | 'h1' | 'h2' | 'quote' | 'list' | 'large') => {
    const textarea = document.getElementById('blog-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    let replacement = '';

    switch (type) {
      case 'bold':
        replacement = `**${selectedText || 'teks tebal'}**`;
        break;
      case 'italic':
        replacement = `*${selectedText || 'teks miring'}*`;
        break;
      case 'h1':
        replacement = `\n# ${selectedText || 'Judul Besar'}\n`;
        break;
      case 'h2':
        replacement = `\n## ${selectedText || 'Sub Judul'}\n`;
        break;
      case 'quote':
        replacement = `\n> ${selectedText || 'Teks kutipan'}\n`;
        break;
      case 'list':
        replacement = `\n- ${selectedText || 'Poin list'}\n`;
        break;
      case 'large':
        replacement = `<span class="text-lg font-bold">${selectedText || 'Teks besar'}</span>`;
        break;
    }

    const newText = text.substring(0, start) + replacement + text.substring(end);
    setBlogContent(newText);

    // Refocus and set cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + replacement.length, start + replacement.length);
    }, 50);
  };

  // --- SIMPLE MARKDOWN PREVIEW PARSER ---
  const parseMarkdown = (md: string) => {
    if (!md) return <span className="text-slate-400 italic">Belum ada konten ditulis. Gunakan bilah alat di atas untuk mulai menulis...</span>;
    
    const lines = md.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h3 key={idx} className="text-lg font-black text-slate-900 mt-3 mb-1.5 font-heading">{line.replace('# ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h4 key={idx} className="text-base font-extrabold text-slate-800 mt-2.5 mb-1 font-heading">{line.replace('## ', '')}</h4>;
      }
      if (line.startsWith('> ')) {
        return <blockquote key={idx} className="border-l-4 border-violet-500 pl-3 italic text-slate-600 my-2 bg-violet-50/50 py-1 rounded-r-lg font-sans">{line.replace('> ', '')}</blockquote>;
      }
      if (line.startsWith('- ')) {
        return <li key={idx} className="list-disc list-inside ml-2 my-1 text-slate-700 font-sans">{line.replace('- ', '')}</li>;
      }

      // Inline styles bold/italic/large
      const html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/<span class="text-lg font-bold">(.*?)<\/span>/g, '<span class="text-base font-bold text-violet-600">$1</span>');

      return <p key={idx} className="min-h-[1.2em] my-1 text-slate-700 font-sans" dangerouslySetInnerHTML={{ __html: html }}></p>;
    });
  };

  // --- CRUD DISPATCHERS ---: BUS ARMADA
  const handleSaveBus = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const busForm = {
      nama: formData.get('nama') as string,
      kategori: formData.get('kategori') as any,
      kapasitas: parseInt(formData.get('kapasitas') as string) || 30,
      hargaSewa: parseInt(formData.get('hargaSewa') as string) || 2000000,
      fitur: (formData.get('fitur') as string).split(',').map(s => s.trim()).filter(Boolean),
      foto: busImageBase64 || (formData.get('foto') as string) || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      deskripsi: formData.get('deskripsi') as string,
      status: formData.get('status') as any,
    };

    if (editingBus) {
      const updated = buses.map(b => b.id === editingBus.id ? { ...b, ...busForm } : b);
      onUpdateBuses(updated);
    } else {
      const newBus: BusArmada = {
        id: `bus-${Date.now()}`,
        ...busForm
      };
      onUpdateBuses([newBus, ...buses]);
    }
    
    setShowBusModal(false);
    setEditingBus(null);
    setBusImageBase64('');
  };

  const handleDeleteBus = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus unit bus pariwisata ini dari listing?')) {
      onUpdateBuses(buses.filter(b => b.id !== id));
    }
  };

  // --- CRUD DISPATCHERS ---: BLOG POSTS
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const blogForm = {
      judul: formData.get('judul') as string,
      ringkasan: formData.get('ringkasan') as string,
      konten: blogContent,
      penulis: formData.get('penulis') as string,
      foto: blogImageBase64 || (formData.get('foto') as string) || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
      status: formData.get('status') as any,
      tanggal: new Date().toISOString().split('T')[0]
    };

    if (editingBlog) {
      const updated = blogs.map(b => b.id === editingBlog.id ? { ...b, ...blogForm } : b);
      onUpdateBlogs(updated);
    } else {
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        ...blogForm,
        views: 0
      };
      onUpdateBlogs([newBlog, ...blogs]);
    }

    setShowBlogModal(false);
    setEditingBlog(null);
    setBlogImageBase64('');
    setBlogContent('');
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm('Yakin ingin menghapus artikel blog pariwisata ini?')) {
      onUpdateBlogs(blogs.filter(b => b.id !== id));
    }
  };

  // --- CRUD DISPATCHERS ---: BANNERS
  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const bannerForm = {
      judul: formData.get('judul') as string,
      deskripsi: formData.get('deskripsi') as string,
      foto: bannerImageBase64 || (formData.get('foto') as string) || 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&q=80&w=800',
      link: formData.get('link') as string,
      posisi: formData.get('posisi') as any,
      status: formData.get('status') as any,
    };

    if (editingBanner) {
      const updated = banners.map(b => b.id === editingBanner.id ? { ...b, ...bannerForm } : b);
      onUpdateBanners(updated);
    } else {
      const newBanner: AdBanner = {
        id: `banner-${Date.now()}`,
        ...bannerForm,
        klikCount: 0
      };
      onUpdateBanners([newBanner, ...banners]);
    }

    setShowBannerModal(false);
    setEditingBanner(null);
    setBannerImageBase64('');
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Yakin ingin menghapus banner promosi/iklan ini?')) {
      onUpdateBanners(banners.filter(b => b.id !== id));
    }
  };

  const toggleBannerStatus = (id: string) => {
    const updated = banners.map(b => {
      if (b.id === id) {
        return { ...b, status: b.status === 'Aktif' ? 'Nonaktif' : 'Aktif' as any };
      }
      return b;
    });
    onUpdateBanners(updated);
  };

  // --- CRUD DISPATCHERS ---: INBOX MESSAGES
  const handleToggleMessageRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, dibaca: !m.dibaca } : m);
    onUpdateMessages(updated);
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Hapus pesan kontak masuk ini?')) {
      onUpdateMessages(messages.filter(m => m.id !== id));
    }
  };

  const unreadCount = messages.filter(m => !m.dibaca).length;

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col md:flex-row font-sans" id="admin-panel-root">
      
      {/* 1. LIGHT SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between flex-shrink-0 shadow-sm relative z-20">
        <div className="p-5 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-violet-600 to-orange-500 text-white font-extrabold p-2.5 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/10">
              <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: '40s' }} />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-slate-800 block leading-none font-heading">
                Admin Panel JKT
              </span>
              <span className="text-[10px] text-slate-400 font-mono block mt-1">
                Abditransindo • Manager
              </span>
            </div>
          </div>          <div className="space-y-1.5 pt-2">
            <button
              onClick={() => setActiveSubMenu('dash')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'dash' 
                  ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg shadow-violet-500/15' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Analytics</span>
            </button>

            <button
              onClick={() => setActiveSubMenu('bus')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'bus' 
                  ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg shadow-violet-500/15' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Kelola Armada ({buses.length})</span>
            </button>

            <button
              onClick={() => setActiveSubMenu('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'blog' 
                  ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg shadow-violet-500/15' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Kelola Blog ({blogs.length})</span>
            </button>

            <button
              onClick={() => setActiveSubMenu('banner')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'banner' 
                  ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg shadow-violet-500/15' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Banner Iklan ({banners.length})</span>
            </button>

            <button
              onClick={() => setActiveSubMenu('inbox')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'inbox' 
                  ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white shadow-lg shadow-violet-500/15' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Kotak Masuk Kontak</span>
              </div>
              {unreadCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${activeSubMenu === 'inbox' ? 'bg-white text-violet-600' : 'bg-red-500 text-white'}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <button 
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin keluar dari Admin Panel?')) {
                if (onLogout) {
                  onLogout();
                } else {
                  window.location.hash = '#/';
                }
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 hover:text-red-600 border border-red-200 transition-all cursor-pointer outline-none"
          >
            <span>Keluar Sesi</span>
          </button>
          <div className="text-center text-[10px] text-slate-400 font-mono">
            PT. Abditransindo Trans Nusantara
          </div>
        </div>
      </aside>

      {/* 2. MAIN CORE ADMIN PANEL VIEW */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto z-10 relative">

        {/* --- MENU A: DASHBOARD ANALYTICS --- */}
        {activeSubMenu === 'dash' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Armada Bus</div>
                <div className="text-2xl font-black mt-1 flex items-baseline gap-2 text-slate-800 font-heading">
                  <span>{buses.length} Unit</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Tersedia: {buses.filter(b => b.status === "Tersedia").length}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Booking Clicked (WA)</div>
                <div className="text-2xl font-black mt-1 text-emerald-600 flex items-center gap-1.5 font-heading">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <span>{stats.reduce((sum, s) => sum + s.bookingDirect, 0)} Klik</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Promosi Banner Aktif</div>
                <div className="text-2xl font-black mt-1 text-amber-500 font-heading">
                  {banners.filter(b => b.status === "Aktif").length} Promo
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Tanggapan Inbox Unread</div>
                <div className="text-2xl font-black mt-1 text-red-500 flex items-center justify-between font-heading">
                  <span>{unreadCount} Pesan</span>
                  {unreadCount > 0 && <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>}
                </div>
              </div>
            </div>

            {/* Recharts Traffic Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Traffic Area Chart (Visitor Stats) */}
              <div className="lg:col-span-8 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm tracking-widest uppercase text-slate-500 font-heading">Statistik unique visitor & Page Views</h3>
                  <p className="text-[10px] text-slate-400">Kunjungan harian terakumulasi otomatis dari tracking website.</p>
                </div>
                
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats}>
                      <defs>
                        <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="tanggal" stroke="#94a3b8" style={{ fontSize: 10 }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
                      <Legend style={{ fontSize: 12 }} />
                      <Area type="monotone" dataKey="views" name="Page Views" stroke="#8b5cf6" fillOpacity={1} fill="url(#viewsGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="pengunjungUtama" name="Unique Visitors" stroke="#10b981" fillOpacity={1} fill="url(#visitorGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Booking Actions Conversion Bar Chart */}
              <div className="lg:col-span-4 bg-white border border-slate-100 p-5 rounded-2xl shadow-sm space-y-4">
                <div>
                  <h3 className="font-extrabold text-sm tracking-widest uppercase text-slate-500 font-heading">Konversi Interaksi</h3>
                  <p className="text-[10px] text-slate-400">Klik sewa WA vs Form Kontak Masuk.</p>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="tanggal" stroke="#94a3b8" style={{ fontSize: 10 }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '12px' }} />
                      <Legend style={{ fontSize: 10 }} />
                      <Bar dataKey="bookingDirect" name="WA Clicks" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="kontakFormSubmit" name="Form Submits" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick action logs */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-3 block font-heading">Rekomendasi Operasional Sistem (System Tips)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs font-sans text-slate-600">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <strong>Peringatan armada KIR:</strong> Unit Isuzu Elf Long Giga Giga (bus-06) terdeteksi status "Perbaikan", pastikan status dikembalikan ke "Tersedia" usai servis KIR selesai.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <strong>Kenaikan SEO:</strong> Artikel tips blog "Evolusi Suspensi Udara" mendapat 210 pembaca, disarankan menulis kembali topik bergenre Scania.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <strong>Promo Season:</strong> Banner "Promo Libur Sekolah" (posisi Hero) mencetak 54 klik, pertimbangkan rilis banner penyeimbang rute Bandung.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- MENU B: INVENTORY BUS ARMADA CRUD --- */}
        {activeSubMenu === 'bus' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-heading">Kelola Katalog Bus Pariwisata</h2>
                <p className="text-xs text-slate-500">Tambahkan atau update unit armada rental bus yang beredar di sewa publik.</p>
              </div>
              <button
                onClick={() => { setEditingBus(null); setBusImageBase64(''); setShowBusModal(true); }}
                className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer outline-none"
              >
                <Plus className="w-4 h-4" /> TAMBAH ARMADA
              </button>
            </div>

            {/* Bus Table Grid */}
            <div className="grid grid-cols-1 gap-4">
              {buses.map((bus) => (
                <div key={bus.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3.5">
                    <img src={bus.foto} alt={bus.nama} className="w-16 h-12 object-cover rounded-lg border border-slate-100 flex-shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm tracking-tight text-slate-800 font-heading">{bus.nama}</h4>
                        <span className="text-[9px] uppercase px-2 py-0.5 rounded-md font-extrabold bg-slate-100 text-slate-600">
                          {bus.kategori}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-sans">
                        Kapasitas: <strong className="text-slate-700">{bus.kapasitas} Kursi</strong> • Harga Sewa: <strong className="text-slate-700">Rp {bus.hargaSewa.toLocaleString('id-ID')} / hari</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <select
                      value={bus.status}
                      onChange={(e) => {
                        const updated = buses.map(b => b.id === bus.id ? { ...b, status: e.target.value as any } : b);
                        onUpdateBuses(updated);
                      }}
                      className="bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none"
                    >
                      <option value="Tersedia">Tersedia</option>
                      <option value="Disewa">Disewa</option>
                      <option value="Perbaikan">Perbaikan</option>
                    </select>

                    <button 
                      onClick={() => { setEditingBus(bus); setBusImageBase64(bus.foto.startsWith('data:') ? bus.foto : ''); setShowBusModal(true); }}
                      className="bg-white text-amber-500 border border-amber-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      onClick={() => handleDeleteBus(bus.id)}
                      className="bg-white text-red-500 border border-red-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CRUD Bus Modal */}
            {showBusModal && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-[999] animate-fade-in">
                <form onSubmit={handleSaveBus} className="bg-white border border-slate-100 max-w-lg w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider font-heading">
                      {editingBus ? 'Ubah Informasi Armada Bus' : 'Tambah Armada Bus Baru'}
                    </h3>
                    <button type="button" onClick={() => setShowBusModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                      ✕
                    </button>
                  </div>

                  <div className="p-5 space-y-4 text-xs font-sans text-slate-700">
                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Nama Model Bus *</label>
                      <input 
                        required 
                        name="nama" 
                        defaultValue={editingBus?.nama || ''}
                        placeholder="Contoh: Scania K410IB Avante H9" 
                        type="text" 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Kategori Armada *</label>
                        <select 
                          name="kategori" 
                          defaultValue={editingBus?.kategori || 'Big Bus'}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500"
                        >
                          <option value="Luxury">Luxury</option>
                          <option value="Big Bus">Big Bus</option>
                          <option value="Medium Bus">Medium Bus</option>
                          <option value="Micro Bus / Hiace">Micro Bus / Hiace</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Status Awal *</label>
                        <select 
                          name="status" 
                          defaultValue={editingBus?.status || 'Tersedia'}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500"
                        >
                          <option value="Tersedia">Tersedia</option>
                          <option value="Disewa">Disewa</option>
                          <option value="Perbaikan">Perbaikan</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Kapasitas Kursi *</label>
                        <input 
                          required 
                          name="kapasitas" 
                          type="number"
                          defaultValue={editingBus?.kapasitas || 30}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Harga Sewa / Hari (Rp) *</label>
                        <input 
                          required 
                          name="hargaSewa" 
                          type="number"
                          defaultValue={editingBus?.hargaSewa || 2000000}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" 
                        />
                      </div>
                    </div>

                    {/* PHOTO INPUT WITH LOCAL DIRECT FILE UPLOAD AND FALLBACK URL */}
                    <div className="space-y-2 border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50">
                      <span className="text-slate-700 font-extrabold block">Foto Ilustrasi Armada</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        {/* Option A: Direct File Upload */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi A: Upload File Lokal</span>
                          <label className="bg-white border border-slate-200 hover:border-violet-400 hover:bg-violet-50/20 text-slate-700 font-bold px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm text-xs">
                            <Upload className="w-3.5 h-3.5 text-violet-600" />
                            <span>Pilih Foto</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(e, 'bus')}
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Option B: URL Fallback */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi B: Tulis Link URL</span>
                          <input 
                            name="foto" 
                            type="url"
                            defaultValue={editingBus?.foto && !editingBus.foto.startsWith('data:') ? editingBus.foto : ''}
                            placeholder="https://images.unsplash.com/..." 
                            className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-violet-500 font-mono text-[10px]" 
                          />
                        </div>
                      </div>

                      {/* Preview Image */}
                      {(busImageBase64 || editingBus?.foto) && (
                        <div className="mt-3 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/50">
                          <img 
                            src={busImageBase64 || editingBus?.foto} 
                            alt="Preview" 
                            className="w-12 h-10 object-cover rounded-md border border-slate-100" 
                          />
                          <div>
                            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Foto Terpilih
                            </span>
                            <p className="text-[9px] text-slate-400 truncate max-w-[200px]">
                              {busImageBase64 ? 'Local Upload (Base64)' : 'Eksternal URL'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Fasilitas (pisahkan dengan koma) *</label>
                      <input 
                        required 
                        name="fitur" 
                        type="text"
                        defaultValue={editingBus?.fitur.join(', ') || 'AC, Karaoke, WiFi, Reclining Seat'}
                        placeholder="Contoh: AC, Karaoke, WiFi, Toilet, Sofa Lounge" 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Deskripsi Detail Bus *</label>
                      <textarea 
                        required 
                        name="deskripsi" 
                        rows={3}
                        defaultValue={editingBus?.deskripsi || ''}
                        placeholder="Uraikan karakteristik sasis, bodi, and interior..." 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 font-sans" 
                      ></textarea>
                    </div>
                  </div>

                  <div className="p-5 border-t border-slate-100 flex justify-end gap-2.5">
                    <button type="button" onClick={() => setShowBusModal(false)} className="bg-slate-100 text-slate-600 text-xs px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                      Batal
                    </button>
                    <button type="submit" className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 shadow cursor-pointer">
                      <Save className="w-3.5 h-3.5" /> Simpan Armada
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* --- MENU C: BLOG COMPONENT CRUD WITH RICH TEXT EDITOR --- */}
        {activeSubMenu === 'blog' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-heading">Kelola Artikel Wisata Blog</h2>
                <p className="text-xs text-slate-500">Buat atau sunting panduan pariwisata guna mendongkrak optimasi SEO website.</p>
              </div>
              <button
                onClick={() => { 
                  setEditingBlog(null); 
                  setBlogImageBase64(''); 
                  setBlogContent('');
                  setShowBlogModal(true); 
                }}
                className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer outline-none"
              >
                <Plus className="w-4 h-4" /> TULIS MATERI BLOG
              </button>
            </div>

            {/* Blog Posts Dashboard UI list */}
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3.5">
                    <div className="bg-slate-100 text-slate-600 p-2.5 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      📝
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm tracking-tight text-slate-800 line-clamp-1 font-heading">{blog.judul}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-sans">
                        Penulis: <span className="text-slate-700">{blog.penulis}</span> • Tanggal: <strong className="text-slate-700">{blog.tanggal}</strong> • Views: <strong className="text-violet-600">{blog.views} kali</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-1 rounded-md ${
                      blog.status === 'Diterbitkan' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {blog.status}
                    </span>

                    <button 
                      onClick={() => { 
                        setEditingBlog(blog); 
                        setBlogImageBase64(blog.foto.startsWith('data:') ? blog.foto : '');
                        setBlogContent(blog.konten);
                        setShowBlogModal(true); 
                      }}
                      className="bg-white text-amber-500 border border-amber-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-white text-red-500 border border-red-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Blog Editor Modal with Rich Text & Live Preview */}
            {showBlogModal && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-[999] animate-fade-in">
                <form onSubmit={handleSaveBlog} className="bg-white border border-slate-100 max-w-2xl w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider font-heading">
                      {editingBlog ? 'Edit Tulisan Jurnal Blog' : 'Tulis Artikel Blog Pariwisata Baru'}
                    </h3>
                    <button type="button" onClick={() => setShowBlogModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                      ✕
                    </button>
                  </div>

                  <div className="p-5 space-y-4 text-xs font-sans text-slate-700">
                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Judul Postingan *</label>
                      <input 
                        required 
                        name="judul" 
                        defaultValue={editingBlog?.judul || ''}
                        placeholder="Contoh: Evolusi Suspensi Udara pada Bus Modern" 
                        type="text" 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 font-heading text-sm" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Nama Penulis *</label>
                        <input 
                          required 
                          name="penulis" 
                          defaultValue={editingBlog?.penulis || 'Kru Abditransindo'}
                          placeholder="Contoh: Bambang S." 
                          type="text" 
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500" 
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Status Penerbitan *</label>
                        <select 
                          name="status" 
                          defaultValue={editingBlog?.status || 'Diterbitkan'}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500"
                        >
                          <option value="Diterbitkan">Diterbitkan (Publish)</option>
                          <option value="Draf">Draf (Simpan Saja)</option>
                        </select>
                      </div>
                    </div>

                    {/* PHOTO INPUT WITH LOCAL DIRECT FILE UPLOAD AND FALLBACK URL */}
                    <div className="space-y-2 border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50">
                      <span className="text-slate-700 font-extrabold block">Cover Image Banner</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        {/* Option A: Direct File Upload */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi A: Upload File Lokal</span>
                          <label className="bg-white border border-slate-200 hover:border-violet-400 hover:bg-violet-50/20 text-slate-700 font-bold px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm text-xs">
                            <Upload className="w-3.5 h-3.5 text-violet-600" />
                            <span>Pilih Foto</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(e, 'blog')}
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Option B: URL Fallback */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi B: Tulis Link URL</span>
                          <input 
                            name="foto" 
                            type="url"
                            defaultValue={editingBlog?.foto && !editingBlog.foto.startsWith('data:') ? editingBlog.foto : ''}
                            placeholder="https://images.unsplash.com/..." 
                            className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-violet-500 font-mono text-[10px]" 
                          />
                        </div>
                      </div>

                      {/* Preview Image */}
                      {(blogImageBase64 || editingBlog?.foto) && (
                        <div className="mt-3 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/50">
                          <img 
                            src={blogImageBase64 || editingBlog?.foto} 
                            alt="Preview" 
                            className="w-12 h-10 object-cover rounded-md border border-slate-100" 
                          />
                          <div>
                            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Foto Terpilih
                            </span>
                            <p className="text-[9px] text-slate-400 truncate max-w-[200px]">
                              {blogImageBase64 ? 'Local Upload (Base64)' : 'Eksternal URL'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Summary / Ringkasan Singkat *</label>
                      <input 
                        required 
                        name="ringkasan" 
                        type="text"
                        defaultValue={editingBlog?.ringkasan || ''}
                        placeholder="Ringkasan 2 kalimat untuk cover depan list..." 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10" 
                      />
                    </div>

                    {/* --- HIGH INTERACTIVE RICH TEXT WRITING SYSTEM --- */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-slate-600 font-bold block">Konten Jurnal Utama *</label>
                        <span className="text-[10px] text-slate-400 font-mono">Format Markdown & Custom Tag Aktif</span>
                      </div>

                      {/* Rich Text Toolbar */}
                      <div className="bg-slate-50 border border-slate-200 rounded-t-2xl p-1.5 flex flex-wrap gap-1 border-b-0">
                        <button
                          type="button"
                          onClick={() => insertMarkup('bold')}
                          title="Tebal (Bold)"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <Bold className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkup('italic')}
                          title="Miring (Italic)"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <Italic className="w-4 h-4" />
                        </button>
                        <span className="w-px h-5 bg-slate-200 my-auto mx-1"></span>
                        <button
                          type="button"
                          onClick={() => insertMarkup('h1')}
                          title="Heading 1"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <Heading1 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkup('h2')}
                          title="Heading 2"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <Heading2 className="w-4 h-4" />
                        </button>
                        <span className="w-px h-5 bg-slate-200 my-auto mx-1"></span>
                        <button
                          type="button"
                          onClick={() => insertMarkup('quote')}
                          title="Kutipan (Blockquote)"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <Quote className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkup('list')}
                          title="List Poin"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <ListIcon className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertMarkup('large')}
                          title="Teks Besar"
                          className="p-2 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                        >
                          <Type className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Main Textarea */}
                      <textarea 
                        required 
                        id="blog-editor-textarea"
                        rows={6}
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Tuliskan isi edukasi tips pariwisata selengkapnya..." 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-b-2xl px-3 py-2.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 font-sans leading-relaxed text-xs" 
                      ></textarea>
                    </div>

                    {/* --- HIGH-FIDELITY LIVE PREVIEW --- */}
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-inner space-y-2 max-w-full">
                      <div className="flex items-center gap-1.5 text-slate-400 font-extrabold uppercase tracking-wider text-[9px]">
                        <Eye className="w-3.5 h-3.5 text-violet-600" />
                        <span>Pratinjau Langsung (Live Preview)</span>
                      </div>
                      <div className="border-t border-slate-200 pt-2 text-slate-800 font-sans leading-relaxed max-h-40 overflow-y-auto text-xs whitespace-pre-wrap select-text">
                        {parseMarkdown(blogContent)}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 border-t border-slate-100 flex justify-end gap-2.5">
                    <button type="button" onClick={() => setShowBlogModal(false)} className="bg-slate-100 text-slate-600 text-xs px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                      Batal
                    </button>
                    <button type="submit" className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 shadow cursor-pointer">
                      <Save className="w-3.5 h-3.5" /> Terbitkan Postingan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* --- MENU D: ADVERTISING BANNER PROMO CRUD --- */}
        {activeSubMenu === 'banner' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-heading">Kelola Iklan Banner & Promo</h2>
                <p className="text-xs text-slate-500">Atur penayangan baliho promo promosi musiman di sela pariwisata landing page.</p>
              </div>
              <button
                onClick={() => { setEditingBanner(null); setBannerImageBase64(''); setShowBannerModal(true); }}
                className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer outline-none"
              >
                <Plus className="w-4 h-4" /> TAMBAH BANNER PROMO
              </button>
            </div>

            {/* Banners UI listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                      <img src={banner.foto} alt={banner.judul} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur text-white font-extrabold text-[8px] px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                        {banner.posisi}
                      </div>
                      
                      <button
                        onClick={() => toggleBannerStatus(banner.id)}
                        className={`absolute top-2.5 right-2.5 font-black text-[9px] text-white px-2 py-0.5 rounded shadow flex items-center gap-0.5 outline-none cursor-pointer ${
                          banner.status === 'Aktif' ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      >
                        {banner.status === 'Aktif' ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                        <span>{banner.status}</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight font-heading">{banner.judul}</h4>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">{banner.deskripsi}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-mono">
                      Klik link: <strong className="text-violet-600">{banner.klikCount} Kali</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingBanner(banner); setBannerImageBase64(banner.foto.startsWith('data:') ? banner.foto : ''); setShowBannerModal(true); }}
                        className="bg-white text-amber-500 border border-amber-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(banner.id)}
                        className="bg-white text-red-500 border border-red-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Modals */}
            {showBannerModal && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-[999] animate-fade-in">
                <form onSubmit={handleSaveBanner} className="bg-white border border-slate-100 max-w-lg w-full rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider font-heading">
                      {editingBanner ? 'Sunting Banner Promosi Wisata' : 'Buat Banner Promosi Baru'}
                    </h3>
                    <button type="button" onClick={() => setShowBannerModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                      ✕
                    </button>
                  </div>

                  <div className="p-5 space-y-4 text-xs font-sans text-slate-700">
                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Judul Promo *</label>
                      <input 
                        required 
                        name="judul" 
                        defaultValue={editingBanner?.judul || ''}
                        placeholder="Contoh: Paket Libur Sekolah Hemat 30%" 
                        type="text" 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Posisi Tayang *</label>
                        <select 
                          name="posisi" 
                          defaultValue={editingBanner?.posisi || 'Hero Promo'}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500"
                        >
                          <option value="Hero Promo">Hero Promo (Baliho Depan)</option>
                          <option value="Sidebar Blog">Sidebar Blog (Iklan Tip)</option>
                          <option value="Footer Banner">Footer Banner (Bagian Bawah)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-slate-600 font-bold block">Status Awal *</label>
                        <select 
                          name="status" 
                          defaultValue={editingBanner?.status || 'Aktif'}
                          className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500"
                        >
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </select>
                      </div>
                    </div>

                    {/* PHOTO INPUT WITH LOCAL DIRECT FILE UPLOAD AND FALLBACK URL */}
                    <div className="space-y-2 border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50">
                      <span className="text-slate-700 font-extrabold block">Foto Baliho Promo</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                        {/* Option A: Direct File Upload */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi A: Upload File Lokal</span>
                          <label className="bg-white border border-slate-200 hover:border-violet-400 hover:bg-violet-50/20 text-slate-700 font-bold px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm text-xs">
                            <Upload className="w-3.5 h-3.5 text-violet-600" />
                            <span>Pilih Foto</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleFileChange(e, 'banner')}
                              className="hidden" 
                            />
                          </label>
                        </div>

                        {/* Option B: URL Fallback */}
                        <div className="space-y-1">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi B: Tulis Link URL</span>
                          <input 
                            name="foto" 
                            type="url"
                            defaultValue={editingBanner?.foto && !editingBanner.foto.startsWith('data:') ? editingBanner.foto : ''}
                            placeholder="https://images.unsplash.com/..." 
                            className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-violet-500 font-mono text-[10px]" 
                          />
                        </div>
                      </div>

                      {/* Preview Image */}
                      {(bannerImageBase64 || editingBanner?.foto) && (
                        <div className="mt-3 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/50">
                          <img 
                            src={bannerImageBase64 || editingBanner?.foto} 
                            alt="Preview" 
                            className="w-12 h-10 object-cover rounded-md border border-slate-100" 
                          />
                          <div>
                            <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Foto Terpilih
                            </span>
                            <p className="text-[9px] text-slate-400 truncate max-w-[200px]">
                              {bannerImageBase64 ? 'Local Upload (Base64)' : 'Eksternal URL'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Tautan Arah Link WA (Custom Text) *</label>
                      <input 
                        required 
                        name="link" 
                        defaultValue={editingBanner?.link || 'Penyewaan Promo'}
                        placeholder="Contoh: Sewa Bigbus Promo Sekolah" 
                        type="text" 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500" 
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-600 font-bold block">Deskripsi Singkat / Syarat Ketentuan *</label>
                      <textarea 
                        required 
                        name="deskripsi" 
                        rows={2}
                        defaultValue={editingBanner?.deskripsi || ''}
                        placeholder="Uraikan diskon, masa berlaku promo..." 
                        className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500 font-sans" 
                      ></textarea>
                    </div>
                  </div>

                  <div className="p-5 border-t border-slate-100 flex justify-end gap-2.5">
                    <button type="button" onClick={() => setShowBannerModal(false)} className="bg-slate-100 text-slate-600 text-xs px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                      Batal
                    </button>
                    <button type="submit" className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1 shadow cursor-pointer">
                      <Save className="w-3.5 h-3.5" /> Simpan Promo
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* --- MENU E: INBOX CONTACT MESSAGES --- */}
        {activeSubMenu === 'inbox' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-extrabold text-slate-800 font-heading">Kotak Masuk Inbox Pertanyaan</h2>
              <p className="text-xs text-slate-500">Kumpulan respon formulir kontak dari Web Publik Abditransindo.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`border rounded-3xl p-5 shadow-sm transition-all relative group flex flex-col justify-between gap-3 bg-white ${
                      msg.dibaca ? 'border-slate-100 opacity-75' : 'border-violet-200/80 shadow-md shadow-violet-500/5'
                    }`}
                  >
                    {!msg.dibaca && (
                      <span className="absolute top-4 right-4 bg-violet-600 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md animate-pulse">
                        BARU
                      </span>
                    )}

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <strong className="text-slate-800 text-sm font-heading">{msg.nama}</strong>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <span className="text-slate-500 font-sans">{msg.email}</span>
                        <span className="text-slate-300 hidden sm:inline">|</span>
                        <span className="text-violet-600 font-mono text-[11px] font-bold">{msg.telepon}</span>
                      </div>

                      <div className="space-y-1 text-xs">
                        <div className="font-extrabold text-slate-700 uppercase tracking-wide text-[10px]">Subjek: {msg.subjek}</div>
                        <p className="text-slate-600 font-sans leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-2xl border border-slate-100">
                          {msg.pesan}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-slate-400">
                      <span>Dikirim pada: <strong className="text-slate-500 font-mono">{msg.tanggal}</strong></span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMessageRead(msg.id)}
                          className="bg-white text-slate-600 border border-slate-200 text-[10px] font-extrabold px-3 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                        >
                          {msg.dibaca ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="bg-white text-red-500 border border-red-200 text-xs px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm py-16 text-slate-400">
                  <span className="text-4xl">📬</span>
                  <h3 className="font-bold text-slate-700 mt-2">Kotak Masuk Kosong</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Belum ada pesan formulir kontak dari pengguna saat ini.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

    </div>
  );
}
