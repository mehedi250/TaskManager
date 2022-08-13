<?php
namespace App\Repositories;
use App\Interfaces\ProjectInterface;
use App\Models\Project;

class ProjectRepository implements ProjectInterface{

    public function getAll($userId)
    {
        return Project::where('user_id', $userId)->withCount('tasks')->orderBy('id', 'desc')->get();
    }

    public function findByIdUserId($id, $userId)
    {
        return Project::where('id', $id)->where('user_id', $userId)->with('tasks')->first();
    }

    public function create($data)
    {
        return Project::create($data);
    }

    public function edit($data, $userId, $id)
    {
        return Project::where('id', $id)->where('user_id', $userId)->update($data);
    }

    public function delete($userId, $id)
    {
        return Project::where('id', $id)->where('user_id', $userId)->delete();
    }

}