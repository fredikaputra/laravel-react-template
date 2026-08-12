self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('offline-html-pages').then((cache) => {
            return cache
                .addAll([
                    '/',
                    '/login',
                    '/register',
                    '/dashboard',
                    '/settings/profile',
                    '/settings/password',
                    '/settings/two-factor',
                    '/settings/appearance',
                ])
                .catch(() => {});
        }),
    );
});
