---
paths:
  - 'app/Events/**'
---

# Events

## Always use ShouldBeEncrypted on events carrying sensitive data
Always implement Illuminate\Contracts\Queue\ShouldBeEncrypted on queued events that carry sensitive payload data. When an event is serialized to the queue, the marker encrypts its payload so sensitive data (tokens, PII) isn't stored in plaintext by the queue driver.
