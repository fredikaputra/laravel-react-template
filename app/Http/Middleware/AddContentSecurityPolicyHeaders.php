<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

final readonly class AddContentSecurityPolicyHeaders
{
    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Vite::useCspNonce();

        $response = $next($request);

        $nonce = Vite::cspNonce();

        $reverbApps = config('reverb.apps.apps', []);
        $reverb = $reverbApps[0]['options'] ?? [];
        $reverbScheme = empty($reverb['useTLS']) ? 'ws' : 'wss';
        $reverbEndpoint = ! empty($reverb['host']) && ! empty($reverb['port'])
            ? "{$reverbScheme}://{$reverb['host']}:{$reverb['port']}"
            : null;

        $connectSrc = "connect-src 'self'".($reverbEndpoint ? " {$reverbEndpoint}" : '');

        $cspPolicy = implode('; ', [
            "default-src 'self'",
            "script-src 'nonce-{$nonce}' 'strict-dynamic'",
            "style-src 'self' 'unsafe-inline' https://fonts.bunny.net",
            "font-src 'self' https://fonts.bunny.net",
            "img-src 'self'",
            $connectSrc,
            "worker-src 'self'",
            "object-src 'none'",
            "base-uri 'none'",
            "frame-ancestors 'none'",
            "form-action 'self'",
            'upgrade-insecure-requests',
        ]);

        $response->headers->set('Content-Security-Policy', $cspPolicy);

        return $response;
    }
}
