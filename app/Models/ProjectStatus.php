<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class ProjectStatus extends Model
{
    use Uuid;

    protected $table = 'project_status';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function project()
    {
        return $this->hasMany('App\Project', 'project_status_id');
    }
}
