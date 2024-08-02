<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function scopeIndex($query, $request)
    {
        return $query->orderBy('name', 'asc');
    }
}
