/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusArmada, BlogPost, AdBanner, VisitorStat, ContactMessage, VehiclePhoto, HeroBackground } from '../types';

// Import local bus fleet photos uploaded by user
import bus31Seat from '../../assets/image/armada/bus-31-seat.png';
import bus35Seat from '../../assets/image/armada/bus-35-seat.png';
import bus50Seat from '../../assets/image/armada/bus-50-seat.jpg';
import bus59Seat from '../../assets/image/armada/bus-59-seat.png';
import elfLong from '../../assets/image/armada/elf-long.png';
import hiaceLuxury from '../../assets/image/armada/hiace-luxury.png';
import hiaceStandart from '../../assets/image/armada/hiace-standart.png';

// Import local destination photos uploaded by user
import baliImg from '../../assets/image/destinasi/bali.jpg';
import borobudurImg from '../../assets/image/destinasi/borobudur.jpg';
import gunungImg from '../../assets/image/destinasi/gunung.jpg';
import prambananImg from '../../assets/image/destinasi/prambanan.jpg';
import rajaAmpatImg from '../../assets/image/destinasi/raja-ampat.jpg';

export const initialBuses: BusArmada[] = [
  {
    id: 'bus-09',
    nama: 'Toyota Innova Zenix MPV Premium',
    kategori: 'City Car',
    kapasitas: 7,
    hargaSewa: 900000,
    fitur: ['AC Dual Zone', 'Charger Port', 'Audio System', 'Reclining Seat', 'Bagasi Luas', 'Captain Seat'],
    foto: hiaceStandart,
    deskripsi: 'Toyota Innova Zenix MPV Premium menawarkan kenyamanan berkendara kelas atas dengan performa mesin hybrid yang senyap dan hemat bahan bakar. Sangat cocok untuk perjalanan dinas perkotaan maupun wisata keluarga kecil.',
    status: 'Tersedia'
  },
  {
    id: 'bus-02',
    nama: 'Jetbus 3+ Super Double Decker (SDD) Hino RK',
    kategori: 'Big Bus',
    kapasitas: 59,
    hargaSewa: 3800000,
    fitur: ['WiFi', 'Double Decker 2 Lantai', 'AC', 'Karaoke System', '10 Android TV', 'Reclining Seat 2-2', 'Dispenser Air'],
    foto: bus59Seat,
    deskripsi: 'Mengusung teknologi double-decker (dua tingkat) yang memberikan sensasi perjalanan yang menyenangkan dengan view pemandangan lebih lapang dari lantai atas. Dilengkapi total 59 kursi ergonomis dengan legrest, bantal, selimut, serta sistem filtrasi udara kabin terkini.',
    status: 'Tersedia'
  },
  {
    id: 'bus-03',
    nama: 'Jetbus 3+ Medium HDD Voyager (31 Seat)',
    kategori: 'Medium Bus',
    kapasitas: 31,
    hargaSewa: 2400000,
    fitur: ['AC Super Dingin', 'Karaoke Smart TV', 'USB Port Charger', 'Reclining Seat', 'Bagasi Luas', 'Cool Box'],
    foto: bus31Seat,
    deskripsi: 'Bus medium yang gesit dan lincah, sangat direkomendasikan untuk berekreasi bersama keluarga besar menempuh area wisata pegunungan berjalur sempit. Memiliki konfigurasi kursi 2-1 maupun 2-2 yang luas.',
    status: 'Tersedia'
  },
  {
    id: 'bus-04',
    nama: 'Toyota Hiace Premio Luxury Captain Seat',
    kategori: 'Mini Bus',
    kapasitas: 9,
    hargaSewa: 1700000,
    fitur: ['Captain Seats Leather', 'Pijatan Kursi Elektrik', 'AC Dual Zone', 'Smart screen TV', 'Karaoke', 'Sound System Venom'],
    foto: hiaceLuxury,
    deskripsi: 'Microbus premium dengan kenyamanan mobil sedan mewah. Kabin dimodifikasi khusus dengan sentuhan kayu (wood panel), kursi pijat kulit premium yang bisa berputar, ambient lighting romantis, dan peredaman kabin menyeluruh demi privasi maksimal rombongan VIP Anda.',
    status: 'Tersedia'
  },
  {
    id: 'bus-05',
    nama: 'Subur Jaya Jetbus 3+ SHD "Scania Edition"',
    kategori: 'Big Bus',
    kapasitas: 50,
    hargaSewa: 3400000,
    fitur: ['WiFi', 'AC', 'DVD Karaoke', 'Dispenser & Kopi', 'Bantal Selimut', 'USB Charger Tap', 'Air Suspension'],
    foto: bus50Seat,
    deskripsi: 'Super High Deck karoseri Adi Putro yang legendaris, memberikan sudut pandang penumpang bagian depan sangat luas terbebas dari sekat topi kaca luar. Pilihan utama untuk tur instansi atau rombongan studi berwisata antar kota antar provinsi.',
    status: 'Tersedia'
  },
  {
    id: 'bus-06',
    nama: 'Isuzu Elf Long Giga Coaster',
    kategori: 'Mini Bus',
    kapasitas: 19,
    hargaSewa: 1300000,
    fitur: ['AC Ducting', 'DVD Audio Player', 'USB Charger', 'Reclining Seat standard', 'Kabin Lega'],
    foto: elfLong,
    deskripsi: 'Maksimum kapasitas dengan harga ekonomis. Cocok untuk mengantar rombongan lamaran perkawinan, ziarah, mudik bareng, atau antar-jemput karyawan industri dengan rute menantang yang tidak mungkin dilalui bus besar.',
    status: 'Tersedia'
  },
  {
    id: 'bus-07',
    nama: 'Jetbus 3+ Medium HDD Voyager (35 Seat)',
    kategori: 'Medium Bus',
    kapasitas: 35,
    hargaSewa: 2600000,
    fitur: ['AC Dual Zone', 'Karaoke Smart TV', 'USB Port Charger', 'Reclining Seat', 'Bagasi Ekstra Luas', 'Cool Box'],
    foto: bus35Seat,
    deskripsi: 'Pilihan kapasitas medium yang lebih besar, menawarkan 35 kursi ergonomis yang nyaman bagi rombongan studi banding, ziarah, maupun pariwisata keluarga menengah.',
    status: 'Tersedia'
  },
  {
    id: 'bus-08',
    nama: 'Toyota Hiace Commuter Standar',
    kategori: 'Mini Bus',
    kapasitas: 15,
    hargaSewa: 1400000,
    fitur: ['AC Dingin Merata', 'DVD Player', 'USB Charger', 'Nyaman Standard', 'Hemat BBM'],
    foto: hiaceStandart,
    deskripsi: 'Model standar Hiace Commuter yang melegenda, andalan utama perjalanan keluarga, shuttle antar jemput instansi, dan wisata rombongan kecil dengan kenyamanan yang dapat diandalkan.',
    status: 'Tersedia'
  }
];

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-01',
    judul: 'Tips Cerdas Memilih Jenis Bus Pariwisata yang Tepat untuk Rombongan Anda',
    ringkasan: 'Agar liburan tetap nyaman dan anggaran terkendali, ketahui cara tepat mencocokkan kapasitas jumlah orang dengan jenis armada bus pariwisata yang ideal.',
    konten: `Memilih bus pariwisata tidak hanya sekedar menyewa kendaraan besar bermesin diesel. Untuk memastikan perjalanan Anda berjalan lancar tanpa kendala, ada beberapa poin matang yang mutlak harus Anda pertimbangkan.

### 1. Hitung Jumlah Anggota Rombongan Secara Pasti
Sering kali terjadi kesalahan di mana penyewa meremehkan jumlah rombongan. Jangan memesan bus dengan kapasitas yang pas-pasan. Misalnya rombongan berjumlah 30 orang, hindari menyewa bus medium dengan kapasitas persis 31 orang. Berilah cadangan space minimal 2-4 kursi kosong guna mengantisipasi barang bawaan tambahan atau peserta mendadak.

### 2. Pahami Aksesibilitas Jalur Menuju Destinasi Wisata
Tidak semua tempat rekreasi bisa dilewati oleh Big Bus Double Decker atau SHD. Contohnya daerah pantai selatan atau kelokan pegunungan di daerah terpencil biasanya membatasi dimensi kendaraan. Jika jalanan meliuk sempit, menyewa Medium Bus atau Hiace Premio adalah pilihan bijak demi keselamatan serta kelincahan manuver.

### 3. Cek Fasilitas yang Benar-Benar Dibutuhkan
Untuk perjalanan panjang di atas 8 jam (misalnya Jakarta-Bali atau Yogyakarta), fasilitas seperti Toilet, Reclining Seat yang bisa direbahkan maksimal, dan Air Suspension sangatlah esensial guna mencegah kelelahan penat badan. Namun, jika hanya untuk keliling dalam kota, Standard Big Bus non-toilet dengan harga sewa lebih ekonomis sudah sangat memadai.

Konsultasikan kebutuhan perjalanan Anda kepada admin ABBATA WISATA melalui tombol pemesanan WhatsApp yang tersedia di Navigasi Atas dan Footer halaman ini demi mufakat pilihan terbaik!`,
    tanggal: '2026-05-28',
    penulis: 'Hendrawan Pratama (Fleet Manager)',
    foto: borobudurImg,
    status: 'Diterbitkan',
    views: 145
  },
  {
    id: 'blog-02',
    judul: 'Rekomendasi Rute Overland Wisata Bandung Paling Hits Menggunakan Medium Bus Premium',
    ringkasan: 'Jelajahi keindahan Lembang, Ciwidey, dan kuliner perkotaan Bandung dengan kenyamanan tak tertandingi menggunakan Medium Bus Voyager.',
    konten: `Kota Kembang Bandung masih menjadi magnet wisata akhir pekan terfavorit warga Jakarta dan sekitarnya. Dengan kontur jalanan perbukitan yang menantang dan kerap didera kemacetan, Medium Bus pariwisata adalah jenis moda transportasi terbaik yang paling nyaman. Berikut adalah rencana rute hits terbaik:

### Sesi Pagi: Kesejukan Lembang
Menjelang matahari terbit, arahkan bus Anda meluncur via Tol Cipularang menuju Lembang. Kunjungi destinasi ramah anak seperti Floating Market atau Orchid Forest Cikole. Nikmati teduhnya jajaran pohon pinus tinggi yang melambai romantis. Medium Bus berkapasitas 31 kursi sangat pas merebahkan badan menyusuri trek menanjak ekstrem Setiabudi tanpa rasa cemas slip mesin.

### Sesi Siang: Wisata Kuliner dan Belanja
Turun ke area Dago atau Riau untuk memanjakan lidah di kafe-kafe heritage estetik Bandung. Di sini kelebihan Medium Bus kian terasa praktis; parkir lebih mudah didapatkan dibanding bus besar yang kerap dilarang melintas di rute-rute jalan pemukiman pusat factory outlet.

### Sesi Sore-Malam: Sunset Ciwidey atau Pusat Kota
Jika memiliki waktu lebih, Anda dapat bergeser ke Kawah Putih di Ciwidey. Nikmati hamparan kebun teh berkabut sembari menghirup aroma alam belerang yang eksotis. Perjalanan pulang ditutup dengan beristirahat penuh di atas bus di mana para peserta bisa menyalakan fitur Karaoke System di dalam kabin bus pariwisata kami sembari memicu keseruan kebersamaan!`,
    tanggal: '2026-05-25',
    penulis: 'Siti Rahmawati (Tour Planner)',
    foto: gunungImg,
    status: 'Diterbitkan',
    views: 98
  },
  {
    id: 'blog-03',
    judul: 'Evolusi Suspensi Udara (Air Suspension) pada Bus Pariwisata Modern',
    ringkasan: 'Bagaimana teknologi peredaman balon udara merevolusi kenyamanan perjalanan darat Anda, menyingkirkan era suspensi per daun yang keras berisik.',
    konten: `Dulu, mitos berpergian naik bus pariwisata di Indonesia diidentikkan dengan mabuk darat, guncangan keras yang membuat mual, dan bodi kendaraan berisik yang memicu pusing kepala. Semua trauma masa lalu itu berubah total berkat teknologi **Air Suspension** atau suspensi udara balon. 

### Bagaimanakah Cara Kerjanya?
Berbeda dengan sistem pegas per daun baja tradisional, suspensi udara mengganti pegas logam tersebut dengan tabung balon berbahan karet sintetis kokoh yang diisi tekanan kompresi udara hasil kalkulasi sensor komputer sasis. Kompresor akan menyuplai volume angin secara dinamis menyesuaikan beban muatan penumpang serta kemiringan tikungan jalan.

### Keunggulan Utama untuk Kenyamanan Anda:
1. **Peredaman Super Halus**: Guncangan saat roda melibas lubang jalanan atau speed limiter (polisi tidur) terserap sempurna hingga nyaris tidak terasa di kabin atas.
2. **Kabin Sunyi**: Tidak ada gesekan logam per besi, menghasilkan hening suara kabin yang membuat istirahat sepanjang jalan kian pulas layaknya tidur di kamar hotel.
3. **Mencegah Mabuk Perjalanan**: Karena level kestabilan bodi bus (roll stabilization) terjaga mantap waktu berbelok, organ sensorik keseimbangan di telinga bagian dalam manusia tidak dipaksa bekerja ekstra keras—secara signifikan memangkas rasio gejala mual muntah penumpang.

Kini, demi standar pelayanan premium, armada utama Big Bus Scania dan Double Decker kami telah 100% dipasangi sistem air suspension bersertifikasi internasional!`,
    tanggal: '2026-05-20',
    penulis: 'Bambang Widjojo (Senior Engineer)',
    foto: prambananImg,
    status: 'Diterbitkan',
    views: 210
  },
  {
    id: 'blog-04',
    judul: 'Daftar Kuliner Khas Jalur Pantai Utara (Pantura) Jawa yang Wajib Disinggahi Rombongan Bus Wisata',
    ringkasan: 'Mudik atau liburan melintasi jalur Pantura? Pastikan rombongan pariwisata Anda berbelanja buah tangan legendaris mulai dari Telur Asin hingga Empal Gentong.',
    konten: `Melintasi jalur Pantai Utara (Pantura) Jawa bersama rombongan sewa bus pariwisata adalah pengalaman kuliner luar biasa. Jalur legendaris ini menyajikan ragam hidangan khas beraroma rempah tradisional yang ramah di kantong dan memiliki pool parkir bus yang sangat luas. Berikut kuliner wajib Pantura:

### 1. Empal Gentong Haji Apud (Tengah Tani, Cirebon)
Kuah kuning bersantan kelapa gurih yang dimasak menggunakan gentong tanah liat tradisional berkayu bakar mangga memberikan aroma sangit harum yang khas. Daging sapi empuk bercampur babat lezat siap mengisi energi rombongan pariwisata Anda. Area parkir sangat memadai untuk memuat 4 Big Bus pariwisata sekaligus.

### 2. Telur Asin Asli Cahaya (Brebes)
Pusat oleh-oleh khas Brebes menyajikan telur bebek kualitas terbaik dengan karakteristik kuning telur berminyak (*masir*) yang gurih asin sedang. Rombongan sewa bus pariwisata dapat berbelanja kemasan keranjang bambu anyaman tradisional yang praktis disusun di dalam lambung bagasi bus.

### 3. Nasi Megono & Sauto Tauco (Pekalongan)
Cicipi sajian nasi dengan cacahan nangka muda bumbu kelapa parut pedas harum di Pekalongan, atau sauto (soto khas) dengan sentuhan kuah bumbu tauco manis asam gurih yang hangat meresap ke dalam dada sepanjang perjalanan malam di tol Trans Jawa.`,
    tanggal: '2026-05-15',
    penulis: 'Rian Hidayat (Senior Guide)',
    foto: baliImg,
    status: 'Diterbitkan',
    views: 189
  },
  {
    id: 'blog-05',
    judul: 'Mengenal Sasis Premium Bus Pariwisata: Perbandingan Scania K410IB vs Mercedes-Benz OH 1626',
    ringkasan: 'Edukasi sasis bus premium terpopuler di Indonesia. Pahami perbedaan performa mesin, sistem suspensi balon udara, dan fitur keselamatan keduanya.',
    konten: `Bagi pencinta bus pariwisata maupun penyelenggara tur yang ingin menyewa armada terbaik, memahami sasis landasan bus adalah pengetahuan berharga. Dua nama sasis premium paling merajai jalan tol Trans Jawa saat ini adalah **Scania K410IB** buatan Swedia dan **Mercedes-Benz OH 1626** rakitan Jerman. Berikut kupas tuntas komparasinya:

### 1. Dapur Pacu & Tenaga Mesin
- **Scania K410IB**: Menggendong mesin monster 13.000 cc 6-silinder bertenaga **410 Horsepower (HP)**. Menawarkan torsi raksasa yang sangat melimpah untuk melibas tanjakan pegunungan terjal dengan kondisi AC menyala dingin penuh tanpa hambatan berarti.
- **Mercedes-Benz OH 1626**: Dibekali mesin legendaris OM 906 LA 6.300 cc bertenaga **260 Horsepower (HP)**. Sangat efisien dalam konsumsi solar bbm, sangat tangguh, dan memiliki suku cadang yang melimpah di seluruh pelosok Indonesia.

### 2. Sistem Transmisi & Kehalusan Berkendara
- **Scania K410IB**: Mengadopsi transmisi otomatis pintar **Scania Opticruise 12-percepatan**. Komputer sasis akan memindahkan gigi dengan kehalusan luar biasa (tanpa hentakan kopling), memberikan kenyamanan kabin sunyi bagaikan naik kereta cepat.
- **Mercedes-Benz OH 1626**: Menggunakan transmisi manual 6-percepatan yang sangat responsif, memberikan kendali penuh pada pengemudi andalan kami untuk mengatur laju kendaraan di jalanan berkelok basah.

### 3. Sistem Kestabilan & Suspensi Udara
Kedua sasis ini telah mengadopsi teknologi **Air Suspension** bawaan pabrik (bukan modifikasi karoseri lokal). Namun, Scania K410IB dilengkapi fitur *electronic leveling control* yang otomatis menyeimbangkan ketinggian bodi bus saat melibas tikungan tajam, meminimalisir gejala limbung/mabuk perjalanan rombongan Anda.

Konsultasikan kebutuhan sasis sewaan pariwisata Anda bersama sales representatif ABBATA WISATA untuk mendapatkan rekomendasi unit Sultan Class terbaik!`,
    tanggal: '2026-06-01',
    penulis: 'Bambang Widjojo (Senior Engineer)',
    foto: rajaAmpatImg,
    status: 'Diterbitkan',
    views: 312
  },
  {
    id: 'blog-06',
    judul: 'Panduan Lengkap Wisata Ziarah Wali Songo yang Aman, Nyaman, dan Khidmat',
    ringkasan: 'Tips esensial bagi panitia majelis taklim dalam merencanakan perjalanan spiritual ziarah kubur Wali Songo lintas provinsi secara efisien.',
    konten: `Wisata religi ziarah kubur para Wali Songo di tanah Jawa merupakan rutinitas spiritual tahunan yang sangat dinantikan oleh majelis taklim, pondok pesantren, dan keluarga besar. Mengingat durasi perjalanan yang sangat panjang (bisa berkisar antara 5 hingga 9 hari overland), perencanaan yang matang mutlak diperlukan. Berikut panduan lengkapnya:

### 1. Pemilihan Armada Bus dengan Toilet & Suspensi Balon
Menempuh perjalanan ribuan kilometer lintas provinsi dari Jawa Barat, Jawa Tengah, hingga Jawa Timur sangat menguras stamina fisik rombongan, terutama bagi jamaah lanjut usia (lansia). Sangat direkomendasikan menyewa tipe **Big Bus SHD/HDD yang dilengkapi fasilitas toilet kabin** (khusus buang air kecil saat bus berjalan di jalan tol) serta suspensi balon udara agar pinggang jamaah tidak pegal.

### 2. Menyusun Rute Logis Berdasarkan Geografis
Mulailah ziarah secara berurutan agar rute tidak tumpang tindih. Sebagai contoh rute Barat ke Timur:
1. Sunan Gunung Jati (Cirebon)
2. Sunan Kalijaga (Demak)
3. Sunan Kudus & Sunan Muria (Kudus)
4. Sunan Bonang (Tuban)
5. Sunan Drajat (Lamongan)
6. Sunan Gresik & Sunan Giri (Gresik)
7. Sunan Ampel (Surabaya)
8. Sunan Gunung Jati (kembali pulang atau diteruskan ke makam KH Abdurrahman Wahid/Gus Dur di Jombang).

### 3. Istirahat Cukup & Kepatuhan Protokol Supir
Pastikan supir bus mendapatkan waktu istirahat yang layak minimal 8 jam setelah mengemudikan bus pariwisata. Di ABBATA WISATA, kami menerapkan kebijakan ketat **dua supir resmi (driver utama & driver cadangan)** untuk setiap sewa perjalanan overland ziarah Wali Songo demi menjamin keamanan maksimum jamaah ummat.

Atur jadwal ziarah berkah Anda sekarang bersama ABBATA WISATA dan nikmati penawaran harga kemitraan paket ziarah berkah yang kompetitif!`,
    tanggal: '2026-06-02',
    penulis: 'Ustadz H. Ahmad Ridwan (Tour Advisor)',
    foto: borobudurImg,
    status: 'Diterbitkan',
    views: 420
  }
];

