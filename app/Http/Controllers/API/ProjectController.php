<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Interfaces\ProjectInterface;

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

        return response()->json([
            'success' => true,
            'message' => 'Project list',
            'data' => $projects
        ]);
    }

    public function show($id)
    {
        $project = $this->projectRepository->findById($id);

        if(is_null($project)){
            return response()->json([
                'success' => false,
                'message' => 'Project details',
                'data' => null
            ]); 
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Project details',
            'data' => $project
        ]);
    }
}
