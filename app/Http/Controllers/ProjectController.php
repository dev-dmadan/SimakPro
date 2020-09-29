<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Constants\PaginationConstant;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.project.list');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.project.page', [
            'pageMode' => 'Add',
            'useMainProfileSection' => true,
            'useSubProfileSection' => false,
            'useMainContentSection' => true,
            'useDetailContentSection' => true,
            'useProfileImage' => false
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $project = new Project();
        foreach($request->all() as $key => $item) {
            if($item != null || is_numeric($item)) {
                $project->$key = $item;
            }
        }

        return response()->json([
            'status' => $project->save(),
            'id' => $project->id
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $project = Project::with([
            'projectStatus' => function($query) {
                $query->select('id', 'name');
            },
            'createdBy' => function($query) {
                $query->select('id', 'name');
            },
            'updatedBy' => function($query) {
                $query->select('id', 'name');
            },
        ])->find($id);
        return response()->json($project);
    }

    public function showList()
    {
        $projects = Project::with([
            'projectStatus' => function($query) {
                $query->select('id', 'name');
            },
        ])
        ->orderBy('created_at', 'DESC')
        ->paginate(PaginationConstant::Limit);

        return response()->json($projects);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $isExist = is_null(Project::find($id)) ? false : true;

        return $isExist ? view('pages.project.page', [
            'id' => $id,
            'pageMode' => 'Edit',
            'useMainProfileSection' => true,
            'useSubProfileSection' => false,
            'useMainContentSection' => true,
            'useDetailContentSection' => true,
            'useProfileImage' => false
        ]) : abort(404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        foreach($request->all() as $key => $item) {
            if($item == null && in_array($key, Project::nullColumns)) {
                $project->$key = $item;
            } else if($item != null || is_numeric($item)) {
                $project->$key = $item;
            }
        }

        return response()->json($project->save());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        return response()->json($project->delete());
    }
}
