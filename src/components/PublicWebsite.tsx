/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ShieldCheck, 
  Check, 
  Users, 
  Award, 
  MapPin, 
  Mail, 
  Send, 
  Calendar, 
  Wifi, 
  Tv, 
  ChevronRight, 
  ChevronDown,
  Compass, 
  ArrowUpRight,
  ArrowUp, 
  FileText,
  Search,
  Filter,
  CheckCircle,
  HelpCircle,
  Clock,
  Briefcase,
  Menu,
  X,
  Star,
  ThumbsUp,
  Sparkles
} from 'lucide-react';
import { BusArmada, BlogPost, AdBanner, ContactMessage } from '../types';

interface PublicWebsiteProps {
  buses: BusArmada[];
  blogs: BlogPost[];
  banners: AdBanner[];
  onAddMessage: (msg: ContactMessage) => void;
  onIncrementBannerClick: (bannerId: string) => void;
  onIncrementAnalytics: (type: 'views' | 'bookingDirect' | 'kontakFormSubmit') => void;
}

const partnerBrands = [
  {
    id: "mercedes",
    logo: (
      <div className="flex items-center gap-3">
        <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="12" x2="12" y2="3.5" />
          <line x1="12" y1="12" x2="4.5" y2="16.5" />
          <line x1="12" y1="12" x2="19.5" y2="16.5" />
        </svg>
        <span className="font-extrabold tracking-[0.12em] text-xs sm:text-sm font-sans leading-none">MERCEDES-BENZ</span>
      </div>
    )
  },
  {
    id: "scania",
    logo: (
      <div className="flex items-center gap-3">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 18h14M8 18v-4l-3-3 4-2 3-4 3 4 4 2-3 3v4" />
          <circle cx="12" cy="14" r="1.5" />
        </svg>
        <span className="font-black tracking-[0.22em] text-xs sm:text-sm font-sans leading-none">SCANIA</span>
      </div>
    )
  },
  {
    id: "volvo",
    logo: (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="13" r="6" />
          <path d="M16 5h4v4M15.5 8.5L20 5" />
        </svg>
        <span className="font-bold tracking-[0.18em] text-xs sm:text-sm font-serif leading-none">VOLVO</span>
      </div>
    )
  },
  {
    id: "adiputro",
    logo: (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 20L12 4l9 16M7 13h10" />
        </svg>
        <span className="font-black tracking-[0.08em] text-xs sm:text-sm font-mono lowercase">adiputro</span>
      </div>
    )
  },
  {
    id: "laksana",
    logo: (
      <div className="flex items-center gap-3">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 4h16v16H4zM4 12h16" />
        </svg>
        <span className="font-black italic tracking-widest text-xs sm:text-sm font-sans leading-none">LAKSANA</span>
      </div>
    )
  },
  {
    id: "tentrem",
    logo: (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2L2 22h20L12 2zM12 9v8" />
        </svg>
        <span className="font-black tracking-[0.22em] text-xs sm:text-sm font-sans leading-none">TENTREM</span>
      </div>
    )
  },
  {
    id: "jasaraharja",
    logo: (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-extrabold tracking-[0.12em] text-[10px] sm:text-xs font-sans leading-none">JASA RAHARJA</span>
      </div>
    )
  },
  {
    id: "kemenhub",
    logo: (
      <div className="flex items-center gap-2.5">
        <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 2v7M12 15v7M2 12h7M15 12h7" />
        </svg>
        <span className="font-extrabold tracking-[0.1em] text-[10px] sm:text-xs font-sans leading-none">KEMENHUB RI</span>
      </div>
    )
  }
];

