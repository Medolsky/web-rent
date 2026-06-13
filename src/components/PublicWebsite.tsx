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
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Compass,
  ArrowUpRight,
  ArrowUp,
  ArrowLeft,
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
  Sparkles,
  Crown,
  Bus,
  Truck,
  CarFront,
  CheckCircle2,
  XCircle,
  Trophy,
  Zap
} from 'lucide-react';
import { BusArmada, BlogPost, AdBanner, ContactMessage, HeroBackground } from '../types';

import abbataLogo from '../../assets/image/profile/logo-abbata-baru.png';

// Import local partner logos uploaded by user
import pssiLogo from '../../assets/image/partner/pssi.png';
import satriaMudaLogo from '../../assets/image/partner/satria-muda.png';
import vopakLogo from '../../assets/image/partner/vopak.png';
import victoryBaliLogo from '../../assets/image/partner/victory-bali.jpeg';
import fajarPaperLogo from '../../assets/image/partner/fajar-paper.png';
import lintangTimurLogo from '../../assets/image/partner/lintang-timur.png';
import mastoeLogo from '../../assets/image/partner/mastoe-vip-jogja.png';

// Import local destination photos uploaded by user
import baliImg from '../../assets/image/destinasi/bali.jpg';
import borobudurImg from '../../assets/image/destinasi/borobudur.jpg';
import gunungImg from '../../assets/image/destinasi/gunung.jpg';
import prambananImg from '../../assets/image/destinasi/prambanan.jpg';
import rajaAmpatImg from '../../assets/image/destinasi/raja-ampat.jpg';

// Import local bus fleet photos uploaded by user
import bus31Seat from '../../assets/image/armada/bus-31-seat.png';
import bus35Seat from '../../assets/image/armada/bus-35-seat.png';
import bus50Seat from '../../assets/image/armada/bus-50-seat.jpg';
import bus59Seat from '../../assets/image/armada/bus-59-seat.png';
import elfLong from '../../assets/image/armada/elf-long.png';
import hiaceLuxury from '../../assets/image/armada/hiace-luxury.png';
import hiaceStandart from '../../assets/image/armada/hiace-standart.png';

// Premium Gold Ribbon "A" Logo component matching the corporate visual branding
const GoldenALogo: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Beautiful high-end 3D metallic golden gradients */}
        <linearGradient id="gold-primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8dbaa" />
          <stop offset="20%" stopColor="#c8a557" />
          <stop offset="50%" stopColor="#ba9445" />
          <stop offset="80%" stopColor="#96762e" />
          <stop offset="100%" stopColor="#6e541f" />
        </linearGradient>

        <linearGradient id="gold-bright" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4b876" />
          <stop offset="35%" stopColor="#c8a557" />
          <stop offset="70%" stopColor="#a27e36" />
          <stop offset="100%" stopColor="#6e541f" />
        </linearGradient>

        <linearGradient id="gold-dark" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#e2ce9f" />
          <stop offset="40%" stopColor="#ba9445" />
          <stop offset="75%" stopColor="#96762e" />
          <stop offset="100%" stopColor="#60491b" />
        </linearGradient>

        <filter id="gold-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#6e541f" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Dynamic letter "A" composed of stylized overlapping golden ribbons */}
      <g filter="url(#gold-glow)">
        {/* Left main ribbon leg - elegantly sweeping from base to top left, looping down */}
        <path
          d="M 120 420 C 130 380, 200 210, 240 130 C 265 80, 280 80, 290 100 C 305 130, 310 160, 310 190 C 280 180, 230 180, 180 230 C 140 270, 100 350, 70 415 C 68 420, 75 425, 80 423 C 95 415, 110 425, 120 420 Z"
          fill="url(#gold-primary)"
        />

        {/* Right swooping limb - forming the major diagonal ribbon support */}
        <path
          d="M 270 95 C 290 70, 335 150, 375 250 C 410 340, 440 400, 445 415 C 448 422, 440 425, 435 423 C 400 410, 360 350, 320 250 C 295 190, 275 125, 270 95 Z"
          fill="url(#gold-bright)"
        />

        {/* Inner swooping crossing ribbon - mimicking the beautiful fold effect of the logo */}
        <path
          d="M 160 215 C 220 170, 300 175, 380 240 C 383 243, 378 248, 374 246 C 300 190, 220 185, 162 230 C 158 233, 155 220, 160 215 Z"
          fill="url(#gold-bright)"
        />

        {/* Second lower overlapping ribbon layer */}
        <path
          d="M 130 310 C 190 240, 280 230, 370 305 C 373 308, 368 313, 364 311 C 280 245, 195 255, 135 325 C 131 330, 126 315, 130 310 Z"
          fill="url(#gold-dark)"
        />

        {/* Third lower subtle sweep at the base of the left fold */}
        <path
          d="M 90 380 C 140 310, 220 290, 305 345 C 308 347, 304 352, 300 350 C 220 300, 145 320, 95 390 C 91 395, 86 385, 90 380 Z"
          fill="url(#gold-primary)"
        />
      </g>
    </svg>
  );
};

interface PublicWebsiteProps {
  buses: BusArmada[];
  blogs: BlogPost[];
  banners: AdBanner[];
  heroBackgrounds?: HeroBackground[];
  onAddMessage: (msg: ContactMessage) => void;
  onIncrementBannerClick: (bannerId: string) => void;
  onIncrementAnalytics: (type: 'views' | 'bookingDirect' | 'kontakFormSubmit') => void;
}

const partnerBrands = [
  {
    id: "pssi",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={pssiLogo}
          alt="PSSI"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">PSSI</span>
      </div>
    )
  },
  {
    id: "satria-muda",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={satriaMudaLogo}
          alt="Satria Muda"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">SATRIA MUDA</span>
      </div>
    )
  },
  {
    id: "vopak",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={vopakLogo}
          alt="Vopak Jakarta"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">VOPAK JAKARTA</span>
      </div>
    )
  },
  {
    id: "victory-bali",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={victoryBaliLogo}
          alt="Victory Bali"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">VICTORY BALI</span>
      </div>
    )
  },
  {
    id: "fajar-paper",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={fajarPaperLogo}
          alt="Fajar Paper"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">FAJAR PAPER</span>
      </div>
    )
  },
  {
    id: "lintang-timur",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={lintangTimurLogo}
          alt="Lintang Timur"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">LINTANG TIMUR</span>
      </div>
    )
  },
  {
    id: "mastoe-vip",
    logo: (
      <div className="flex items-center gap-4">
        <img
          src={mastoeLogo}
          alt="Mastoe VIP Jogja"
          className="w-24 h-24 object-contain hover:scale-105 transition-transform"
        />
        <span className="font-black tracking-[0.08em] text-sm sm:text-base font-sans leading-none text-navy-950">MASTOE VIP JOGJA</span>
      </div>
    )
  }
];

