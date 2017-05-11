var latLongs = [];
var addresses = [];
var startCoords = [];
var endCoords = []
var start;
var end;
var consistentIndex = 0;
listAddressIndex = 0;


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

function setStart(){
    start = document.getElementById('start').value;
    getLatitudeLongitude(start, "start")
}

function setEnd(){
    end = document.getElementById('end').value;
    getLatitudeLongitude(end, "end")
}

function getAddress() {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(address, false)
    addresses.push(address);
};

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

function hideInput(){
  document.getElementById("getLatLong").style.display = 'none';
  document.getElementById("address").style.display = 'none';
  document.getElementById("clickMe").style.display = 'none';
  document.getElementById("waypoints").style.display = 'none';
}

function hideStart(){
  document.getElementById("startSelect").style.display = 'none';
  document.getElementById("endSelect").style.visibility = 'visible';
}

function hideEnd(){
    document.getElementById("endSelect").style.display = 'none';
}

function showWayPoints(){
    document.getElementById("waypoints").style.visibility = 'visible';
}

function showRefreshButton(){
    document.getElementById("refreshButton").style.visibility = 'visible';
}

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

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
  createRoute();
}

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
    
  var request = {
    origin: start,
    destination: end,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.DirectionsTravelMode.WALKING
  };

  directionsService.route(request, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];
    }
  });
}

function refresh(){
  window.location.reload()
}

function createMarker(latlong) {
  var marker = new google.maps.Marker({
    position: latlong,
    map: map
  });
}

