<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Foundation\DevCommands;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch();
        FormRequest::failOnUnknownFields();
        DevCommands::except('server', 'logs');
        DevCommands::artisan('nightwatch:agent', 'nightwatch');
    }
}
