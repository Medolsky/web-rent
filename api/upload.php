<?php
/**
 * API Upload Gambar
 * Endpoint untuk upload file gambar via multipart/form-data
 * Menyimpan file ke folder uploads/ dan return URL path
 * 
 * POST /api/upload.php
 * - Form field: "image" (file)
 * - Optional: "maxWidth" (int, default 1200)
 * - Optional: "quality" (int 1-100, default 80)
 * 
 * Response: { "success": true, "url": "/api/uploads/filename.jpg" }
 */
require_once __DIR__ . '/config.php';

// Hanya izinkan POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJSON(['error' => 'Method not allowed'], 405);
}

// Cek apakah ada file yang diupload
if (empty($_FILES['image'])) {
    // Fallback: cek apakah ada base64 di body JSON
    $body = getBody();
    if (!empty($body['base64'])) {
        // Konversi base64 ke file
        $base64 = $body['base64'];
        $maxWidth = (int)($body['maxWidth'] ?? 1200);
        $quality = (int)($body['quality'] ?? 80);
        
        // Validasi format base64
        if (!preg_match('/^data:image\/(jpeg|jpg|png|webp|gif);base64,/', $base64, $matches)) {
            sendJSON(['error' => 'Format base64 tidak valid. Harus berupa gambar (jpeg/png/webp/gif).'], 422);
        }
        
        $mimeExt = $matches[1] === 'jpg' ? 'jpeg' : $matches[1];
        $imageData = base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $base64));
        
        if ($imageData === false) {
            sendJSON(['error' => 'Gagal decode base64'], 422);
        }
        
        // Simpan ke file temp, lalu proses
        $tempPath = sys_get_temp_dir() . '/upload_' . uniqid() . '.' . $mimeExt;
        file_put_contents($tempPath, $imageData);
        
        $result = processAndSaveImage($tempPath, $mimeExt, $maxWidth, $quality);
        unlink($tempPath); // Hapus file temp
        
        if ($result['error']) {
            sendJSON(['error' => $result['error']], 500);
        }
        sendJSON(['success' => true, 'url' => $result['url']], 201);
    }
    
    sendJSON(['error' => 'Tidak ada file gambar yang diupload. Gunakan form field "image" atau kirim JSON {"base64": "data:image/..."}'], 422);
}

$file = $_FILES['image'];
$maxWidth = (int)($_POST['maxWidth'] ?? 1200);
$quality = (int)($_POST['quality'] ?? 80);

// Validasi error upload
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File terlalu besar (melebihi batas server)',
        UPLOAD_ERR_FORM_SIZE => 'File terlalu besar (melebihi batas form)',
        UPLOAD_ERR_PARTIAL => 'File hanya terupload sebagian',
        UPLOAD_ERR_NO_FILE => 'Tidak ada file yang diupload',
        UPLOAD_ERR_NO_TMP_DIR => 'Folder temporary tidak ditemukan',
        UPLOAD_ERR_CANT_WRITE => 'Gagal menulis file ke disk',
    ];
    $msg = $errorMessages[$file['error']] ?? 'Upload error (code: ' . $file['error'] . ')';
    sendJSON(['error' => $msg], 422);
}

// Validasi ukuran file (max 10MB)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    sendJSON(['error' => 'File terlalu besar. Maksimum 10MB.'], 422);
}

// Validasi MIME type
$allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

if (!in_array($mimeType, $allowedMimes)) {
    sendJSON(['error' => 'Tipe file tidak diizinkan. Hanya JPEG, PNG, WebP, dan GIF.'], 422);
}

// Map MIME to extension
$extMap = [
    'image/jpeg' => 'jpeg',
    'image/png' => 'png',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];
$ext = $extMap[$mimeType] ?? 'jpeg';

$result = processAndSaveImage($file['tmp_name'], $ext, $maxWidth, $quality);

if ($result['error']) {
    sendJSON(['error' => $result['error']], 500);
}

sendJSON(['success' => true, 'url' => $result['url']], 201);


// ── Helper Functions ────────────────────────────────────────────────────────

/**
 * Process (resize/compress) and save an image file
 */
function processAndSaveImage(string $sourcePath, string $ext, int $maxWidth = 1200, int $quality = 80): array {
    $uploadDir = __DIR__ . '/uploads';
    
    // Buat folder uploads jika belum ada
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            return ['error' => 'Gagal membuat folder uploads', 'url' => ''];
        }
        // Buat .htaccess untuk keamanan
        file_put_contents($uploadDir . '/.htaccess', 
            "Options -Indexes\n" .
            "# Blokir eksekusi PHP di folder uploads\n" .
            "<FilesMatch \"\\.(php|phtml|php3|php4|php5|php7|phps|pht|phar)$\">\n" .
            "    Order Allow,Deny\n" .
            "    Deny from all\n" .
            "</FilesMatch>\n" .
            "# Izinkan akses langsung ke file gambar\n" .
            "<FilesMatch \"\\.(jpg|jpeg|png|gif|webp)$\">\n" .
            "    Order Allow,Deny\n" .
            "    Allow from all\n" .
            "</FilesMatch>\n"
        );
        // Buat index.html kosong
        file_put_contents($uploadDir . '/index.html', '');
    }
    
    // Generate nama file unik
    $filename = date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.jpeg';
    $destPath = $uploadDir . '/' . $filename;
    
    // Cek apakah GD library tersedia
    if (function_exists('imagecreatefrompng')) {
        // Load image berdasarkan tipe
        $source = null;
        switch ($ext) {
            case 'jpeg':
            case 'jpg':
                $source = @imagecreatefromjpeg($sourcePath);
                break;
            case 'png':
                $source = @imagecreatefrompng($sourcePath);
                break;
            case 'webp':
                if (function_exists('imagecreatefromwebp')) {
                    $source = @imagecreatefromwebp($sourcePath);
                }
                break;
            case 'gif':
                $source = @imagecreatefromgif($sourcePath);
                break;
        }
        
        if ($source) {
            $origWidth = imagesx($source);
            $origHeight = imagesy($source);
            
            // Resize jika perlu
            if ($origWidth > $maxWidth) {
                $newWidth = $maxWidth;
                $newHeight = (int)round(($maxWidth / $origWidth) * $origHeight);
                
                $resized = imagecreatetruecolor($newWidth, $newHeight);
                // Preserve transparency for PNG
                imagealphablending($resized, false);
                imagesavealpha($resized, true);
                imagecopyresampled($resized, $source, 0, 0, 0, 0, $newWidth, $newHeight, $origWidth, $origHeight);
                imagedestroy($source);
                $source = $resized;
            }
            
            // Simpan sebagai JPEG terkompresi
            $quality = max(1, min(100, $quality));
            imagejpeg($source, $destPath, $quality);
            imagedestroy($source);
        } else {
            // GD gagal memproses, simpan file asli
            if (!copy($sourcePath, $destPath)) {
                return ['error' => 'Gagal menyimpan file', 'url' => ''];
            }
        }
    } else {
        // GD tidak tersedia, simpan file asli apa adanya
        if (!copy($sourcePath, $destPath)) {
            return ['error' => 'Gagal menyimpan file', 'url' => ''];
        }
    }
    
    // Return relative URL (dari root domain)
    $url = '/api/uploads/' . $filename;
    
    return ['error' => null, 'url' => $url];
}
