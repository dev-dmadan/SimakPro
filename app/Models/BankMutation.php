<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\UuidTrait as Uuid;

class BankMutation extends Model
{
    use Uuid;

    protected $table = 'bank_mutations';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    const NULL_COLUMNS = ['bank_id', 'date', 'created_by_id', 'updated_by_id'];

    public function bank()
    {
        return $this->belongsTo('App\Models\Bank', 'bank_id');
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
