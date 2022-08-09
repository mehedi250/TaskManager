<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('projects', 'API\ProjectController');
Route::apiResource('tasks', 'API\TaskController');


Route::post('auth/login', 'API\Auth\AuthAPIController@login');
Route::post('auth/register', 'API\Auth\AuthAPIController@register');

Route::middleware('auth:api')->group(function () {
    Route::post('auth/user', 'API\Auth\AuthAPIController@getUser');
    Route::apiResource('projects', 'API\ProjectController');
    Route::apiResource('tasks', 'API\TaskController');
    Route::post('auth/logout', 'API\Auth\AuthAPIController@logout');
});
