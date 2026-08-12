---
paths:
  - '**'
  - .env
---

# General

## Always use docker exec for environment commands
Always use `docker exec <app-container> <command>` when interacting with the environment (Artisan, Composer, bun, tests). Never run `php`, `composer`, or `bun` directly on the host. Run `./vendor/bin/sail ps` first to discover the app container name.

## Check external services in DiagnosingHealth listener
If the code depends on an external service (DB, cache, queue, mail, etc.), check that service in a `DiagnosingHealth` event listener so the `/up` health route fails (500) when a dependency is down.

## Octane: restart container after .env changes
Changing .env while running under Octane requires a FULL container restart (`docker compose restart laravel.test`). `php artisan octane:reload` is NOT enough — workers are forked from the master process and inherit its stale env; Dotenv (immutable) will not override it, so the running app silently keeps old values.