export const initialBanners: AdBanner[] = [
  {
    id: 'banner-01',
    judul: 'Promo Libur Sekolah: Diskon Sewa Bus 15%!',
    deskripsi: 'Khusus penyewaan unit Big Bus & Medium Bus selama bulan Juni-Juli 2026. Free souvenir merchandise pariwisata khas untuk seluruh siswa rombongan.',
    foto: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=90&w=1200',
    link: 'https://wa.me/628211588758?text=Halo%20Admin%20ABBATA%20WISATA,%20saya%20tertarik%20dengan%20Promo%20Libur%20Sekolah%20Diskon%2015%',
    posisi: 'Hero Promo',
    status: 'Aktif',
    klikCount: 54
  },
  {
    id: 'banner-02',
    judul: 'Sewa Hiace Premio Mulai Rp 1.5 Juta per Hari',
    deskripsi: 'Harga net sewa harian all-in (armada, driver handal, bbm) khusus rute dalam kota Jabodetabek.',
    foto: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=90&w=1200',
    link: 'https://wa.me/628211588758?text=Halo%20Admin%20ABBATA%20WISATA,%20saya%20ingin%20tanya%20sewa%20Hiace%20Premio%20mulai%201.5%20juta',
    posisi: 'Sidebar Blog',
    status: 'Aktif',
    klikCount: 32
  }
];

