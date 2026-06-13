<?php
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

switch ($method) {

    case 'GET':
        if ($id) {
            $bus = fetchOne($db, "SELECT * FROM buses WHERE id = ?", [$id], 's');
            if (!$bus) sendJSON(['error' => 'Bus not found'], 404);
            $bus['fitur'] = json_decode($bus['fitur'], true) ?? [];
            $bus['kapasitas'] = (int)$bus['kapasitas'];
            $bus['hargaSewa'] = (int)$bus['harga_sewa'];
            sendJSON($bus); // sendJSON calls exit()
        }
        $buses = fetchAll($db, "SELECT * FROM buses ORDER BY created_at DESC");
        foreach ($buses as &$b) {
            $b['fitur']     = json_decode($b['fitur'], true) ?? [];
            $b['kapasitas'] = (int)$b['kapasitas'];
            $b['hargaSewa'] = (int)$b['harga_sewa'];
        }
        sendJSON($buses);
        break;

    case 'POST':
        $d = getBody();
        if (empty($d['nama']) || empty($d['kategori'])) sendJSON(['error' => 'Nama dan kategori wajib'], 422);
        $newId  = 'bus-' . time() . '-' . rand(100, 999);
        $fitur  = json_encode($d['fitur'] ?? [], JSON_UNESCAPED_UNICODE);
        $kap    = (int)($d['kapasitas'] ?? 30);
        $harga  = (int)($d['hargaSewa'] ?? 2000000);
        $status = $d['status'] ?? 'Tersedia';
        execute($db,
            "INSERT INTO buses (id,nama,kategori,kapasitas,harga_sewa,fitur,foto,deskripsi,status) VALUES (?,?,?,?,?,?,?,?,?)",
            [$newId, $d['nama'], $d['kategori'], $kap, $harga, $fitur, $d['foto']??'', $d['deskripsi']??'', $status],
            'sssiissss'
        );
        sendJSON(['success' => true, 'id' => $newId], 201);
        break;

    case 'PUT':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        $d      = getBody();
        $fitur  = json_encode($d['fitur'] ?? [], JSON_UNESCAPED_UNICODE);
        $kap    = (int)($d['kapasitas'] ?? 30);
        $harga  = (int)($d['hargaSewa'] ?? 2000000);
        $status = $d['status'] ?? 'Tersedia';
        execute($db,
            "UPDATE buses SET nama=?,kategori=?,kapasitas=?,harga_sewa=?,fitur=?,foto=?,deskripsi=?,status=?,updated_at=NOW() WHERE id=?",
            [$d['nama'], $d['kategori'], $kap, $harga, $fitur, $d['foto']??'', $d['deskripsi']??'', $status, $id],
            'ssiisssss'
        );
        sendJSON(['success' => true]);
        break;

    case 'DELETE':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        execute($db, "DELETE FROM buses WHERE id=?", [$id], 's');
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
