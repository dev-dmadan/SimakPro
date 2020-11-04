<?php

namespace App\Models;
use App\Traits\UuidTrait as Uuid;

use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{
    use Uuid;

    protected $table = 'genders';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function contact()
    {
        return $this->hasMany('App\Models\Contact', 'gender_id');
    }
}
