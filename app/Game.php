<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = ['name', 'status', 'user_id'];

    protected $with = ['comments'];
    # Relationships

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function attachUser(User $user) {
        return $this->user()->associate($user);
    }
}
