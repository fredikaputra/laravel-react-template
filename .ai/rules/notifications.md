---
paths:
  - 'app/Notifications/**'
---

# Notifications

## Notifications must implement ShouldQueue
Always implement Illuminate\Contracts\Queue\ShouldQueue on Notification classes so delivery (email, database, etc.) is queued and never blocks the request.

## Notifications must implement ShouldBeEncrypted
Always implement Illuminate\Contracts\Queue\ShouldBeEncrypted on Notification classes so their payload is encrypted while queued/serialized, keeping sensitive data (emails, tokens, etc.) out of plaintext in the queue driver.
