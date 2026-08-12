---
paths:
  - 'app/Jobs/**'
---

# Jobs

## Jobs must use the WithoutRelations attribute
Apply #[WithoutRelations] (Illuminate\Queue\Attributes\WithoutRelations) on the job class to strip loaded Eloquent relations before serialization — keeps queue payloads small and avoids re-fetching full relations on deserialization. Can also be applied per constructor property.

## Jobs must implement ShouldBeEncrypted
Always implement Illuminate\Contracts\Queue\ShouldBeEncrypted on Job classes so the job payload is encrypted before being pushed to the queue, keeping sensitive data out of plaintext in the queue driver.
