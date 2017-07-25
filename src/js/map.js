var GoogleMapsLoader = require('google-maps');
var viewModel = require("./viewModel.js");

GoogleMapsLoader.KEY = 'AIzaSyBwTkrCtLKEQD5ocyIcgNZgCwQFjwtMRs0';

GoogleMapsLoader.load(function(google) {
  new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.231838, lng: 21.0038063},
        zoom: 13
      });
});
