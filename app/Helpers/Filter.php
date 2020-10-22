<?php

namespace App\Helpers;

class Filter
{
    public static function buildFilters($model, $filters) {
        if(!empty($filters) && $filters) {
            foreach($filters as $item) {
                if($item['operator'] != 8) {
                    $value = $item['operator'] == 2 || $item['operator'] == 3 ? '%'.$item['value'].'%' : $item['value'];
                    $model->where($item['column'], Filter::getOperatorSymbol($item['operator']), $value);
                } else {
                    $model->whereNull($item['column']);
                }
            }
        }

        return $model;
    }

    public static function getOperatorSymbol($operatorValue) {
        $operatorSymbol = [
            '=', '!=', 'like', 'not like', '>', '>=', '<', '<='
        ];

        return $operatorSymbol[$operatorValue];
    }

    public static function isSimpleFilter($filters) {
        return true;
    }

    public static function isAdvanceFilter($filters) {
        return true;
    }
}