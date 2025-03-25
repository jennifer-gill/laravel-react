<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
        'user_id', // Assuming tasks are assigned to users
    ];

    // Define attribute casting
    protected $casts = [
        'due_date' => 'datetime',
    ];

    // Define relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
