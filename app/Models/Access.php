<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class Access extends Model
{
    use Uuid;

    protected $table = 'access';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function parent()
    {
        return $this->belongsTo('App\Access', 'parent_id');
    }

    public function children()
    {
        return $this->hasMany('App\Access', 'parent_id');
    }
}
