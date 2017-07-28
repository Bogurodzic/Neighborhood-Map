const GoogleMapsLoader = require('google-maps');
let viewModel = require("./viewModel.js");


initMap();

GoogleMapsLoader.KEY = 'AIzaSyBwTkrCtLKEQD5ocyIcgNZgCwQFjwtMRs0';

function initMap(){
  GoogleMapsLoader.load(function(google) {
    renderMap();
    createAllMarkers(getAllPlaces());
  });
}

function renderMap(){
  return viewModel.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.231838, lng: 21.0038063},
        zoom: 13
  });
}

function getAllPlaces(){
  return viewModel.allPlaces()
}

function createAllMarkers(allMarkers){
  allMarkers.forEach(function(place){
    let marker = createMarker(place);
    marker.infoWindow = createInfoWindow();
    addListeners(marker);
    //Add marker to markers array
    viewModel.markers.push(marker);
  })
}

function createMarker(place){
  return new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: viewModel.map,
        title: place.name
      });
}

function createInfoWindow(){
  return new google.maps.InfoWindow({
      content: ":DDDDD"
  });
}

function addListeners(marker){
  marker.addListener('click', function() {
    closeAllMarkers();
    marker.infoWindow.open(map, marker);
  });
}

function closeAllMarkers(){
  viewModel.markers().forEach(function(marker){
    marker.infoWindow.close(map, marker);
  })
}
