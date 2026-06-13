-- ============================================================
-- DATABASE SCHEMA — ABBATA WISATA
-- Import file ini di phpMyAdmin Rumahweb
-- Database: abbatadbadminabbata
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------------
-- Table: buses (Armada Bus)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `buses` (
  `id`          VARCHAR(50)   NOT NULL,
  `nama`        VARCHAR(255)  NOT NULL,
  `kategori`    ENUM('City Car','Mini Bus','Medium Bus','Big Bus') NOT NULL DEFAULT 'Big Bus',
  `kapasitas`   INT           NOT NULL DEFAULT 30,
  `harga_sewa`  INT           NOT NULL DEFAULT 2000000,
  `fitur`       JSON          NOT NULL,
  `foto`        LONGTEXT      NOT NULL,
  `deskripsi`   TEXT          NOT NULL,
  `status`      ENUM('Tersedia','Disewa','Perbaikan') NOT NULL DEFAULT 'Tersedia',
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: blogs (Artikel Blog)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `blogs` (
  `id`          VARCHAR(50)   NOT NULL,
  `judul`       VARCHAR(500)  NOT NULL,
  `ringkasan`   TEXT          NOT NULL,
  `konten`      LONGTEXT      NOT NULL,
  `tanggal`     DATE          NOT NULL,
  `penulis`     VARCHAR(255)  NOT NULL,
  `foto`        LONGTEXT      NOT NULL,
  `status`      ENUM('Diterbitkan','Draf') NOT NULL DEFAULT 'Diterbitkan',
  `views`       INT           NOT NULL DEFAULT 0,
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: banners (Banner Iklan Promo)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `banners` (
  `id`          VARCHAR(50)   NOT NULL,
  `judul`       VARCHAR(255)  NOT NULL,
  `deskripsi`   TEXT          NOT NULL,
  `foto`        LONGTEXT      NOT NULL,
  `link`        TEXT          NOT NULL,
  `posisi`      ENUM('Hero Promo','Sidebar Blog','Footer Banner') NOT NULL DEFAULT 'Hero Promo',
  `status`      ENUM('Aktif','Nonaktif') NOT NULL DEFAULT 'Aktif',
  `klik_count`  INT           NOT NULL DEFAULT 0,
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: messages (Pesan Kontak Masuk)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `messages` (
  `id`        VARCHAR(50)   NOT NULL,
  `nama`      VARCHAR(255)  NOT NULL,
  `email`     VARCHAR(255)  NOT NULL DEFAULT '',
  `telepon`   VARCHAR(50)   NOT NULL DEFAULT '',
  `subjek`    VARCHAR(500)  NOT NULL DEFAULT '',
  `pesan`     TEXT          NOT NULL,
  `tanggal`   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dibaca`    TINYINT(1)    NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: visitor_stats (Statistik Pengunjung)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `visitor_stats` (
  `id`                  INT         NOT NULL AUTO_INCREMENT,
  `tanggal`             VARCHAR(20) NOT NULL,
  `views`               INT         NOT NULL DEFAULT 0,
  `pengunjung_utama`    INT         NOT NULL DEFAULT 0,
  `booking_direct`      INT         NOT NULL DEFAULT 0,
  `kontak_form_submit`  INT         NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tanggal` (`tanggal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: vehicle_photos (Pustaka Foto Kendaraan)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `vehicle_photos` (
  `id`          VARCHAR(50)   NOT NULL,
  `foto`        LONGTEXT      NOT NULL,
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: hero_backgrounds (Background Hero Landing Page)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `hero_backgrounds` (
  `id`          VARCHAR(50)   NOT NULL,
  `foto`        LONGTEXT      NOT NULL,
  `is_active`   TINYINT(1)    NOT NULL DEFAULT 1,
  `created_at`  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