export const initialStats: VisitorStat[] = [
  { tanggal: '24 Mei', views: 420, pengunjungUtama: 156, bookingDirect: 28, kontakFormSubmit: 11 },
  { tanggal: '25 Mei', views: 512, pengunjungUtama: 204, bookingDirect: 36, kontakFormSubmit: 14 },
  { tanggal: '26 Mei', views: 490, pengunjungUtama: 198, bookingDirect: 32, kontakFormSubmit: 9 },
  { tanggal: '27 Mei', views: 630, pengunjungUtama: 282, bookingDirect: 49, kontakFormSubmit: 20 },
  { tanggal: '28 Mei', views: 720, pengunjungUtama: 310, bookingDirect: 58, kontakFormSubmit: 25 },
  { tanggal: '29 Mei', views: 805, pengunjungUtama: 345, bookingDirect: 67, kontakFormSubmit: 30 },
  { tanggal: '30 Mei', views: 890, pengunjungUtama: 395, bookingDirect: 84, kontakFormSubmit: 36 },
];

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-01',
    nama: 'Rizky Sanjaya',
    email: 'rizky.sanjaya@corp.id',
    telepon: '081298765432',
    subjek: 'Penyewaan Big Bus 3 Unit untuk Gathering Perusahaan ke Anyer',
    pesan: 'Halo Admin, saya rencana menyewa 3 unit Big Bus pariwisata tipe HDD untuk acara gathering tahunan kantor tanggal 12-14 Juli 2026. Penjemputan di Jakarta Selatan, tujuan Pantai Anyer Banten. Apakah unit masih tersedia dan berapa harga paket nett-nya?',
    tanggal: '2026-05-30 08:15',
    dibaca: false
  },
  {
    id: 'msg-02',
    nama: 'Sania Amalia',
    email: 'sania_amalia@gmail.com',
    telepon: '085732145678',
    subjek: 'Tanya Ketersediaan Hiace Premio untuk Lamaran',
    pesan: 'Untuk sewa Toyota Hiace Captain Seat tanggal 7 Juni 2026 ke daerah Puncak Bogor, apakah sudah include tol dan makan supir ya? Mohon rincian lengkapnya via email atau WA.',
    tanggal: '2026-05-29 14:30',
    dibaca: true
  }
];

