<?php
use App\Http\Controllers\GameController;
/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('user/save', 'GameController@storeUser');
    $router->post('users/save', 'GameController@storeUsers');
    $router->get('users', 'GameController@getUsers');
    $router->get('round', 'GameController@getRound');
    $router->get('user/team', 'GameController@userTeam');
    $router->post('user/tap', 'GameController@userTap');
    $router->post('start-round', 'GameController@startRound');
});
