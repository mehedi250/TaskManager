<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Interfaces\ProjectInterface;
use Illuminate\Support\Facades\Auth;
use Validator;

class ProjectController extends Controller
{
    protected $projectRepository;

    public function __construct(ProjectInterface $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
                'data' => []
            ]);
        }
        $projects = $this->projectRepository->getAll($user->id);

        if($projects){
            return response()->json([
                'success' => true,
                'message' => 'Project list',
                'data' => $projects
            ]);    
        }
    }

    public function show($id)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
                'data' => []
            ]);
        }
        $project = $this->projectRepository->findByIdUserId($id, $user->id);

        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project details is not found!',
                'data' => null
            ]); 
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Project details',
            'data' => $project
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
                'data' => []
            ]);
        }
        
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
            $data = [
                'user_id' => $user->id,
                'name' => $request->name,
                'description' => $request->description
            ];
            $project = $this->projectRepository->create($data);
            if($project){
                return response()->json([
                    'success' => true,
                    'message' => 'Project created successfully',
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

    public function update($id, Request $request)
    {
        $user = Auth::user();
        if(!$user){
            return response()->json([
                'success' => false,
                'message' => 'User not found',
                'data' => []
            ]);
        }
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

        $data = [
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status
        ];

        try {
            $project = $this->projectRepository->edit($data, $user->id, $id);
            if($project){
                return response()->json([
                    'success' => true,
                    'message' => 'Project updated successfully',
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
                'message' => 'User not found'
            ]);
        }
        $project = $this->projectRepository->findByIdUserId($id, $user->id);

        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project is not found!',
            ]); 
        }else{
            $project->tasks()->delete();
            $response = $this->projectRepository->delete($user->id, $id);
            if($response){
                return response()->json([
                    'success' => true,
                    'message' => 'Project deleted successfully',
                ]);    
            }
            return response()->json([
                'message' => 'Something went wrong!',
                'status' => false
            ]);
        } 
    }
}
