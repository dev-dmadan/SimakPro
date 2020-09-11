<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class Project extends Model
{
    use Uuid;

    protected $table = 'projects';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function projectStatus()
    {
        return $this->belongsTo('App\ProjectStatus', 'project_status_id');
    }

    public function createdBy()
    {
        return $this->belongsTo('App\Contact', 'created_by_id');
    }

    public function updatedBy()
    {
        return $this->belongsTo('App\Contact', 'updated_by_id');
    }
}
