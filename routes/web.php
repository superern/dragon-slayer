<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//auth()->loginUsingId(1);
// APIs
Route::middleware('auth')->group(function() {
    Route::prefix('games')->group(function() {
        Route::get('new', 'GameController@create')->name('games.create');
        Route::get('{game}', 'GameController@show')->name('games.show');
    });

    Route::prefix('/api')->group(function() {
        Route::prefix('games')->group(function() {
            Route::post('/', 'GameController@store')->name('api.games.save');
            Route::get('/', 'GameController@listAll')->name('api.games');
            Route::get('{game}', 'GameController@listGame')->name('api.games.show');
        });
   });
});
