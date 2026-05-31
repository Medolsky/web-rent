/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BusArmada {
  id: string;
  nama: string;
  kategori: 'Luxury' | 'Big Bus' | 'Medium Bus' | 'Micro Bus / Hiace';
  kapasitas: number;
  hargaSewa: number; // per hari dalam Rupiah
  fitur: string[]; // e.g. ["AC", "Karaoke", "Toilet", "Wifi", "Reclining Seat", "USB Charger"]
  foto: string;
  deskripsi: string;
  status: 'Tersedia' | 'Disewa' | 'Perbaikan';
}

export interface BlogPost {
  id: string;
  judul: string;
  ringkasan: string;
  konten: string;
  tanggal: string;
  penulis: string;
  foto: string;
  status: 'Draf' | 'Diterbitkan';
  views: number;
}

export interface AdBanner {
  id: string;
  judul: string;
  deskripsi: string;
  foto: string;
  link: string;
  posisi: 'Hero Promo' | 'Sidebar Blog' | 'Footer Banner';
  status: 'Aktif' | 'Nonaktif';
  klikCount: number;
}

export interface VisitorStat {
  tanggal: string;
  views: number;
  pengunjungUtama: number;
  bookingDirect: number;
  kontakFormSubmit: number;
}

export interface ContactMessage {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  subjek: string;
  pesan: string;
  tanggal: string;
  dibaca: boolean;
}

export type AppViewMode = 'WORKSPACE' | 'PUBLIC_SITE' | 'ADMIN_PANEL';
