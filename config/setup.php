<?php

return [
    'map' => [ // This is settings for Google map API.
        'url'       => 'https://maps.googleapis.com/maps/api/js?libraries=places', // API URL
        'key'       => '', // API key
        'placeType' => 'locality, administrative_area_level_3', // Place type for filtering result from response
        'zoom'      => 15, // Zoom value
    ],
    'twitter' => [ // This is settings for Twitter API.
        'url'               => 'https://api.twitter.com/1.1/search/tweets.json', // API URL
        'accessToken'       => '', // Access Token
        'accessTokenSecret' => '', //  Access Token Secret
        'consumerKey'       => '', // Consumer Key ( API Key )
        'consumerSecret'    => '', // Consumer Secret ( API Secret )
        'radius'            => '50km', // Radius
        'resultType'        => 'mixed', // Result type of Twitter response ( 'mixed', 'recent', 'popular' )
        'cacheInterval'     => 60, // Keep Twitter response in cache. A unit of time is minute.
    ],
];