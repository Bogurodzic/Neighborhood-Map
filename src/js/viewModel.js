const ko = require("knockout");

let myViewModel = {

  //All markers
  placesForMarkers: ko.observableArray([
      { name: "Pałac Kultury", lat: 52.231838, lng: 21.0038063 },
      { name: "Muzeum Narodowe", lat: 52.2315987, lng: 21.02261 },
      { name: "Muzeum Powstania Warszawskiego", lat: 52.2323289, lng: 20.9786972 },
      { name: "Stare Miasto", lat: 52.2500272, lng: 21.0092832 },
      { name: "Łazienki Królewskie", lat: 52.2151532, lng: 21.0328105 },
      { name: "PGE Narodowy", lat: 52.2394957, lng: 21.0436022 },
  ]),

  //List of actual markers on the map
  markers: ko.observableArray([]),

  filterPlaces: function(){
    lookForSearchedPlace(myViewModel.placesForMarkers(), getSearchedPlaceName());
    function getSearchedPlaceName(){
      return document.getElementById("place-name").value;
    };

    function lookForSearchedPlace(placesForMarkers, placeName){
      placeName = new RegExp(placeName)
      //Reset markers
      myViewModel.markers.removeAll();

      placesForMarkers.forEach(function(place){
        isPlace(place);
      });
      //Looks for markers which match with input value
      function isPlace(place){
        if (placeName.test(place.name)===true){
          myViewModel.markers.push(place);
        }
      }
    }
  }

}

ko.applyBindings(myViewModel);


module.exports = myViewModel;
