<?php
/**
 * API Background Hero Landing Page
 * Menangani pengambilan, penambahan, pengubahan status aktif, dan penghapusan background hero
 */
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];
$id     = $_GET['id'] ?? null;

switch ($method) {

    case 'GET':
        $backgrounds = fetchAll($db, "SELECT * FROM hero_backgrounds ORDER BY created_at DESC");
        // Cast is_active to int/bool in JSON response
        foreach ($backgrounds as &$bg) {
            $bg['is_active'] = (int)$bg['is_active'];
        }
        sendJSON($backgrounds);
        break;

    case 'POST':
        $d = getBody();
        if (empty($d['foto'])) {
            sendJSON(['error' => 'Foto wajib diisi'], 422);
        }
        $newId = 'bg-' . time() . '-' . rand(100, 999);
        $isActive = isset($d['isActive']) ? ($d['isActive'] ? 1 : 0) : 1;
        execute($db,
            "INSERT INTO hero_backgrounds (id, foto, is_active) VALUES (?, ?, ?)",
            [$newId, $d['foto'], $isActive],
            'ssi'
        );
        sendJSON(['success' => true, 'id' => $newId, 'foto' => $d['foto'], 'is_active' => $isActive], 201);
        break;

    case 'PUT':
        if (!$id) {
            sendJSON(['error' => 'ID diperlukan'], 400);
        }
        $d = getBody();
        if (!empty($d['toggleActive'])) {
            execute($db, "UPDATE hero_backgrounds SET is_active = IF(is_active = 1, 0, 1) WHERE id = ?", [$id], 's');
            sendJSON(['success' => true]);
            break; // FIXED: prevent fallthrough
        }
        if (!empty($d['foto'])) {
            execute($db, "UPDATE hero_backgrounds SET foto = ? WHERE id = ?", [$d['foto'], $id], 'ss');
            sendJSON(['success' => true]);
            break;
        }
        sendJSON(['error' => 'Aksi update tidak valid'], 400);
        break;

    case 'DELETE':
        if (!$id) {
            sendJSON(['error' => 'ID diperlukan'], 400);
        }
        execute($db, "DELETE FROM hero_backgrounds WHERE id=?", [$id], 's');
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
