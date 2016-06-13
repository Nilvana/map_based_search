/**
 * This namespace uses for implementing all search functions.
 *
 * @namespace   searchModule
 * @author      Sangtong Peesing
 */
var searchModule = ( function(){

    /** @private */
    var keyCode = { ENTER: 13 },
        city, placeType, zoom, _token, mapBasedSearchForm, map, infoWindow;

   /**
    * @summary  Initialize a map.
    * @author   Sangtong Peesing
    * @access   private
    * @example  initializeMap();
    */
    function initializeMap(){

        map         = new google.maps.Map( document.getElementById( 'map' ), { zoom: zoom || 15 } );
        infoWindow  = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService( map );

        service.textSearch( { query: city }, mapBasedSearchCallback );
    }

    /**
    * This function will be executed after a map service is called.
    *
    * @summary  A callback function of a map service.
    * @author   Sangtong Peesing
    * @access   private
    * @param    {array of object} results - Result of calling a service
    * @param    {string} status - Result status
    * @example  mapBasedSearchCallback( results, status );
    */
    function mapBasedSearchCallback( results, status ){

        var strNotFound = '<h2 class="not-found-result center-box">Not found your city name.</h2>';

        if( status === google.maps.places.PlacesServiceStatus.OK ){

            if( results.length ){

                var resultIndex = 0,
                    location    = results[resultIndex].geometry.location,
                    latitude    = location.lat(),
                    longitude   = location.lng();

                createMarker({
                    position: location,
                    content: results[resultIndex].name + '<br>' + results[resultIndex].formatted_address,
                });

                $.ajax({
                    url: '/twittersearch',
                    method: 'POST',
                    data: {
                        _token: _token,
                        city: city,
                        latitude: latitude,
                        longitude: longitude,
                    },
                    dataType: 'json',
                    success: function( data ){

                        for( var dataIndex = 0; dataIndex < data.statuses.length; dataIndex++ ){

                            var twitterData = data.statuses[dataIndex],
                                coordinate  = [];

                            if( twitterData.coordinates ){
                                coordinate = twitterData.coordinates.coordinates;
                            }else if( twitterData.place ){
                                coordinate = twitterData.place.bounding_box.coordinates[0][0];
                            }

                            if( typeof( coordinate ) == 'object' && coordinate.length == 2 ){

                                var position = new google.maps.LatLng({ lat: coordinate[1], lng: coordinate[0] });

                                createMarker({
                                    icon: twitterData.user.profile_image_url,
                                    content: twitterData.text,
                                    position: position,
                                });
                            }
                        }
                    },
                    error: function( jqXHR, textStatus, errorThown ){
                        $('#error-message').html( 'Error! Failed to get data from Twitter.' );
                        $('#error').modal( 'show' );
                    },
                    complete: function(){
                        map.setCenter( location );
                        mapBasedSearchForm.find( ':input' ).attr( 'disabled', false );
                    }
                });
            }else{
                $('#map').html( strNotFound );
                mapBasedSearchForm.find( ':input' ).attr( 'disabled', false );
            }

        }else{
            if( status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS ){
                $('#map').html( strNotFound );
            }else{
                $('#map').html( 'Google Map service error!' );
            }
            mapBasedSearchForm.find( ':input' ).attr( 'disabled', false );
        }
    }

   /**
    * @summary  Create a marker on a map.
    * @author   Sangtong Peesing
    * @access   private
    * @param    {object} params - Keep all parameters of this function in the following below.
    *           {string} icon       - Icon image
    *           {object} position   - Position
    *           {string} content    - Content
    * @example  createMarker( params );
    */
    function createMarker( params ){

        var markerParam = { map: map, position: params.position };

        if( params.icon ){
            markerParam.icon = params.icon;
        }

        var marker = new google.maps.Marker( markerParam );

        google.maps.event.addListener( marker, 'click', function(){
            infoWindow.setContent( params.content );
            infoWindow.open( map, this );
        });
    }

   /**
    * @summary  Bind events for map-based search.
    * @author   Sangtong Peesing
    * @access   private
    * @example  mapBasedSearch();
    */
    function mapBasedSearch(){

        mapBasedSearchForm = $('#map-based-search-form');

        mapBasedSearchForm.on( 'submit', function( event ){

            event.preventDefault();

            $(this).find( ':input' ).attr( 'disabled', true );

            var cityInput = $(this).find( '[name=city]' );
            city          = $.trim( cityInput.val() );
            placeType     = $(this).find( '[name=placeType]' ).val().split( /, ?/ );
            zoom          = parseInt( $(this).find( '[name=zoom]' ).val() );
            _token        = $(this).find( '[name=_token]' ).val();

            if( city ){
                initializeMap();
            }else{
                $('#error-message').html( 'Please input your city name.' );
                $('#error').modal( 'show' );
                $(this).find( ':input' ).attr( 'disabled', false );
            }
        });
    }

   /**
    * @summary  Initialize this module
    * @author   Sangtong Peesing
    * @access   private
    * @example  initialize();
    */
    function initialize(){
        mapBasedSearch();
    }

    return {
        /**
        * @constructs
        * @summary  Initialize this module
        * @author   Sangtong Peesing
        * @access   public
        * @example  searchModule.init();
        */
        init: initialize,
    };
})( jQuery );