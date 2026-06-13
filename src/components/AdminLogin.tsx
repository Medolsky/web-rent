import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, ShieldAlert, Loader2 } from 'lucide-react';
import abbataLogo from '../../assets/image/profile/logo-abbata.png';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Normalization
    const checkEmail = email.trim().toLowerCase();
    const checkPassword = password;

    if (!checkEmail || !checkPassword) {
      setErrorMsg('Harap masukkan email dan kata sandi Anda.');
      triggerShake();
      return;
    }

    setIsLoading(true);

    // Simulate database lookup/loading for a very realistic experience
    setTimeout(() => {
      if (checkEmail === 'info.abditransindo@gmail.com' && checkPassword === 'admin123') {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        setErrorMsg('E-mail atau kata sandi salah. Gunakan kredensial demo di bawah.');
        triggerShake();
      }
    }, 1200);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 400);
  };

  const handleGoHome = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="relative min-h-screen bg-navy-950 flex flex-col justify-center items-center px-4 py-12 select-none overflow-hidden font-sans">
      {/* 1. MESH GRID & GLOW EFFECT */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* Glowing gold and dark yellow blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }}></div>
      <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Inject custom CSS animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.35s cubic-bezier(.36,.07,.19,.97) both;
        }
        .btn-shine-gold {
          position: relative;
          overflow: hidden;
        }
        .btn-shine-gold::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 30%;
          height: 200%;
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(30deg);
          transition: transform 0.5s;
          opacity: 0;
        }
        .btn-shine-gold:hover::after {
          transform: translate(300%, 300%) rotate(30deg);
          opacity: 1;
          transition: all 0.8s ease;
        }
      `}</style>

      {/* 2. GLASSMORPHISM LOGIN CARD */}
      <div 
        className={`w-full max-w-md bg-navy-900/70 backdrop-blur-2xl border border-navy-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-8 relative z-10 transition-all duration-300 ${
          isShaking ? 'animate-shake border-red-500/50 shadow-red-500/10' : 'hover:border-brand-500/30'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <div 
            onClick={handleGoHome}
            className="cursor-pointer bg-navy-950 p-2.5 rounded-2xl flex items-center justify-center shadow-lg border border-navy-800 mb-4 hover:scale-105 active:scale-95 transition-transform"
          >
            <img src={abbataLogo} alt="ABBATA WISATA" className="w-16 h-16 object-contain" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Portal <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">Admin</span>
          </h2>
          <p className="text-[10px] text-brand-500 mt-1.5 uppercase tracking-[0.25em] font-extrabold">
            PT. ABDI BANGKIT TRANSPORTINDO
          </p>
        </div>

        {/* Dynamic Alerts */}
        {errorMsg && (
          <div className="bg-red-950/40 border border-red-900/50 text-red-200 p-4 rounded-2xl flex items-start gap-3 text-xs mb-6 animate-fade-in font-sans leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-red-400">Gagal Masuk</strong>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider block uppercase">
              Alamat E-mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500/60">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                disabled={isLoading}
                placeholder="info.abditransindo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm bg-navy-950/80 border border-navy-800 text-white placeholder-slate-650 rounded-2xl pl-10 pr-4 py-3.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-400 tracking-wider block uppercase">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-500/60">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={isLoading}
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs sm:text-sm bg-navy-950/80 border border-navy-800 text-white placeholder-slate-650 rounded-2xl pl-10 pr-12 py-3.5 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors outline-none"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Demo Credentials Box */}
          <div className="bg-navy-900 border border-navy-800/80 p-4 rounded-2xl text-[11px] font-sans text-slate-400 space-y-1.5 shadow-inner">
            <div className="font-extrabold text-brand-500 uppercase tracking-widest text-[9px]">🔑 Kredensial Akses Demo:</div>
            <div className="flex justify-between border-b border-navy-800/50 pb-1.5">
              <span>E-mail:</span>
              <strong className="text-white font-mono">info.abditransindo@gmail.com</strong>
            </div>
            <div className="flex justify-between pt-0.5">
              <span>Kata Sandi:</span>
              <strong className="text-white font-mono">admin123</strong>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 hover:from-brand-600 hover:to-brand-500 text-navy-950 py-3.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-500/10 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all cursor-pointer outline-none btn-shine-gold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memvalidasi...</span>
              </>
            ) : (
              <span>Masuk Sistem</span>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-6 pt-5 border-t border-navy-800/80 text-center">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-450 hover:text-brand-400 transition-colors cursor-pointer outline-none font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-[9px] text-slate-650 tracking-widest uppercase font-mono font-bold">
        ABBATA WISATA • Secure Panel v1.2.0
      </p>
    </div>
  );
}