// DATA STRUKTUR UNTUK WEB FLOW DIAGRAM DAN RENCANA FITUR (SYSTEM ARCHITECTURE DELIVERABLES)
export interface FlowNode {
  id: string;
  label: string;
  tipe: 'visitor' | 'admin' | 'decision' | 'system';
  deskripsi: string;
  x: number;
  y: number;
}

export interface FlowConnection {
  from: string;
  to: string;
  label?: string;
}

export const webFlowData = {
  nodes: [
    // Jalur Publik Website
    { id: 'p-start', label: 'Pengunjung Masuk', tipe: 'visitor', deskripsi: 'Pengunjung mengunjungi landing page / homepage melalui hasil pencarian Google, iklan, sosial media atau link referral.', x: 100, y: 150 },
    { id: 'p-home', label: 'Homepage Publik', tipe: 'visitor', deskripsi: 'Landing page utama yang menampilkan USP, slider promo aktif, katalog bus unggulan harian, rangkuman blog, form kontak instan, dan FAQ.', x: 280, y: 150 },
    { id: 'p-dec-explore', label: 'Keputusan Telusuri?', tipe: 'decision', deskripsi: 'Pengunjung memilih tindakan selanjutnya: mengeksplorasi armada bus pariwisata, membaca keunggulan di Tentang Kami, melihat edukasi di artikel Blog, atau mengirimkan pertanyaan.', x: 480, y: 150 },
    
    { id: 'p-kategori', label: 'Halaman Kategori Bus', tipe: 'visitor', deskripsi: 'Katalog interaktif menampilkan seluruh armada bus dengan filter instan berdasarkan kategori armada (City Car, Mini Bus, Medium Bus, Big Bus) dan kapasitas penumpang.', x: 480, y: 40 },
    { id: 'p-about', label: 'Halaman Tentang Kami', tipe: 'visitor', deskripsi: 'Pemaparan nilai perusahaan, legalitas resmi, keunggulan layanan, serta testimoni kepuasan pelanggan.', x: 680, y: 100 },
    { id: 'p-blog', label: 'Halaman Blog & Tips', tipe: 'visitor', deskripsi: 'Daftar artikel edukatif dan pemeliharaan bus yang dinamis dikelola dari admin panel, berfungsi membangun kepercayaan dan SEO Google.', x: 680, y: 180 },
    { id: 'p-kontak', label: 'Halaman Hubungi Kami', tipe: 'visitor', deskripsi: 'Halaman integrasi form kontak umum (mengirim pesan ke database admin) dan informasi alamat fisik kantor operasional.', x: 480, y: 260 },
    
    { id: 'p-dec-booking', label: 'Ingin Pesan Bus?', tipe: 'decision', deskripsi: 'Pengunjung ingin menyewa bus. Tombol pesan sewa bus diatur secara eksklusif HANYA ada di Header Navigation (tetap) dan Footer bagian terbawah halaman untuk menjaga estetika.', x: 880, y: 150 },
    { id: 'p-wa-direct', label: 'Beralih ke WhatsApp', tipe: 'system', deskripsi: 'Redirect langsung ke tautan API WhatsApp otomatis menggunakan string pra-pesan terstruktur menyebutkan kategori bus dan rute perjalanan.', x: 1080, y: 150 },
    
    // Jalur Admin Panel
    { id: 'a-login', label: 'Akses Admin Panel', tipe: 'admin', deskripsi: 'Akses panel administrasi yang aman guna mengawasi seluruh data, iklan promo, dan memodifikasi konten publik.', x: 100, y: 420 },
    { id: 'a-dashboard', label: 'Dashboard Utama', tipe: 'admin', deskripsi: 'Menu monitoring statistik kunjungan riil-time harian (views, unique visitors, klik booking WA, form submissions) yang bertenaga chart grafis.', x: 280, y: 420 },
    { id: 'a-dec-menu', label: 'Pilih Navigasi CRUD', tipe: 'decision', deskripsi: 'Admin memilih fitur operasional yang ingin dimodifikasi guna pembaruan website publik seketika.', x: 480, y: 420 },
    
    { id: 'a-crud-bus', label: 'CRUD Armada Bus', tipe: 'admin', deskripsi: 'Menambah, mengubah info/status sewa, mengunggah foto, dan menghapus bus dari list situs publik.', x: 680, y: 340 },
    { id: 'a-crud-blog', label: 'CRUD Blog Artikel', tipe: 'admin', deskripsi: 'Kontrol manajemen konten draf vs publish, mengunggah banner artikel dengan dynamic markdown.', x: 680, y: 425 },
    { id: 'a-crud-banner', label: 'Manajemen Iklan Banner', tipe: 'admin', deskripsi: 'Mengunggah banner komersial luar atau diskon promo, dan menetapkan posisi tayang sela di website.', x: 680, y: 510 },
    { id: 'a-inbox', label: 'Kotak Masuk Kontak', tipe: 'admin', deskripsi: 'Membaca formulir kontak masuk yang diisi oleh calon penyewa di website publik guna follow-up penawaran.', x: 480, y: 560 }
  ] as FlowNode[],
  
  connections: [
    { from: 'p-start', to: 'p-home' },
    { from: 'p-home', to: 'p-dec-explore' },
    
    { from: 'p-dec-explore', to: 'p-kategori', label: 'Lihat Armada' },
    { from: 'p-dec-explore', to: 'p-about', label: 'Profil Kami' },
    { from: 'p-dec-explore', to: 'p-blog', label: 'Cari Edukasi' },
    { from: 'p-dec-explore', to: 'p-kontak', label: 'Isi Form Kontak' },
    
    { from: 'p-kategori', to: 'p-dec-booking' },
    { from: 'p-about', to: 'p-dec-booking' },
    { from: 'p-blog', to: 'p-dec-booking' },
    { from: 'p-kontak', to: 'p-dec-booking' },
    
    { from: 'p-dec-booking', to: 'p-wa-direct', label: 'Klik Pesan WA' },
    
    // Admin connections
    { from: 'a-login', to: 'a-dashboard' },
    { from: 'a-dashboard', to: 'a-dec-menu' },
    
    { from: 'a-dec-menu', to: 'a-crud-bus', label: 'Manage Bus' },
    { from: 'a-dec-menu', to: 'a-crud-blog', label: 'Manage Blog' },
    { from: 'a-dec-menu', to: 'a-crud-banner', label: 'Manage Iklan' },
    { from: 'a-dec-menu', to: 'a-inbox', label: 'Buka Inbox' },
    
    // System feeds
    { from: 'a-crud-bus', to: 'p-kategori', label: 'Auto Update' },
    { from: 'a-crud-blog', to: 'p-blog', label: 'Auto Update' },
    { from: 'p-kontak', to: 'a-inbox', label: 'Form Submit' }
  ] as FlowConnection[]
};

