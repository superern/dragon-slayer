<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['description', 'game_id'];

    # Relationships

    public function game() {
        return $this->belongsTo(Game::class);
    }
    
    public function attachGame(Game $game) {
        return $this->game()->associate($game);
    }
}
