<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class LookupController extends Controller
{
    public function showList($name, Request $request)
    {
        $modelName = $this->getModelName($name);
        $options = $request->hasAny(['select', 'filters', 'orderBy']) ? $request->all() : null;
        $isPaginateExists = !empty($request->query('page')) && ctype_digit($request->query('page'));
        $search = !empty($request->query('search')) ? $request->query('search') : null;

        try {
            $model = app($modelName);
            return response()->json($this->getLookupsData($model, $options, $search, $isPaginateExists));
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    public function show($name, $id)
    {
        $modelName = $this->getModelName($name);
        try {
            $model = app($modelName);
            return response()->json($model::find($id));
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
    }

    private function getModelName($name) {
        $modelName = 'App\Models\\';
        $modelName .= Str::studly($name);
        
        return $modelName;
    }

    private function getLookupsData($model, $options, $search, $isPaginate) {
        $columns = Schema::getColumnListing($model->getTable());

        $isOptionExists = empty($options) || $options == null ? false : true;
        $isSelectOptionExists = $isOptionExists && (
            !empty($options['select']) && isset($options['select']) && count($options['select']) > 0
        ) ? true : false;
        $isFiltersOptionExists = $isOptionExists && (!empty($options['filters']) && isset($options['filters'])) ? true : false;
        $isOrderByOptionExists = $isOptionExists && (!empty($options['orderBy']) && isset($options['orderBy'])) ? true : false;
        $isOnlySelect = $isOptionExists && $isSelectOptionExists && !$isFiltersOptionExists;
        $isPositionExist = in_array('position', $columns, true);

        if(!$isFiltersOptionExists) {
            $data = $isOrderByOptionExists ? 
                $model::orderBy($options['orderBy']['column'], $options['orderBy']['type']) :
                ($isPositionExist ? $model::orderBy('position', 'ASC') : $model::orderBy('name', 'ASC'));
            
            if($isOnlySelect) {
                $data->select($options['select']);
            }

            if(!empty($search)) {
                $data->where('name', 'like', '%'.$search.'%');
            }

            return $isPaginate ? $data->paginate(10) : $data->get();
        } else {
            return $this->buildFilter($model, $options);
        }
    }

    private function buildFilter($model, $options) {
        // $this->isFiltersSingle($options);
        return $model::paginate(10);
    }

    private function isFiltersSingle($filter) {

    }
}