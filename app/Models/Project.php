<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    const STATUS_COMPLETE = 1;
    const STATUS_INCOMPLETE = 0;

    protected $fillable = [
        'name',
        'description',
        'status',
        'user_id'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
