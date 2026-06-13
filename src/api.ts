/**
 * API Client — menghubungkan React ke PHP backend di Rumahweb
 * Ganti BASE_URL sesuai domain kamu setelah upload ke hosting
 */

export const BASE_URL = (import.meta as any).env?.VITE_API_URL ?? '/api';

async function request<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: object,
  params?: Record<string, string>
): Promise<T> {
  // Kalau BASE_URL relatif (/api), gunakan langsung tanpa origin
  const base = BASE_URL.startsWith('http') ? BASE_URL : window.location.origin + BASE_URL;
  const url = new URL(`${base}/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    throw new Error('API return non-JSON format (HTML/text). Make sure PHP server is running and VITE_API_URL in .env is correct.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error ?? `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── UPLOAD IMAGE ───────────────────────────────────────────────
/**
 * Upload gambar ke server via multipart/form-data
 * Return URL path gambar yang tersimpan di server
 * Fallback ke base64 jika upload gagal
 */
export async function uploadImage(
  file: File,
  options?: { maxWidth?: number; quality?: number }
): Promise<string> {
  const base = BASE_URL.startsWith('http') ? BASE_URL : window.location.origin + BASE_URL;
  const url = `${base}/upload.php`;

  const formData = new FormData();
  formData.append('image', file);
  if (options?.maxWidth) formData.append('maxWidth', String(options.maxWidth));
  if (options?.quality) formData.append('quality', String(options.quality));

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
      // Jangan set Content-Type header, biarkan browser set boundary otomatis
    });

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new Error('Upload API returned non-JSON response');
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? `Upload failed (HTTP ${res.status})`);
    }

    return data.url;
  } catch (err) {
    console.warn('File upload gagal, fallback ke base64:', err);
    // Fallback: konversi ke base64 di browser
    return fileToBase64(file);
  }
}

/**
 * Upload gambar base64 ke server (untuk foto yang sudah di-compress di browser)
 * Return URL path jika berhasil, atau kembalikan base64 asli jika gagal
 */
export async function uploadBase64Image(
  base64: string,
  options?: { maxWidth?: number; quality?: number }
): Promise<string> {
  // Jika bukan base64, kembalikan apa adanya (sudah URL)
  if (!base64.startsWith('data:image/')) {
    return base64;
  }

  const base = BASE_URL.startsWith('http') ? BASE_URL : window.location.origin + BASE_URL;
  const url = `${base}/upload.php`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        base64,
        maxWidth: options?.maxWidth ?? 1200,
        quality: options?.quality ?? 80,
      }),
    });

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      throw new Error('Upload API returned non-JSON response');
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error ?? `Upload failed (HTTP ${res.status})`);
    }

    return data.url;
  } catch (err) {
    console.warn('Base64 upload gagal, gunakan base64 asli:', err);
    return base64; // Fallback: pakai base64 asli
  }
}

/**
 * Konversi File ke base64 string (fallback jika server upload gagal)
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── BUSES ──────────────────────────────────────────────────
export const apiBuses = {
  getAll: ()                    => request<any[]>('buses.php'),
  create: (data: object)        => request<any>('buses.php', 'POST', data),
  update: (id: string, data: object) => request<any>('buses.php', 'PUT', data, { id }),
  remove: (id: string)          => request<any>('buses.php', 'DELETE', undefined, { id }),
};

// ── BLOGS ──────────────────────────────────────────────────
export const apiBlogs = {
  getAll:        ()                    => request<any[]>('blogs.php', 'GET', undefined, { all: '1' }),
  getPublished:  ()                    => request<any[]>('blogs.php'),
  create:        (data: object)        => request<any>('blogs.php', 'POST', data),
  update:        (id: string, data: object) => request<any>('blogs.php', 'PUT', data, { id }),
  remove:        (id: string)          => request<any>('blogs.php', 'DELETE', undefined, { id }),
  incrementView: (id: string)          => request<any>('blogs.php', 'PUT', { incrementViews: true }, { id }),
};

// ── BANNERS ────────────────────────────────────────────────
export const apiBanners = {
  getAll:         ()                    => request<any[]>('banners.php', 'GET', undefined, { all: '1' }),
  getActive:      ()                    => request<any[]>('banners.php'),
  create:         (data: object)        => request<any>('banners.php', 'POST', data),
  update:         (id: string, data: object) => request<any>('banners.php', 'PUT', data, { id }),
  remove:         (id: string)          => request<any>('banners.php', 'DELETE', undefined, { id }),
  toggleStatus:   (id: string)          => request<any>('banners.php', 'PUT', { toggleStatus: true }, { id }),
  incrementKlik:  (id: string)          => request<any>('banners.php', 'PUT', { incrementKlik: true }, { id }),
};

// ── MESSAGES ───────────────────────────────────────────────
export const apiMessages = {
  getAll:       ()              => request<any[]>('messages.php'),
  create:       (data: object)  => request<any>('messages.php', 'POST', data),
  toggleDibaca: (id: string)    => request<any>('messages.php', 'PUT', { toggleDibaca: true }, { id }),
  remove:       (id: string)    => request<any>('messages.php', 'DELETE', undefined, { id }),
};

// ── PHOTOS ─────────────────────────────────────────────────
export const apiPhotos = {
  getAll: ()                    => request<any[]>('photos.php'),
  create: (data: object)        => request<any>('photos.php', 'POST', data),
  update: (id: string, data: object) => request<any>('photos.php', 'PUT', data, { id }),
  remove: (id: string)          => request<any>('photos.php', 'DELETE', undefined, { id }),
};

// ── BACKGROUNDS ────────────────────────────────────────────
export const apiBackgrounds = {
  getAll: ()                    => request<any[]>('backgrounds.php'),
  create: (data: object)        => request<any>('backgrounds.php', 'POST', data),
  update: (id: string, data: object) => request<any>('backgrounds.php', 'PUT', data, { id }),
  toggleActive: (id: string)    => request<any>('backgrounds.php', 'PUT', { toggleActive: true }, { id }),
  remove: (id: string)          => request<any>('backgrounds.php', 'DELETE', undefined, { id }),
};

// ── STATS ──────────────────────────────────────────────────
export const apiStats = {
  getAll:    ()                                                           => request<any[]>('stats.php'),
  increment: (type: 'views' | 'bookingDirect' | 'kontakFormSubmit')     => request<any>('stats.php', 'POST', { type }),
};
