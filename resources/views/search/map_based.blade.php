<!DOCTYPE html>
<html>
    <head>
        @include( 'includes.libraries' )
        <title>Map-based Search Application</title>
        <script async defer src="{{ $mapAPI }}"></script>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div id="map" class="map">
                    <h2 class="center-box welcome-text">
                        Type your city name into <b>'City name'</b> box to find your city location.
                    </h2>
                </div>
            </div>
            <div class="row">
                <form id="map-based-search-form" role="form">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="placeType" value="{{ $placeType }}">
                    <input type="hidden" name="zoom" value="{{ $zoom }}">
                    <div class="input-group">
                        <input name="city" type="text" class="form-control" placeholder="City name">
                        <span class="input-group-btn">
                            <button class="btn btn-info" type="submit">SEARCH</button>
                        </span>
                    </div>
                </form>
            </div>
            <div class="modal fade" id="error" role="dialog">
                <div class="modal-dialog center-box">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Error!</h4>
                        </div>
                        <div class="modal-body">
                            <p id="error-message"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>