<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get( '/', function(){
    $mapAPI = config( 'setup.map.url' ) . '&key=' . config( 'setup.map.key' );
    $params = [ 'mapAPI' => $mapAPI, 'placeType' => config( 'setup.map.placeType' ), 'zoom' => (int)config( 'setup.map.zoom' ) ];
    return view( 'search.map_based', $params );
});

Route::post( 'twittersearch', 'TwitterController@search' );