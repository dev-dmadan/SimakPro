<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class ActiveStatus extends Model
{
    use Uuid;

    protected $table = 'active_status';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function contact()
    {
        return $this->hasMany('App\Models\Contact', 'active_status_id');
    }
}
