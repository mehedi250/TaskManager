<?php
namespace App\Repositories;
use App\Interfaces\ProjectInterface;
use App\Models\Project;

class ProjectRepository implements ProjectInterface{

    public function getAll()
    {
        return Project::all();
    }

    public function findById($id)
    {
        return Project::where('id', $id)->first();
    }

    public function create($data)
    {
        return Project::create($data);
    }

    public function edit($data, $id)
    {
        return Project::where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return Project::where('id', $id)->delete();
    }

}