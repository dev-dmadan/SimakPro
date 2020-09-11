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
}
