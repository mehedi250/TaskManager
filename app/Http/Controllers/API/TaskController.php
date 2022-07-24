<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\TaskInterface;
use Validator;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index()
    {
        // $projects = $this->taskRepository->getAll();

        // if($projects){
        //     return response()->json([
        //         'success' => true,
        //         'message' => 'Project list',
        //         'data' => $projects
        //     ]);    
        // }
    }

    public function show($id)
    {
        // $project = $this->taskRepository->findById($id);

        // if(is_null($project)){
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Project details is not found!',
        //         'data' => null
        //     ]); 
        // }
        
        // return response()->json([
        //     'success' => true,
        //     'message' => 'Project details',
        //     'data' => $project
        // ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'status' => 'validation-error'
            ]);
        }

        try {
            $task = $this->taskRepository->create($request->all());
            if($task){
                return response()->json([
                    'success' => true,
                    'message' => 'Task created successfully',
                    'data' => $task
                ]);
            }    
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong!',
                'status' => false
            ]);
        }
    }

    public function update($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|max:255',
            'description' => 'bail|required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'status' => 'validation-error'
            ]);
        }

        try {
            $project = $this->taskRepository->edit($request, $id);
            if($project){
                return response()->json([
                    'success' => true,
                    'message' => 'Task updated successfully',
                    'data' => $project
                ]);
            }    
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong!',
                'status' => false
            ]);
        }
    }

    public function destroy($id)
    {
        $response = $this->taskRepository->delete($id);

        if($response){
            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully',
            ]);    
        }
        return response()->json([
            'message' => 'Something went wrong!',
            'status' => false
        ]);
    }
}
