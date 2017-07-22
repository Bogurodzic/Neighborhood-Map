var $ = require("jquery");
var ko = require("knockout");


console.log($);

var GoogleMapsLoader = require('google-maps'); // only for common js environments
GoogleMapsLoader.KEY = 'AIzaSyBwTkrCtLKEQD5ocyIcgNZgCwQFjwtMRs0';

GoogleMapsLoader.load(function(google) {
  new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
});
