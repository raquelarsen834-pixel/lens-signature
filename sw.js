// 镜头签 Service Worker - 离线缓存 + APP 体验
const CACHE_NAME = 'lens-signature-v2';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

// Install: 预缓存核心资源
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(ASSETS.map(url =>
                cache.add(url).catch(() => console.warn('SW cache skip:', url))
            ));
        })
    );
    self.skipWaiting();
});

// Activate: 清理旧缓存
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: 缓存优先，网络回退
self.addEventListener('fetch', (e) => {
    // 跳过非 GET 请求和 Chrome 扩展
    if (e.request.method !== 'GET') return;
    if (e.request.url.startsWith('chrome-extension://')) return;

    // 对于 MediaPipe WASM/模型文件，使用网络优先（需要最新版本）
    if (e.request.url.includes('mediapipe') || e.request.url.includes('jsdelivr')) {
        e.respondWith(
            fetch(e.request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                return response;
            }).catch(() => caches.match(e.request))
        );
        return;
    }

    // 其他资源：缓存优先
    e.respondWith(
        caches.match(e.request).then(cached =>
            cached || fetch(e.request).then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
                return response;
            })
        )
    );
});
