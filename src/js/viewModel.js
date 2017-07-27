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
    if(map){
      myViewModel.filterMarkers();
    }
  },

  filterPlaces: function(){
    lookForSearchedPlace(myViewModel.allPlaces(), myViewModel.getSearchedPlaceName());

    function lookForSearchedPlace(allPlaces, placeName){
      placeName = new RegExp(placeName)
      //Reset filtered places
      myViewModel.filteredPlaces.removeAll();

      allPlaces.forEach(function(place){
        checkPlace(place);
      });
      //Looks for markers which match with input value
      function checkPlace(place){
        if (placeName.test(place.name)===true){
          myViewModel.filteredPlaces.push(place);
        }
      }
    }
  },

  filterMarkers: function(){
    myViewModel.markers().forEach(function(marker, index){
      //Create new RegExp according to actual searched place name
      let placeName = new RegExp(myViewModel.getSearchedPlaceName());
      checkMarker(marker, placeName)
    });

    function checkMarker(marker, placeName){
      if (placeName.test(marker.title)){
        marker.setMap(myViewModel.map);
      } else {
        marker.setMap(null);
      }
    }
  },

  getSearchedPlaceName: function(){
    return document.getElementById("place-name").value;
  }

}

ko.applyBindings(myViewModel);


module.exports = myViewModel;
