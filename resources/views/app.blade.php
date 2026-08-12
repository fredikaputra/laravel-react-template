<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{-- Inline script to detect appearance preference from cookie --}}
    <script nonce="{{ Vite::cspNonce() }}">
        (function () {
            const appearance = document.cookie.match(/(?:^|; )appearance=([^;]*)/)?.[1] || 'system';

            if (
                appearance === 'dark' ||
                (appearance === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    <link rel="icon" href="/favicon.ico" sizes="64x64" />
    <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" sizes="180x180" />
    <link rel="manifest" href="/manifest.webmanifest" />
</head>
<body class="font-sans antialiased">
    <noscript>
        <strong
            >We're sorry but this application doesn't work properly without JavaScript enabled. Please enable it to
            continue.</strong>
    </noscript>
    @inertia
</body>
</html>
