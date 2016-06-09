<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use TwitterAPIExchange;
use Cache;

/**
 * This class uses for managing Twitter API.
 */
class TwitterController extends Controller {

   /**
    * Search people who tweet about your city name input and stay near that city.
    *
    * @param  Request  $request
    * @return Response Twitter search response
    */
    public function search( Request $request ){

        $city    = urlencode( str_limit( $request->input( 'city' ), 500 ) );
        $geocode = $request->input( 'latitude' ) . ',' . $request->input( 'longitude' ) . ',' . config( 'setup.twitter.radius' );
        $query   = '?q=' . $city . '&geocode=' . $geocode . '&result_type=' . config( 'setup.twitter.resultType' );
        $key     = str_slug( $query, '_' );
        $response;

        if( Cache::has( $key ) ){
            $response = Cache::get( $key );
        }else{
            $settings = [
                            'oauth_access_token'        => config( 'setup.twitter.accessToken' ),
                            'oauth_access_token_secret' => config( 'setup.twitter.accessTokenSecret' ),
                            'consumer_key'              => config( 'setup.twitter.consumerKey' ),
                            'consumer_secret'           => config( 'setup.twitter.consumerSecret' ),
                        ];
            $twitter  = new TwitterAPIExchange( $settings );
            $response = $twitter->setGetfield( $query )
                        ->buildOauth( config( 'setup.twitter.url' ), 'GET' )
                        ->performRequest();
            Cache::put( $key, $response, (int)config( 'setup.twitter.cacheInterval' ) );
        }

        return $response;
    }
}