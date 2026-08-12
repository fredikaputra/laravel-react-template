---
paths:
  - 'app/Listeners/**'
---

# Listeners

## Always implement ShouldQueue on event listeners
Whenever creating an event listener, always implement the Illuminate\Contracts\Queue\ShouldQueue interface so the listener is processed by the queue instead of synchronously in the request lifecycle.


