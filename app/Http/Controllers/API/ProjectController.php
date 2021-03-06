<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Interfaces\ProjectInterface;
use PhpParser\Node\Stmt\TryCatch;
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
        $projects = $this->projectRepository->getAll();

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
        $project = $this->projectRepository->findById($id);

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
            $project = $this->projectRepository->create($request->all());
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
            $project = $this->projectRepository->edit($request, $id);
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
        $response = $this->projectRepository->delete($id);

        if($response){
            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully',
            ]);    
        }
    }
}
