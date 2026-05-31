import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Compass, ShieldAlert, Loader2 } from 'lucide-react';

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
      if (checkEmail === 'admin@abditransindo.com' && checkPassword === 'admin123') {
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
    <div className="relative min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 select-none overflow-hidden font-sans">
      {/* 1. PASTEL SOFT MESH GRADIENT BACKGROUNDS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808004_1px,transparent_1px),linear-gradient(to_bottom,#80808004_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none z-0 animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0 animate-float-delayed"></div>
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      {/* Inject custom CSS shaking animation to avoid config worries */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.35s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      {/* 2. CORE LIGHT LOGIN CARD CONTAINER */}
      <div 
        className={`w-full max-w-md bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-2xl rounded-3xl p-8 relative z-10 transition-all duration-300 ${
          isShaking ? 'animate-shake border-red-500/50 shadow-red-500/20' : ''
        }`}
      >
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center mb-8">
          <div 
            onClick={handleGoHome}
            className="cursor-pointer bg-gradient-to-tr from-violet-400 via-indigo-400 to-orange-300 p-3.5 rounded-2xl flex items-center justify-center shadow-md shadow-violet-500/10 mb-4 group hover:scale-105 active:scale-95 transition-transform"
          >
            <Compass className="w-8 h-8 text-white group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800">
            Portal <span className="bg-gradient-to-r from-violet-500 to-orange-400 bg-clip-text text-transparent">Admin</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
            PT. Abditransindo Trans Nusantara
          </p>
        </div>

        {/* Dynamic Alerts */}
        {errorMsg && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-start gap-3 text-xs mb-6 animate-fade-in font-sans leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block text-red-800">Gagal Masuk</strong>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 tracking-wide block uppercase">
              Alamat E-mail
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                disabled={isLoading}
                placeholder="admin@abditransindo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl pl-10 pr-4 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/10 transition-all font-sans shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 tracking-wide block uppercase">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                disabled={isLoading}
                placeholder="Masukkan kata sandi..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs sm:text-sm bg-white border border-slate-200 text-slate-800 placeholder-slate-400 rounded-2xl pl-10 pr-12 py-3 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/10 transition-all font-sans shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-800 transition-colors outline-none"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>

          {/* Demo Credentials Box */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-[11px] font-sans text-slate-500 space-y-1 shadow-inner">
            <div className="font-bold text-violet-600 uppercase tracking-wider text-[9px]">🔑 Akun Demo Kredensial:</div>
            <div className="flex justify-between border-b border-slate-200/50 pb-1">
              <span>E-mail:</span>
              <strong className="text-slate-800 font-mono">admin@abditransindo.com</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span>Kata Sandi:</span>
              <strong className="text-slate-800 font-mono">admin123</strong>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-violet-500 to-orange-400 hover:from-violet-600 hover:to-orange-500 text-white py-3 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-violet-500/10 hover:shadow-violet-500/15 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all cursor-pointer outline-none"
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
        <div className="mt-6 pt-5 border-t border-slate-100 text-center">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-violet-600 transition-colors cursor-pointer outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Website</span>
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <p className="mt-8 text-[10px] text-slate-400 tracking-wider uppercase font-mono">
        Secure Admin Access System v1.0.0
      </p>
    </div>
  );
}
