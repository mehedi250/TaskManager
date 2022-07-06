<?php
namespace App\Repositories;
use App\Interfaces\TaskInterface;
use App\Models\Task;

class TaskRepository implements TaskInterface{

    public function getAll()
    {
        return Task::orderBy('id', 'desc')->get();
    }

    public function findById($id)
    {
        return Task::where('id', $id)->with('project')->first();
    }

    public function create($data)
    {
        return Task::create($data);
    }

    public function edit($data, $id)
    {
        return Task::where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return Task::where('id', $id)->delete();
    }

}