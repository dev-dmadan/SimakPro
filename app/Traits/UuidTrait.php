<?php

namespace App\Traits;

use Ramsey\Uuid\Uuid;

trait UuidTrait {

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->{$model->primaryKey} = Uuid::uuid4();
        });
    }

}