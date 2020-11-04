<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Constants\PaginationConstant;
use Illuminate\Support\Facades\Validator;
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
        $id = null;
        $isSuccess = false;
        $message = null;
        $errors = null;
        
        DB::beginTransaction();
        try {
            $rules = [
                'name' => 'required|string|max:500',
                // 'code' => 'required|string|max:500|unique:App\Models\Project,code',
                'owner' => 'required|string|max:500',
                'date' => 'required|date',
                'city' => 'required|string|max:100',
                'address' => 'required|string',
                'luas_area' => 'numeric|max:999999',
                'estimasi' => 'numeric|max:999999',
                'sub_total' => 'required|numeric|min:1|max:99999999999999999',
                'cco' => 'numeric|max:99999999999999999',
                'total' => 'required|numeric|min:1|max:99999999999999999',
                'dp' => 'required|numeric|min:1|max:99999999999999999',
                'sisa' => 'required|numeric|max:99999999999999999',
                'progress' => 'required|integer|min:0|max:100',
                'project_status_id' => 'required|uuid'
            ];
            $data = $request->only(array_keys($rules));
            $validator = Validator::make($data, $rules);
            if($validator->fails()) {
                $errors = $validator->messages();
                throw new \Exception('Something wrong in form');
            }

            $project = new Project();
            foreach($data as $key => $item) {
                if($item !== null) {
                    $project->$key = $item;
                }
            }

            $isSuccess = $project->save();
            $id = $isSuccess ? $project->id : null;
            DB::commit();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors,
            'id' => $id
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
        $isSuccess = false;
        $message = null;
        $errors = null;

        DB::beginTransaction();
        try {
            $rules = [
                'name' => 'required|string|max:500',
                // 'code' => 'required|string|max:500|unique:App\Models\Project,code',
                'owner' => 'required|string|max:500',
                'date' => 'required|date',
                'city' => 'required|string|max:100',
                'address' => 'required|string',
                'luas_area' => 'numeric|max:999999',
                'estimasi' => 'numeric|max:999999',
                'sub_total' => 'required|numeric|min:1|max:99999999999999999',
                'cco' => 'numeric|max:99999999999999999',
                'total' => 'required|numeric|min:1|max:99999999999999999',
                'dp' => 'required|numeric|min:1|max:99999999999999999',
                'sisa' => 'required|numeric|max:99999999999999999',
                'progress' => 'required|integer|min:0|max:100',
                'project_status_id' => 'required|uuid'
            ];
            $data = $request->only(array_keys($rules));
            $validator = Validator::make($data, $rules);
            if($validator->fails()) {
                $errors = $validator->messages();
                throw new \Exception('Something wrong in form');
            }

            $project = Project::find($id);
            foreach($data as $key => $item) {
                if($item === null && in_array($key, Project::NULL_COLUMNS)) {
                    $project->$key = $item;
                } else if($item !== null) {
                    $project->$key = $item;
                }
            }

            $isSuccess = $project->save();
            DB::commit();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $isSuccess = false;
        $message = null;
        $errors = null;

        DB::beginTransaction();
        try {
            Project::find($id)->delete();
        } catch (\Exception $e) {
            $message = $e->getMessage();
            $errors = $e;

            DB::rollBack();
        }

        return response()->json([
            'success' => $isSuccess,
            'message' => $message,
            'errors' => $errors
        ]);
    }
}