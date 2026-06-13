<?php
/**
 * Database Migration Script
 * Mengubah kolom `foto` pada tabel buses, blogs, dan banners menjadi LONGTEXT
 * agar dapat menampung payload Base64 gambar tanpa terpotong.
 */
require_once __DIR__ . '/config.php';
$db = getDB();

$queries = [
    "ALTER TABLE buses MODIFY COLUMN foto LONGTEXT NOT NULL",
    "ALTER TABLE blogs MODIFY COLUMN foto LONGTEXT NOT NULL",
    "ALTER TABLE banners MODIFY COLUMN foto LONGTEXT NOT NULL"
];

$results = [];
foreach ($queries as $q) {
    $ok = $db->query($q);
    $results[$q] = $ok ? "SUKSES" : "GAGAL: " . $db->error;
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode([
    'status' => 'Selesai',
    'hasil' => $results
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
