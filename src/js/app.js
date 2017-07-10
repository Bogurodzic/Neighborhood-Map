var $ = require("jquery");
var ko = require("knockout");


console.log($);

var GoogleMapsLoader = require('google-maps'); // only for common js environments

GoogleMapsLoader.load(function(google) {
    new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: -33, lng: 151},
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
          }
        });
});
