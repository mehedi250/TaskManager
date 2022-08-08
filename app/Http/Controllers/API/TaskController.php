<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\TaskInterface;
use Illuminate\Support\Facades\Auth;
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

    }

    public function show($id)
    {

    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ]);
        }
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

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'status' => 0,
            'project_id' => $request->project_id
        ];

        try {
            $task = $this->taskRepository->create($data);
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
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ]);
        }
        try {
            $project = $this->taskRepository->edit($request->all(), $id);
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
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ]);
        }
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
