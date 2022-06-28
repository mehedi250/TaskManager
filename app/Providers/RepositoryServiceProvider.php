<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Interfaces\ProjectInterface;
use App\Interfaces\TaskInterface;

use App\Repositories\ProjectRepository;
use App\Repositories\TaskRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ProjectInterface::class, ProjectRepository::class);
        $this->app->bind(TaskInterface::class, TaskRepository::class);
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
