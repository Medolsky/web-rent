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
  Image as ImageIcon,
  Menu,
  Database,
  Sparkles
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
import { BusArmada, BlogPost, AdBanner, VisitorStat, ContactMessage, VehiclePhoto, HeroBackground } from '../types';
import abbataLogo from '../../assets/image/profile/logo-abbata.png';
import { apiPhotos, apiBackgrounds, uploadImage } from '../api';

function compressImage(base64Str: string, maxWidth = 1000, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    if (!base64Str.startsWith('data:')) {
      resolve(base64Str);
      return;
    }
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth || height > maxWidth) {
        if (width > height) {
          height = Math.round((maxWidth / width) * height);
          width = maxWidth;
        } else {
          width = Math.round((maxWidth / height) * width);
          height = maxWidth;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => {
      resolve(base64Str);
    };
  });
}

interface AdminPanelProps {
  buses: BusArmada[];
  blogs: BlogPost[];
  banners: AdBanner[];
  stats: VisitorStat[];
  messages: ContactMessage[];
  photos: VehiclePhoto[];
  heroBackgrounds: HeroBackground[];
  isLoadingAdminData?: boolean;
  onRefreshData?: () => Promise<void>;
  onUpdateBuses: (newBuses: BusArmada[]) => void;
  onUpdateBlogs: (newBlogs: BlogPost[]) => void;
  onUpdateBanners: (newBanners: AdBanner[]) => void;
  onUpdateMessages: (newMessages: ContactMessage[]) => void;
  onAddPhoto: (fotoStr: string) => Promise<string>;
  onDeletePhoto: (id: string) => void;
  onAddBackground: (fotoStr: string) => Promise<string>;
  onToggleBackgroundActive: (id: string) => void;
  onDeleteBackground: (id: string) => void;
  onLogout?: () => void;
}

