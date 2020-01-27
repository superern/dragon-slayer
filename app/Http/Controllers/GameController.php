<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index()
    {
    }

    // new game
    public function create()
    {
        return view('games.create');
    }

    public function store(Request $request)
    {
        $game = Game::create([
            'name' => $request->name,
            'status' => $request->status,
            'user_id' => auth()->user()->id
        ]);

        foreach ($request->comments as $comment) {
            Comment::create([
                'description' => $comment,
                'game_id' => $game->id
            ]);
        }
    }

    // click game-demo1, then loads the comments and other details
    public function show(Game $game)
    {
        $id = $game->id;
        return view('games.show')->with(compact('id'));
    }

    public function destroy(Game $game)
    {
    }

    public function listAll() {
        return auth()->user()->games;
    }

    public function listGame(Game $game) {
        return $game;
    }
}
