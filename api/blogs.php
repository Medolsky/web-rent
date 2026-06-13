<?php
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;
$all    = ($_GET['all'] ?? '0') === '1';

switch ($method) {

    case 'GET':
        if ($id) {
            $blog = fetchOne($db, "SELECT * FROM blogs WHERE id=?", [$id], 's');
            if (!$blog) sendJSON(['error' => 'Blog not found'], 404);
            $blog['views'] = (int)$blog['views'];
            sendJSON($blog); // sendJSON calls exit(), so this is safe
        }
        if ($all) {
            $rows = fetchAll($db, "SELECT * FROM blogs ORDER BY tanggal DESC");
        } else {
            $rows = fetchAll($db, "SELECT * FROM blogs WHERE status='Diterbitkan' ORDER BY tanggal DESC");
        }
        foreach ($rows as &$r) $r['views'] = (int)$r['views'];
        sendJSON($rows);
        break;

    case 'POST':
        $d = getBody();
        if (empty($d['judul'])) sendJSON(['error' => 'Judul wajib'], 422);
        $newId  = 'blog-' . time() . '-' . rand(100, 999);
        $tgl    = $d['tanggal'] ?? date('Y-m-d');
        $status = $d['status'] ?? 'Diterbitkan';
        execute($db,
            "INSERT INTO blogs (id,judul,ringkasan,konten,tanggal,penulis,foto,status,views) VALUES (?,?,?,?,?,?,?,?,0)",
            [$newId, $d['judul'], $d['ringkasan']??'', $d['konten']??'', $tgl, $d['penulis']??'', $d['foto']??'', $status],
            'ssssssss'
        );
        sendJSON(['success' => true, 'id' => $newId], 201);
        break;

    case 'PUT':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        $d = getBody();
        // FIXED: incrementViews now properly breaks to avoid falling through to general UPDATE
        if (!empty($d['incrementViews'])) {
            execute($db, "UPDATE blogs SET views=views+1 WHERE id=?", [$id], 's');
            sendJSON(['success' => true]);
            break;
        }
        if (empty($d['judul'])) sendJSON(['error' => 'Judul wajib untuk update'], 422);
        $status = $d['status'] ?? 'Diterbitkan';
        execute($db,
            "UPDATE blogs SET judul=?,ringkasan=?,konten=?,penulis=?,foto=?,status=?,updated_at=NOW() WHERE id=?",
            [$d['judul'], $d['ringkasan']??'', $d['konten']??'', $d['penulis']??'', $d['foto']??'', $status, $id],
            'sssssss'
        );
        sendJSON(['success' => true]);
        break;

    case 'DELETE':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        execute($db, "DELETE FROM blogs WHERE id=?", [$id], 's');
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
