<?php
require_once __DIR__ . '/config.php';

$db     = getDB();
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':
        $rows = fetchAll($db, "SELECT * FROM visitor_stats ORDER BY id ASC LIMIT 30");
        foreach ($rows as &$r) {
            $r['views']             = (int)$r['views'];
            $r['pengunjungUtama']   = (int)$r['pengunjung_utama'];
            $r['bookingDirect']     = (int)$r['booking_direct'];
            $r['kontakFormSubmit']  = (int)$r['kontak_form_submit'];
        }
        sendJSON($rows);
        break;

    case 'POST':
        $d    = getBody();
        $type = $d['type'] ?? '';

        $allowed = ['views', 'bookingDirect', 'kontakFormSubmit'];
        if (!in_array($type, $allowed)) sendJSON(['error' => 'Tipe tidak valid'], 422);

        $today = date('d M');

        // Check if this is a unique visitor today using cookie
        $isUnique = false;
        if ($type === 'views') {
            if (!isset($_COOKIE['abbata_visited_today'])) {
                $isUnique = true;
                // Set cookie to expire at midnight
                $expiry = time() + (86400 - (time() % 86400));
                setcookie('abbata_visited_today', '1', $expiry, '/');
            }
        }

        $existing = fetchOne($db, "SELECT id FROM visitor_stats WHERE tanggal=?", [$today], 's');

        if ($existing) {
            if ($type === 'views') {
                if ($isUnique) {
                    execute($db, "UPDATE visitor_stats SET views=views+1, pengunjung_utama=pengunjung_utama+1 WHERE tanggal=?", [$today], 's');
                } else {
                    execute($db, "UPDATE visitor_stats SET views=views+1 WHERE tanggal=?", [$today], 's');
                }
            } else {
                $col = 'booking_direct';
                if ($type === 'kontakFormSubmit') $col = 'kontak_form_submit';
                execute($db, "UPDATE visitor_stats SET $col=$col+1 WHERE tanggal=?", [$today], 's');
            }
        } else {
            $v = $type === 'views'            ? 1 : 0;
            $u = $isUnique                    ? 1 : 0;
            $b = $type === 'bookingDirect'    ? 1 : 0;
            $k = $type === 'kontakFormSubmit' ? 1 : 0;
            execute($db,
                "INSERT INTO visitor_stats (tanggal,views,pengunjung_utama,booking_direct,kontak_form_submit) VALUES (?,?,?,?,?)",
                [$today, $v, $u, $b, $k],
                'siiii'
            );
        }
        sendJSON(['success' => true]);
        break;

    default:
        sendJSON(['error' => 'Method not allowed'], 405);
}
