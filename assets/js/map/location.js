// Get User's Latitude & Longitude
function success(position) {

    // Get the Latitude & Longitude
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log(latlng.toString());

    // Convert the LatLong to String
    codeLatLng(latlng);
}

// Error Handler
function error(msg) {
    var s = document.querySelector('#status');
    s.innerHTML = typeof msg == 'string' ? msg : "failed";
    s.className = 'fail';
}

// Initiate process of receiving user location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    error('not supported');
}

// Covert Lat & Long coordinates into State            
function codeLatLng(coordinate) {
    var geocoder = new google.maps.Geocoder();
    console.log("Successfully initialized Geocoder...");
    geocoder.geocode({'latLng': coordinate}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                console.log("Full Address: " + results[0].formatted_address);
                console.log("State: " + results[5].formatted_address.split(",")[0]);
            } else {
                alert('No results found');
            }
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}