const $ = require("jquery");
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
  });
}

function closeAllInfoWindow(){
  viewModel.markers.forEach(function(marker){
    marker.infoWindow.close(map, marker);
  })
}

var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