export interface FeaturePlanItem {
  id: string;
  fitur: string;
  kategori: 'Website Publik' | 'Admin Panel' | 'Sistem / Database';
  deskripsi: string;
  prioritas: 'Must-Have' | 'Should-Have' | 'Nice-to-Have';
  dependencies: string;
  pelaku: string;
}

export const featuresPlanData: FeaturePlanItem[] = [
  {
    id: 'f-01',
    fitur: 'Header & Footer Fixed Booking',
    kategori: 'Website Publik',
    deskripsi: 'Penempatan tombol booking/pesan hanya di header tetap (navbar scroll-sticky) dan footer terbawah. Mencegah clutter diskon di listing bus individual serta mempercantik visual (terinspirasi abbata.com).',
    prioritas: 'Must-Have',
    dependencies: 'None',
    pelaku: 'Pengunjung Rombongan'
  },
  {
    id: 'f-02',
    fitur: 'Katalog Bus Dinamis Berfilter',
    kategori: 'Website Publik',
    deskripsi: 'Menampilkan bus dari database dengan card ber-border melengkung indah (rounded-3xl) dan transisi smooth. Pengguna bisa memfilter berdasarkan tipe/kapasitas secara instan.',
    prioritas: 'Must-Have',
    dependencies: 'Database Fleet Armada',
    pelaku: 'Pengunjung / Calon Penyewa'
  },
  {
    id: 'f-03',
    fitur: 'Direct WhatsApp Booking Integration',
    kategori: 'Website Publik',
    deskripsi: 'Mengalihkan penayangan nomor HP individual ke interaksi langsung WhatsApp dengan template pesan pre-filled cerdas sesuai minat klik pengunjung.',
    prioritas: 'Must-Have',
    dependencies: 'WhatsApp API Link-generator',
    pelaku: 'Pengunjung & Admin Sales'
  },
  {
    id: 'f-04',
    fitur: 'Dynamic Blog Section',
    kategori: 'Website Publik',
    deskripsi: 'Membaca artikel SEO yang ditulis oleh admin secara dinamis lengkap dengan pembacaan views, cover gambar berskala, dan styling markdown.',
    prioritas: 'Should-Have',
    dependencies: 'CRUD Konten Blog',
    pelaku: 'Pembaca / Pengunjung'
  },
  {
    id: 'f-05',
    fitur: 'Form Kontak Umum Terintegrasi',
    kategori: 'Website Publik',
    deskripsi: 'Mengakomodasi formulir masukan calon pelanggan berkebutuhan sewa rombongan korporat besar untuk disimpan ke inbox database admin.',
    prioritas: 'Must-Have',
    dependencies: 'Inbox Service / LocalStorage',
    pelaku: 'Pengunjung & Admin Hubungan'
  },
  {
    id: 'f-06',
    fitur: 'CRUD Manajemen Armada Bus',
    kategori: 'Admin Panel',
    deskripsi: 'Form penambahan armada baru, pengunggahan foto ilustratif, pengaturan kapasitas, pelabelan AC/Non-AC/Toilet, penyesuaian harga sewa, dan modul set status (Tersedia, Disewa, Perbaikan).',
    prioritas: 'Must-Have',
    dependencies: 'Data State Global',
    pelaku: 'Administrator'
  },
  {
    id: 'f-07',
    fitur: 'CRUD Manajemen Artikel Blog',
    kategori: 'Admin Panel',
    deskripsi: 'Editor kaya teks (Rich Metadata / Rich text Markdown support) buat mempublikasikan draf penulisan tips panduan wisata serta pengunggahan foto cover.',
    prioritas: 'Should-Have',
    dependencies: 'Data State Global',
    pelaku: 'Content Administrator'
  },
  {
    id: 'f-08',
    fitur: 'Manajemen Banner Iklan & Promo',
    kategori: 'Admin Panel',
    deskripsi: 'Mengatur penayangan gambar promo di landing page utama guna memaksimalkan conversion rate kunjungan hari raya sekolah.',
    prioritas: 'Nice-to-Have',
    dependencies: 'None',
    pelaku: 'Marketing Administrator'
  },
  {
    id: 'f-09',
    fitur: 'Dashboard Analytics Interaktif',
    kategori: 'Admin Panel',
    deskripsi: 'Grafik pengunjung web harian, total klik chat WhatsApp, and visitor trends yang disajikan dengan Recharts bergaya modern.',
    prioritas: 'Should-Have',
    dependencies: 'Recharts library',
    pelaku: 'System Owner / Marketing'
  },
  {
    id: 'f-10',
    fitur: 'Manajemen Kotak Masuk (Inbox) Pelanggan',
    kategori: 'Admin Panel',
    deskripsi: 'Menelusuri pesan formulir tanya-jawab sewa bus masuk, membaca isinya, menandai status telah dibaca/diproses, dan follow-up langsung.',
    prioritas: 'Must-Have',
    dependencies: 'Form Kontak Publik',
    pelaku: 'Customer Service Admin'
  }
];

export const initialPhotos: VehiclePhoto[] = [
  { id: 'photo-1', foto: bus31Seat },
  { id: 'photo-2', foto: bus35Seat },
  { id: 'photo-3', foto: bus50Seat },
  { id: 'photo-4', foto: bus59Seat },
  { id: 'photo-5', foto: elfLong },
  { id: 'photo-6', foto: hiaceLuxury },
  { id: 'photo-7', foto: hiaceStandart }
];

export const initialHeroBackgrounds: HeroBackground[] = [
  { id: 'bg-1', foto: baliImg, isActive: true },
  { id: 'bg-2', foto: borobudurImg, isActive: true },
  { id: 'bg-3', foto: gunungImg, isActive: true },
  { id: 'bg-4', foto: prambananImg, isActive: true },
  { id: 'bg-5', foto: rajaAmpatImg, isActive: true }
];

