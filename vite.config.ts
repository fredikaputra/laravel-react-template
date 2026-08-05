import {wayfinder} from '@laravel/vite-plugin-wayfinder';
import inertia from '@inertiajs/vite';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, {reactCompilerPreset} from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {loadEnv} from 'vite';
import {defineConfig} from 'vite-plus';
import manifestSRI from 'vite-plugin-manifest-sri';

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
            react(),
            babel({
                presets: [reactCompilerPreset()],
            }),
            tailwindcss(),
            !env.CI && manifestSRI(),
            wayfinder({
                formVariants: true,
            }),
        ].filter(Boolean),
    };
});
