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
    const nullColumns = ['date', 'project_status_id', 'created_by_id', 'updated_by_id'];

    public function projectStatus()
    {
        return $this->belongsTo('App\Models\ProjectStatus', 'project_status_id');
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
