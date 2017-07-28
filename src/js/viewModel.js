const ko = require("knockout");


let myViewModel = {
  map: null,
  //All markers
  allPlaces: ko.observableArray([
      { name: "Pałac Kultury", lat: 52.231838, lng: 21.0038063 },
      { name: "Muzeum Narodowe", lat: 52.2315987, lng: 21.02261 },
      { name: "Muzeum Powstania Warszawskiego", lat: 52.2323289, lng: 20.9786972 },
      { name: "Stare Miasto", lat: 52.2500272, lng: 21.0092832 },
      { name: "Łazienki Królewskie", lat: 52.2151532, lng: 21.0328105 },
      { name: "PGE Narodowy", lat: 52.2394957, lng: 21.0436022 },
  ]),

  //List of actual filtered placesp
  filteredPlaces: ko.observableArray([]),

  //List of all markers
  markers: ko.observableArray([]),

  updateMarkers: function(){
    myViewModel.filterPlaces();
    myViewModel.filterMarkers();
  },

  filterPlaces: function(){
    lookForSearchedPlace(myViewModel.allPlaces(), getSearchedPlaceName());
  },

  filterMarkers: function(){
    myViewModel.markers().forEach(function(marker, index){
      //Create new RegExp according to actual searched place name
      let placeName = new RegExp(getSearchedPlaceName());
      changeMarkerVisibility(marker, placeName)
    });
  }

}

ko.applyBindings(myViewModel);

function lookForSearchedPlace(allPlaces, placeName){
  placeName = new RegExp(placeName)
  resetFilteredPlaces();
  checkAllPlaces(allPlaces, placeName);
}

function resetFilteredPlaces(){
  myViewModel.filteredPlaces.removeAll();
}

function checkAllPlaces(allPlaces, placeName){
  allPlaces.forEach(function(place){
    checkPlace(place, placeName);
  });
}

function checkPlace(place, placeName){
  if (placeName.test(place.name)===true){
    addToFilteredPlaces(place);
  }
}

function addToFilteredPlaces(place){
  myViewModel.filteredPlaces.push(place);
}

function changeMarkerVisibility(marker, placeName){
  if (checkName(marker, placeName)){
    showMarker(marker);
  } else {
    hideMarker(marker);
  }
}

function checkName(marker, placeName){
  if(placeName.test(marker.title)){
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

function getSearchedPlaceName(){
  return document.getElementById("place-name").value;
}

module.exports = myViewModel;
