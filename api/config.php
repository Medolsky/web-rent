<?php
/**
 * Konfigurasi koneksi database MySQL - MySQLi
 * Rumahweb Shared Hosting
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'abbz9241_abbatadbadminabbata');
define('DB_USER', 'abbz9241_adminabbata123');
define('DB_PASS', 'abbata.com');

// CORS
$allowed_origins = [
    'https://abbata.com',
    'https://www.abbata.com',
    'http://localhost:5173',
    'http://localhost:4173',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *");
}
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Koneksi MySQLi
function getDB(): mysqli {
    static $db = null;
    if ($db === null) {
        $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        if ($db->connect_error) {
            http_response_code(500);
            echo json_encode(['error' => 'DB connection failed: ' . $db->connect_error]);
            exit();
        }
        $db->set_charset('utf8mb4');
    }
    return $db;
}

function sendJSON($data, int $code = 200): void {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

function getBody(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

function fetchAll(mysqli $db, string $sql, array $params = [], string $types = ''): array {
    if (empty($params)) {
        $result = $db->query($sql);
        if (!$result) sendJSON(['error' => $db->error], 500);
        $rows = [];
        while ($row = $result->fetch_assoc()) $rows[] = $row;
        return $rows;
    }
    $stmt = $db->prepare($sql);
    if (!$stmt) sendJSON(['error' => $db->error], 500);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) $rows[] = $row;
    $stmt->close();
    return $rows;
}

function fetchOne(mysqli $db, string $sql, array $params = [], string $types = ''): ?array {
    $rows = fetchAll($db, $sql, $params, $types);
    return $rows[0] ?? null;
}

function execute(mysqli $db, string $sql, array $params = [], string $types = ''): bool {
    if (empty($params)) {
        $result = $db->query($sql);
        if (!$result) sendJSON(['error' => $db->error], 500);
        return true;
    }
    $stmt = $db->prepare($sql);
    if (!$stmt) sendJSON(['error' => $db->error], 500);
    $stmt->bind_param($types, ...$params);
    $ok = $stmt->execute();
    if (!$ok) sendJSON(['error' => $stmt->error], 500);
    $stmt->close();
    return true;
}
