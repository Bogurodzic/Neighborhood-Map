const ko = require("knockout");


let myViewModel = {
  map: null,
  //All markers
  allPlaces: ko.observableArray([
      //Name is provided for better ajax output
      { title: "Palace of Culture and Science", name: "Palace of Culture and Science", lat: 52.231838, lng: 21.0038063 },
      { title: "National Museum, Warsaw", name: "National Museum, Warsaw", lat: 52.2315987, lng: 21.02261 },
      { title: "Warsaw Uprising Museum", name: "Warsaw Uprising Museum", lat: 52.2323289, lng: 20.9786972 },
      { title: "Warsaw Old Town", name: "Warsaw Old Town", lat: 52.2500272, lng: 21.0092832 },
      { title: "Łazienki Palace", name: "Łazienki Palace", lat: 52.2151532, lng: 21.0328105 },
      { title: "National Stadium, Warsaw", name: "National Stadium, Warsaw", lat: 52.2394957, lng: 21.0436022 },
  ]),

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
      stopAnimateAll();
      closeAllInfoWindow();
      addInfoWindowEvents(marker)
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
  if(searchedPlaceName.test(marker.title)){
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

function closeAllInfoWindow(marker){
  myViewModel.markers.forEach(function(marker){
      closeInfoWindow(marker);
  })
}

function addInfoWindowEvents(marker){
  google.maps.event.addListener(marker.infoWindow, "closeclick", function() {
      stopAnimateMarker(marker);
  });
}

function getSearchedPlaceName(){
  return document.getElementById("place-name").value;
}

ko.applyBindings(myViewModel);

module.exports = myViewModel;
