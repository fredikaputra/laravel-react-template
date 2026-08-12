---
paths:
  - 'resources/views/**'
---

# Views

## Nonce all inline scripts in Blade views
The app enforces `script-src 'nonce-...'` via AddContentSecurityPolicyHeaders middleware. Any inline `<script>` in a Blade view must include `nonce="{{ Vite::cspNonce() }}"` or the browser blocks it.
