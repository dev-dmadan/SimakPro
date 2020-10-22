<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class ContactType extends Model
{
    use Uuid;

    protected $table = 'contact_types';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function contact()
    {
        return $this->hasMany('App\Models\Contact', 'contact_type_id');
    }
}