export default function AdminPanel({
  buses,
  blogs,
  banners,
  stats,
  messages,
  photos,
  heroBackgrounds,
  isLoadingAdminData = false,
  onRefreshData,
  onUpdateBuses,
  onUpdateBlogs,
  onUpdateBanners,
  onUpdateMessages,
  onAddPhoto,
  onDeletePhoto,
  onAddBackground,
  onToggleBackgroundActive,
  onDeleteBackground,
  onLogout
}: AdminPanelProps) {
  const [activeSubMenu, setActiveSubMenu] = useState<'dash' | 'bus' | 'blog' | 'banner' | 'inbox' | 'photos' | 'backgrounds' | 'optimizer'>('dash');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const selectSubMenu = (menu: 'dash' | 'bus' | 'blog' | 'banner' | 'inbox' | 'photos' | 'backgrounds' | 'optimizer') => {
    setActiveSubMenu(menu);
    setMobileSidebarOpen(false);
  };

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

  // --- FASILITAS (FITUR) STATE for click-toggle UI ---
  const FASILITAS_PRESET = [
    'AC', 'WiFi', 'Karaoke', 'Reclining Seat', 'Toilet', 'Sofa Lounge',
    'Personal TV (AVOD)', 'Air Suspension', 'USB Charger', 'Dispenser Air',
    'Bantal & Selimut', 'Cool Box', 'Sound System', 'Bagasi Luas',
    'Double Decker', 'Captain Seat', 'Smoking Room', 'Ambient Lighting'
  ];
  const [selectedFitur, setSelectedFitur] = useState<string[]>([]);
  const [customFiturInput, setCustomFiturInput] = useState<string>('');

  const toggleFitur = (item: string) => {
    setSelectedFitur(prev =>
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const addCustomFitur = () => {
    const val = customFiturInput.trim();
    if (val && !selectedFitur.includes(val)) {
      setSelectedFitur(prev => [...prev, val]);
    }
    setCustomFiturInput('');
  };

  // --- DATABASE OPTIMIZER STATES & FUNCTIONS ---
  const [optimizeStatus, setOptimizeStatus] = useState<{
    running: boolean;
    progress: number;
    total: number;
    current: number;
    savingsBytes: number;
    log: string[];
  }>({
    running: false,
    progress: 0,
    total: 0,
    current: 0,
    savingsBytes: 0,
    log: []
  });

  const isBloatedBase64 = (str?: string) => {
    if (!str) return false;
    return str.startsWith('data:image/') && str.length > 200000;
  };

  const scanBloatedItems = () => {
    const items: { type: 'bus' | 'blog' | 'banner' | 'photo' | 'background'; id: string; name: string; size: number; data: any }[] = [];

    buses.forEach(b => {
      if (isBloatedBase64(b.foto)) {
        items.push({ type: 'bus', id: b.id, name: `Armada: ${b.nama}`, size: b.foto.length, data: b });
      }
    });

    blogs.forEach(b => {
      if (isBloatedBase64(b.foto)) {
        items.push({ type: 'blog', id: b.id, name: `Blog: ${b.judul}`, size: b.foto.length, data: b });
      }
    });

    banners.forEach(b => {
      if (isBloatedBase64(b.foto)) {
        items.push({ type: 'banner', id: b.id, name: `Banner: ${b.judul}`, size: b.foto.length, data: b });
      }
    });

    photos.forEach(p => {
      if (isBloatedBase64(p.foto)) {
        items.push({ type: 'photo', id: p.id, name: `Pustaka Foto: ID ${p.id}`, size: p.foto.length, data: p });
      }
    });

    heroBackgrounds.forEach(bg => {
      if (isBloatedBase64(bg.foto)) {
        items.push({ type: 'background', id: bg.id, name: `Hero Background: ID ${bg.id}`, size: bg.foto.length, data: bg });
      }
    });

    return items;
  };

  const runOptimization = async () => {
    const items = scanBloatedItems();
    if (items.length === 0) {
      alert("Tidak ada gambar besar yang ditemukan di database.");
      return;
    }

    if (!confirm(`Ditemukan ${items.length} gambar berukuran besar. Sistem akan mengompresinya secara bertahap di browser dan menyimpannya kembali ke database.\n\nProses ini mungkin memakan waktu beberapa menit. Lanjutkan?`)) {
      return;
    }

    setOptimizeStatus({
      running: true,
      progress: 0,
      total: items.length,
      current: 0,
      savingsBytes: 0,
      log: ["Memulai optimasi database...", `Daftar tugas: memproses ${items.length} file gambar.`]
    });

    let currentSavings = 0;
    let currentBuses = [...buses];
    let currentBlogs = [...blogs];
    let currentBanners = [...banners];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const stepNum = i + 1;
      setOptimizeStatus(prev => ({
        ...prev,
        current: stepNum,
        progress: Math.round((i / items.length) * 100),
        log: [...prev.log, `[${stepNum}/${items.length}] Mengompresi ${item.name}...`]
      }));

      try {
        let originalBase64 = '';
        if (item.type === 'bus') originalBase64 = item.data.foto;
        else if (item.type === 'blog') originalBase64 = item.data.foto;
        else if (item.type === 'banner') originalBase64 = item.data.foto;
        else if (item.type === 'photo') originalBase64 = item.data.foto;
        else if (item.type === 'background') originalBase64 = item.data.foto;

        const compressedBase64 = await compressImage(originalBase64, 1000, 0.75);
        const originalBytes = originalBase64.length;
        const compressedBytes = compressedBase64.length;
        const saved = originalBytes - compressedBytes;
        currentSavings += saved;

        if (item.type === 'bus') {
          currentBuses = currentBuses.map(b => b.id === item.id ? { ...b, foto: compressedBase64 } : b);
          await onUpdateBuses(currentBuses);
        } else if (item.type === 'blog') {
          currentBlogs = currentBlogs.map(b => b.id === item.id ? { ...b, foto: compressedBase64 } : b);
          await onUpdateBlogs(currentBlogs);
        } else if (item.type === 'banner') {
          currentBanners = currentBanners.map(b => b.id === item.id ? { ...b, foto: compressedBase64 } : b);
          await onUpdateBanners(currentBanners);
        } else if (item.type === 'photo') {
          await apiPhotos.update(item.id, { foto: compressedBase64 });
        } else if (item.type === 'background') {
          await apiBackgrounds.update(item.id, { foto: compressedBase64 });
        }

        setOptimizeStatus(prev => ({
          ...prev,
          savingsBytes: currentSavings,
          log: [...prev.log, `✔️ Selesai: Ukuran berkurang dari ${(originalBytes/1024/1024).toFixed(2)}MB menjadi ${(compressedBytes/1024).toFixed(1)}KB (Hemat ${((saved/originalBytes)*100).toFixed(0)}%).`]
        }));
      } catch (err: any) {
        setOptimizeStatus(prev => ({
          ...prev,
          log: [...prev.log, `❌ Gagal memproses ${item.name}: ${err.message}`]
        }));
      }

      await new Promise(r => setTimeout(r, 200));
    }

    setOptimizeStatus(prev => ({
      ...prev,
      progress: 100,
      log: [...prev.log, `Optimasi selesai! Menyegarkan data database...`]
    }));

    if (onRefreshData) {
      await onRefreshData();
    }

    setOptimizeStatus(prev => ({
      ...prev,
      running: false,
      log: [...prev.log, `🎉 Database berhasil dioptimalkan! Total ruang hemat: ${(currentSavings/1024/1024).toFixed(2)} MB.`]
    }));

    alert(`🎉 Optimasi Selesai!\n\nSistem berhasil memampatkan gambar database dan menghemat ruang sekitar ${(currentSavings/1024/1024).toFixed(2)} MB.\nWebsite Anda sekarang akan memuat jauh lebih cepat.`);
  };

  // --- RICH TEXT EDITOR STATES ---
  const [blogContent, setBlogContent] = useState<string>('');

  // --- IMAGE FILE UPLOAD (Server-side) ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, target: 'bus' | 'blog' | 'banner') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Upload ke server → dapat URL path
      const imageUrl = await uploadImage(file, { maxWidth: 1000, quality: 75 });
      
      if (target === 'bus') {
        setBusImageBase64(imageUrl);
        await onAddPhoto(imageUrl);
      }
      if (target === 'blog') setBlogImageBase64(imageUrl);
      if (target === 'banner') setBannerImageBase64(imageUrl);
    } catch (err) {
      console.error('Upload gagal:', err);
      // Fallback ke base64 di browser
      const reader = new FileReader();
      reader.onloadend = async () => {
        const originalBase64 = reader.result as string;
        const compressedBase64 = await compressImage(originalBase64);
        
        if (target === 'bus') {
          setBusImageBase64(compressedBase64);
          await onAddPhoto(compressedBase64);
        }
        if (target === 'blog') setBlogImageBase64(compressedBase64);
        if (target === 'banner') setBannerImageBase64(compressedBase64);
      };
      reader.readAsDataURL(file);
    }
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
      hargaSewa: editingBus ? editingBus.hargaSewa : 0,
      fitur: selectedFitur.length > 0 ? selectedFitur : [],
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
    setSelectedFitur([]);
    setCustomFiturInput('');
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
    <div className="bg-slate-50 text-slate-800 min-h-screen flex flex-col md:flex-row font-sans relative" id="admin-panel-root">
      
      {/* Mobile Top Navbar */}
      <header className="md:hidden bg-navy-950 text-white px-5 py-4 flex items-center justify-between border-b border-navy-900 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <img src={abbataLogo} alt="ABBATA WISATA" className="w-8 h-8 object-contain" />
          <div>
            <span className="font-extrabold text-xs tracking-tight text-white block leading-none font-heading">
              Admin Panel
            </span>
            <span className="text-[9px] text-brand-500 font-mono block mt-0.5">
              ABBATA WISATA
            </span>
          </div>
        </div>
        <button 
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors text-slate-300 hover:text-white cursor-pointer outline-none"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay Backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 1. LIGHT SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 border-r border-navy-900 flex flex-col justify-between flex-shrink-0 shadow-xl text-slate-300 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:h-screen ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-navy-900 pb-5">
            <div className="flex items-center gap-2.5">
              <img src={abbataLogo} alt="ABBATA WISATA" className="w-10 h-10 object-contain hover:scale-105 transition-transform" />
              <div>
                <span className="font-extrabold text-sm tracking-tight text-white block leading-none font-heading">
                  Admin Panel JKT
                </span>
                <span className="text-[10px] text-brand-500 font-mono block mt-1">
                  ABBATA WISATA • Manager
                </span>
              </div>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer outline-none"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>          <div className="space-y-1.5 pt-1">            <button
              onClick={() => selectSubMenu('dash')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'dash' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Analytics</span>
            </button>

            <button
              onClick={() => selectSubMenu('bus')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'bus' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Kelola Armada ({buses.length})</span>
            </button>

            <button
              onClick={() => selectSubMenu('photos')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'photos' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Pustaka Foto ({photos.length})</span>
            </button>

            <button
              onClick={() => selectSubMenu('backgrounds')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'backgrounds' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Background Hero ({heroBackgrounds.length})</span>
            </button>

            <button
              onClick={() => selectSubMenu('blog')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'blog' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Newspaper className="w-4 h-4" />
              <span>Kelola Blog ({blogs.length})</span>
            </button>

            <button
              onClick={() => selectSubMenu('banner')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'banner' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>Banner Iklan ({banners.length})</span>
            </button>

            <button
              onClick={() => selectSubMenu('inbox')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'inbox' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Kotak Masuk Kontak</span>
              </div>
              {unreadCount > 0 && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${activeSubMenu === 'inbox' ? 'bg-navy-950 text-brand-500' : 'bg-red-500 text-white'}`}>
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => selectSubMenu('optimizer')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer outline-none ${
                activeSubMenu === 'optimizer' 
                  ? 'bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-navy-950 shadow-lg shadow-brand-500/15' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Optimasi Database</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-900 space-y-3">
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
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-950 transition-all cursor-pointer outline-none"
          >
            <span>Keluar Sesi</span>
          </button>
          <div className="text-center text-[10px] text-slate-600 font-mono font-bold uppercase tracking-wider">
            PT. ABDI BANGKIT TRANSPORTINDO
          </div>
        </div>
      </aside>

      {/* 2. MAIN CORE ADMIN PANEL VIEW */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto z-10 relative">

        {/* --- MENU A: DASHBOARD ANALYTICS --- */}
        {activeSubMenu === 'dash' && isLoadingAdminData && (
          <div className="space-y-6 animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="h-5 bg-slate-200 rounded w-1/4"></div>
              <div className="h-64 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>
        )}

        {activeSubMenu === 'dash' && !isLoadingAdminData && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            {/* Summary Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border-t-4 border-t-slate-800 border-x border-b border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-450 uppercase">Total Armada Bus</div>
                <div className="text-2xl font-black mt-1 flex items-baseline gap-2 text-slate-800 font-heading">
                  <span>{buses.length} Unit</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Tersedia: {buses.filter(b => b.status === "Tersedia").length}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-t-4 border-t-blue-500 border-x border-b border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-450 uppercase">Total Kunjungan (Views)</div>
                <div className="text-2xl font-black mt-1 text-blue-600 flex items-center gap-1.5 font-heading">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span>{stats.reduce((sum, s) => sum + s.views, 0).toLocaleString('id-ID')} Kali</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-t-4 border-t-indigo-500 border-x border-b border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-450 uppercase">Pengunjung Unik (Unique)</div>
                <div className="text-2xl font-black mt-1 text-indigo-650 flex items-center gap-1.5 font-heading">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <span>{stats.reduce((sum, s) => sum + s.pengunjungUtama, 0).toLocaleString('id-ID')} Orang</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-t-4 border-t-emerald-500 border-x border-b border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-450 uppercase">Total Booking Clicked (WA)</div>
                <div className="text-2xl font-black mt-1 text-emerald-600 flex items-center gap-1.5 font-heading">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <span>{stats.reduce((sum, s) => sum + s.bookingDirect, 0)} Klik</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border-t-4 border-t-red-500 border-x border-b border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[10px] font-extrabold tracking-widest text-slate-450 uppercase">Tanggapan Inbox Unread</div>
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
                          <stop offset="5%" stopColor="#082a1c" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#082a1c" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ba9445" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ba9445" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="tanggal" stroke="#94a3b8" style={{ fontSize: 10 }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
                      <Legend style={{ fontSize: 12 }} />
                      <Area type="monotone" dataKey="views" name="Page Views" stroke="#082a1c" fillOpacity={1} fill="url(#viewsGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="pengunjungUtama" name="Unique Visitors" stroke="#ba9445" fillOpacity={1} fill="url(#visitorGrad)" strokeWidth={2} />
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
                      <Bar dataKey="bookingDirect" name="WA Clicks" fill="#ba9445" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="kontakFormSubmit" name="Form Submits" fill="#082a1c" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div>
                <h3 className="font-extrabold text-sm tracking-widest uppercase text-slate-500 font-heading">Laporan Kunjungan Harian (Daily Visitor History)</h3>
                <p className="text-[10px] text-slate-400">Rincian data views, unique visitor, dan klik booking per tanggal (diurutkan dari yang terbaru).</p>
              </div>
              
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4 font-heading">Tanggal</th>
                      <th className="py-3 px-4 text-center font-heading">Page Views (Kunjungan)</th>
                      <th className="py-3 px-4 text-center font-heading">Pengunjung Unik (Unique)</th>
                      <th className="py-3 px-4 text-center font-heading">Klik Booking WA</th>
                      <th className="py-3 px-4 text-center font-heading">Form Kontak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-650 font-sans font-medium">
                    {[...stats].reverse().map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900">{s.tanggal}</td>
                        <td className="py-3 px-4 text-center text-blue-600 font-bold">{s.views.toLocaleString('id-ID')}</td>
                        <td className="py-3 px-4 text-center text-indigo-600 font-bold">{s.pengunjungUtama.toLocaleString('id-ID')}</td>
                        <td className="py-3 px-4 text-center text-emerald-600 font-bold">{s.bookingDirect}</td>
                        <td className="py-3 px-4 text-center text-slate-700 font-bold">{s.kontakFormSubmit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                onClick={() => { setEditingBus(null); setBusImageBase64(''); setSelectedFitur([]); setCustomFiturInput(''); setShowBusModal(true); }}
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
                        Kapasitas: <strong className="text-slate-700">{bus.kapasitas} Kursi</strong>
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
                      onClick={() => { setEditingBus(bus); setBusImageBase64(bus.foto.startsWith('data:') ? bus.foto : ''); setSelectedFitur([...bus.fitur]); setCustomFiturInput(''); setShowBusModal(true); }}
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

            {/* CRUD Bus Modal removed to root level */}
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
                    <div className="bg-violet-100 text-violet-600 p-2.5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Newspaper className="w-5 h-5" />
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

            {/* Blog Editor Modal removed to root level */}
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

            {/* Banner Modals removed to root level */}
          </div>
        )}

        {/* --- MENU E: INBOX CONTACT MESSAGES --- */}
        {activeSubMenu === 'inbox' && isLoadingAdminData && (
          <div className="space-y-6 animate-pulse">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-extrabold text-slate-800 font-heading">Kotak Masuk Inbox Pertanyaan</h2>
              <p className="text-xs text-slate-500">Kumpulan respon formulir kontak dari Web Publik Abbata Wisata.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="border border-slate-100 rounded-3xl p-5 bg-white shadow-sm space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-10 bg-slate-100 rounded-xl"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubMenu === 'inbox' && !isLoadingAdminData && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-extrabold text-slate-800 font-heading">Kotak Masuk Inbox Pertanyaan</h2>
              <p className="text-xs text-slate-500">Kumpulan respon formulir kontak dari Web Publik Abbata Wisata.</p>
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
                  <div className="flex justify-center mb-3">
                    <Inbox className="w-12 h-12 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-700 mt-2">Kotak Masuk Kosong</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Belum ada pesan formulir kontak dari pengguna saat ini.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MENU F: VEHICLE PHOTOS LIBRARY --- */}
        {activeSubMenu === 'photos' && isLoadingAdminData && (
          <div className="space-y-6 animate-pulse">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-heading">Pustaka Foto Kendaraan</h2>
                <p className="text-xs text-slate-500 font-sans">Kelola dan unggah foto-foto armada bus Anda. Foto di sini dapat dipilih saat menginput data bus baru.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="aspect-video bg-slate-200 rounded-2xl border border-slate-100 shadow-sm animate-pulse"></div>
              ))}
            </div>
          </div>
        )}

        {activeSubMenu === 'photos' && !isLoadingAdminData && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-heading">Pustaka Foto Kendaraan</h2>
                <p className="text-xs text-slate-500 font-sans">Kelola dan unggah foto-foto armada bus Anda. Foto di sini dapat dipilih saat menginput data bus baru.</p>
              </div>
              <div>
                <label className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer outline-none transition-all">
                  <Plus className="w-4 h-4" /> UNGGAH FOTO BARU
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files) return;
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        try {
                          const imageUrl = await uploadImage(file, { maxWidth: 1200, quality: 80 });
                          await onAddPhoto(imageUrl);
                        } catch {
                          // Fallback ke base64
                          const reader = new FileReader();
                          reader.onloadend = async () => {
                            const originalBase64 = reader.result as string;
                            const compressedBase64 = await compressImage(originalBase64);
                            await onAddPhoto(compressedBase64);
                          };
                          reader.readAsDataURL(file);
                        }
                      }
                      e.target.value = '';
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Gallery Grid */}
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {photos.map((p) => (
                  <div key={p.id} className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <img
                      src={p.foto}
                      alt="Pustaka Foto"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm('Hapus foto ini dari pustaka?')) {
                            onDeletePhoto(p.id);
                          }
                        }}
                        className="bg-red-500 hover:bg-red-655 text-white p-2 rounded-xl transition-all cursor-pointer shadow"
                        title="Hapus Foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm py-16 text-slate-400">
                <div className="flex justify-center mb-3">
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                </div>
                <h3 className="font-bold text-slate-700 mt-2">Pustaka Foto Kosong</h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">Belum ada foto kendaraan yang diunggah. Klik tombol di atas untuk mengunggah.</p>
              </div>
            )}
          </div>
        )}

        {/* --- MENU G: HERO BACKGROUNDS --- */}
        {activeSubMenu === 'backgrounds' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-3 gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-800 font-heading">Background Hero Landing Page</h2>
                <p className="text-xs text-slate-500 font-sans">Kelola gambar latar belakang untuk bagian header utama (Hero) di website publik. Gambar yang aktif akan berputar otomatis sebagai slideshow.</p>
              </div>
              <div className="flex gap-2">
                <label className="bg-gradient-to-r from-violet-600 to-orange-500 hover:from-violet-700 hover:to-orange-600 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-violet-500/10 cursor-pointer outline-none transition-all">
                  <Plus className="w-4 h-4" /> UNGGAH BAGROUND BARU
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = e.target.files;
                      if (!files) return;
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i];
                        try {
                          const imageUrl = await uploadImage(file, { maxWidth: 1600, quality: 85 });
                          // Simpan ke background
                          await onAddBackground(imageUrl);
                          // Juga masukkan ke pustaka foto umum
                          await onAddPhoto(imageUrl);
                        } catch {
                          // Fallback ke base64
                          const reader = new FileReader();
                          reader.onloadend = async () => {
                            const originalBase64 = reader.result as string;
                            const compressedBase64 = await compressImage(originalBase64);
                            await onAddBackground(compressedBase64);
                            await onAddPhoto(compressedBase64);
                          };
                          reader.readAsDataURL(file);
                        }
                      }
                      e.target.value = '';
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Section: Pilih dari Pustaka Foto */}
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-3xl space-y-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-violet-500" />
                  <span>Pilih dari Pustaka Foto ({photos.length})</span>
                </h3>
                <p className="text-[10px] text-slate-500 font-sans">Klik salah satu foto di bawah untuk mendaftarkannya sebagai gambar latar belakang Hero.</p>
              </div>
              {isLoadingAdminData ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-40 overflow-y-auto bg-white p-3 rounded-2xl border border-slate-200 animate-pulse">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div key={n} className="rounded-xl border aspect-square bg-slate-200" />
                  ))}
                </div>
              ) : photos.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5 max-h-40 overflow-y-auto bg-white p-3 rounded-2xl border border-slate-200">
                  {photos.map((p) => {
                    const isAlreadyBackground = heroBackgrounds.some(bg => bg.foto === p.foto);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        disabled={isAlreadyBackground}
                        onClick={async () => {
                          await onAddBackground(p.foto);
                        }}
                        className={`relative rounded-xl overflow-hidden border aspect-square transition-all ${
                          isAlreadyBackground 
                            ? 'border-slate-200 opacity-45 cursor-not-allowed' 
                            : 'border-slate-250 hover:border-violet-500 hover:ring-2 hover:ring-violet-500/10 hover:scale-95 cursor-pointer'
                        }`}
                        title={isAlreadyBackground ? "Sudah terdaftar sebagai background" : "Jadikan background hero"}
                      >
                        <img src={p.foto} alt="Pustaka" className="w-full h-full object-cover" />
                        {isAlreadyBackground && (
                          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                            <Check className="w-4 h-4 text-white bg-slate-800 rounded-full p-0.5" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">Pustaka foto kosong. Silakan unggah foto di menu Pustaka Foto terlebih dahulu.</p>
              )}
            </div>

            {/* List Backgrounds */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">Daftar Background Hero ({heroBackgrounds.length})</h3>
              
              {heroBackgrounds.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {heroBackgrounds.map((bg) => (
                    <div key={bg.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                      <div className="relative aspect-video">
                        <img src={bg.foto} alt="Hero Background" className="w-full h-full object-cover" />
                        <div className="absolute top-2.5 right-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Hapus background ini?')) {
                                onDeleteBackground(bg.id);
                              }
                            }}
                            className="bg-red-500 hover:bg-red-650 text-white p-2 rounded-xl transition-all cursor-pointer shadow"
                            title="Hapus Background"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">Status</span>
                          <span className={`text-xs font-black mt-0.5 ${bg.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {bg.isActive ? 'Aktif (Slideshow)' : 'Nonaktif'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onToggleBackgroundActive(bg.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer outline-none ${
                            bg.isActive
                              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {bg.isActive ? 'Matikan' : 'Aktifkan'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-12 text-center rounded-3xl border border-slate-100 shadow-sm py-16 text-slate-400">
                  <div className="flex justify-center mb-3">
                    <Compass className="w-12 h-12 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-700 mt-2">Belum Ada Background Kustom</h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">Situs web saat ini menggunakan gambar background destinasi bawaan lokal. Unggah foto atau pilih dari pustaka di atas untuk memulai.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- MENU H: DATABASE AUTO-OPTIMIZER --- */}
        {activeSubMenu === 'optimizer' && (
          <div className="space-y-6 animate-fade-in text-slate-800">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-extrabold text-slate-800 font-heading flex items-center gap-2">
                <Database className="w-5 h-5 text-violet-600" />
                <span>Optimasi & Pemeliharaan Database</span>
              </h2>
              <p className="text-xs text-slate-500 font-sans">Kurangi ukuran file gambar Base64 lama di database untuk mempercepat pemuatan halaman website secara signifikan.</p>
            </div>

            {/* Scan Card Summary */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                    <span>Hasil Pemindaian Gambar</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">Menghitung jumlah gambar berukuran besar yang tersimpan langsung di database.</p>
                </div>
                {!optimizeStatus.running && (
                  <button
                    type="button"
                    onClick={runOptimization}
                    disabled={scanBloatedItems().length === 0}
                    className={`px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow ${
                      scanBloatedItems().length > 0
                        ? 'bg-gradient-to-r from-violet-600 to-orange-500 text-white hover:scale-[1.02] cursor-pointer'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
                  >
                    <span>Optimalkan Database</span>
                  </button>
                )}
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Gambar Sangat Besar</span>
                  <div className="text-2xl font-black text-slate-800 font-heading mt-1.5">
                    {scanBloatedItems().length} File
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Berkas gambar &gt;200 KB</span>
                </div>

                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Total Ukuran Database</span>
                  <div className="text-2xl font-black text-violet-600 font-heading mt-1.5">
                    {(scanBloatedItems().reduce((sum, item) => sum + item.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Hanya menghitung payload Base64</span>
                </div>

                <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">Potensi Penghematan</span>
                  <div className="text-2xl font-black text-emerald-600 font-heading mt-1.5">
                    {scanBloatedItems().length > 0 
                      ? `${(100 - (scanBloatedItems().length * 100000 / scanBloatedItems().reduce((sum, item) => sum + item.size, 0)) * 100).toFixed(0)}%`
                      : '0%'}
                  </div>
                  <span className="text-[10px] text-slate-500 font-sans mt-1">Estimasi kompresi JPEG ideal</span>
                </div>
              </div>

              {/* Progress Bar (Jika sedang berjalan) */}
              {optimizeStatus.running && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-violet-100 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-violet-600 animate-pulse flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-violet-600 rounded-full animate-ping"></span>
                      <span>Sedang memproses ({optimizeStatus.current} dari {optimizeStatus.total})...</span>
                    </span>
                    <span className="font-mono text-slate-700">{optimizeStatus.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-600 to-orange-500 h-full rounded-full transition-all duration-300" style={{ width: `${optimizeStatus.progress}%` }}></div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Telah menghemat: {(optimizeStatus.savingsBytes / 1024 / 1024).toFixed(2)} MB ruang penyimpanan.
                  </div>
                </div>
              )}

              {/* Large File List */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Daftar Berkas Terdeteksi</h4>
                {scanBloatedItems().length > 0 ? (
                  <div className="border border-slate-100 rounded-2xl divide-y divide-slate-100 overflow-hidden text-xs max-h-60 overflow-y-auto bg-slate-50/50">
                    {scanBloatedItems().map((item, idx) => (
                      <div key={idx} className="p-3.5 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors">
                        <div className="space-y-0.5">
                          <div className="font-extrabold text-slate-800">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {item.id} | Tipe: {item.type.toUpperCase()}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-500">{(item.size / 1024 / 1024).toFixed(2)} MB</div>
                          <div className="text-[9px] text-slate-400 font-sans">Terlalu Besar</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50/50 p-8 text-center rounded-2xl border border-slate-100 text-slate-400 text-xs">
                    ✔️ Selamat! Seluruh gambar di database telah terkompresi dengan baik. Tidak ada berkas lambat yang terdeteksi.
                  </div>
                )}
              </div>

              {/* Console Logs */}
              {optimizeStatus.log.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Log Aktivitas</h4>
                  <div className="bg-slate-900 text-slate-300 font-mono text-[10px] p-4 rounded-2xl h-40 overflow-y-auto space-y-1.5 scrollbar-thin leading-relaxed">
                    {optimizeStatus.log.map((line, idx) => (
                      <div key={idx} className={`${line.includes('❌') ? 'text-red-400' : line.includes('✔️') ? 'text-emerald-400' : line.includes('🎉') ? 'text-brand-400 font-bold' : ''}`}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* --- ALL MODALS AT THE ROOT LEVEL TO PREVENT STACKING CONTEXT BUGS --- */}
      {showBusModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 sm:p-6 md:p-10 z-[999] animate-fade-in">
          <form onSubmit={handleSaveBus} className="bg-white border border-slate-100 max-w-lg w-full rounded-3xl shadow-2xl my-4 sm:my-8 overflow-hidden animate-scale-up">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider font-heading">
                {editingBus ? 'Ubah Informasi Armada Bus' : 'Tambah Armada Bus Baru'}
              </h3>
              <button type="button" onClick={() => setShowBusModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold block">Kategori Armada *</label>
                  <select 
                    name="kategori" 
                    defaultValue={editingBus?.kategori || 'Big Bus'}
                    className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 outline-none focus:border-violet-500"
                  >
                    <option value="City Car">City Car</option>
                    <option value="Mini Bus">Mini Bus</option>
                    <option value="Medium Bus">Medium Bus</option>
                    <option value="Big Bus">Big Bus</option>
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

              {/* PHOTO INPUT WITH LOCAL DIRECT FILE UPLOAD, FALLBACK URL AND LIBRARY */}
              <div className="space-y-3 border border-dashed border-slate-200 p-4 rounded-2xl bg-slate-50">
                <span className="text-slate-700 font-extrabold block">Foto Ilustrasi Armada</span>

                {/* Opsi A: Pilih dari Pustaka Foto */}
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi A: Pilih dari Pustaka Foto ({photos.length})</span>
                  {photos.length > 0 ? (
                    <div className="grid grid-cols-5 gap-1.5 max-h-32 overflow-y-auto bg-white p-2 rounded-xl border border-slate-200">
                      {photos.map((p) => {
                        const isSelected = busImageBase64 === p.foto || (!busImageBase64 && editingBus?.foto === p.foto);
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setBusImageBase64(p.foto)}
                            className={`relative rounded-lg overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                              isSelected ? 'border-violet-600 ring-2 ring-violet-500/10 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                            }`}
                          >
                            <img src={p.foto} alt="Pustaka" className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-violet-600/20 flex items-center justify-center">
                                <Check className="w-4 h-4 text-violet-600 bg-white rounded-full p-0.5" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Pustaka foto kosong. Silakan unggah di menu Pustaka Foto terlebih dahulu atau pakai opsi di bawah.</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1">
                  {/* Option B: Direct File Upload */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi B: Upload Foto Baru</span>
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

                  {/* Option C: Tulis Link URL */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Opsi C: Tulis Link URL</span>
                    <input 
                      name="foto" 
                      type="url"
                      defaultValue={editingBus?.foto && !editingBus.foto.startsWith('data:') ? editingBus.foto : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          setBusImageBase64(e.target.value);
                        }
                      }}
                      placeholder="https://images.unsplash.com/..." 
                      className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-violet-500 font-mono text-[10px]" 
                    />
                  </div>
                </div>

                {/* Preview Image */}
                {(busImageBase64 || editingBus?.foto) && (
                  <div className="mt-2 flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200/50">
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
                        {busImageBase64 ? (busImageBase64.startsWith('data:') ? 'Unggahan Lokal (Base64) / Pustaka' : 'URL Eksternal') : 'Foto Bawaan'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBusImageBase64('')}
                      className="ml-auto text-slate-400 hover:text-red-500 p-1 text-[10px] transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-slate-600 font-bold block">Fasilitas Kabin *</label>

                {/* Preset toggle tags */}
                <div className="flex flex-wrap gap-1.5">
                  {FASILITAS_PRESET.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFitur(item)}
                      className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedFitur.includes(item)
                          ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-violet-400 hover:text-violet-600'
                      }`}
                    >
                      {selectedFitur.includes(item) && <Check className="w-3 h-3 inline-block mr-1" />}
                      {item}
                    </button>
                  ))}
                </div>

                {/* Add custom fasilitas */}
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={customFiturInput}
                    onChange={(e) => setCustomFiturInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomFitur(); } }}
                    placeholder="Tambah fasilitas lain..."
                    className="flex-1 bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 text-xs"
                  />
                  <button
                    type="button"
                    onClick={addCustomFitur}
                    className="bg-violet-100 hover:bg-violet-200 text-violet-700 font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah
                  </button>
                </div>

                {/* Selected summary */}
                {selectedFitur.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-wrap gap-1.5">
                    {selectedFitur.map((f) => (
                      <span key={f} className="bg-white border border-violet-200 text-violet-700 text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                        {f}
                        <button type="button" onClick={() => toggleFitur(f)} className="text-violet-400 hover:text-red-500 ml-0.5 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                {selectedFitur.length === 0 && (
                  <p className="text-[10px] text-slate-400 italic">Belum ada fasilitas dipilih. Klik tag di atas untuk menambahkan.</p>
                )}
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

      {showBlogModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 sm:p-6 md:p-10 z-[999] animate-fade-in">
          <form onSubmit={handleSaveBlog} className="bg-white border border-slate-100 max-w-2xl w-full rounded-3xl shadow-2xl my-4 sm:my-8 overflow-hidden animate-scale-up">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider font-heading">
                {editingBlog ? 'Edit Tulisan Jurnal Blog' : 'Tulis Artikel Blog Pariwisata Baru'}
              </h3>
              <button type="button" onClick={() => setShowBlogModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="w-5 h-5" />
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-slate-600 font-bold block">Nama Penulis *</label>
                  <input 
                    required 
                    name="penulis" 
                    defaultValue={editingBlog?.penulis || 'Kru Abbata Wisata'}
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

      {showBannerModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 sm:p-6 md:p-10 z-[999] animate-fade-in">
          <form onSubmit={handleSaveBanner} className="bg-white border border-slate-100 max-w-lg w-full rounded-3xl shadow-2xl my-4 sm:my-8 overflow-hidden animate-scale-up">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
  );
}
