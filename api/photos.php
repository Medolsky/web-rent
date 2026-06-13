<?php
/**
 * API Pustaka Foto Kendaraan
 * Menangani pengambilan, penambahan, dan penghapusan foto kendaraan
 */
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

switch ($method) {

    case 'GET':
        $photos = fetchAll($db, "SELECT * FROM vehicle_photos ORDER BY created_at DESC");
        sendJSON($photos);
        break;

    case 'POST':
        $d = getBody();
        if (empty($d['foto'])) {
            sendJSON(['error' => 'Foto wajib diisi'], 422);
        }
        $newId = 'photo-' . time() . '-' . rand(100, 999);
        execute($db,
            "INSERT INTO vehicle_photos (id, foto) VALUES (?, ?)",
            [$newId, $d['foto']],
            'ss'
        );
        sendJSON(['success' => true, 'id' => $newId, 'foto' => $d['foto']], 201);
        break;

    case 'PUT':
        if (!$id) {
            sendJSON(['error' => 'ID diperlukan'], 400);
        }
        $d = getBody();
        if (empty($d['foto'])) {
            sendJSON(['error' => 'Foto wajib diisi'], 422);
        }
        execute($db, "UPDATE vehicle_photos SET foto = ? WHERE id = ?", [$d['foto'], $id], 'ss');
        sendJSON(['success' => true]);
        break;

    case 'DELETE':
        if (!$id) {
            sendJSON(['error' => 'ID diperlukan'], 400);
        }
        execute($db, "DELETE FROM vehicle_photos WHERE id=?", [$id], 's');
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
