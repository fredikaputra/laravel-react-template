---
paths:
  - 'app/Mail/**'
---

# Mail

## Mailables must implement ShouldQueue
Always implement Illuminate\Contracts\Queue\ShouldQueue on Mailable classes so mail sending is queued, never blocking the request.


