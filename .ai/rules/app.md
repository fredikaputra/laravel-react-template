---
paths:
  - 'app/**'
---

# App

## Explicit type-casts on all values
Every value (whether string, int/float, bool, etc.) must be explicitly type-cast with its corresponding type (e.g. (string) $id, (int) $count, (bool) $flag).

## Use dependency injection, not Facades/helpers
Always use constructor or method dependency injection to resolve classes, services, and utilities instead of using Facades or global helper functions.

## Prefer shortcut helpers over full implementations
Always use the shortcut version of the code whenever possible (e.g. `Route::view()` instead of a full controller, `Route::redirect()`/`to_route()` for redirects, `route()` helper over manual URL building).

## Type-convert request values before use
When using a `$request` value, always convert it to the appropriate data type (`->integer()`, `->string()`, `->boolean()`, `->collect()`, `->interval()`, `->date()`, etc.) before use.

## Log every action for observability

Always add logging (Log::info, Log::debug, etc.) for every action, no matter how small. This includes model changes, user actions, service calls, cache operations, and any side effects. Comprehensive logging helps with debugging and investigating issues in production. Always use contextual information with structured context arrays and message placeholders instead of concatenating variables into log messages.

## Always use Cache::memo() for cache reads
Use Cache::memo() for all cache reads. CACHE_STORE is redis. Cache::memo() is a pure optimization wrapper that memoizes cached values in-memory per request/job — it never hurts performance (first get hits the store, later gets are memory), and writes still correctly delegate to the underlying store.

## Prefer Laravel Concurrency for parallel independent tasks
Always use Laravel's Concurrency facade (Concurrency::run / ::defer) to run independent tasks in parallel whenever possible. It speeds up multiple independent DB queries, HTTP calls, or jobs that can safely run concurrently within the same process.

## Use Pipeline for large/complex features
When a feature grows big or involves multi-step processing, prefer Illuminate\Support\Facades\Pipeline to compose the steps instead of long sequential logic.

## Use Timebox to prevent timing side-channels
Whenever code would leak timing info (login, password reset, OTP/token validation, user enumeration), wrap the work in Illuminate\Support\Timebox with a minimum duration and call returnEarly() on the success path only. Mirrors how SessionGuard/PasswordBroker pad failed auth attempts.

## Prefer deferred execution for background work
When pushing work to the background, prefer the deferred approach whenever possible instead of dispatchSync or inline processing: use Illuminate\Support\defer(fn) for simple closures, or dispatch jobs on the 'deferred' connection (Job::dispatch()->onConnection('deferred')) so work runs after the HTTP response is sent without slowing the request.
