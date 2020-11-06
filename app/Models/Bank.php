<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class Bank extends Model
{
    use Uuid;

    protected $table = 'banks';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    const NULL_COLUMNS = ['active_status_id', 'created_by_id', 'updated_by_id'];

    public function activeStatus()
    {
        return $this->belongsTo('App\Models\ActiveStatus', 'active_status_id');
    }

    public function createdBy()
    {
        return $this->belongsTo('App\Models\Contact', 'created_by_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo('App\Models\Contact', 'updated_by_id');
    }
}
