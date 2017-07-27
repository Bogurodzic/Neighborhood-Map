const GoogleMapsLoader = require('google-maps');
var viewModel = require("./viewModel.js");

let map;
let markers;

GoogleMapsLoader.KEY = 'AIzaSyBwTkrCtLKEQD5ocyIcgNZgCwQFjwtMRs0';

GoogleMapsLoader.load(function(google) {
  map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.231838, lng: 21.0038063},
        zoom: 13
  });

  let allPlaces = viewModel.allPlaces();

  allPlaces.forEach(function(place, index){
    let marker = new google.maps.Marker({
      position: {lat: place.lat, lng: place.lng},
      map: map,
      title: place.name
    });
  })
});
