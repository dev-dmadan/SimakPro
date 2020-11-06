<?php

namespace App\Helpers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Sorting
{
    public static function buildSorting($model, $sort) {
        if(isset($sort) && !empty($sort) && !empty($sort['column'])) {
            $sourceTableName = $model->getModel()->getTable();

            if(Sorting::isHaveDot($sort['column'])) {

                $split = explode('.', $sort['column']);
                $splitLenght = count($split);

                if($splitLenght > 1) {
                    $isSuccessBuild = true;
                    $tempModel = $model;
                    $temp = Sorting::isLookup($split[0]) ? $split[0] : $split[0]. '_id';
                    for($i=0; $i<$splitLenght-1; $i++) {
                        $listFK = Schema::getConnection()
                            ->getDoctrineSchemaManager()
                            ->listTableForeignKeys($sourceTableName);
                        $foreignKey = collect($listFK)->first(function($value, $key) use($temp) {
                            return $value->getColumns()[0] == $temp;
                        });
                        if(!is_null($foreignKey)) {
                            $foreignKeyTable = $foreignKey->getForeignTableName();
                            $foreignKeyColumn = $foreignKeyTable. '.' .$foreignKey->getForeignColumns()[0];

                            $model->leftJoin($foreignKeyTable, $foreignKeyColumn, '=', $sourceTableName. '.' .$temp);
                            $temp = $i+1 != $splitLenght-1 ? (Sorting::isLookup($split[$i+1]) ? $split[$i+1] : $split[$i+1]. '_id') : $split[$i+1];
                            $sourceTableName = $foreignKeyTable;
                        } else {
                            $model = $tempModel;
                            $isSuccessBuild = false;
                            break;
                        }
                    }

                    if($isSuccessBuild) {
                        $model = $model->orderBy($sourceTableName. '.' .$temp, $sort['type']);
                    }
                }
            } else if(Sorting::isLookup($sort['column'])) {
                $listFK = Schema::getConnection()
                    ->getDoctrineSchemaManager()
                    ->listTableForeignKeys($sourceTableName);
                $foreignKey = collect($listFK)->first(function($value, $key) use($sort) {
                    return $value->getColumns()[0] == $sort['column'];
                });
                if(!is_null($foreignKey)) {
                    $foreignKeyTable = $foreignKey->getForeignTableName();
                    $foreignKeyColumn = $foreignKeyTable. '.' .$foreignKey->getForeignColumns()[0];

                    $model->leftJoin($foreignKeyTable, $foreignKeyColumn, '=', $sourceTableName. '.' .$sort['column'])
                        ->orderBy($foreignKeyTable. '.name', $sort['type']);
                }
            } else {
                $model->orderBy($sort['column'], $sort['type']);
            }
        }

        return $model;
    }

    public static function isHaveDot($column) {
        $split = explode('.', $column);
        $splitLenght = count($split);
        
        if($splitLenght <= 1) {
            return false;
        }

        return true;
    }

    public static function isLookup($column) {
        $split = explode('_', $column);
        $splitLenght = count($split);

        if($splitLenght <= 1) {
            return false;
        }

        return $split[$splitLenght-1] == 'id' && Str::endsWith($column, 'id') ? true : false;
    }

}