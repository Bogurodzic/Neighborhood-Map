//Locations Observable Constructor
var obsLocation = function(location){
    return {
    	title: ko.observable(location.title),
    	cords: ko.observable(location.location)
    	}
    }

var ViewModel = function(){

    var self = this;

    //Locations observable array
    this.places = ko.observableArray([
	    new obsLocation({
	        title: 'Złote Tarasy',
	        location: {lat: 52.230005, lng: 21.0003818}
	    }),
	    new obsLocation({
	        title: 'University of Warsaw', 
	        location: {lat: 52.2403463, lng: 21.0164125}
	    }),
	    new obsLocation({
			title: 'Empik', 
			location: {lat: 52.2333044, lng: 21.0080667}
	    }),
	     new obsLocation({
			title: 'Google', 
			location: {lat: 52.2335813, lng: 20.9996984}
	    }),
	    new obsLocation({
        	title: 'Warsaw Old Town', 
        	location: {lat: 52.2500272, lng: 21.0092833},
	    }),
	    new obsLocation({
			title: 'National Stadium Warsaw',
			location: {lat: 52.2394957, lng: 21.0436022}
	    }),
	   	new obsLocation({
	   		title: 'Warsaw University of Technology', 
	   		location: {lat: 52.2212012, lng: 21.005897}
	    }),
	   	new obsLocation({
	   		title: 'Warsaw Uprising Museum', 
	   		location: {lat: 52.232324, lng: 20.9789653}
	    }),
	   	new obsLocation({
	   		title: 'Presidential Palace', 
	   		location: {lat: 52.243168, lng: 21.0144238}
	    }),
	   	new obsLocation({
	   		title: 'Fryderyk Chopin Museum', 
	   		location: {lat: 52.2365397, lng: 21.0207457}
	    }),
	    new obsLocation({
	    	title: 'Grand Theatre Warsaw', 
	    	location: {lat: 52.2390616, lng: 21.0036875}
	    })
    ])
    
    //holds #filter-text value
    this.filter = ko.observable("");

    //Filter places due to filter value
    this.filteredItems = ko.computed(function(){
        //compare filter to places array
        var stringStartsWith = function (string, startsWith) {          
   			string = string || "";
    		if (startsWith.length > string.length)
        		return false;
    		return string.substring(0, startsWith.length) === startsWith;
		};
		//placeholder for filter observable
        var filter = self.filter().toLowerCase();
        //return places if filter is empty
        if (!filter){
        	return self.places();
        } else {
        	//filter array
        	return ko.utils.arrayFilter(self.places(), function(place){
        	//compare filter to place.title and return if they match
            	return stringStartsWith(place.title().toLowerCase(), filter);
        	});
        }
    }, self);


    //Hide all markers
    this.hideListings = function(){
        for (var i=0; i<markers.length; i++){
        	markers[i].setMap(null);
        }
    }

    //Show chosen marker when you click ,,filter" button.
    this.showOne = function(){
        for (var j=0; j<markers.length; j++){
        	value = document.getElementById("filter-text").value;
        	if (value === locations[j].title){
        		markers[j].setMap(map);
        	}
        }
    }


    //Show filtered markers from filteredItems computed observable
    this.displayMarkers = function(){
        if (self.filter() != "")
        	self.hideListings();
        for (var i=0; i<markers.length; i++){
        	for (var j=0; j<self.filteredItems().length; j++){
        		if (markers[i].title == self.filteredItems()[j].title()){
        			markers[i].setMap(map);
        		}
        	}
        }
    }

    document.getElementById("filter-text").addEventListener("keyup", function(){
        self.displayMarkers();
    });
};

ko.applyBindings(new ViewModel());
