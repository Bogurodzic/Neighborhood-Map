const $ = require("jquery");
const GoogleMapsLoader = require('google-maps');
let viewModel = require("./viewModel.js");
const styles = require("./styles.js");


initMap();

GoogleMapsLoader.KEY = 'AIzaSyBwTkrCtLKEQD5ocyIcgNZgCwQFjwtMRs0';

function initMap(){
  GoogleMapsLoader.load(function(google) {
    renderMap();
    createAllMarkers(getAllPlaces());
    viewModel.addInfoWindowEvents();
  });
}

function renderMap(){
  return viewModel.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.231838, lng: 21.0038063},
        zoom: 13,
        styles: styles
  });
}

function getAllPlaces(){
  return viewModel.allPlaces()
}

function createAllMarkers(allMarkers){
  allMarkers.forEach(function(place){
    let marker = createMarker(place);
    marker.infoWindow = createInfoWindow(place.name);
    addDescription(marker);
    addListeners(marker);
    //Add marker to markers array
    viewModel.markers.push(marker);
  })
}

function createMarker(place){
  return new google.maps.Marker({
        position: {lat: place.lat, lng: place.lng},
        map: viewModel.map,
        title: place.title,
        name: place.name,
        icon: "img/marker-small.png"
      });
}

function createInfoWindow(placeName){
  return new google.maps.InfoWindow({
    maxWidth: 200
  });
}

function addDescription(marker){
  $.ajax({
      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + marker.title,
      dataType: 'jsonp',
      type: 'GET',
      success: function(data) {
        let description =  data[2][0];
        marker.infoWindow.setContent(description);
      },
      error: function (request, status, error) {
        alert("Sorry but there was problem with connecting to wikipedia api due to :" + request.responseText);
      }
  });
}

function addListeners(marker){
  marker.addListener('click', function() {
    viewModel.stopAll();
    marker.infoWindow.open(map, marker);
    animateMarker(marker);
  });
}

function closeAllInfoWindow(){
  viewModel.markers.forEach(function(marker){
    marker.infoWindow.close(map, marker);
  })
}

function animateMarker(marker){
  marker.setAnimation(google.maps.Animation.BOUNCE);
}
