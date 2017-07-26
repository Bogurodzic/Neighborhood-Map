var ko = require("knockout");

var myViewModel = {
  placeForMarkers: ko.observableArray([
      { name: "Pałac Kultury", lat: 52.231838, lng: 21.0038063 },
      { name: "Muzeum Narodowe", lat: 52.2315987, lng: 21.02261 },
      { name: "Muzeum Powstania Warszawskiego", lat: 52.2323289, lng: 20.9786972 },
      { name: "Stare Miasto", lat: 52.2500272, lng: 21.0092832 },
      { name: "Łazienki Królewskie", lat: 52.2151532, lng: 21.0328105 },
      { name: "PGE Narodowy", lat: 52.2394957, lng: 21.0436022 },
  ])
}

ko.applyBindings(myViewModel);


module.exports = myViewModel;