export default function PublicWebsite({
  buses,
  blogs,
  banners,
  onAddMessage,
  onIncrementBannerClick,
  onIncrementAnalytics
}: PublicWebsiteProps) {
  const [currentSubPage, setCurrentSubPage] = useState<'home' | 'kategori' | 'tentang' | 'blog' | 'kontak'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Blog Detail state
  const [activeBlogDetail, setActiveBlogDetail] = useState<BlogPost | null>(null);
  
  // Fleet Detail modal state
  const [activeBusModal, setActiveBusModal] = useState<BusArmada | null>(null);

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll-to-top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form states
  const [contactForm, setContactForm] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    pesan: ''
  });
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  // Slideshow Hero Images (PREMIUM BUS VARIETY)
  const heroImages = [
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=90&w=1200", // Scania H9
    "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=90&w=1200", // Mercedes-Benz Tourismo
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=90&w=1200", // Luxury Bus Cabin VIP (Yacht lounge style)
    "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&q=90&w=1200"  // Double Decker
  ];

  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx(prev => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Scroll to top when navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [currentSubPage]);

  // Show/hide scroll-to-top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered buses
  const filteredBuses = buses.filter(bus => {
    const matchCategory = selectedCategory === 'Semua' || bus.kategori === selectedCategory;
    const matchSearch = bus.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          bus.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          bus.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const activeBanners = banners.filter(b => b.status === 'Aktif');
  const heroPromo = activeBanners.find(b => b.posisi === 'Hero Promo');
  const sidebarPromo = activeBanners.find(b => b.posisi === 'Sidebar Blog');

  // Trigger WhatsApp redirection
  const handleWhatsAppTrigger = (typeText: string) => {
    onIncrementAnalytics('bookingDirect');
    const waNumber = '6281234567890'; // Mock admin WA
    const preText = encodeURIComponent(`Halo Admin Abditransindo, saya mengunjungi website Anda dan ingin bertanya mengenai ${typeText}. Mohon dibantu info ketersediaan armada dan jadwal sewa.`);
    window.open(`https://wa.me/${waNumber}?text=${preText}`, '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.nama || !contactForm.telepon || !contactForm.pesan) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      nama: contactForm.nama,
      email: contactForm.email || 'tanpa.email@domain.com',
      telepon: contactForm.telepon,
      subjek: contactForm.subjek || 'Pertanyaan Sewa Bus Pariwisata',
      pesan: contactForm.pesan,
      tanggal: new Date().toISOString().slice(0, 16).replace('T', ' '),
      dibaca: false
    };

    onAddMessage(newMessage);
    onIncrementAnalytics('kontakFormSubmit');
    setShowFormSuccess(true);
    setContactForm({ nama: '', email: '', telepon: '', subjek: '', pesan: '' });

    setTimeout(() => {
      setShowFormSuccess(false);
    }, 5000);
  };

  return (
    <div className="font-sans min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-brand-500 selection:text-white relative overflow-hidden" id="public-website-view">
      
      {/* 0. UTILITY SLIM TOP BAR */}
      <div className="bg-navy-950 text-white/80 text-[11px] border-b border-navy-900/60 py-2.5 px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-400" />
              <span>Senin - Minggu: 08:00 - 21:00 WIB</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>Kramat Jati, Jakarta Timur</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:info@abditransindo.com" className="hover:text-brand-400 transition-colors">info@abditransindo.com</a>
            <span className="text-white/30">|</span>
            <span className="font-bold text-brand-400">HOTLINE: 0812-3456-7890</span>
          </div>
        </div>
      </div>

      {/* 1. PROFESSIONAL FIXED HEADER & NAVIGATION */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 z-50 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => { setCurrentSubPage('home'); setActiveBlogDetail(null); }}>
            <div className="bg-gradient-to-tr from-navy-900 to-navy-700 text-white p-2.5 rounded-xl flex items-center justify-center shadow-md border border-navy-800/40">
              <Compass className="w-6 h-6 text-brand-400 animate-spin" style={{ animationDuration: '40s' }} />
            </div>
            <div>
              <span className="font-black text-xl sm:text-2xl tracking-tight text-navy-950 block leading-none">
                ABDI<span className="text-brand-500">TRANSINDO</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-navy-450 block mt-1">
                Layanan Transportasi Pariwisata Premium
              </span>
            </div>
          </div>

          {/* Nav Items — Desktop */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-xl border border-slate-200/40">
            {[
              { id: 'home', label: 'Dashboard' },
              { id: 'kategori', label: 'Katalog' },
              { id: 'blog', label: 'Blog' },
              { id: 'kontak', label: 'Kontak Kami' },
              { id: 'tentang', label: 'Tentang Kami' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSubPage(item.id as any);
                  setActiveBlogDetail(null);
                  onIncrementAnalytics('views');
                }}
                className={`px-4.5 py-2.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                  currentSubPage === item.id 
                    ? 'bg-navy-900 text-white shadow-sm font-black' 
                    : 'text-navy-600 hover:text-navy-900 hover:bg-slate-250/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Hamburger Menu Toggle — Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-navy-800 hover:text-navy-950 p-2.5 rounded-xl hover:bg-slate-100 transition-colors outline-none border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Professional Call To Action WhatsApp Booking button */}
          <button
            onClick={() => handleWhatsAppTrigger('Penyewaan Umum')}
            className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white text-xs sm:text-sm font-extrabold px-4 sm:px-6 py-3 rounded-xl flex items-center gap-2 shadow-md shadow-brand-500/10 hover:shadow-brand-500/25 transition-all outline-none btn-shine"
            id="nav-booking-btn"
          >
            <Phone className="w-4 h-4 fill-white" />
            <span>Pesan Sekarang</span>
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR NAVIGATION */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] md:hidden">
          {/* Dark Overlay with fade-in */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          ></div>
          
          {/* Sidebar container with slide-in from the left */}
          <div className="fixed top-0 left-0 bottom-0 w-[290px] bg-white shadow-2xl flex flex-col z-50 border-r border-slate-200 animate-slide-right-custom">
            
            {/* Sidebar Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-navy-950 text-white p-2 rounded-lg">
                  <Compass className="w-5 h-5 text-brand-400" />
                </div>
                <span className="font-black text-base tracking-tight text-navy-950">
                  ABDI<span className="text-brand-500">TRANSINDO</span>
                </span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-all border border-slate-150"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Content Links */}
            <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-2">
              {[
                { id: 'home', label: 'Dashboard', icon: <Compass className="w-4 h-4" /> },
                { id: 'kategori', label: 'Katalog', icon: <Search className="w-4 h-4" /> },
                { id: 'blog', label: 'Blog', icon: <FileText className="w-4 h-4" /> },
                { id: 'kontak', label: 'Kontak Kami', icon: <Phone className="w-4 h-4" /> },
                { id: 'tentang', label: 'Tentang Kami', icon: <Award className="w-4 h-4" /> }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSubPage(item.id as any);
                    setActiveBlogDetail(null);
                    onIncrementAnalytics('views');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center gap-3.5 ${
                    currentSubPage === item.id
                      ? 'bg-navy-950 text-white shadow-md'
                      : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900 border border-transparent'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Sidebar Footer Call to Action */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppTrigger('Sidebar Mobile Call');
                }}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-black py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md uppercase tracking-wider transition-colors btn-shine"
              >
                <Phone className="w-3.5 h-3.5 fill-white" />
                <span>Pesan Sekarang</span>
              </button>
              <div className="text-center text-[9px] text-slate-400 mt-3 font-semibold">
                PT. Abditransindo Trans Nusantara
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* --- SUB-VIEW 1: HOMEPAGE --- */}
      {currentSubPage === 'home' && (
        <div className="animate-fade-in">
          
          {/* PROFESSIONAL DEEP NAVY HERO HEADER */}
          <header className="relative bg-navy-950 text-white min-h-[75vh] sm:min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden py-12 md:py-16">
            
            {/* Background Slideshow of Bus Images (constraint satisfied: photos as background of landing page) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              {heroImages.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  alt={`Bus Background-${idx}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${
                    idx === heroImageIdx ? 'opacity-55 scale-100' : 'opacity-0 scale-105'
                  }`}
                  style={{ transitionProperty: 'opacity, transform' }}
                  referrerPolicy="no-referrer"
                />
              ))}
              {/* Elegant overlay gradients for corporate text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/20 z-10"></div>
              <div className="absolute inset-0 bg-navy-950/15 z-10"></div>
              <div className="absolute inset-0 dot-pattern opacity-10 z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-30 flex flex-col md:flex-row items-center justify-between gap-12">
              
              {/* Left Column: Hero Text Copywriting & Actions */}
              <div className="w-full md:max-w-[55%] space-y-6 text-left relative z-10">
                
                <span className="bg-brand-500/15 border border-brand-400/25 text-brand-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest px-4.5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-inner">
                  <Award className="w-4 h-4 text-brand-400 animate-pulse" /> STANDAR PELAYANAN BINTANG LIMA
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-white">
                  Sewa Bus Pariwisata <span className="text-brand-400">Premium & Nyaman</span> Untuk Rombongan Anda
                </h1>

                <p className="text-navy-200 text-xs sm:text-sm md:text-base font-sans leading-relaxed max-w-xl">
                  Hadirkan kenyamanan berkelas tinggi dengan unit bus karoseri premium termewah. Wangi teh segar, kemudi andal ramah, suspensi udara super empuk, dan sistem hiburan terbaik untuk rute pariwisata nasional.
                </p>
                
                {/* Search Bar Block inside Landing Page to increase interaction */}
                <div className="bg-white p-3 rounded-2xl border border-navy-800/40 shadow-2xl max-w-xl space-y-3 sm:space-y-0 sm:flex items-center justify-between gap-2.5 transition-all duration-300">
                  <div className="flex-1 flex items-center gap-2 pl-2">
                    <Search className="text-navy-450 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Cari kapasitas kursi atau jenis karoseri..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-xs bg-transparent w-full focus:outline-none placeholder-slate-400 font-sans text-navy-950 font-bold"
                    />
                  </div>
                  <button 
                    onClick={() => { setCurrentSubPage('kategori'); onIncrementAnalytics('views'); }}
                    className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-white py-3.5 px-7 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-brand-500/10 active:scale-95 transition-all outline-none cursor-pointer btn-shine"
                  >
                    <Search className="w-3.5 h-3.5" /> Cari Bus Wisata
                  </button>
                </div>



              </div>

              {/* Right Column: Sleek Corporate Background Caption Indicator */}
              <div className="hidden md:flex flex-col gap-4 bg-navy-900/90 backdrop-blur-md p-6 rounded-2xl border border-navy-800/80 text-left z-25 max-w-[340px] shadow-[0_20px_50px_rgba(7,16,30,0.5)] justify-center animate-stagger-in select-none">
                <div className="flex items-center gap-2">
                  <span className="bg-brand-500 text-white font-extrabold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded">
                    Armada Tampil
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Live View</span>
                </div>
                
                <h4 className="font-black text-white text-sm sm:text-base tracking-tight transition-colors">
                  {heroImageIdx === 0 ? 'Scania Voyager H9 SHD' : 
                   heroImageIdx === 1 ? 'Mercedes-Benz Jetbus 5' : 
                   heroImageIdx === 2 ? 'VIP Lounge Cabin Class' : 
                   'Double Decker Legacy SR3'}
                </h4>
                
                <p className="text-[11px] text-navy-200 leading-relaxed font-sans">
                  {heroImageIdx === 0 ? 'Sasis premium bertenaga tinggi dengan suspensi balon udara ganda, AC Denso super dingin, serta toilet dalam kabin.' : 
                   heroImageIdx === 1 ? 'Model karoseri terlaris rilisan Adiputro terbaru dengan konfigurasi captain seat mewah dan suspensi empuk.' : 
                   heroImageIdx === 2 ? 'Layanan eksklusif dilengkapi sofa lounge melingkar santai, dispenser kopi teh otomatis, dan wireless karaoke.' : 
                   'Kapasitas angkut bertingkat super besar hingga 72 kursi penumpang dengan dek atas berlapis panorama kaca tembus pandang.'}
                </p>
                
                <div className="flex gap-1.5 pt-2 border-t border-navy-800/60 select-none">
                  {heroImages.map((_, idx) => (
                    <span 
                      key={idx} 
                      onClick={() => setHeroImageIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                        idx === heroImageIdx ? 'bg-brand-500 w-5 shadow-sm shadow-brand-500/40' : 'bg-navy-700 hover:bg-navy-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

            {/* Elegant wave divider bottom curve */}
            <div className="hero-wave-bottom">
              <svg viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 74H1440V12.187C1337.89 39.5663 1184.28 53.256 1024 53.256C717.387 53.256 462.613 0 0 0V74Z" fill="#f8fafc"/>
              </svg>
            </div>
          </header>

          {/* Active Promo Notice (Banner Management Integration) */}
          {heroPromo && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
              <div 
                onClick={() => {
                  onIncrementBannerClick(heroPromo.id);
                  const encodedText = encodeURIComponent(`Halo, saya tertarik dengan Promo: ${heroPromo.judul}`);
                  window.open(`https://wa.me/6281234567890?text=${encodedText}`, '_blank');
                }}
                className="bg-brand-50 text-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all relative overflow-hidden group"
              >
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/20 skew-x-12 opacity-30"></div>
                <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row z-10">
                  <div className="bg-brand-100 text-brand-600 p-3 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-brand-500 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-widest">Penawaran Eksklusif Terbatas</span>
                    <h3 className="font-extrabold text-base sm:text-lg text-navy-950 mt-0.5">{heroPromo.judul}</h3>
                    <p className="text-xs text-slate-550 font-sans mt-0.5">{heroPromo.deskripsi}</p>
                  </div>
                </div>
                <span className="bg-navy-900 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-4.5 py-3 rounded-lg flex items-center gap-1 shadow-sm group-hover:bg-navy-950 transition-colors z-10">
                  Ambil Promo <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </section>
          )}

          {/* 1. Keunggulan Layanan - Clean Borderless Running Marquee (Matching User's Mockup & Full Width Request) */}
          <section className="bg-white border-b border-slate-200/60 py-3 sm:py-4 relative z-10 select-none overflow-hidden animate-fade-in">
            <div className="animate-marquee flex gap-8 sm:gap-14 items-center">
              {/* Duplicate the items 3 times for a perfect seamless infinite loop */}
              {[1, 2, 3].map((loopIdx) => (
                <React.Fragment key={loopIdx}>
                  
                  {/* Item 1: Tidak Ada Biaya Tambahan */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path d="M12 6v12M15 9H11.5a2.5 2.5 0 0 0 0 5H13a2.5 2.5 0 0 1 0 5H8.5" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Tidak Ada Biaya Tambahan
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Biaya sudah termasuk tip, bbm, tol, dll
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Dibantu Oleh Customer Care */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path d="M15.5 8.5C14.5 7.5 13.2 7 12 7c-2.8 0-5 2.2-5 5v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H7.5" />
                        <path d="M16.5 12h-1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3" />
                        <text x="12" y="11.5" textAnchor="middle" fontSize="6.5px" className="font-extrabold fill-current stroke-none">24</text>
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Dibantu Oleh Customer Care
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Dibantu oleh customer care dari awal hingga akhir perjalanan
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Bebas Khawatir */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path d="M12 6c-2.2 0-4 1.8-4 4 0 3 4 7.5 4 7.5s4-4.5 4-7.5c0-2.2-1.8-4-4-4z" />
                        <circle cx="12" cy="9.5" r="1.2" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Bebas Khawatir
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Perjalanan Anda telah otomatis diasuransikan jika terjadi kecelakaan
                      </p>
                    </div>
                  </div>

                </React.Fragment>
              ))}
            </div>
          </section>

          {/* 2. Rekomendasi Armada Kami Section */}
          <section className="mt-0 mb-3 pt-5 pb-8 bg-slate-50 relative overflow-hidden border-b border-slate-200/60">
            <div className="absolute top-6 left-6 dot-pattern opacity-10 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 border-b border-slate-200 pb-3.5">
                <div>
                  <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase mb-2">REKOMENDASI ARMADA KAMI</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-none">Pilihan Bus Wisata Terbaik & Terpopuler</h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">Daftar armada bus pariwisata premium terlaris dengan penilaian tinggi dari pelanggan kami.</p>
                </div>
                <button
                  onClick={() => { setCurrentSubPage('kategori'); onIncrementAnalytics('views'); }}
                  className="text-xs font-black text-brand-500 hover:text-brand-600 flex items-center gap-1 group transition-colors cursor-pointer outline-none uppercase tracking-wider"
                >
                  Lihat Semua Katalog <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Grid with All buses */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {buses.map((bus) => (
                  <div 
                    key={bus.id} 
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                    onClick={() => setActiveBusModal(bus)}
                  >
                    {/* Unique Curved Image Frame */}
                    <div className="relative overflow-hidden aspect-[16/10] bg-slate-100">
                      <img
                        src={bus.foto}
                        alt={bus.nama}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute top-3 left-3 bg-navy-950 text-white font-bold text-[9px] px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                        {bus.kategori}
                      </div>
                      
                      <div className={`absolute top-3 right-3 font-bold text-[9px] px-2.5 py-0.5 rounded shadow-sm border ${
                        bus.status === 'Tersedia' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : bus.status === 'Disewa' 
                            ? 'bg-amber-50 text-amber-700 border-amber-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {bus.status}
                      </div>

                      <div className="absolute bottom-3 left-3 bg-white text-navy-950 font-extrabold text-[10px] px-2.5 py-1 rounded shadow-sm border border-slate-200">
                        Mulai <span className="text-brand-500">Rp {bus.hargaSewa.toLocaleString('id-ID')}</span> / Hari
                      </div>
                    </div>

                    {/* Content Section WITHOUT booking Buttons */}
                    <div className="p-5.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-navy-950 text-sm sm:text-base leading-snug group-hover:text-brand-500 transition-colors">
                          {bus.nama}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-sans">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>Kapasitas Kursi: <strong className="text-navy-950">{bus.kapasitas} Seat</strong></span>
                        </div>
                        
                        <p className="text-xs text-slate-500 mt-2 font-sans line-clamp-2 leading-relaxed">
                          {bus.deskripsi}
                        </p>
                      </div>

                      {/* Display beautiful facilities indicators */}
                      <div className="mt-3 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                        {bus.fitur.slice(0, 3).map((f, i) => (
                          <span key={i} className="bg-slate-50 border border-slate-200/50 text-slate-650 text-[9px] px-2.5 py-1 rounded font-medium">
                            {f}
                          </span>
                        ))}
                        {bus.fitur.length > 3 && (
                          <span className="text-[9px] text-brand-500 font-bold self-center pl-1.5 font-sans">
                            +{bus.fitur.length - 3} Lainnya
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-brand-500 italic font-bold mt-2.5 text-center flex items-center justify-center gap-1.5 group-hover:underline">
                        <Search className="w-3.5 h-3.5" /> Klik untuk detail lengkap armada
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Kategori Armada Section */}
          <section className="my-3 py-8 bg-white border-b border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 dot-pattern opacity-10 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
                <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">KATEGORI ARMADA</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Temukan Kelas Bus Wisata Anda</h2>
                <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
                <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">
                  Saring pilihan bus pariwisata yang tepat berdasarkan kapasitas rombongan dan kebutuhan fasilitas kabin Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Luxury",
                    title: "Luxury Sultan Class",
                    desc: "Konfigurasi captain seat premium, sofa lounge, dispenser otomatis, toilet eksklusif, & karaoke room.",
                    seats: "18 - 22 Seat",
                    price: "Rp 4.000.000",
                    icon: "👑",
                    foto: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=600",
                    filterVal: "Luxury"
                  },
                  {
                    name: "Big Bus",
                    title: "Big Bus Pariwisata",
                    desc: "Ideal untuk rombongan skala besar. Sasis berkapasitas tinggi, dek ganda/panoramik, smart TV ganda.",
                    seats: "47 - 59 Seat",
                    price: "Rp 3.000.000",
                    icon: "🚍",
                    foto: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=600",
                    filterVal: "Big Bus"
                  },
                  {
                    name: "Medium Bus",
                    title: "Medium Bus Executive",
                    desc: "Keseimbangan sempurna kelincahan di jalan pegunungan sempit dan kenyamanan suspensi udara ganda.",
                    seats: "31 - 35 Seat",
                    price: "Rp 1.800.000",
                    icon: "🚌",
                    foto: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=600",
                    filterVal: "Medium Bus"
                  },
                  {
                    name: "Micro Bus / Hiace",
                    title: "Micro Bus & Hiace VIP",
                    desc: "Sangat wangi & nyaman untuk rombongan keluarga kecil, dinas VIP kantor, penjemputan bandara cepat.",
                    seats: "14 - 19 Seat",
                    price: "Rp 1.200.000",
                    icon: "🚐",
                    foto: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600",
                    filterVal: "Micro Bus / Hiace"
                  }
                ].map((cat, idx) => (
                  <div 
                    key={idx}
                    onClick={() => {
                      setSelectedCategory(cat.filterVal);
                      setCurrentSubPage('kategori');
                      onIncrementAnalytics('views');
                    }}
                    className="bg-slate-50 rounded-2xl border border-slate-200 hover:border-brand-300 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    {/* Category Photo Frame with Hover Zoom */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                      <img 
                        src={cat.foto} 
                        alt={cat.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      {/* Floating Category Capsule Badge */}
                      <div className="absolute top-3 left-3 bg-brand-500/90 backdrop-blur-xs text-white font-black text-[9px] px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                        {cat.name}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-navy-950 text-sm sm:text-base group-hover:text-brand-500 transition-colors">
                          {cat.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-sans mt-1.5 leading-relaxed">
                          {cat.desc}
                        </p>
                      </div>
                      
                      <div className="mt-3.5 pt-2.5 border-t border-slate-200/60 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[10px] text-slate-450 font-sans">
                          <span>Kapasitas: <strong className="text-navy-950">{cat.seats}</strong></span>
                          <span>Mulai: <strong className="text-brand-500">{cat.price}</strong></span>
                        </div>
                        <span className="text-[10px] text-brand-500 font-extrabold uppercase tracking-wider mt-1.5 flex items-center gap-1 group-hover:underline justify-center">
                          Jelajahi Pilihan <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 4. Partner dan Mereka yang Sudah Menggunakan Layanan Kami Section */}
          <section className="my-3 py-8 relative overflow-hidden bg-slate-50 text-slate-800 border-y border-slate-200/60">
            {/* Beautiful Soft Scenic Background Image */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200" 
                alt="Scenic mountain road travel background"
                className="w-full h-full object-cover opacity-15"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-50/95 via-slate-50/80 to-slate-50/95"></div>
              <div className="absolute inset-0 dot-pattern opacity-5"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="text-center max-w-xl mx-auto space-y-3 mb-6">
                <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">MITRA & TESTIMONI KAMI</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Dipercaya Ribuan Penumpang & Instansi</h2>
                <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
                <p className="text-slate-550 text-xs sm:text-sm font-sans mt-3">
                  Dedikasi mutu pariwisata kami diakui secara nasional oleh ribuan pelanggan setia dan mitra resmi sasis-karoseri premium.
                </p>
              </div>

              {/* Monochromatic Borderless Partner Logos Marquee (floating directly on light scenic background!) */}
              <div className="overflow-hidden relative select-none py-4 border-b border-slate-200/80 mb-6">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
                
                <div className="animate-marquee flex gap-18 items-center">
                  {[...partnerBrands, ...partnerBrands, ...partnerBrands].map((partner, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center text-navy-900/40 hover:text-brand-500 transition-all duration-350 shrink-0 transform hover:scale-105"
                    >
                      {partner.logo}
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    nama: 'Drs. H. Mulyono', 
                    ulasan: 'Kami menyewa 4 unit Big Bus untuk acara Study Tour ke Bali. Drivernya sopan santun, laju AC dingin konstan sepanjang jalan tol Situbondo-Banyuwangi. Unit bersih wangi teh premium. Sangat berkelas!', 
                    keterangan: 'Plt Kepala SMA Negeri 3' 
                  },
                  { 
                    nama: 'Ibu Listiawati', 
                    ulasan: 'Untuk lamaran keluarga besar VIP di Pullman Bandung, Hiace Premio benar-benar menunjukan kelasnya. Captain seat empuk, dispenser kopi terisi penuh. CS WA sangat responsif memandu survei.', 
                    keterangan: 'Garnish Wedding Organizer' 
                  },
                  { 
                    nama: 'Bro Kevin', 
                    ulasan: 'Menempuh rute Basecamp pegunungan berliku sempit, Medium Bus voyager ini meluncur mantap berkat suspensi balon udara. Audio karaoke dual mic-nya kencang jernih menemani kami.', 
                    keterangan: 'Komunitas Pendakian Gunung' 
                  }
                ].map((testi, idx) => (
                  <div key={idx} className="bg-white p-6.5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between font-sans hover:border-brand-300 hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <div className="flex gap-1 mb-3 text-brand-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                        "{testi.ulasan}"
                      </p>
                    </div>
                    <div className="mt-3.5 pt-2 border-t border-slate-100">
                      <div className="font-extrabold text-navy-950 text-xs">{testi.nama}</div>
                      <div className="text-[10px] text-brand-500 mt-0.5 font-bold uppercase tracking-wider">{testi.keterangan}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* 5. Tentang Kami & Kenapa Harus Kami Section */}
          <section className="my-3 py-8 bg-white border-b border-slate-200/60 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 dot-pattern opacity-10 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
                <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">TENTANG KAMI</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Kenapa Harus Abditransindo?</h2>
                <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
                <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">
                  Profil dedikasi layanan angkutan bus pariwisata premium berbadan hukum PT resmi.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-extrabold text-navy-950">Mewujudkan Standar Transportasi Beretika</h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                    Didirikan sejak tahun 2012, Abditransindo mengawali kiprah dari penyedia armada penjemputan paroki sederhana. Bertekad meluruskan reputasi bisnis sewa bus di Indonesia yang kerap didera isu unit mogok atau kru tidak ramah, kami merombak pelayanan dengan mengadopsi standar baku mutu penanganan hotel berbintang.
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                    Kami bangga menyatakan bahwa seluruh armada kami diproduksi oleh karoseri legendaris Indonesia (Adiputro, Laksana, Tentrem) dan didukung sasis resmi bertenaga suspensi udara Mercedes-Benz dan Scania resmi bersertifikat uji kelayakan angkutan darat Kemenhub.
                  </p>
                  <button 
                    onClick={() => { setCurrentSubPage('tentang'); }}
                    className="text-xs font-black text-brand-500 hover:text-brand-600 flex items-center gap-1 group transition-colors cursor-pointer outline-none uppercase tracking-wider"
                  >
                    Profil Selengkapnya <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-250 aspect-video">
                  <img 
                    src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800" 
                    alt="Tentang PT Abditransindo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Dynamic Statistics Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { value: '14+', label: 'Tahun Pengalaman', color: 'text-navy-900' },
                  { value: '50+', label: 'Unit Armada Aktif', color: 'text-brand-500' },
                  { value: '12K+', label: 'Pelanggan Terlayani', color: 'text-navy-900' },
                  { value: '98%', label: 'Tingkat Kepuasan', color: 'text-brand-500' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 text-center shadow-sm">
                    <div className={`text-2xl sm:text-3xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Three Core Pillars Values (Kenapa Harus Kami) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 border-t border-slate-100 pt-6">
                <div className="bg-slate-50 p-5.5 rounded-xl border border-slate-150/60 text-center space-y-3 hover:shadow-md hover:border-brand-200 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-brand-500 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=150" 
                      alt="Safety Driver Icon" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-navy-950">Misi Keselamatan Utama</h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Kami menerapkan zero-tolerance policy terhadap supir yang mengemudi ugal-ugalan atau kelalaian pemeliharaan rem berkala.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-5.5 rounded-xl border border-slate-150/60 text-center space-y-3 hover:shadow-md hover:border-brand-200 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-brand-500 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150" 
                      alt="Contract Agreement Icon" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-navy-950">Keterbukaan Transparan</h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Semua kesepakatan tertulis resmi. Tidak ada biaya siluman tambahan dadakan di rest area atau parkir bus wisata.
                  </p>
                </div>
                
                <div className="bg-slate-50 p-5.5 rounded-xl border border-slate-150/60 text-center space-y-3 hover:shadow-md hover:border-brand-200 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-brand-500 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=150" 
                      alt="Empathy Hospitality Icon" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-navy-950">Empati Layanan Prima</h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">
                    Kru kami dilatih membiasakan menyapa ramah, menuntun rombongan lansia/anak sekolah, dan membantu angkat barang bawaan.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 6. Blog Section: Latest Blog Posts */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 bg-white border-b border-slate-200/60 my-3 relative overflow-hidden">
            <div className="absolute top-6 right-6 dot-pattern opacity-10 pointer-events-none w-32 h-32"></div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6 border-b border-slate-200 pb-3.5">
              <div>
                <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase mb-2">BLOG & TIPS TERBARU</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight leading-none">Jurnal Perjalanan & Panduan Wisata</h2>
                <p className="text-slate-550 text-xs sm:text-sm font-sans mt-3">Edukasi pariwisata terupdate yang dikurasi khusus oleh kru kami.</p>
              </div>
              <button
                onClick={() => { setCurrentSubPage('blog'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                className="text-xs font-black text-brand-500 hover:text-brand-600 flex items-center gap-1 group transition-colors cursor-pointer outline-none uppercase tracking-wider"
              >
                Lihat Semua Artikel <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.filter(b => b.status === 'Diterbitkan').slice(0, 3).map((blog) => (
                <div 
                  key={blog.id}
                  onClick={() => {
                    setCurrentSubPage('blog');
                    setActiveBlogDetail(blog);
                    blog.views += 1;
                    onIncrementAnalytics('views');
                  }}
                  className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                    <img 
                      src={blog.foto} 
                      alt={blog.judul} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-brand-500 text-white font-extrabold text-[8px] px-2.5 py-1.5 rounded-lg uppercase tracking-wider shadow-md">
                      Tips Perjalanan
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-450 font-sans mb-2">
                        <span className="font-extrabold text-brand-500 uppercase tracking-wider">{blog.penulis}</span>
                        <span>•</span>
                        <span>{blog.tanggal}</span>
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base leading-snug text-navy-950 group-hover:text-brand-500 transition-colors line-clamp-2">
                        {blog.judul}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-sans line-clamp-2">
                        {blog.ringkasan}
                      </p>
                    </div>
                    <span className="text-brand-500 text-xs font-black uppercase tracking-wider mt-4.5 block group-hover:underline">
                      Baca Selengkapnya ➜
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. FAQ Accordion Section — Interactive */}
          <section className="bg-white py-8 border-y border-slate-200 my-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 dot-pattern opacity-10 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
              
              <div className="text-center space-y-3 mb-8">
                <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">FAQ & BANTUAN INFORMASI</span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Tanya & Jawab Umum (FAQ)</h3>
                <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
                <p className="text-slate-500 text-xs font-sans mt-3">Beberapa jawaban singkat atas kebingungan prosedural calon pemesan bus sewaan.</p>
              </div>

              <div className="space-y-2.5">
                {[
                  { 
                    q: 'Apakah harga sewa bus di atas sudah mencakup biaya tol dan bbm?', 
                    a: 'Harga sewa awal yang tertera merupakan biaya sewa unit bus + jasa supir profesional. Biaya operasional seperti konsumsi solar BBM, restribusi gerbang tol, parkir objek wisata, serta uang makan supir ditanggung oleh pihak penyewa. Anda juga dapat memesan paket All-In (sudah include bbm & tol) dengan menghubungi admin via WA.' 
                  },
                  { 
                    q: 'Bagaimana prosedur dan syarat pemesanan unit di Abditransindo?', 
                    a: 'Sangat mudah! Silakan hubungi admin kami melalui tombol WhatsApp yang terletak di navigasi atas atau footer bawah. Infokan rencana rute, tanggal sewa, serta kapasitas seat. Setelah itu, bayar Down Payment (DP) sebesar 30% dari total sewa sebagai tanda jadi penguncian jadwal bus pariwisata Anda.' 
                  },
                  { 
                    q: 'Bagaimana kebijakan jika terjadi pembatalan sewa bus secara mendadak?', 
                    a: 'Pembatalan di atas H-7 dari tanggal keberangkatan akan dikenakan potongan sebesar 50% dari DP yang disetorkan. Namun, pembatalan di bawah H-3 keberangkatan mengakibatkan DP hangus sepenuhnya, karena unit bus pariwisata telah dipersiapkan dan diistirahatkan khusus untuk pesanan Anda.' 
                  },
                  { 
                    q: 'Berapa durasi waktu penggunaan bus dalam sehari sewa?', 
                    a: 'Batas pemakaian dalam kota maksimal adalah 12 jam pada hari yang sama. Sedangkan untuk rute perjalanan luar kota, batas penggunaan maksimal adalah 16 jam pada hari yang sama. Penggunaan melebihi batas waktu tersebut akan dikenakan biaya over-time sebesar 10% per jam dari tarif sewa harian.' 
                  },
                  { 
                    q: 'Apakah diperbolehkan melakukan survei unit bus fisik terlebih dahulu?', 
                    a: 'Tentu saja diperbolehkan dan sangat kami sarankan! Anda dapat melakukan survei kesiapan fisik unit langsung di pool kami pada jam operasional kerja. Silakan atur jadwal survei unit terlebih dahulu dengan menghubungi sales marketing kami via WhatsApp.' 
                  }
                ].map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`bg-slate-50 rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                      openFaqIdx === idx ? 'border-brand-300 bg-white shadow-md' : 'border-slate-200 hover:border-brand-200'
                    }`}
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  >
                    <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                      <h4 className="font-extrabold text-xs sm:text-sm text-navy-950 flex items-start gap-2.5 flex-1 leading-snug">
                        <span className={`font-black ${openFaqIdx === idx ? 'text-brand-500' : 'text-navy-500'}`}>Q.</span>
                        <span>{faq.q}</span>
                      </h4>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 faq-chevron ${
                        openFaqIdx === idx ? 'open text-brand-500' : ''
                      }`} />
                    </div>
                    <div className={`faq-answer ${openFaqIdx === idx ? 'open' : ''}`}>
                      <p className="text-[11px] sm:text-xs text-slate-550 px-4 sm:px-5 pb-4 sm:pb-5 pl-7 sm:pl-10 leading-relaxed font-sans border-t border-slate-100/50 pt-3">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </div>
      )}

      {/* --- SUB-VIEW 2: KATEGORI BUS (FULL CATALOG WITH TABS) --- */}
      {currentSubPage === 'kategori' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative z-10 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-48 h-48 dot-pattern opacity-10 pointer-events-none rounded-3xl"></div>
            
            <div className="text-center max-w-xl mx-auto space-y-3 mb-10 relative z-10">
              <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">PRODUCT SHOWCASE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Katalog Armada Bus Pariwisata</h2>
              <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
              <p className="text-slate-500 text-xs sm:text-sm font-sans">
                Pilih kapasitas kursi dan kenyamanan kabin bus pariwisata yang pas guna mengangkut rombongan kesayangan Anda.
              </p>
            </div>

            {/* Filter Categories Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 border-b border-slate-200 pb-px mb-10">
              {['Semua', 'Luxury', 'Big Bus', 'Medium Bus', 'Micro Bus / Hiace'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-3 rounded-t-xl text-xs font-bold uppercase transition-all tracking-wider border-t border-x ${
                    selectedCategory === cat
                      ? 'bg-navy-900 text-white border-navy-900 shadow-sm font-black'
                      : 'bg-white text-navy-600 hover:text-navy-950 border-transparent hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Catalog Bus Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <div 
                    key={bus.id} 
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                    onClick={() => setActiveBusModal(bus)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img 
                        src={bus.foto} 
                        alt={bus.nama} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      <div className="absolute top-3 left-3 bg-navy-950 text-white font-bold text-[9px] px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                        {bus.kategori}
                      </div>

                      <div className={`absolute top-3 right-3 font-bold text-[9px] px-2.5 py-0.5 rounded shadow-sm border ${
                        bus.status === 'Tersedia' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : bus.status === 'Disewa' 
                            ? 'bg-amber-50 text-amber-700 border-amber-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {bus.status}
                      </div>

                      <div className="absolute bottom-3 left-3 bg-white text-navy-950 font-extrabold text-[10px] px-2.5 py-1 rounded shadow-sm border border-slate-200">
                        Mulai <span className="text-brand-500">Rp {bus.hargaSewa.toLocaleString('id-ID')}</span> / Hari
                      </div>
                    </div>

                    {/* Body WITH NO BOOKING BUTTONS AS MANDATED */}
                    <div className="p-5.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-extrabold text-navy-950 text-sm sm:text-base leading-snug group-hover:text-brand-500 transition-colors">
                          {bus.nama}
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-sans">
                          <Users className="text-slate-400 w-4 h-4" />
                          <span>Kapasitas: <strong className="text-navy-950">{bus.kapasitas} Kursi Penumpang</strong></span>
                        </div>
                        
                        <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-sans line-clamp-2">
                          {bus.deskripsi}
                        </p>
                      </div>

                      <div className="mt-4.5 pt-3.5 border-t border-slate-100">
                        <div className="text-[10px] uppercase font-bold text-navy-450 tracking-wider mb-1.5">Fasilitas Bawaan:</div>
                        <div className="flex flex-wrap gap-1">
                          {bus.fitur.map((feature, idx) => (
                            <span key={idx} className="bg-slate-50 border border-slate-200/40 text-slate-600 text-[9px] px-2.5 py-0.5 rounded font-sans font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 text-center">
                        <span className="text-[10px] text-brand-500 font-bold transition-all group-hover:underline">
                          Lihat Spesifikasi Lengkap Rinci ➜
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-slate-50 p-12 text-center rounded-2xl border border-slate-200 shadow-inner py-16">
                  <Search className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="font-extrabold text-navy-950">Maaf, Unit Belum Tersedia</h3>
                  <p className="text-xs text-slate-500 font-sans mt-1">Kami belum mendapati armada dengan filter pencarian tersebut saat ini.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- SUB-VIEW 3: TENTANG KAMI --- */}
      {currentSubPage === 'tentang' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12">
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative z-10 backdrop-blur-md">
            <div className="absolute top-0 left-0 w-48 h-48 dot-pattern opacity-10 pointer-events-none rounded-3xl"></div>
            
            {/* Profile Header */}
            <div className="text-center space-y-3 relative z-10 border-b border-slate-200 pb-6 mb-8">
              <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">PROFIL COMPLIANCE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Tentang PT. Abditransindo Trans Nusantara</h2>
              <p className="text-slate-505 text-xs sm:text-sm font-sans max-w-lg mx-auto">
                Dedikasi belasan tahun menyediakan jasa transportasi pariwisata profesional terpercaya.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-navy-950">Mewujudkan Standar Transportasi Beretika</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                  Didirikan sejak tahun 2012, Abditransindo mengawali kiprah dari penyedia armada penjemputan paroki sederhana. Bertekad meluruskan reputasi bisnis sewa bus di Indonesia yang kerap didera isu unit mogok atau kru tidak ramah, kami merombak pelayanan dengan mengadopsi standar baku mutu penanganan hotel berbintang.
                </p>
                <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                  Kami bangga menyatakan bahwa seluruh armada kami diproduksi oleh karoseri legendaris Indonesia (Adiputro, Laksana, Tentrem) dan didukung sasis resmi bertenaga suspensi udara Mercedes-Benz dan Scania resmi bersertifikat uji kelayakan angkutan darat Kemenhub.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-250 aspect-video">
                <img 
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800" 
                  alt="Tentang PT Abditransindo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 mt-10">
              {[
                { value: '14+', label: 'Tahun Pengalaman', color: 'text-navy-900' },
                { value: '50+', label: 'Unit Armada Aktif', color: 'text-brand-500' },
                { value: '12K+', label: 'Pelanggan Terlayani', color: 'text-navy-900' },
                { value: '98%', label: 'Tingkat Kepuasan', color: 'text-brand-500' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 text-center shadow-sm animate-stagger-in" style={{ animationDelay: `${idx * 0.08}s` }}>
                  <div className={`text-2xl sm:text-3xl font-black ${stat.color} animate-count-up`}>{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10 mt-10 border-t border-slate-100 pt-10">
              
              <div className="bg-slate-50 p-5.5 rounded-xl border border-slate-150/60 text-center space-y-3">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-brand-500 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=150" 
                    alt="Safety Driver Icon" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-navy-950">Misi Keselamatan Utama</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Kami menerapkan zero-tolerance policy terhadap supir yang mengemudi ugal-ugalan atau kelalaian pemeliharaan rem berkala.
                </p>
              </div>
              
              <div className="bg-slate-50 p-5.5 rounded-xl border border-slate-150/60 text-center space-y-3">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-brand-500 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=150" 
                    alt="Contract Agreement Icon" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-navy-950">Keterbukaan Transparan</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Semua kesepakatan tertulis resmi. Tidak ada biaya siluman tambahan dadakan di rest area atau parkir bus wisata.
                </p>
              </div>
              
              <div className="bg-slate-50 p-5.5 rounded-xl border border-slate-150/60 text-center space-y-3">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-brand-500 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=150" 
                    alt="Empathy Hospitality Icon" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-extrabold text-sm sm:text-base text-navy-950">Empati Layanan Prima</h4>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  Kru kami dilatih membiasakan menyapa ramah, menuntun rombongan lansia/anak sekolah, dan membantu angkat barang bawaan.
                </p>
              </div>

            </div>

            {/* Legal Certification Cards */}
            <div className="bg-navy-950 text-white rounded-2xl p-6 sm:p-8 space-y-5 relative z-10 border border-navy-900 shadow-lg mt-10">
              <h4 className="text-sm font-extrabold tracking-widest text-brand-400 uppercase">Sertifikasi & Kepatuhan Perusahaan:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
                
                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 flex items-start gap-2.5">
                  <Check className="text-brand-400 w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Anggota KADIN Resmi</h5>
                    <p className="text-navy-300 text-[11px] mt-0.5">Asosiasi Kamar Dagang Resmi Nasional Indonesia.</p>
                  </div>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 flex items-start gap-2.5">
                  <Check className="text-brand-400 w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Asuransi Jasa Raharja</h5>
                    <p className="text-navy-300 text-[11px] mt-0.5">Setiap jiwa penumpang dilindungi perlindungan asuransi resmi.</p>
                  </div>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 flex items-start gap-2.5">
                  <Check className="text-brand-400 w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Izin KPS Kemenhub</h5>
                    <p className="text-navy-300 text-[11px] mt-0.5">Seluruh unit terdaftar secara legal pada Kartu Pengawasan Sewa.</p>
                  </div>
                </div>

                <div className="bg-navy-900 p-4 rounded-xl border border-navy-800 flex items-start gap-2.5">
                  <Check className="text-brand-400 w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-white">Sertifikasi Emisi Amdal</h5>
                    <p className="text-navy-300 text-[11px] mt-0.5">Menjamin kelayakan pembakaran sasis rendah polusi.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- SUB-VIEW 4: DYNAMIC BLOG SECTION WITH SIDEBAR PROMO (MANDATE DEMAND) --- */}
      {currentSubPage === 'blog' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in font-sans">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
            <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">EDUKASI PARIWISATA</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Tips Perjalanan & Berita Wisata</h2>
            <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
            <p className="text-slate-500 text-xs sm:text-sm">
              Inspirasi rute, tips menyewa bus pariwisata yang aman, serta jurnal pariwisata menarik yang dirangkum oleh kru kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: Articles List */}
            <div className="lg:col-span-8 space-y-8">
              {activeBlogDetail ? (
                /* Blog Detail Reading Sub-view */
                <article className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-scale-up">
                  <button 
                    onClick={() => setActiveBlogDetail(null)}
                    className="text-brand-500 text-xs font-black uppercase tracking-wider flex items-center gap-1 hover:text-brand-600 mb-2 transition-colors"
                  >
                    ← Kembali ke Daftar Tips
                  </button>

                  <div className="aspect-video w-full rounded-xl overflow-hidden relative bg-slate-100">
                    <img src={activeBlogDetail.foto} alt={activeBlogDetail.judul} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="bg-navy-950 text-white font-extrabold px-2.5 py-1 rounded uppercase text-[9px] tracking-wider">{activeBlogDetail.penulis}</span>
                      <span>•</span>
                      <span>{activeBlogDetail.tanggal}</span>
                      <span>•</span>
                      <span>{activeBlogDetail.views} Dibaca</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black text-navy-950 leading-tight">
                      {activeBlogDetail.judul}
                    </h1>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-655 leading-relaxed font-sans space-y-4 whitespace-pre-wrap border-t border-slate-100 pt-6">
                    {activeBlogDetail.konten}
                  </div>
                </article>
              ) : (
                /* List of Articles */
                <div className="space-y-6">
                  {blogs.filter(b => b.status === 'Diterbitkan').map((blog) => (
                    <div 
                      key={blog.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-5 cursor-pointer group"
                      onClick={() => {
                        setActiveBlogDetail(blog);
                        blog.views += 1;
                      }}
                    >
                      <div className="md:col-span-4 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100">
                        <img 
                          src={blog.foto} 
                          alt={blog.judul} 
                          className="w-full h-full object-cover group-hover:scale-105 duration-500" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="md:col-span-8 flex flex-col justify-between py-1">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="font-extrabold text-brand-500 uppercase tracking-wider">{blog.penulis}</span>
                            <span>•</span>
                            <span>{blog.tanggal}</span>
                          </div>
                          <h3 className="font-extrabold text-sm sm:text-base leading-snug text-navy-950 group-hover:text-brand-500 transition-colors">
                            {blog.judul}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">
                            {blog.ringkasan}
                          </p>
                        </div>
                        <span className="text-brand-500 text-xs font-black uppercase tracking-wider mt-3 block group-hover:underline">
                          Baca Selengkapnya...
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right side: Sidebar promotional ads panel (CRITICAL INTEGRATION) */}
            <div className="lg:col-span-4 space-y-6">
              {sidebarPromo ? (
                <div 
                  onClick={() => {
                    onIncrementBannerClick(sidebarPromo.id);
                    const linkText = encodeURIComponent(`Halo, saya melihat promo sidebar Anda: ${sidebarPromo.judul}`);
                    window.open(`https://wa.me/6281234567890?text=${linkText}`, '_blank');
                  }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md relative overflow-hidden group cursor-pointer text-center"
                >
                  <span className="bg-brand-500 text-white text-[8px] font-extrabold px-2.5 py-1 rounded uppercase absolute top-4 right-4 tracking-wider">
                    PROMO AKTIF
                  </span>
                  
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-50">
                    <img 
                      src={sidebarPromo.foto} 
                      alt={sidebarPromo.judul} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h4 className="font-extrabold text-sm text-navy-950 mt-4 leading-snug group-hover:text-brand-500 transition-colors">
                    {sidebarPromo.judul}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-2 leading-relaxed">
                    {sidebarPromo.deskripsi}
                  </p>

                  <button className="w-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-black py-3.5 rounded-lg mt-4.5 transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5" /> Hubungi WA Sales
                  </button>
                </div>
              ) : (
                <div className="bg-navy-950 text-white p-6 rounded-2xl text-center space-y-3 shadow-md">
                  <Compass className="w-10 h-10 text-brand-400 mx-auto animate-spin" style={{ animationDuration: '40s' }} />
                  <h4 className="font-black text-xs uppercase text-brand-400 tracking-wider">Armada Kami Siap Melayani</h4>
                  <p className="text-xs text-navy-200 leading-relaxed font-sans">
                    Dapatkan garansi harga rental sepadan dengan armada yang dipasang tanpa tarif tersembunyi.
                  </p>
                </div>
              )}

              {/* Tourism Advice Mini Widgets */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3 font-sans">
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-navy-900 pb-2.5 border-b border-slate-100">Tips Keselamatan Sewa</h4>
                <div className="space-y-3.5 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <strong>H-1 Keberangkatan:</strong> Pastikan Anda telah menukar kontak HP kru supir resmi yang bertugas demi kelancaran koordinasi titik penjemputan.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <strong>Toleransi Bagasi:</strong> Untuk tipe Big Bus pariwisata, kapasitas bagasi lambung muat hingga maksimal 5 motor matic atau 40 koper besar.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- SUB-VIEW 5: KONTAK KAMI (FUNCTIONAL CONTACT FORM) --- */}
      {currentSubPage === 'kontak' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-brand-500 font-extrabold text-xs uppercase tracking-widest block">HUBUNGI KAMI</span>
            <h2 className="text-3xl font-black text-navy-950">Saluran Komunikasi Pertanyaan</h2>
            <div className="w-12 h-1 brand-line mx-auto rounded-full mt-1.5"></div>
            <p className="text-slate-500 text-xs sm:text-sm">
              Silakan kirimkan pertanyaan atau permohonan penawaran harga kerjasama khusus institusi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Kontak */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-navy-950">Kirim Pesan Ke Kami</h3>
              
              {showFormSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-xs text-center flex flex-col items-center gap-2 animate-scale-up">
                  <Sparkles className="w-8 h-8 text-emerald-600 mb-1" />
                  <p className="font-extrabold">Formulir Pesan Berhasil Terkirim!</p>
                  <p className="font-sans text-slate-500 text-[11px] mt-0.5">
                    Tim administrasi Abditransindo akan segera meninjau pertanyaan Anda dan membalas melalui email / HP segera.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleFormSubmit} className="space-y-4.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={contactForm.nama}
                      onChange={(e) => setContactForm({...contactForm, nama: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Nomor HP / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Contoh: 08123456789"
                      value={contactForm.telepon}
                      onChange={(e) => setContactForm({...contactForm, telepon: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Alamat Email</label>
                    <input 
                      type="email" 
                      placeholder="Contoh: budi@gmail.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Subjek Pertanyaan</label>
                    <input 
                      type="text" 
                      placeholder="Contoh: Penawaran Sewa Bus Kantor"
                      value={contactForm.subjek}
                      onChange={(e) => setContactForm({...contactForm, subjek: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Isi Pesan Detail *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Contoh: Kami berencana menyewa 2 unit Big Bus untuk kantor ke Bandung tanggal 15-17 Juli 2026. Mohon informasi ketersediaan."
                    value={contactForm.pesan}
                    onChange={(e) => setContactForm({...contactForm, pesan: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none font-sans text-navy-950 font-medium"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs uppercase py-3.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/15 transition-all btn-shine"
                >
                  <Send className="w-3.5 h-3.5" /> Kirim Pesan Kontak
                </button>
              </form>
            </div>

            {/* Right Column: Physical Location Map Embed & Contacts info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-lg font-extrabold text-navy-950">Kantor Pusat Pool</h3>
                
                <div className="space-y-3.5 text-xs text-slate-600 font-sans">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="text-brand-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed">
                      Jalan Raya Wisata No. 582, Lantai 3, Kramat Jati, Jakarta Timur, DKI Jakarta, 13510.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="text-brand-500 w-5 h-5 flex-shrink-0" />
                    <span>info@abditransindo.com / sales@transnusantara.co.id</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="text-brand-500 w-5 h-5 flex-shrink-0" />
                    <span>Waktu Kerja: Senin - Minggu (08:00 - 21:00 WIB)</span>
                  </div>
                </div>

                {/* Google Maps Embed for real office location */}
                <div className="rounded-xl h-48 overflow-hidden border border-slate-200 shadow-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7685071280283!2d106.8709!3d-6.2834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKramat+Jati+Jakarta+Timur!5e0!3m2!1sid!2sid!4v1717148000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kantor Abditransindo"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. SPECIFIC BOTTOM ABDITRANSINDO WA FOOTER CALL-TO-ACTION (CONSTRAINT SATISFACTION) */}
      <footer className="bg-navy-950 text-white rounded-t-3xl pt-8 pb-4 px-4 sm:px-6 lg:px-8 mt-10 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto space-y-10 relative">
          
          {/* Main Footer Banner WA Action Box (PASTEL & ULTRA ELEGANT REDESIGN) */}
          <div className="bg-navy-900 border border-navy-800 text-slate-200 rounded-2xl p-5 sm:p-8 text-center space-y-4 max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white z-10 relative">
              Butuh Penawaran Rinci Sewa Bus? Chat WA Admin Kami!
            </h2>
            <p className="text-navy-200 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed z-10 relative">
              Tim customer service pariwisata kami siap meladeni negosiasi harga, request snack box, koordinasi rute penjemputan, hingga survei kelayakan unit fisik langsung di Pool Pool terdekat.
            </p>
            
            {/* EXCLUSIVE BOTTOM BUTTON (RESTRICTION COMPLIANCE) */}
            <div className="flex justify-center z-10 relative">
              <button
                onClick={() => handleWhatsAppTrigger('Pemesanan All-In')}
                className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-black text-xs sm:text-sm px-6 py-4 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-500/10 transition-all text-center uppercase tracking-wider btn-shine"
                id="footer-booking-btn"
              >
                <Phone className="w-4.5 h-4.5 fill-white text-white" />
                <span>Konsultasi WA Admin (Respon Cepat)</span>
              </button>
            </div>
          </div>

          {/* Regular Footer Links info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-navy-900 pt-6 text-xs font-sans text-navy-300">
            <div className="space-y-3.5">
              <h4 className="font-black text-sm text-white uppercase tracking-wider">Abditransindo</h4>
              <p className="leading-relaxed">
                Penyedia angkutan bus pariwisata premium berbadan hukum PT resmi. Mengedepankan keselamatan dan kebersihan di setiap perjalanan.
              </p>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-black text-sm text-brand-400 uppercase tracking-wider">Varian Armada</h4>
              <ul className="space-y-2 font-sans cursor-pointer text-navy-200">
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Luxury'); }} className="hover:text-white transition-colors">⭐ Sultan Luxury</li>
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Big Bus'); }} className="hover:text-white transition-colors">🚍 Big Bus HDD / SHD</li>
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Medium Bus'); }} className="hover:text-white transition-colors">🚌 Medium Bus Wisata</li>
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Micro Bus / Hiace'); }} className="hover:text-white transition-colors">🚐 Hiace Premio VIP</li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-black text-sm text-white uppercase tracking-wider">Menu Halaman</h4>
              <ul className="space-y-2 cursor-pointer text-navy-200">
                <li onClick={() => setCurrentSubPage('home')} className="hover:text-white transition-colors">Dashboard</li>
                <li onClick={() => setCurrentSubPage('kategori')} className="hover:text-white transition-colors">Katalog</li>
                <li onClick={() => setCurrentSubPage('blog')} className="hover:text-white transition-colors">Blog</li>
                <li onClick={() => setCurrentSubPage('kontak')} className="hover:text-white transition-colors">Kontak Kami</li>
                <li onClick={() => setCurrentSubPage('tentang')} className="hover:text-white transition-colors">Tentang Kami</li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-black text-xs uppercase tracking-widest text-navy-400">Pernyataan Izin</h4>
              <p className="leading-relaxed">
                Seluruh bus pariwisata yang kami operasikan telah mengantongi uji KIR berkala Kemenhub serta KP pariwisata yang aktif dan berizin legal.
              </p>
            </div>
          </div>

          <div className="border-t border-navy-900 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-navy-450 font-sans">
            <div>© 2026 PT. Abditransindo Trans Nusantara. Semua Hak Cipta Dilindungi.</div>
            <div>
              <a href="#/admin" className="hover:text-brand-400 transition-colors flex items-center gap-1 font-bold uppercase tracking-wider">
                🔑 Portal Admin
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- RENTING BUS MODAL SHEET DETAIL --- */}
      {activeBusModal && (
        <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-[999] animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl animate-scale-up p-5 sm:p-6 space-y-6 relative">
            <button 
              onClick={() => setActiveBusModal(null)}
              className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-lg sm:text-xl font-black text-navy-950 border-b border-slate-100 pb-3">
              Spesifikasi Lengkap Armada
            </h3>

            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={activeBusModal.foto} alt={activeBusModal.nama} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-navy-50 text-navy-900 text-[10px] font-extrabold px-2.5 py-1 rounded border border-navy-150 uppercase tracking-wider font-sans">
                  Kelas: {activeBusModal.kategori}
                </span>
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded border tracking-wider uppercase ${
                  activeBusModal.status === 'Tersedia' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                    : 'bg-amber-50 text-amber-700 border-amber-100'
                }`}>
                  {activeBusModal.status}
                </span>
              </div>
              <h2 className="text-xl font-black text-navy-950 leading-tight">
                {activeBusModal.nama}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-dashed border-slate-200 py-4 text-xs font-sans text-slate-655">
              <div>
                <span className="text-slate-400 block pb-0.5">Kapasitas Kursi</span>
                <strong className="text-navy-950">{activeBusModal.kapasitas} Penumpang</strong>
              </div>
              <div>
                <span className="text-slate-400 block pb-0.5">Suspensi Sasis</span>
                <strong className="text-navy-950">Air Suspension</strong>
              </div>
              <div>
                <span className="text-slate-400 block pb-0.5">Mulai Harga Sewa</span>
                <strong className="text-brand-500">Rp {activeBusModal.hargaSewa.toLocaleString('id-ID')} / hari</strong>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs uppercase font-extrabold text-navy-450 tracking-wider">Deskripsi Lengkap:</h4>
              <p className="text-xs sm:text-sm text-slate-550 font-sans leading-relaxed">
                {activeBusModal.deskripsi}
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs uppercase font-extrabold text-navy-450 tracking-wider">Fasilitas Cabin Bawaan:</h5>
              <div className="flex flex-wrap gap-1.5">
                {activeBusModal.fitur.map((feat, idx) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-700 text-xs px-2.5 py-1.5 rounded-lg font-sans font-medium">
                    ✨ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* MANDATE REMINDER: Inform user how to order but DO NOT show WA button here on individual cards */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-500 font-sans flex items-start gap-2.5">
              <HelpCircle className="text-slate-400 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Bagaimana cara menyewa unit {activeBusModal.nama} ini?</strong>
                <p className="mt-1 leading-relaxed">
                  Sesuai kebijakan kepuasan konsumen Abditransindo, kami menaruh tombol pemesanan WhatsApp langsung secara eksklusif hanya di navigasi teratas atau bagian footer terbawah halaman untuk menghindari resiko pemesanan ganda. Silakan tutup dialog ini lalu klik tombol pesan tersebut.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => setActiveBusModal(null)}
                className="bg-slate-100 text-slate-800 hover:bg-slate-200 font-extrabold text-xs py-2.5 px-6 rounded-lg transition-colors border border-slate-200"
              >
                Tutup Detail Spesifikasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scroll-to-Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-[998] bg-brand-500 hover:bg-brand-600 text-white p-3 rounded-full shadow-xl shadow-brand-500/20 active:scale-90 transition-all animate-slide-up"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
