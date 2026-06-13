<?php
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;
$all    = ($_GET['all'] ?? '0') === '1';

switch ($method) {

    case 'GET':
        if ($id) {
            $banner = fetchOne($db, "SELECT * FROM banners WHERE id=?", [$id], 's');
            if (!$banner) sendJSON(['error' => 'Banner not found'], 404);
            $banner['klikCount'] = (int)$banner['klik_count'];
            sendJSON($banner); // sendJSON calls exit()
        }
        if ($all) {
            $rows = fetchAll($db, "SELECT * FROM banners ORDER BY created_at DESC");
        } else {
            $rows = fetchAll($db, "SELECT * FROM banners WHERE status='Aktif' ORDER BY created_at DESC");
        }
        foreach ($rows as &$r) $r['klikCount'] = (int)$r['klik_count'];
        sendJSON($rows);
        break;

    case 'POST':
        $d      = getBody();
        if (empty($d['judul'])) sendJSON(['error' => 'Judul wajib'], 422);
        $newId  = 'banner-' . time() . '-' . rand(100, 999);
        $posisi = $d['posisi'] ?? 'Hero Promo';
        $status = $d['status'] ?? 'Aktif';
        execute($db,
            "INSERT INTO banners (id,judul,deskripsi,foto,link,posisi,status,klik_count) VALUES (?,?,?,?,?,?,?,0)",
            [$newId, $d['judul'], $d['deskripsi']??'', $d['foto']??'', $d['link']??'', $posisi, $status],
            'sssssss'
        );
        sendJSON(['success' => true, 'id' => $newId], 201);
        break;

    case 'PUT':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        $d = getBody();

        // FIXED: each special action now properly breaks
        if (!empty($d['incrementKlik'])) {
            execute($db, "UPDATE banners SET klik_count=klik_count+1 WHERE id=?", [$id], 's');
            sendJSON(['success' => true]);
            break;
        }

        if (!empty($d['toggleStatus'])) {
            execute($db, "UPDATE banners SET status=IF(status='Aktif','Nonaktif','Aktif'),updated_at=NOW() WHERE id=?", [$id], 's');
            sendJSON(['success' => true]);
            break;
        }

        // General update — requires judul
        if (empty($d['judul'])) sendJSON(['error' => 'Judul wajib untuk update'], 422);
        $posisi = $d['posisi'] ?? 'Hero Promo';
        $status = $d['status'] ?? 'Aktif';
        execute($db,
            "UPDATE banners SET judul=?,deskripsi=?,foto=?,link=?,posisi=?,status=?,updated_at=NOW() WHERE id=?",
            [$d['judul'], $d['deskripsi']??'', $d['foto']??'', $d['link']??'', $posisi, $status, $id],
            'sssssss'
        );
        sendJSON(['success' => true]);
        break;

    case 'DELETE':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        execute($db, "DELETE FROM banners WHERE id=?", [$id], 's');
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
