-- ============================================================
-- SEED DATA UPDATE — jalankan di phpMyAdmin
-- Update URL foto sesuai nama file hash dari Vite build
-- ============================================================

SET NAMES utf8mb4;

UPDATE `buses` SET foto = 'https://abbata.com/assets/bus-59-seat-B7SeYWX_.png'  WHERE id = 'bus-01';
UPDATE `buses` SET foto = 'https://abbata.com/assets/bus-59-seat-B7SeYWX_.png'  WHERE id = 'bus-02';
UPDATE `buses` SET foto = 'https://abbata.com/assets/bus-31-seat-BPajg1xo.png'  WHERE id = 'bus-03';
UPDATE `buses` SET foto = 'https://abbata.com/assets/hiace-luxury-1e6J3NWd.png' WHERE id = 'bus-04';
UPDATE `buses` SET foto = 'https://abbata.com/assets/bus-50-seat-DMC6kExH.jpg'  WHERE id = 'bus-05';
UPDATE `buses` SET foto = 'https://abbata.com/assets/elf-long-D7yEoSu4.png'     WHERE id = 'bus-06';
UPDATE `buses` SET foto = 'https://abbata.com/assets/bus-35-seat-Ckrn2jiR.png'  WHERE id = 'bus-07';
UPDATE `buses` SET foto = 'https://abbata.com/assets/hiace-standart-hw16JV_k.png' WHERE id = 'bus-08';
