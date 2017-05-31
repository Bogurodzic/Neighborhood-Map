var map;
//array for the markers
var markers = [];

var locations = [
  {title: 'Złote Tarasy', location: {lat: 52.230005, lng: 21.0003818}},
  {title: 'University of Warsaw', location: {lat: 52.2403463, lng: 21.0164125}},
  {title: 'Empik', location: {lat: 52.2333044, lng: 21.0080667}},
  {title: 'Google', location: {lat: 52.2335813, lng: 20.9996984}},
  {title: 'Warsaw Old Town', location: {lat: 52.2500272, lng: 21.0092833}},
  {title: 'National Stadium Warsaw', location: {lat: 52.2394957, lng: 21.0436022}},
  {title: 'Warsaw University of Technology', location: {lat: 52.2212012, lng: 21.005897}},
  {title: 'Warsaw Uprising Museum', location: {lat: 52.232324, lng: 20.9789653}},
  {title: 'Presidential Palace', location: {lat: 52.243168, lng: 21.0144238}},
  {title: 'Fryderyk Chopin Museum', location: {lat: 52.2365397, lng: 21.0207457}},
  {title: 'Grand Theatre Warsaw', location: {lat: 52.2390616, lng: 21.0036875}}
];    

function initMap() {

  //styling map a bit (:
  var styles = [{"stylers":[{"hue":"#dd0d0d"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]}];

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.231838, lng: 21.0038063},
    zoom: 13,
    styles: styles
  });

  var infoWindow = new google.maps.InfoWindow();

  //Create a default icon
  var defaultIcon = makeMarkerIcon("551615");

  //Create a highlited icon
  var highlitedIcon = makeMarkerIcon("8D363B");

  //Place markers on the map
  for (var i=0; i<locations.length; i++){
    var title = locations[i].title;
    var location = locations[i].location;
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
      icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: i
    });

    marker.addListener("mouseover", function(){
      this.setIcon(highlitedIcon);
    });

    marker.addListener("mouseout", function(){
      this.setIcon(defaultIcon);
    });

    marker.addListener("click", function(){
      makeInfoWindow(this, infoWindow);
    });

    marker.addListener("click", toggleBounce);

    markers.push(marker);
  }

  function makeInfoWindow(marker, window){
  
    // Check to make sure the infowindow is not already opened on this marker.
    if(window.marker != marker){
      window.marker = marker;
      var description = ""; 

	    $.ajax({
	      url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+marker.title+"",
	      type: "GET",
	      dataType: "jsonp",
	      success: function (data) {
	        description = "<div id='iw-container'>" +"<div class='iw-title'><strong>"+ data[1][0] +"</strong></div>" + "<p>" + data[2][0] +"<p>" + "</div><div class='iw-bottom-gradient'></div>";
	        window.setContent(description);
        	window.open(map, marker);
	  		}, 
	      	xhrFields: {
	        	withCredentials: false
	      		} 
	        });        		
        		        		
        // Make sure the marker property is cleared if the infowindow is closed.
        window.addListener('closeclick', function(){
        window.setMarker(null);
        });

      }
    }


    //open info window, when marker.title matches list view element
    $("#list-filtered").children().each(function (){
      //add on click function on every <li> element
      $(this).on("click", function(){
  	    //value of <li> element
	    	var value = $(this).text();
	    	//iterate through markers, search if marker.title matches value
	    	for (var i=0; i<markers.length; i++){
	    		if(markers[i].title == value){
	    			makeInfoWindow(markers[i], infoWindow);;
    			}
    		}
    	});
    });

 	//Active bounce animation
  function toggleBounce() {
 		if (this.getAnimation() !== null) {
    	this.setAnimation(null);
  	} else {
    	this.setAnimation(google.maps.Animation.BOUNCE);
  	}
	}

	//Makes custom marker style
  function makeMarkerIcon(markerColor){
  	var markerImage = new google.maps.MarkerImage('http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
   	new google.maps.Size(21, 34),
   	new google.maps.Point(0, 0),
   	new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
    return markerImage;
	}
}