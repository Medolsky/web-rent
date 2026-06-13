<?php
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

switch ($method) {

    case 'GET':
        $rows = fetchAll($db, "SELECT * FROM messages ORDER BY tanggal DESC");
        foreach ($rows as &$r) $r['dibaca'] = (bool)$r['dibaca'];
        sendJSON($rows);
        break;

    case 'POST':
        $d = getBody();
        if (empty($d['nama']) || empty($d['pesan'])) sendJSON(['error' => 'Nama dan pesan wajib'], 422);
        $newId = 'msg-' . time() . '-' . rand(100, 999);
        $tgl   = date('Y-m-d H:i:s');
        execute($db,
            "INSERT INTO messages (id,nama,email,telepon,subjek,pesan,tanggal,dibaca) VALUES (?,?,?,?,?,?,?,0)",
            [$newId, $d['nama'], $d['email']??'', $d['telepon']??'', $d['subjek']??'Pertanyaan Sewa Bus', $d['pesan'], $tgl],
            'sssssss'
        );
        sendJSON(['success' => true, 'id' => $newId], 201);
        break;

    case 'PUT':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        $d = getBody();
        if (!empty($d['toggleDibaca'])) {
            execute($db, "UPDATE messages SET dibaca=IF(dibaca=1,0,1) WHERE id=?", [$id], 's');
            sendJSON(['success' => true]);
            break; // FIXED: prevent fallthrough to error
        }
        sendJSON(['error' => 'Action tidak dikenal'], 400);
        break;

    case 'DELETE':
        if (!$id) sendJSON(['error' => 'ID diperlukan'], 400);
        execute($db, "DELETE FROM messages WHERE id=?", [$id], 's');
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
