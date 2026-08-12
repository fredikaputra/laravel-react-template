---
paths:
  - 'app/Models/**/*.php'
  - 'app/Models/**'
---

# Models

## Always use BroadcastsEvents on all Eloquent models
To enable automatic real-time updates when database records are created, updated, or deleted, ensure that all Eloquent models include the Illuminate\Database\Eloquent\BroadcastsEvents trait.

## Authenticatable models must implement MustVerifyEmail
Always have authenticatable models implement Illuminate\Contracts\Auth\MustVerifyEmail so email verification is enforced for the auth flow.
