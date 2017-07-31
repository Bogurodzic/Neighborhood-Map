const ko = require("knockout");


let myViewModel = {
  map: null,
  //All markers
  allPlaces: ko.observableArray([
      //Name is provided for better ajax output
      { title: "Palace of Culture and Science", name: "Palace of Culture and Science", lat: 52.231838, lng: 21.0038063 },
      { title: "National Museum, Warsaw", name: "National Museum", lat: 52.2315987, lng: 21.02261 },
      { title: "Warsaw Uprising Museum", name: "Warsaw Uprising Museum", lat: 52.2323289, lng: 20.9786972 },
      { title: "Warsaw Old Town", name: "Warsaw Old Town", lat: 52.2500272, lng: 21.0092832 },
      { title: "Łazienki Palace", name: "Łazienki Palace", lat: 52.2151532, lng: 21.0328105 },
      { title: "National Stadium, Warsaw", name: "National Stadium", lat: 52.2394957, lng: 21.0436022 },
      { title: "Copernicus Science Centre", name: "Copernicus Science Centre", lat: 52.2418552, lng: 21.0265384 },
      { title: "POLIN Museum of the History of Polish Jews", name: "POLIN Museum of the History of Polish Jews", lat: 52.2493743, lng: 20.9909953 },
      { title: "Royal Route, Warsaw", name: "Royal Route", lat: 52.2390541, lng: 21.0074249 },
      { title: "St. Martin's Church, Warsaw", name: "St. Martin's Church", lat: 52.2481905, lng: 21.0102114 }
  ]),

  filter: ko.observable(),

  //List of actual filtered placesp
  filteredPlaces: ko.observableArray([]),

  //List of all markers
  markers: [],

  updateMarkers: function(){
    stopAnimateAll();
    closeAllInfoWindow();
    myViewModel.filterPlaces();
    myViewModel.filterMarkers();
  },

  filterPlaces: function(){
    lookForSearchedPlace(myViewModel.allPlaces(), getSearchedPlaceName());
  },

  filterMarkers: function(){
    myViewModel.markers.forEach(function(marker, index){
      //Create new RegExp according to actual searched place name
      let searchedPlaceName = new RegExp(getSearchedPlaceName());
      changeMarkerVisibility(marker, searchedPlaceName)
    });
  },

  showClickedPlace: function(place){
    let searchedPlaceName = new RegExp(place.name)
    lookForClickedPlace(myViewModel.markers, searchedPlaceName);
  },

  stopAll: function(){
    closeAllInfoWindow();
    stopAnimateAll();
  },

  addInfoWindowEvents: function(){
    myViewModel.markers.forEach(function(marker){
      google.maps.event.addListener(marker.infoWindow, "closeclick", function() {
          stopAnimateAll();
      });
    })
  }

}

function lookForSearchedPlace(allPlaces, searchedPlaceName){
  searchedPlaceName = new RegExp(searchedPlaceName)
  resetFilteredPlaces();
  checkAllPlaces(allPlaces, searchedPlaceName);
}

function lookForClickedPlace(allMarkers, searchedPlaceName){
  allMarkers.forEach(function(marker){
    if(checkPlace(marker.title, searchedPlaceName)){
      myViewModel.stopAll();
      openInfoWindow(marker);
      animateMarker(marker);
    }
  });
}

function resetFilteredPlaces(){
  myViewModel.filteredPlaces.removeAll();
}

function checkAllPlaces(allPlaces, searchedPlaceName){
  allPlaces.forEach(function(place){
    if(checkPlace(place.name, searchedPlaceName)){
      addToFilteredPlaces(place);
    };
  });
}

function checkPlace(placeName, searchedPlaceName){
  if (searchedPlaceName.test(placeName)===true){
    return true;
  }
}

function addToFilteredPlaces(place){
  myViewModel.filteredPlaces.push(place);
}

function changeMarkerVisibility(marker, searchedPlaceName){
  if (checkName(marker, searchedPlaceName)){
    showMarker(marker);
  } else {
    hideMarker(marker);
  }
}

function checkName(marker, searchedPlaceName){
  if(searchedPlaceName.test(marker.name)){
    return true;
  } else {
    return false;
  }
}

function showMarker(marker){
  marker.setMap(myViewModel.map);
}

function hideMarker(marker){
  marker.setMap(null);
}

function hideAllMarkers(){
  myViewModel.markers.forEach(function(marker){
      marker.setMap(null);
  })
}

function animateMarker(marker){
  marker.setAnimation(google.maps.Animation.BOUNCE);
}

function stopAnimateMarker(marker){
  marker.setAnimation(null);
}

function stopAnimateAll(){
  myViewModel.markers.forEach(function(marker){
      stopAnimateMarker(marker);
  })
}

function openInfoWindow(marker){
  marker.infoWindow.open(map, marker);
}

function closeInfoWindow(marker){
  marker.infoWindow.close(map, marker);
}

function closeAllInfoWindow(){
  myViewModel.markers.forEach(function(marker){
      closeInfoWindow(marker);
  })
}


function getSearchedPlaceName(){
  return myViewModel.filter();
}

ko.applyBindings(myViewModel);

module.exports = myViewModel;
