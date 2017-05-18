/**
*Javascript backend for a website which allows a user to make a "pubcrawl" style path using specified points using the googlemaps api
*/


var latLongs = [];	//an array of latitude and longitudes
var addresses = [];		//the raw addresses	
var startCoords = [];	//the start coordinates
var endCoords = [];		//the end coordinates
var spc = " "; //spc is used in concat for a quick space

var city;
var state;
var start;
var end;

listAddressIndex = 0;		//used in listAddresses to increment to the next address
var consistentIndex = 0;		//used in CreateRoute to increment to the next latitude and longitude pair

/**
*This function gets latitude and longitude from an address because the google maps api requires coordinates, not addresses.
*/

function getLatitudeLongitude(address, type) {
  address = address || 'Seattle, WA';
  geocoder = new google.maps.Geocoder();
  if (geocoder) {
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        lat = results[0].geometry.location.lat();
        lng = results[0].geometry.location.lng();
        if(type=="start"){
            startCoords.push(lat);
            startCoords.push(lng);
        }else if(type=="end"){
            endCoords.push(lat);
            endCoords.push(lng);
        }else{
          latLongs.push(lat);
          latLongs.push(lng);
        }
      }
    });
  }
}


/**
*Sets the first address to be visited
*Start changes the global variable for city and state so all addresses put in will be in that city, limiting crawls to one city.
*/
function setStart(){
    city = document.getElementById("city").value;
    state = document.getElementById("state").value;
    start = document.getElementById('start').value.concat(spc, city, spc, state);
    getLatitudeLongitude(start, "start")
}

/**
*Sets the last address to be visited
*/
function setEnd(){
    end = document.getElementById('end').value.concat(spc, city, spc, state);
    getLatitudeLongitude(end, "end")
}

/**
*Takes the address. Makes it into a single var. Gets the coordinates for that addresses.
*/
function getAddress() {
    var address = document.getElementById('address').value.concat(spc, city, spc, state);
    getLatitudeLongitude(address, false)
    addresses.push(address);
};

/**
*Provides a list of the addresses for display or calculation
*/
function listAddresses(){
  document.getElementById('addressList').innerHTML =("YOUR ADDRESSES:" + "<br>"); 
  if(start){
    document.getElementById('addressList').innerHTML +=(start + "<br>");
  }
  for(i=listAddressIndex; i<addresses.length; i++){
    document.getElementById('addressList').innerHTML +=(addresses[i] + "<br>");
  }
  if(end){
    document.getElementById('addressList').innerHTML +=(end + "<br>");
  }
}

/**
*Hides ability to input (for final display)
*/
function hideInput(){
  document.getElementById("getLatLong").style.display = 'none';
  document.getElementById("address").style.display = 'none';
  document.getElementById("clickMe").style.display = 'none';
  document.getElementById("waypoints").style.display = 'none';
}

/**
*Hides the set start button
*/
function hideStart(){
  document.getElementById("startSelect").style.display = 'none';
  document.getElementById("endSelect").style.visibility = 'visible';
}

/**
*Hides the set end button
*/
function hideEnd(){
    document.getElementById("endSelect").style.display = 'none';
}

/**
*Lists the waypoints (points between start and end)
*/
function showWayPoints(){
    document.getElementById("waypoints").style.visibility = 'visible';
}

/**
*Allows the refresh button to be shown
*/
function showRefreshButton(){
    document.getElementById("refreshButton").style.visibility = 'visible';
}

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

/**
*Creates an empty map after the user hits "Create Route"
*/
function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: false
  });

  var myOptions = {
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  }

  map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('right-panel'));
  createRoute();
}

/**
*Adds markers to the map to create the route
*/
function createRoute() {
  var waypts = [];

  for(i=consistentIndex; i<latLongs.length; i=i+2){
    createMarker(new google.maps.LatLng(Number(latLongs[i]), Number(latLongs[i+1])))
    stop = new google.maps.LatLng(Number(latLongs[i]), Number(latLongs[i+1]))
    waypts.push({
      location: stop,
      stopover: true
    });
    consistentIndex= consistentIndex +2;
  }

  start = new google.maps.LatLng(Number(startCoords[0]), Number(startCoords[1]));
  end = new google.maps.LatLng(Number(endCoords[0]), Number(endCoords[1]));
    
// the requested route to be created
  var request = {
    origin: start,
    destination: end,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.DirectionsTravelMode.WALKING
  };

  
  directionsService.route(request, function (response, status) {
	//if the api is working and everything is in order
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
    }
  });
}

/**
*Reloads the window
*/
function refresh(){
  window.location.reload()
}

/**
*Creates a marker on the map
*/
function createMarker(latlong) {
  var marker = new google.maps.Marker({
    position: latlong,
    map: map
  });
}

