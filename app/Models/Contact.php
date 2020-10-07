<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class Contact extends Model
{
    use Uuid;

    protected $table = 'contacts';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    const nullColumns = ['gender_id', 'contact_type_id', 'created_by_id', 'updated_by_id'];

    public function gender()
    {
        return $this->belongsTo('App\Models\Gender', 'gender_id');
    }

    public function contactType()
    {
        return $this->belongsTo('App\Models\Gender', 'contact_type_id');
    }

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