export default function PublicWebsite({
  buses,
  blogs,
  banners,
  heroBackgrounds = [],
  onAddMessage,
  onIncrementBannerClick,
  onIncrementAnalytics
}: PublicWebsiteProps) {
  const [currentSubPage, setCurrentSubPage] = useState<'home' | 'kategori' | 'tentang' | 'blog' | 'kontak' | 'mitra'>('home');
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

  // Slideshow Hero Images (REAL INDONESIAN TOURIST DESTINATIONS SLIDESHOW)
  const activeBackgrounds = heroBackgrounds.filter(bg => bg.isActive).map(bg => bg.foto);
  const heroImages = activeBackgrounds.length > 0 ? activeBackgrounds : [
    baliImg,
    borobudurImg,
    gunungImg,
    prambananImg,
    rajaAmpatImg
  ];

  const [heroImageIdx, setHeroImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroImageIdx(prev => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    if (heroImageIdx >= heroImages.length) {
      setHeroImageIdx(0);
    }
  }, [heroImages.length, heroImageIdx]);

  // Track page view on initial load of the website
  useEffect(() => {
    onIncrementAnalytics('views');
  }, [onIncrementAnalytics]);

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

  // Dynamic categories metadata to only show categories that actually contain vehicles in catalog
  const categoryMetadata = [
    {
      name: "City Car",
      title: "City Car Premium",
      desc: "Kendaraan MPV & SUV lincah seperti Avanza, Innova Zenix, atau Pajero. Bersih, wangi, hemat BBM, cocok untuk keluarga kecil.",
      seats: "5 - 7 Seat",
      icon: <CarFront className="w-4 h-4" />,
      foto: hiaceStandart,
      filterVal: "City Car"
    },
    {
      name: "Mini Bus",
      title: "Mini Bus (Hiace & Elf)",
      desc: "Pilihan microbus VIP dengan suspensi empuk. Toyota Hiace Commuter/Premio dan Isuzu Elf Long.",
      seats: "11 - 19 Seat",
      icon: <CarFront className="w-4 h-4" />,
      foto: elfLong,
      filterVal: "Mini Bus"
    },
    {
      name: "Medium Bus",
      title: "Medium Bus Executive",
      desc: "Keseimbangan sempurna kelincahan di jalan pegunungan sempit dan kenyamanan suspensi udara ganda.",
      seats: "31 - 35 Seat",
      icon: <Truck className="w-4 h-4" />,
      foto: bus31Seat,
      filterVal: "Medium Bus"
    },
    {
      name: "Big Bus",
      title: "Big Bus Pariwisata",
      desc: "Ideal untuk rombongan skala besar. Sasis berkapasitas tinggi, dek ganda/panoramik, smart TV ganda.",
      seats: "47 - 59 Seat",
      icon: <Bus className="w-4 h-4" />,
      foto: bus50Seat,
      filterVal: "Big Bus"
    }
  ];

  const activeCategories = categoryMetadata.filter(cat =>
    buses.some(bus => bus.kategori === cat.filterVal)
  );

  const activeBanners = banners.filter(b => b.status === 'Aktif');
  const heroPromo = activeBanners.find(b => b.posisi === 'Hero Promo');
  const sidebarPromo = activeBanners.find(b => b.posisi === 'Sidebar Blog');

  // Trigger WhatsApp redirection
  const handleWhatsAppTrigger = (typeText: string) => {
    onIncrementAnalytics('bookingDirect');
    const waNumber = '628211588758'; // Real admin WA
    const preText = encodeURIComponent(`Halo Admin ABBATA WISATA, saya mengunjungi website Anda dan ingin bertanya mengenai ${typeText}. Mohon dibantu info ketersediaan armada dan jadwal sewa.`);
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

    // Forward the message to info.abditransindo@gmail.com via FormSubmit.co AJAX API
    fetch("https://formsubmit.co/ajax/info.abditransindo@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        Nama: contactForm.nama,
        Email: contactForm.email || 'tanpa.email@domain.com',
        Telepon: contactForm.telepon,
        Subjek: contactForm.subjek || 'Pertanyaan Sewa Bus Pariwisata',
        Pesan: contactForm.pesan,
        Tanggal_Kirim: newMessage.tanggal
      })
    })
      .then(res => res.json())
      .then(data => console.log("Form successfully forwarded to email:", data))
      .catch(err => console.error("Error forwarding form to email:", err));

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
              <span>Senin - Minggu: 08:00 - 17:00 WIB</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span>Pancoran, Jakarta Selatan</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:info.abditransindo@gmail.com" className="hover:text-brand-400 transition-colors">info.abditransindo@gmail.com</a>
            <span className="text-white/30">|</span>
            <span className="font-bold text-brand-400">HOTLINE: +62 821-1588-758</span>
          </div>
        </div>
      </div>

      {/* 1. JACKAL HOLIDAYS-STYLE DARK NAVBAR WITH DROPDOWNS */}
      <nav className="sticky top-0 bg-navy-950 z-50 transition-all shadow-lg border-b border-navy-900/60 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center cursor-pointer h-full py-1" onClick={() => { setCurrentSubPage('home'); setActiveBlogDetail(null); }}>
            <img src={abbataLogo} alt="ABBATA WISATA" className="h-full w-auto object-contain hover:scale-105 transition-transform" />
          </div>

          {/* Desktop Nav Items with Dropdowns */}
          <div className="hidden md:flex items-center gap-0.5">

            {/* Beranda — Simple Link */}
            <button
              onClick={() => { setCurrentSubPage('home'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
              className={`nav-link-simple ${currentSubPage === 'home' ? 'active' : ''}`}
            >
              Beranda
            </button>

            {/* Blog — Simple Link */}
            <button
              onClick={() => { setCurrentSubPage('blog'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
              className={`nav-link-simple ${currentSubPage === 'blog' ? 'active' : ''}`}
            >
              Blog
            </button>

            {/* Katalog — Dropdown with category filters */}
            <div className="nav-dropdown">
              <button className={`nav-dropdown-trigger ${currentSubPage === 'kategori' ? 'active' : ''}`}>
                Katalog
                <ChevronDown className="chevron-icon" />
              </button>
              <div className="nav-dropdown-menu">
                <button
                  onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Semua'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <Search className="item-icon" />
                  <span>Semua Armada</span>
                </button>
                <div className="nav-dropdown-divider"></div>
                <button
                  onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('City Car'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <CarFront className="item-icon" />
                  <span>City Car Premium</span>
                </button>
                <button
                  onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Mini Bus'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <CarFront className="item-icon" />
                  <span>Mini Bus (Hiace & Elf)</span>
                </button>
                <button
                  onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Medium Bus'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <Truck className="item-icon" />
                  <span>Medium Bus Executive</span>
                </button>
                <button
                  onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Big Bus'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <Bus className="item-icon" />
                  <span>Big Bus Pariwisata</span>
                </button>
              </div>
            </div>

            {/* Tentang Kami — Dropdown with Tentang Kami + Kontak Kami */}
            <div className="nav-dropdown">
              <button className={`nav-dropdown-trigger ${currentSubPage === 'tentang' || currentSubPage === 'kontak' ? 'active' : ''}`}>
                Tentang Kami
                <ChevronDown className="chevron-icon" />
              </button>
              <div className="nav-dropdown-menu">
                <button
                  onClick={() => { setCurrentSubPage('tentang'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <Award className="item-icon" />
                  <div>
                    <div className="font-bold text-sm">Tentang Kami</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">Profil & visi misi perusahaan</div>
                  </div>
                </button>
                <div className="nav-dropdown-divider"></div>
                <button
                  onClick={() => { setCurrentSubPage('kontak'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <Phone className="item-icon" />
                  <div>
                    <div className="font-bold text-sm">Kontak Kami</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">Hubungi & lokasi kantor</div>
                  </div>
                </button>
                <div className="nav-dropdown-divider"></div>
                <button
                  onClick={() => { setCurrentSubPage('mitra'); setActiveBlogDetail(null); onIncrementAnalytics('views'); }}
                  className="nav-dropdown-item"
                >
                  <Users className="item-icon" />
                  <div>
                    <div className="font-bold text-sm">Mitra & Testimoni</div>
                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">Kemitraan & ulasan pelanggan</div>
                  </div>
                </button>
              </div>
            </div>

            {/* CTA Button — Pesan Sekarang */}
            <div className="ml-3">
              <button
                onClick={() => handleWhatsAppTrigger('Navbar CTA Button')}
                className="nav-cta-btn btn-shine"
              >
                <Phone className="w-3.5 h-3.5 fill-navy-950 text-navy-950" />
                Pesan Sekarang
              </button>
            </div>
          </div>

          {/* Hamburger Menu Toggle — Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors outline-none border border-navy-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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

          {/* Sidebar container with dark theme */}
          <div className="fixed top-0 left-0 bottom-0 w-[290px] bg-navy-950 shadow-2xl flex flex-col z-50 border-r border-navy-800 animate-slide-right-custom">

            {/* Sidebar Header */}
            <div className="p-5 border-b border-navy-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={abbataLogo} alt="ABBATA WISATA" className="w-8 h-8 object-contain" />
                <span className="font-black text-base tracking-tight text-white">
                  ABBATA<span className="text-brand-400"> WISATA</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-navy-400 hover:text-white p-1.5 rounded-lg hover:bg-navy-800 transition-all border border-navy-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Content Links */}
            <div className="flex-1 overflow-y-auto py-4 px-4 flex flex-col gap-1.5">

              {/* Section Label: Navigasi */}
              <span className="text-[9px] font-extrabold text-brand-400 uppercase tracking-widest px-4 pt-2 pb-1.5">Navigasi</span>
              {[
                { id: 'home', label: 'Beranda', icon: <Compass className="w-4 h-4" /> },
                { id: 'blog', label: 'Blog', icon: <FileText className="w-4 h-4" /> },
                { id: 'kategori', label: 'Katalog Armada', icon: <Search className="w-4 h-4" /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSubPage(item.id as any);
                    setActiveBlogDetail(null);
                    onIncrementAnalytics('views');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3.5 ${currentSubPage === item.id
                    ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                    : 'text-navy-200 hover:bg-navy-900 hover:text-white border border-transparent'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Section Label: Tentang Kami */}
              <span className="text-[9px] font-extrabold text-brand-400 uppercase tracking-widest px-4 pt-4 pb-1.5">Tentang Kami</span>

              {[
                { id: 'tentang', label: 'Profil Perusahaan', icon: <Award className="w-4 h-4" /> },
                { id: 'kontak', label: 'Kontak Kami', icon: <Phone className="w-4 h-4" /> },
                { id: 'mitra', label: 'Mitra & Testimoni', icon: <Users className="w-4 h-4" /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSubPage(item.id as any);
                    setActiveBlogDetail(null);
                    onIncrementAnalytics('views');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3.5 ${currentSubPage === item.id
                    ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20'
                    : 'text-navy-200 hover:bg-navy-900 hover:text-white border border-transparent'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}

              {/* Section Label: Layanan */}
              <span className="text-[9px] font-extrabold text-brand-400 uppercase tracking-widest px-4 pt-4 pb-1.5">Layanan</span>

              {[
                { cat: 'City Car', label: 'City Car Premium', icon: <CarFront className="w-4 h-4" /> },
                { cat: 'Mini Bus', label: 'Mini Bus (Hiace & Elf)', icon: <CarFront className="w-4 h-4" /> },
                { cat: 'Medium Bus', label: 'Medium Bus Executive', icon: <Truck className="w-4 h-4" /> },
                { cat: 'Big Bus', label: 'Big Bus Pariwisata', icon: <Bus className="w-4 h-4" /> },
              ].map(item => (
                <button
                  key={item.cat}
                  onClick={() => {
                    setCurrentSubPage('kategori');
                    setSelectedCategory(item.cat);
                    setActiveBlogDetail(null);
                    onIncrementAnalytics('views');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-3.5 text-navy-300 hover:bg-navy-900 hover:text-white border border-transparent"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Sidebar Footer Call to Action */}
            <div className="p-4 border-t border-navy-800 bg-navy-900/50">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppTrigger('Sidebar Mobile Call');
                }}
                className="w-full bg-brand-500 hover:bg-brand-600 text-navy-950 text-xs font-black py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md uppercase tracking-wider transition-colors btn-shine"
              >
                <Phone className="w-3.5 h-3.5 fill-navy-950 text-navy-950" />
                <span>Pesan Sekarang</span>
              </button>
              <div className="text-center text-[9px] text-navy-500 mt-3 font-semibold">
                PT. ABDI BANGKIT TRANSPORTINDO
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- SUB-VIEW 1: HOMEPAGE --- */}
      {currentSubPage === 'home' && (
        <div className="animate-fade-in">

          {/* PROFESSIONAL DEEP NAVY HERO HEADER */}
          <header className="relative bg-navy-950 text-white md:aspect-[16/9] md:min-h-0 min-h-[75vh] sm:min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden py-12 md:py-16">

            {/* Background Slideshow of Destination Images (highly visible sliding background transition!) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
              <div
                className="flex h-full transition-transform duration-[1200ms] ease-in-out"
                style={{
                  width: `${heroImages.length * 100}%`,
                  transform: `translate3d(-${(heroImageIdx / heroImages.length) * 100}%, 0, 0)`,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden'
                }}
              >
                {heroImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${100 / heroImages.length}%` }}
                    className="h-full shrink-0 relative"
                  >
                    <img
                      src={imgUrl}
                      alt={`Destination Background-${idx}`}
                      className="w-full h-full object-cover opacity-85"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
              {/* Softened overlays for high visual clarity and excellent text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/50 to-navy-950/10 z-10"></div>
              <div className="absolute inset-0 bg-navy-950/5 z-10"></div>
              <div className="absolute inset-0 dot-pattern opacity-10 z-10"></div>
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-30 flex flex-col items-start gap-12">

              {/* Hero Text Copywriting & Actions */}
              <div className="w-full max-w-3xl lg:max-w-4xl space-y-6 text-left relative z-10">

                <span className="bg-brand-500/15 border border-brand-400/25 text-brand-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest px-4.5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-inner">
                  <Award className="w-4 h-4 text-brand-400 animate-pulse" /> BERGERAK DENGAN AMANAH, TUMBUH BERSAMA
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight leading-tight text-white">
                  One Stop Service <span className="text-brand-400">Transportation</span> Amanah & Profesional
                </h1>

                <p className="text-navy-200 text-xs sm:text-sm md:text-base font-sans leading-relaxed max-w-xl">
                  Dengan semangat "Bangkit Bersama" di era 3 generasi, kami hadir untuk menjadi perusahaan transportasi yang diterima oleh lintas generasi (Milenial, GenZ, Gen Alpha). Melayani Jabodetabek, Banten, Bandung, Semarang, Jogjakarta, Surabaya, Bali, Bandarlampung, dan Palembang.
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
                    className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-navy-950 py-3.5 px-7 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-brand-500/10 active:scale-95 transition-all outline-none cursor-pointer btn-shine"
                  >
                    <Search className="w-3.5 h-3.5 text-navy-950" /> Cari Bus Wisata
                  </button>
                </div>

              </div>

            </div>

            {/* Elegant wave divider bottom curve */}
            <div className="hero-wave-bottom">
              <svg viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0 74H1440V12.187C1337.89 39.5663 1184.28 53.256 1024 53.256C717.387 53.256 462.613 0 0 0V74Z" fill="#f8fafc" />
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
                  window.open(`https://wa.me/628211588758?text=${encodedText}`, '_blank');
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

                  {/* Item 1: Jangkauan Jawa Bali Sumatra */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Jawa, Bali & Sumatra
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Mempermudah penyewaan lintas pulau Jawa, Bali, Sumatra
                      </p>
                    </div>
                  </div>

                  {/* Item 2: Harga Kompetitif */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="12" y1="10" x2="12" y2="14" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Harga Stabil & Kompetitif
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Tarif stabil dan kompetitif dibanding harga pasaran
                      </p>
                    </div>
                  </div>

                  {/* Item 3: Pemesanan Cepat */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Pemesanan Cepat & Tepat
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Informasi ketersediaan unit yang jelas dan instan
                      </p>
                    </div>
                  </div>

                  {/* Item 4: Transaksi Aman */}
                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    <div className="text-navy-950 shrink-0">
                      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-navy-950 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div className="text-left font-sans">
                      <h4 className="font-black text-xs sm:text-sm text-navy-950 tracking-tight leading-tight">
                        Transaksi Aman & Profesional
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                        Bertransaksi dengan aman, terpercaya, dan berbadan hukum
                      </p>
                    </div>
                  </div>

                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Layanan Utama Section */}
          <section className="my-3 py-10 bg-slate-50 border-b border-slate-200/60 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-xl mx-auto space-y-3 mb-8">
                <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">LAYANAN ABBATA WISATA</span>
                <h2 className="text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">One Stop Service Transportation</h2>
                <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
                <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">
                  PT. ABDI BANGKIT TRANSPORTINDO melayani kebutuhan angkutan darat yang amanah, modern, dan profesional.
                </p>
              </div>              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Transportasi Pariwisata",
                    desc: (
                      <div className="space-y-1.5 text-center font-sans flex-1 flex flex-col items-center">
                        <span className="font-extrabold text-slate-700 block text-xs tracking-wider">Mulai:</span>
                        <ul className="space-y-1 text-slate-600 text-xs leading-relaxed font-sans">
                          <li>Minibus (Hiace standart, Hiace Premio, elf long)</li>
                          <li>Medium bus (kapasitas 31 seat dan 35 seat)</li>
                          <li>Bigbus (kapasitas 45-50 seat dan 59 Seat)</li>
                        </ul>
                      </div>
                    ),
                    icon: (
                      <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Shuttle dan Travel",
                    desc: (
                      <p className="text-xs text-slate-500 leading-relaxed font-sans text-center">

                      </p>
                    ),
                    icon: (
                      <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )
                  },
                  {
                    title: "Antar jemput karyawan (AJK)",
                    desc: (
                      <p className="text-xs text-slate-500 leading-relaxed font-sans text-center">
                        Layanan Operational perusahaan yang tepat waktu dan professional
                      </p>
                    ),
                    icon: (
                      <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )
                  },
                  {
                    title: "Event Dan Wedding Transport",
                    desc: (
                      <p className="text-xs text-slate-500 leading-relaxed font-sans text-center">
                        Transportasi khusus acara penting dan moment special
                      </p>
                    ),
                    icon: (
                      <svg className="w-10 h-10 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="service-card-premium group relative bg-white rounded-2xl border border-slate-200/80 hover:border-brand-400/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 flex flex-col font-sans overflow-hidden cursor-pointer"
                  >
                    {/* Top gradient accent bar (gold → green) */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-500 via-brand-300 to-navy-400 rounded-t-2xl z-10"></div>

                    {/* Decorative corner ornaments */}
                    <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-brand-300/50 rounded-tl-lg pointer-events-none transition-colors duration-300 group-hover:border-brand-400/80"></div>
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-brand-300/50 rounded-tr-lg pointer-events-none transition-colors duration-300 group-hover:border-brand-400/80"></div>
                    <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-navy-200/40 rounded-bl-lg pointer-events-none transition-colors duration-300 group-hover:border-navy-300/70"></div>
                    <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-navy-200/40 rounded-br-lg pointer-events-none transition-colors duration-300 group-hover:border-navy-300/70"></div>

                    {/* Subtle background dot pattern */}
                    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ba9445 0.8px, transparent 0.8px)', backgroundSize: '14px 14px' }}></div>

                    {/* Soft radial glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 via-transparent to-navy-50/0 group-hover:from-brand-50/40 group-hover:to-navy-50/30 transition-all duration-500 pointer-events-none"></div>

                    {/* Card content */}
                    <div className="relative z-10 p-5 sm:p-6 flex flex-col gap-3 flex-1 items-center text-center">
                      {/* Icon container with gold ring */}
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-50 to-white rounded-2xl flex items-center justify-center border-2 border-brand-200/70 shadow-md shadow-brand-100/30 shrink-0 group-hover:shadow-lg group-hover:shadow-brand-200/40 group-hover:border-brand-300 group-hover:scale-105 transition-all duration-300">
                        {item.icon}
                      </div>

                      {/* Title with decorative underline */}
                      <div className="space-y-2 flex-1 flex flex-col">
                        <h4 className="font-extrabold text-navy-950 text-sm sm:text-base leading-snug text-center group-hover:text-navy-800 transition-colors">{item.title}</h4>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-brand-400 to-brand-200 mx-auto rounded-full"></div>
                        <div className="font-sans text-center flex-1 flex flex-col justify-center items-center">{item.desc}</div>
                      </div>


                    </div>

                    {/* Bottom gold accent bar */}
                    <div className="h-1 bg-gradient-to-r from-navy-300/30 via-brand-400/50 to-navy-300/30 mt-auto"></div>
                  </div>
                ))}
              </div>
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
              </div>              {/* Grid with exactly 3 main categories as requested */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {buses.slice(0, 3).map((bus) => (
                  <div
                    key={bus.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(bus.kategori);
                      setCurrentSubPage('kategori');
                      onIncrementAnalytics('views');
                    }}
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

                      <div className="absolute top-3 right-3 font-bold text-[9px] px-2.5 py-0.5 rounded shadow-sm border bg-emerald-50 text-emerald-700 border-emerald-100">
                        {bus.status}
                      </div>


                    </div>

                    {/* Content Section */}
                    <div className="p-5.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-extrabold text-navy-950 text-sm sm:text-base leading-snug group-hover:text-brand-500 transition-colors text-left">
                          {bus.nama}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500 font-sans justify-start">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>Kapasitas Kursi: <strong className="text-navy-950">{bus.kapasitas}</strong></span>
                        </div>

                        <p className="text-xs text-slate-500 mt-2 font-sans line-clamp-3 leading-relaxed text-left">
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
                      <span className="text-[10px] text-brand-500 italic font-bold mt-2.5 text-center flex items-center justify-center gap-1.5 group-hover:underline font-sans">
                        <Search className="w-3.5 h-3.5" /> Jelajahi di Katalog
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
                {activeCategories.map((cat, idx) => (
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
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Kenapa Harus ABDI TRANSINDO?</h2>
                <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
                <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">
                  Profil dedikasi layanan transportasi yang amanah, modern, dan profesional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-lg font-extrabold text-navy-950">Bergerak Dengan Amanah, Tumbuh Bersama</h3>
                  <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                    Dengan semangat “Bangkit Bersama” di era 3 generasi, kami hadir untuk menjadi perusahaan transportasi yang diterima oleh lintas generasi (Milenial, GenZ, Gen Alpha) dengan mengedepankan nilai Amanah, Modern, dan Profesional.
                  </p>
                  <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                    ABDI Transindo menyediakan jasa layanan *one stop service transportation* di wilayah kerja Jabodetabek, Banten, Bandung, Semarang, Jogjakarta, Surabaya, Bali, Bandarlampung, hingga Palembang dengan jaminan keamanan transaksi resmi.
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
                    alt="Tentang PT ABDI BANGKIT TRANSPORTINDO"
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
                      Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5 inline-block" />
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
                    q: 'Bagaimana prosedur dan syarat pemesanan unit di Abbata Wisata?',
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
                    className={`bg-slate-50 rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${openFaqIdx === idx ? 'border-brand-300 bg-white shadow-md' : 'border-slate-200 hover:border-brand-200'
                      }`}
                    onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  >
                    <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
                      <h4 className="font-extrabold text-xs sm:text-sm text-navy-950 flex items-start gap-2.5 flex-1 leading-snug">
                        <span className={`font-black ${openFaqIdx === idx ? 'text-brand-500' : 'text-navy-500'}`}>Q.</span>
                        <span>{faq.q}</span>
                      </h4>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 faq-chevron ${openFaqIdx === idx ? 'open text-brand-500' : ''
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

            <div className="text-center max-w-xl mx-auto space-y-3 mb-8 relative z-10">
              <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">PRODUCT SHOWCASE</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">Katalog Armada Bus Pariwisata</h2>
              <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
              <p className="text-slate-550 text-xs sm:text-sm font-sans">
                Pilih kapasitas kursi dan kenyamanan kabin bus pariwisata yang pas guna mengangkut rombongan kesayangan Anda.
              </p>
            </div>

            {/* Search Input on Katalog Page */}
            <div className="max-w-md mx-auto mb-8 relative z-10">
              <div className="bg-slate-50 border border-slate-250 p-2.5 rounded-2xl flex items-center justify-between gap-2 shadow-inner focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-500/10 transition-all">
                <div className="flex-1 flex items-center gap-2 pl-2">
                  <Search className="text-navy-700 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Cari nama bus, fasilitas, atau kapasitas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs bg-transparent w-full focus:outline-none placeholder-slate-400 font-sans text-navy-950 font-bold"
                  />
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 hover:bg-slate-200/60 rounded-full text-slate-450 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="text-center mt-2.5 text-[10px] text-slate-500 font-sans">
                  Menampilkan hasil untuk: <strong className="text-navy-950">"{searchQuery}"</strong>
                </div>
              )}
            </div>

            {/* Filter Categories Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 border-b border-slate-200 pb-px mb-10">
              {['Semua', 'City Car', 'Mini Bus', 'Medium Bus', 'Big Bus'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-3 rounded-t-xl text-xs font-bold uppercase transition-all tracking-wider border-t border-x ${selectedCategory === cat
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

                      <div className={`absolute top-3 right-3 font-bold text-[9px] px-2.5 py-0.5 rounded shadow-sm border ${bus.status === 'Tersedia'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                        : bus.status === 'Disewa'
                          ? 'bg-amber-50 text-amber-700 border-amber-100'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                        {bus.status}
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
                          Lihat Spesifikasi Lengkap Rinci <ChevronRight className="w-3 h-3 inline-block" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-slate-50 p-12 text-center rounded-2xl border border-slate-200 shadow-inner py-16 space-y-4">
                  <Search className="w-12 h-12 text-slate-400 mx-auto" />
                  <div>
                    <h3 className="font-extrabold text-navy-950">Maaf, Unit Belum Tersedia</h3>
                    <p className="text-xs text-slate-500 font-sans mt-1">Kami belum mendapati armada dengan filter pencarian tersebut saat ini.</p>
                  </div>
                  {(searchQuery || selectedCategory !== 'Semua') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('Semua');
                      }}
                      className="bg-navy-900 hover:bg-navy-950 text-white font-extrabold text-xs px-4.5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center justify-center gap-1.5"
                    >
                      Reset Filter & Pencarian
                    </button>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- SUB-VIEW 3: TENTANG KAMI --- */}
      {currentSubPage === 'tentang' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12">

          {/* Company Intro Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 dot-pattern opacity-10 pointer-events-none rounded-3xl"></div>

            {/* Profile Header */}
            <div className="text-center space-y-3 relative z-10 border-b border-slate-200 pb-6 mb-8">
              <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">PROFIL PERUSAHAAN</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-950 tracking-tight">PT. ABDI BANGKIT TRANSPORTINDO</h2>
              <p className="text-brand-500 text-xs sm:text-sm font-extrabold uppercase tracking-widest max-w-xl mx-auto italic">
                "Bergerak Dengan Amanah, Tumbuh Bersama Umat"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-navy-950">Kenali ABDI TRANSINDO</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                  Dengan semangat <strong>“Bangkit Bersama”</strong> di era 3 generasi, kami hadir untuk menjadi perusahaan transportasi yang diterima oleh lintas generasi (Milenial, GenZ, Gen Alpha) dengan amanah, modern, dan profesional.
                </p>
                <p className="text-xs sm:text-sm font-sans text-slate-550 leading-relaxed">
                  ABDI Transindo menyediakan jasa layanan *one stop service transportation* di wilayah kerja Jabodetabek, Banten, Bandung, Semarang, Jogjakarta, Surabaya, Bali, Bandarlampung, hingga Palembang. Kami berkomitmen untuk selalu menghadirkan pelayanan terbaik, amanah, dan terpercaya bagi masyarakat Indonesia.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md border border-slate-250 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=800"
                  alt="Tentang PT ABDI BANGKIT TRANSPORTINDO"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Visi & Misi Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi Card */}
            <div className="bg-navy-950 text-white rounded-3xl p-8 border border-navy-900 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center border border-brand-500/25">
                  <Compass className="w-6 h-6 text-brand-400" />
                </div>
                <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block">VISI UTAMA</span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">Visi Kami</h3>
                <p className="text-sm sm:text-base text-navy-200 font-medium leading-relaxed italic border-l-4 border-brand-500 pl-4 py-2 bg-navy-900/50 rounded-r-xl">
                  "Menjadi perusahaan transportasi terpercaya di masyarakat Indonesia."
                </p>
              </div>
              <div className="text-[10px] text-navy-450 uppercase font-mono tracking-wider pt-6 border-t border-navy-900 mt-6">
                PT. ABDI BANGKIT TRANSPORTINDO
              </div>
            </div>

            {/* Misi Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-widest block">MISI OPERASIONAL</span>
                <h3 className="text-2xl font-black text-navy-950">Misi Kami</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Memberikan layanan transportasi yang aman, nyaman, dan tepat waktu.",
                  "Mengutamakan akhlak, etika pelayanan, dan kejujuran dalam operasional sehari-hari.",
                  "Menjadi perusahaan yang membawa manfaat ekonomi bagi mitra kerja dan masyarakat sekitar.",
                  "Membangun & tumbuh bersama menciptakan budaya ABDI (Amanah, Berkualitas, Disiplin, Ikhlas Melayani)."
                ].map((misi, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm font-sans text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center border border-brand-100 shrink-0 text-brand-500 font-extrabold text-xs">
                      {idx + 1}
                    </div>
                    <p className="leading-relaxed pt-0.5">{misi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layanan Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-widest block">CAKUPAN OPERASIONAL</span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950">Layanan Terbaik Kami</h3>
              <p className="text-xs text-slate-500 font-sans">Menyediakan jasa layanan transportasi darat berkualitas tinggi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "1. Transportasi Pariwisata",
                  desc: "Mulai:",
                  items: [
                    "Minibus ( Hiace standart, Hiace Premio , elf long )",
                    "Medium bus ( kapasitas 31 seat dan 35 seat )",
                    "Bigbus (kapasitas 45-50 seat dan 59 Seat )"
                  ]
                },
                {
                  title: "2. Shuttle dan Travel",
                  desc: "Layanan Antar kota wilayah Jabodetabek ,bandarlampung,Metro,bandarjaya,Palembang",
                  items: []
                },
                {
                  title: "3. Antar jemput karyawan (AJK)",
                  desc: "Layanan Operational perusahaan yang tepat waktu dan professional",
                  items: []
                },
                {
                  title: "4. Event Dan Wedding Transport",
                  desc: "Transportasi khusus acara penting dan moment special",
                  items: []
                }
              ].map((layanan, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 space-y-3">
                  <h4 className="font-extrabold text-navy-950 text-sm sm:text-base leading-snug">{layanan.title}</h4>
                  <p className="text-xs text-slate-500 font-sans leading-relaxed">{layanan.desc}</p>
                  {layanan.items.length > 0 && (
                    <ul className="space-y-1.5 pl-4 text-xs font-sans text-slate-600 list-disc">
                      {layanan.items.map((it, i) => (
                        <li key={i}>{it}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Keunggulan Section */}
          <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-navy-900 shadow-xl space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-extrabold text-brand-400 uppercase tracking-widest block">NILAI LEBIH KAMI</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Mengapa Memilih Kami?</h3>
              <p className="text-xs text-navy-300 font-sans">Komitmen keunggulan untuk memastikan kepuasan setiap perjalanan.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Jangkauan Luas",
                  desc: "Mempermudah penyewaan jasa layanan transportasi terintegrasi di seluruh wilayah Jawa, Bali, dan Sumatra."
                },
                {
                  title: "Harga Kompetitif",
                  desc: "Tarif stabil dan sangat kompetitif dari harga pasaran umum dengan kualitas unit tetap premium."
                },
                {
                  title: "Pemesanan Cepat",
                  desc: "Informasi ketersediaan unit disajikan secara jelas, cepat, transparan, dan tepat sasaran."
                },
                {
                  title: "Transaksi Aman",
                  desc: "Jaminan transaksi aman, resmi di bawah payung hukum PT, terpercaya, dan profesional."
                }
              ].map((keunggulan, idx) => (
                <div key={idx} className="bg-navy-900 p-5 rounded-2xl border border-navy-800 space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm text-white">{keunggulan.title}</h4>
                  <p className="text-[11px] text-navy-300 leading-relaxed font-sans">{keunggulan.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kerjasama & Klien Kami Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-widest block">KEMITRAAN & REPUTASI</span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-950">Klien & Kerjasama Kami</h3>
              <p className="text-xs text-slate-500 font-sans">Telah dipercaya oleh berbagai instansi nasional, klub olahraga, dan perusahaan terkemuka.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "PSSI",
                  desc: "Persatuan Sepak Bola Seluruh Indonesia",
                  logo: pssiLogo
                },
                {
                  name: "Satria Britama",
                  desc: "Kemitraan Transportasi Olahraga",
                  logo: satriaMudaLogo
                },
                {
                  name: "Vopak Jakarta",
                  desc: "Layanan Angkutan Karyawan",
                  logo: vopakLogo
                },
                {
                  name: "Victory Bali",
                  desc: "Transportasi Event Pariwisata",
                  logo: victoryBaliLogo
                },
                {
                  name: "Fajar Paper Jakarta",
                  desc: "Layanan Shuttle Perusahaan",
                  logo: fajarPaperLogo
                },
                {
                  name: "Lintang Timur",
                  desc: "Kemitraan Perjalanan & Niaga",
                  logo: lintangTimurLogo
                },
                {
                  name: "Masatoe VIP Jogja",
                  desc: "Akomodasi Perjalanan VIP",
                  logo: mastoeLogo
                },
                {
                  name: "Mahkota Surabaya",
                  desc: "Kemitraan Logistik & Transport",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Crown_of_a_King.svg/240px-Crown_of_a_King.svg.png"
                }
              ].map((klien, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-brand-300 hover:shadow-md text-center transition-all duration-300 flex flex-col justify-between items-center gap-2 min-h-[175px]">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm p-2.5 transition-transform hover:scale-105">
                    <img
                      src={klien.logo}
                      alt={`Logo ${klien.name}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback to text initials if image fails to load
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentNode;
                        if (parent && !parent.querySelector('.fallback-initial')) {
                          const fallback = document.createElement('span');
                          fallback.className = "fallback-initial font-black text-brand-500 text-sm";
                          fallback.innerText = klien.name.charAt(0);
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm">{klien.name}</h4>
                    <p className="text-[9px] text-slate-400 font-sans mt-0.5">{klien.desc}</p>
                  </div>
                </div>
              ))}
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
                    <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Daftar Tips
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
                    window.open(`https://wa.me/628211588758?text=${linkText}`, '_blank');
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

                  <button className="w-full bg-brand-500 hover:bg-brand-600 text-navy-950 text-xs font-black py-3.5 rounded-lg mt-4.5 transition-colors flex items-center justify-center gap-1.5 uppercase tracking-wider">
                    <Phone className="w-3.5 h-3.5 fill-navy-950 text-navy-950" /> Hubungi WA Sales
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

      {/* --- SUB-VIEW 4.5: MITRA & TESTIMONI (PREMIUM VIEW WITH BOROBUDUR BACKGROUND) --- */}
      {currentSubPage === 'mitra' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-16">

          {/* Stunning Hero Banner with Borobudur Background */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[450px] flex items-center justify-center p-6 sm:p-12 border border-slate-200">
            {/* Borobudur Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={borobudurImg}
                alt="Borobudur Temple Background"
                className="w-full h-full object-cover scale-100 animate-pulse"
                style={{ animationDuration: '8s' }}
                referrerPolicy="no-referrer"
              />
              {/* Premium dark gradient overlay for maximum readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/95"></div>
              <div className="absolute inset-0 dot-pattern opacity-10"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 text-center max-w-3xl space-y-6">
              <span className="bg-brand-500/25 border border-brand-400/35 text-brand-300 font-extrabold text-[10px] sm:text-xs uppercase tracking-widest px-4.5 py-2.5 rounded-full inline-flex items-center gap-2 shadow-inner">
                <Award className="w-4 h-4 text-brand-400 animate-pulse" /> KEMITRAAN RESMI & TESTIMONI NYATA
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Dipercaya Ribuan Penumpang & <span className="text-brand-400">Instansi Nasional</span>
              </h1>

              <p className="text-navy-200 text-xs sm:text-sm md:text-base font-sans leading-relaxed max-w-2xl mx-auto">
                Dedikasi mutu pariwisata kami diakui secara nasional oleh ribuan pelanggan setia dan mitra resmi sasis-karoseri premium. Kepercayaan Anda adalah amanah berharga bagi perjalanan kami.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <span className="bg-white/10 backdrop-blur-xs text-white border border-white/25 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> 14+ Tahun Pengalaman
                </span>
                <span className="bg-white/10 backdrop-blur-xs text-white border border-white/25 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5" /> 98% Kepuasan Klien
                </span>
                <span className="bg-white/10 backdrop-blur-xs text-white border border-white/25 text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                  <Bus className="w-3.5 h-3.5" /> 50+ Armada Premium
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Mitra Strategis Kami (Enlarged Logos with Elegant Cards) */}
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">MITRA STRATEGIS</span>
              <h2 className="text-3xl font-black text-navy-950 tracking-tight">Kemitraan Resmi & Korporasi</h2>
              <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">
                Kami bangga telah bekerja sama dengan berbagai organisasi nasional, institusi pemerintah, dan perusahaan multinasional terkemuka.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "PSSI",
                  desc: "Persatuan Sepak Bola Seluruh Indonesia",
                  logo: pssiLogo,
                  badge: "Kemitraan Atlet Resmi",
                  color: "from-red-500/10 to-red-600/5"
                },
                {
                  name: "Satria Muda",
                  desc: "Kemitraan Akomodasi Tim Olahraga Basket",
                  logo: satriaMudaLogo,
                  badge: "Akomodasi Atlet Pro",
                  color: "from-blue-500/10 to-blue-600/5"
                },
                {
                  name: "Vopak Jakarta",
                  desc: "Layanan Antar Jemput Karyawan Operasional",
                  logo: vopakLogo,
                  badge: "Shuttle Korporat Rutin",
                  color: "from-indigo-500/10 to-indigo-600/5"
                },
                {
                  name: "Victory Bali",
                  desc: "Penyediaan Transportasi Event & Wisata Bali",
                  logo: victoryBaliLogo,
                  badge: "Akomodasi Event Spesial",
                  color: "from-orange-500/10 to-orange-600/5"
                },
                {
                  name: "Fajar Paper Jakarta",
                  desc: "Sewa Bus Operasional Karyawan Pabrik",
                  logo: fajarPaperLogo,
                  badge: "Transportasi Staff Operasional",
                  color: "from-cyan-500/10 to-cyan-600/5"
                },
                {
                  name: "Lintang Timur",
                  desc: "Kemitraan Niaga & Logistik Lintas Wilayah",
                  logo: lintangTimurLogo,
                  badge: "Mitra Transportasi Niaga",
                  color: "from-emerald-500/10 to-emerald-600/5"
                },
                {
                  name: "Masatoe VIP Jogja",
                  desc: "Penyediaan Bus Pariwisata VIP & Akomodasi Jogja",
                  logo: mastoeLogo,
                  badge: "Layanan Pariwisata Premium",
                  color: "from-amber-500/10 to-amber-600/5"
                },
                {
                  name: "Mahkota Surabaya",
                  desc: "Kemitraan Armada Logistik & Perjalanan Jatim",
                  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Crown_of_a_King.svg/240px-Crown_of_a_King.svg.png",
                  badge: "Mitra Operasional Jatim",
                  color: "from-purple-500/10 to-purple-600/5"
                }
              ].map((klien, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-brand-300 hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between items-center text-center gap-4 group min-h-[260px] relative overflow-hidden"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${klien.color}`}></div>

                  {/* Enlarged Logo Container */}
                  <div className="w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-inner p-3.5 transition-all duration-300 group-hover:scale-108 group-hover:bg-white relative z-10 mt-2">
                    <img
                      src={klien.logo}
                      alt={`Logo ${klien.name}`}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentNode;
                        if (parent && !parent.querySelector('.fallback-initial')) {
                          const fallback = document.createElement('span');
                          fallback.className = "fallback-initial font-black text-brand-500 text-lg";
                          fallback.innerText = klien.name.charAt(0);
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-1 relative z-10 flex-1 flex flex-col justify-center">
                    <span className="text-[9px] font-black text-brand-500 uppercase tracking-widest bg-brand-550/10 text-brand-600 px-2.5 py-1 rounded-full inline-block mx-auto mb-1 border border-brand-100">
                      {klien.badge}
                    </span>
                    <h4 className="font-extrabold text-navy-950 text-sm sm:text-base leading-snug">{klien.name}</h4>
                    <p className="text-[10px] text-slate-450 font-sans leading-normal line-clamp-2 px-1">{klien.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Ulasan & Testimoni Pelanggan Setia (Super Premium Card Layout) */}
          <div className="space-y-8 bg-slate-50/50 rounded-3xl p-6 sm:p-10 border border-slate-200/50">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[11px] sm:text-xs font-black text-brand-500 tracking-[0.25em] block uppercase">SUARA PELANGGAN</span>
              <h2 className="text-3xl font-black text-navy-950 tracking-tight">Kesan Pengendara Kami</h2>
              <div className="w-20 h-1.5 brand-line mx-auto rounded-full mt-2"></div>
              <p className="text-slate-500 text-xs sm:text-sm font-sans mt-3">
                Kami berkomitmen menjaga kualitas servis dan kenyamanan premium demi senyuman di setiap destinasi perjalanan Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  nama: 'Drs. H. Mulyono',
                  ulasan: 'Kami menyewa 4 unit Big Bus untuk acara Study Tour ke Bali. Drivernya sangat sopan santun, laju AC dingin konstan sepanjang jalan tol Situbondo-Banyuwangi. Unit bersih wangi teh premium. Sangat berkelas!',
                  keterangan: 'Plt Kepala Sekolah SMAN 3 Jakarta',
                  avatar: 'DM',
                  kategori: 'Pariwisata Sekolah',
                  date: 'Maret 2026',
                  route: 'Jakarta - Bali'
                },
                {
                  nama: 'Ibu Listiawati',
                  ulasan: 'Untuk lamaran keluarga besar VIP di Pullman Bandung, Hiace Premio benar-benar menunjukan kelasnya. Captain seat sangat empuk, dispenser kopi terisi penuh. CS WA sangat responsif memandu survei fisik di Pool.',
                  keterangan: 'Founder Garnish Wedding Organizer',
                  avatar: 'IL',
                  kategori: 'Wedding Event',
                  date: 'Mei 2026',
                  route: 'Jakarta - Bandung'
                },
                {
                  nama: 'Bro Kevin Santoso',
                  ulasan: 'Menempuh rute Basecamp pegunungan berliku sempit, Medium Bus voyager ini meluncur mantap berkat suspensi balon udara. Audio karaoke dual mic-nya sangat kencang jernih menemani tim kami sepanjang malam.',
                  keterangan: 'Ketua Komunitas Backpacker Indonesia',
                  avatar: 'KS',
                  kategori: 'Trip Petualang',
                  date: 'April 2026',
                  route: 'Jakarta - Wonosobo'
                },
                {
                  nama: 'Bapak Hendra Wijaya',
                  ulasan: 'Layanan Antar Jemput Karyawan (AJK) operasional kantor kami berjalan sangat tepat waktu dan profesional selama setahun ini. Supirnya taat rambu dan busnya selalu disemprot disinfektan wangi lavender segar.',
                  keterangan: 'HR Manager PT. Vopak Logistik Jakarta',
                  avatar: 'HW',
                  kategori: 'Antar Jemput Karyawan',
                  date: 'Rutin Setiap Hari',
                  route: 'Jabodetabek Operational'
                },
                {
                  nama: 'Fatimah Az-Zahra',
                  ulasan: 'Sangat puas menyewa Elf Long untuk rombongan pengajian ziarah wali. Supirnya sangat sabar membimbing kakek-nenek naik turun pintu kabin. Transaksi legal aman dan tanpa ada biaya rest area tersembunyi!',
                  keterangan: 'Koordinator Majelis Taklim Al-Ikhlas',
                  avatar: 'FA',
                  kategori: 'Ziarah & Ummat',
                  date: 'Januari 2026',
                  route: 'Tangerang - Cirebon'
                },
                {
                  nama: 'dr. Adi Pratama',
                  ulasan: 'Menyewa bus Hiace Premio VIP untuk akomodasi delegasi dokter spesialis konferensi kedokteran. Kabin bersih steril, wifi super kencang untuk meeting Zoom di perjalanan tol, dan driver berbusana rapi formal jas.',
                  keterangan: 'Sekretaris Panitia Simposium Medis',
                  avatar: 'AP',
                  kategori: 'Dinas VIP Kantor',
                  date: 'Februari 2026',
                  route: 'Jakarta - Jogjakarta'
                }
              ].map((testi, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-brand-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between font-sans relative group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-brand-500/10 transition-all"></div>

                  {/* Decorative big quote icon */}
                  <span className="text-brand-500/10 absolute top-4 right-4 text-7xl font-serif leading-none select-none pointer-events-none">”</span>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-brand-500 uppercase tracking-widest bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                        {testi.kategori}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold">{testi.date}</span>
                    </div>

                    <div className="flex gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed font-sans relative z-10">
                      "{testi.ulasan}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    {/* Avatar Initials with Beautiful Gradient */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-navy-900 to-navy-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                      {testi.avatar}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-navy-950 text-xs sm:text-sm block">{testi.nama}</h4>
                      <p className="text-[9px] text-brand-500 font-black uppercase tracking-wider block mt-0.5 leading-none">{testi.keterangan}</p>
                      <span className="text-[9px] text-slate-400 font-semibold block mt-1">Rute: {testi.route}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Interactive Feedback Form & Partnership CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Interactive Review Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-brand-500 uppercase tracking-widest block">FORMULIR ULASAN</span>
                <h3 className="text-xl font-black text-navy-950">Berikan Feedback Perjalanan Anda</h3>
                <p className="text-xs text-slate-500 font-sans">
                  Kepuasan Anda sangat penting bagi kami. Ceritakan pengalaman berkesan Anda menyewa armada ABBATA WISATA.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Terima kasih atas ulasan Anda! Kami akan memvalidasi ulasan perjalanan Anda segera sebelum diterbitkan secara resmi.");
                }}
                className="space-y-4 pt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Cahyono"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Instansi / Jabatan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Panitia Ziarah RT 05"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Jenis Armada Sewaan *</label>
                    <select
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-semibold font-sans"
                    >
                      <option value="CityCar">City Car (Avanza / Innova)</option>
                      <option value="MiniBus">Mini Bus (Hiace / Elf)</option>
                      <option value="MediumBus">Medium Bus 31/35 Seat</option>
                      <option value="BigBus">Big Bus 47/59 Seat</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Beri Penilaian Bintang *</label>
                    <div className="flex gap-1.5 pt-2 text-amber-500 cursor-pointer">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500 hover:scale-110 transition-transform" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">Tulis Ulasan Perjalanan Anda *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Contoh: Servisnya sangat memuaskan, bus wangi, sopirnya tepat waktu, sangat merekomendasikan!"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none font-sans text-navy-950 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-navy-900 hover:bg-navy-950 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all btn-shine"
                >
                  <Send className="w-3.5 h-3.5 text-brand-400" /> Kirim Ulasan Resmi
                </button>
              </form>
            </div>

            {/* Corporate Partnership Banner */}
            <div className="lg:col-span-5 bg-navy-950 text-white p-8 rounded-3xl border border-navy-900 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-24 dot-pattern opacity-[0.05] pointer-events-none"></div>

              <div className="space-y-4">
                <span className="text-[10px] font-extrabold text-brand-450 uppercase tracking-widest block">KERJASAMA CORPORATE</span>
                <h3 className="text-2xl font-black leading-tight tracking-tight text-white">Tertarik Menjadi Mitra Resmi Kami?</h3>
                <div className="w-12 h-1 bg-brand-500 rounded-full"></div>

                <p className="text-xs text-navy-200 font-sans leading-relaxed pt-2">
                  Dapatkan penawaran harga kemitraan khusus instansi dengan fasilitas prioritas penguncian unit armada rutin, syarat pembayaran fleksibel (Term of Payment), serta dedicated Account Manager fast-respon.
                </p>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center gap-2 text-xs font-sans text-navy-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" /> Unit bus siap uji KIR & laik jalan
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-navy-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" /> Transaksi berbadan hukum legal PT
                  </div>
                  <div className="flex items-center gap-2 text-xs font-sans text-navy-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" /> Supir bersertifikasi & berpengalaman
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleWhatsAppTrigger('Kerjasama Kemitraan Corporate')}
                  className="w-full bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-navy-950 font-extrabold text-xs uppercase py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-500/10 transition-all btn-shine"
                >
                  <Phone className="w-4 h-4 fill-navy-950 text-navy-950" /> Hubungi WA Kemitraan
                </button>
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
                    Tim administrasi Abbata Wisata akan segera meninjau pertanyaan Anda dan membalas melalui email / HP segera.
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
                      onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })}
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
                      onChange={(e) => setContactForm({ ...contactForm, telepon: e.target.value })}
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
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none text-navy-950 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">Subjek Pertanyaan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Penawaran Sewa Bus Kantor"
                      value={contactForm.subjek}
                      onChange={(e) => setContactForm({ ...contactForm, subjek: e.target.value })}
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
                    onChange={(e) => setContactForm({ ...contactForm, pesan: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none font-sans text-navy-950 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-navy-950 font-extrabold text-xs uppercase py-3.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/15 transition-all btn-shine"
                >
                  <Send className="w-3.5 h-3.5 text-navy-950" /> Kirim Pesan Kontak
                </button>
              </form>
            </div>

            {/* Right Column: Physical Location Map Embed & Contacts info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-lg font-extrabold text-navy-950">Kantor Pusat</h3>

                <div className="space-y-3.5 text-xs text-slate-600 font-sans">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="text-brand-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <p className="leading-relaxed">
                      Apartement Kalibata City Tower Kemuning, JL. TMP Kalibata Tower 1 No. 01, RT.9/RW.4, Kemuning, Pancoran, Jakarta Selatan, Jakarta 12750.
                    </p>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="text-brand-500 w-5 h-5 flex-shrink-0" />
                    <span>info.abditransindo@gmail.com</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="text-brand-500 w-5 h-5 flex-shrink-0" />
                    <span>Waktu Kerja: Senin - Minggu (08:00 - 17:00 WIB)</span>
                  </div>
                </div>

                {/* Google Maps Embed for real office location */}
                <div className="rounded-xl h-48 overflow-hidden border border-slate-200 shadow-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.11598462002!2d106.8324!3d-6.2558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3c7f1ef2b8f%3A0x4a475d4cf96582ff!2sApartemen%20Kalibata%20City!5e0!3m2!1sid!2sid!4v1717148000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kantor ABBATA WISATA"
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
                className="bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-navy-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl flex items-center gap-2 shadow-lg shadow-brand-500/10 transition-all text-center uppercase tracking-wider btn-shine"
                id="footer-booking-btn"
              >
                <Phone className="w-4.5 h-4.5 fill-navy-950 text-navy-950" />
                <span>Konsultasi WA Admin (Respon Cepat)</span>
              </button>
            </div>
          </div>

          {/* Regular Footer Links info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-navy-900 pt-6 text-xs font-sans text-navy-300">
            <div className="space-y-3.5">
              <h4 className="font-black text-sm text-white uppercase tracking-wider">ABBATA WISATA</h4>
              <p className="leading-relaxed">
                PT. ABDI BANGKIT TRANSPORTINDO adalah penyedia jasa layanan one stop service transportation yang amanah, modern, dan profesional untuk wilayah Jawa, Bali, dan Sumatra.
              </p>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-black text-sm text-brand-400 uppercase tracking-wider">Varian Armada</h4>
              <ul className="space-y-2 font-sans cursor-pointer text-navy-200">
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('City Car'); }} className="hover:text-white transition-colors flex items-center gap-2"><CarFront className="w-3.5 h-3.5 text-brand-400" /> City Car Premium</li>
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Mini Bus'); }} className="hover:text-white transition-colors flex items-center gap-2"><CarFront className="w-3.5 h-3.5 text-brand-400" /> Mini Bus (Hiace & Elf)</li>
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Medium Bus'); }} className="hover:text-white transition-colors flex items-center gap-2"><Truck className="w-3.5 h-3.5 text-brand-400" /> Medium Bus Wisata</li>
                <li onClick={() => { setCurrentSubPage('kategori'); setSelectedCategory('Big Bus'); }} className="hover:text-white transition-colors flex items-center gap-2"><Bus className="w-3.5 h-3.5 text-brand-400" /> Big Bus HDD / SHD</li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <h4 className="font-black text-sm text-white uppercase tracking-wider">Menu Halaman</h4>
              <ul className="space-y-2 cursor-pointer text-navy-200">
                <li onClick={() => setCurrentSubPage('home')} className="hover:text-white transition-colors">Beranda</li>
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

          <div className="border-t border-navy-900 pt-4 text-center text-[10px] text-navy-450 font-sans">
            <div>© 2026 PT. ABDI BANGKIT TRANSPORTINDO. Semua Hak Cipta Dilindungi.</div>
          </div>
        </div>
      </footer>

      {/* --- RENTING BUS MODAL SHEET DETAIL --- */}
      {activeBusModal && (
        <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 sm:p-6 md:p-10 z-[999] animate-fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl animate-scale-up p-5 sm:p-6 space-y-6 relative my-4 sm:my-8">
            <button
              onClick={() => setActiveBusModal(null)}
              className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
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
                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded border tracking-wider uppercase ${activeBusModal.status === 'Tersedia'
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

            <div className="grid grid-cols-2 gap-4 border-y border-dashed border-slate-200 py-4 text-xs font-sans text-slate-655">
              <div>
                <span className="text-slate-400 block pb-0.5">Kapasitas Kursi</span>
                <strong className="text-navy-950">{activeBusModal.kapasitas} Penumpang</strong>
              </div>
              <div>
                <span className="text-slate-400 block pb-0.5">Suspensi Sasis</span>
                <strong className="text-navy-950">Air Suspension</strong>
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
                    {feat}
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
                  Sesuai kebijakan kepuasan konsumen ABBATA WISATA, kami menaruh tombol pemesanan WhatsApp langsung secara eksklusif hanya di navigasi teratas atau bagian footer terbawah halaman untuk menghindari resiko pemesanan ganda. Silakan tutup dialog ini lalu klik tombol pesan tersebut.
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

      {/* Floating WhatsApp Widget in Bottom Right */}
      <div
        className="fixed bottom-6 right-6 z-[999] flex items-center group cursor-pointer"
        onClick={() => handleWhatsAppTrigger('Floating WA Widget')}
      >
        {/* Tooltip speech bubble - matches the user's mockup exactly! */}
        <div className="bg-[#25D366] text-white text-xs font-black px-4 py-2.5 rounded-full shadow-xl mr-2.5 flex items-center whitespace-nowrap relative select-none animate-fade-in transition-all duration-300 group-hover:scale-105">
          Chat on WhatsApp
          {/* Speech bubble arrow */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#25D366] rotate-45"></div>
        </div>

        {/* Circular green WhatsApp Button */}
        <button
          className="bg-[#25D366] hover:bg-[#20BA56] active:bg-[#1C9E49] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 outline-none border-none cursor-pointer"
          aria-label="Chat on WhatsApp"
        >
          {/* Premium WhatsApp SVG Icon */}
          <svg className="w-6 h-6 fill-white text-white" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L32 503l139.7-36.6c32.7 17.7 69.2 27 107.1 27 122.4 0 222-99.6 222-222 0-59.3-25.2-115-67.1-117zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-82.7 21.7 22.1-80.6-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </button>
      </div>

    </div>
  );
}
