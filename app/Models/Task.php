<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    const STATUS_COMPLETE = 1;
    const STATUS_INCOMPLETE = 0;

    protected $fillable = [
        'name',
        'discription',
        'status',
        'project_id'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
