import fs from 'node:fs';
import path from 'node:path';
import {wayfinder} from '@laravel/vite-plugin-wayfinder';
import inertia from '@inertiajs/vite';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {loadEnv} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import {defineConfig} from 'vite-plus';
import manifestSRI from 'vite-plugin-manifest-sri';

const manifestIcons = [
    {
        src: '/pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
    },
    {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
    },
    {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
    },
    {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
    },
];

const publicIcons = [
    {src: '/favicon.ico'},
    {src: '/favicon.svg'},
    {src: '/apple-touch-icon-180x180.png'},
];

const additionalImages: {src: string}[] = [
    {src: '/laravel-8.jpg'},
    {src: '/laravel-mobile.jpg'},
];

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        server: {
            port: env.VITE_PORT,
            hmr: {
                host: env.VITE_HMR_HOST,
                clientPort: env.VITE_HMR_CLIENT_PORT,
                protocol: env.VITE_HMR_PROTOCOL,
            },
        },
        lint: {
            options: {
                typeAware: true,
                typeCheck: true,
            },
            plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'react'],
            ignorePatterns: ['vite.config.ts'],
        },
        fmt: {
            printWidth: 80,
            tabWidth: 4,
            useTabs: false,
            semi: true,
            singleQuote: true,
            overrides: [
                {
                    files: ['**/*.yml'],
                    options: {
                        tabWidth: 2,
                    },
                },
            ],
            sortTailwindcss: {
                functions: ['clsx', 'cn'],
                stylesheet: 'resources/css/app.css',
            },
            sortImports: {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                newlinesBetween: false,
            },
            ignorePatterns: [
                'resources/js/components/ui/*',
                'resources/views/mail/*',
                'resources/js/actions/*',
                'resources/js/routes/*',
                'resources/js/wayfinder/*',
            ],
        },
        plugins: [
            laravel({
                input: ['resources/css/app.css', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            inertia({
                ssr: false,
            }),
            VitePWA({
                outDir: 'public',
                buildBase: '/',
                scope: '/',
                base: '/',
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: false,
                },
                includeAssets: [],
                workbox: {
                    inlineWorkboxRuntime: true,
                    globDirectory: 'public',
                    globPatterns: [
                        'build/assets/**/*.{js,css,html,ico,jpg,png,svg,woff,woff2,ttf,eot}',
                    ],
                    navigateFallback: null,
                    navigateFallbackDenylist: [/^\/telescope/],
                    additionalManifestEntries: [
                        ...manifestIcons.map((i) => ({
                            url: i.src,
                            revision: `${Date.now()}`,
                        })),
                        ...publicIcons.map((i) => ({
                            url: i.src,
                            revision: `${Date.now()}`,
                        })),
                        ...additionalImages.map((i) => ({
                            url: i.src,
                            revision: `${Date.now()}`,
                        })),
                    ],
                    runtimeCaching: [
                        {
                            urlPattern: ({ request, url }) => {
                                return (
                                    request.mode === 'navigate' &&
                                    !request.headers.get('X-Inertia') &&
                                    !request.headers.get('X-Inertia-Partial-Component') &&
                                    !url.pathname.startsWith('/telescope')
                                );
                            },
                            handler: 'CacheFirst',
                            options: {
                                cacheName: 'offline-html-pages',
                                expiration: {
                                    maxEntries: 30,
                                    maxAgeSeconds: 30 * 24 * 60 * 60,
                                },
                                cacheableResponse: {
                                    statuses: [0, 200],
                                },
                            },
                        },
                    ],
                    maximumFileSizeToCacheInBytes: 3000000,
                },
                manifest: {
                    name: env.VITE_APP_NAME || 'Laravel React Starter',
                    short_name: env.VITE_APP_NAME || 'Laravel React',
                    description: 'Laravel React PWA',
                    theme_color: '#ffffff',
                    background_color: '#ffffff',
                    orientation: 'portrait',
                    display: 'standalone',
                    scope: '/',
                    start_url: '/',
                    id: '/',
                    icons: [...manifestIcons],
                    screenshots: [
                        {
                            src: '/laravel-8.jpg',
                            sizes: '1100x624',
                            type: 'image/jpeg',
                            form_factor: 'wide',
                            label: 'Homescreen of Laravel React PWA (Desktop)',
                        },
                        {
                            src: '/laravel-mobile.jpg',
                            sizes: '353x566',
                            type: 'image/jpeg',
                            form_factor: 'narrow',
                            label: 'Homescreen of Laravel React PWA (Mobile)',
                        },
                    ],
                },
            }),
            react(),
            babel({
                presets: [reactCompilerPreset()],
            }),
            tailwindcss(),
            !env.CI && manifestSRI(),
            wayfinder({
                formVariants: true,
            }),
            {
                name: 'precache-html-routes',
                enforce: 'post',
                closeBundle() {
                    const swPath = path.resolve('public/sw.js');
                    const routesSwPath = path.resolve('resources/js/sw-routes.js');
                    if (fs.existsSync(swPath) && fs.existsSync(routesSwPath)) {
                        const content = fs.readFileSync(swPath, 'utf8');
                        const extra = fs.readFileSync(routesSwPath, 'utf8');
                        if (!content.includes("caches.open('offline-html-pages')")) {
                            fs.writeFileSync(swPath, content + '\n' + extra);
                        }
                    }
                },
            },
        ].filter(Boolean),
    };
});
