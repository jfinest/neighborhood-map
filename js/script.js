//create variables associated with maps
var map;
var markers = [];
var bounds;
var deferScript = $.Deferred();

function getMarkers(){
  var markersList = [];
  for (var i = 0; i < markers.length; i++ ){
    markersList.push({marker:markers[i]});
  }
  return markers;
}

//Function for data
function getLocations() {
  var locations = [
      {index: 0, title: 'Hayfield Farm Swim Club', location: {lat: 38.745084, lng: -77.133093}, id: 'ChIJIRWMs7utt4kRNxWfTjUIYYM'},
      {index: 1, title: 'Home', location: {lat: 38.760342, lng: -77.13842299999999}, id: 'ChIJVROMZ5qtt4kRVJ6BrrEv06o'},
      {index: 2, title: 'Public Storage', location: {lat: 38.754219, lng: -77.085419}, id: 'ChIJz8zMMhGut4kR65spWyUsq-A'},
      {index: 3, title: 'Mt Vernon Plaza', location: {lat: 38.749636, lng: -77.085861}, id: 'ChIJ_T_LdBOut4kR9U4xINY9qis'},
      {index: 4, title: 'Walmart', location: {lat: 38.74378, lng: -77.087549}, id: 'ChIJFUJDSGyut4kRGh7P2j7C_gc'},
      {index: 5, title: 'Krispy Kreme', location: {lat: 38.778887, lng: -77.080446}, id: 'ChIJkQCMPeixt4kRX_CAwpx8KGU'},
      {index: 6, title:'Belle Haven Country Club', location: {lat: 38.787275, lng: -77.060251}, id: 'ChIJP-abu7Wxt4kRx9yUoE5n8sg'},
      {index: 7, title:'Huntington Metro Station', location: {lat: 38.793855, lng: -77.075288}, id: 'ChIJfzZRkryxt4kRExOcTcMsA6E'},
      {index: 8, title: 'Cava', location: {lat: 38.769571, lng: -77.139957}, id: 'ChIJNZpOiIatt4kRquFdw5_C4xs'},
      {index: 9, title: 'Regal Cinemas Kingstowne 16', location: {lat: 38.772009, lng: -77.138221}, id: 'ChIJLfK4x4ett4kRKVMtGApGYj8'},
      {index: 10, title: 'Hayfield Secondary School', location: {lat: 38.750166, lng: -77.144265}, id: 'ChIJwx5l3KOtt4kR4d34PxFKJX0'}
      ];
return locations;
}

function createMarkers(locations){
  var defaultIcon = makeMarkerIcon('ff0000');
  var highlightedIcon = makeMarkerIcon('FFFF24');
  // using locations to create marker's array  
  for (var i = 0; i < locations.length; i++){
    var position = locations[i].location;
    var title = locations[i].title.toUpperCase();
    var id = locations[i].id;

    //creating marker per location
    var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: id
    });

    var placeInfoWindow = new google.maps.InfoWindow();

    //pushing marker to array of markers
    markers.push(marker);
    bounds.extend(marker.position);

    //adding click listener to each marker
    marker.addListener('click', function() {
      for (var j = 0; j < markers.length; j++){
        markers[j].setIcon(defaultIcon);
      }
      if (placeInfoWindow.marker == this) {
        console.log("This infowindow already is on this marker!");
      } else {
        getPlacesDetails(this, placeInfoWindow);
      }
      this.setIcon(highlightedIcon);
      // articleTrigger(this);
      myModel.activateMarkerClick(this);
    });
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

//handles error
function googleApisError(){
  $('body').html('<div class="jumbotron"> Unable to load Google Data. Please try again Later. </div>');
}

//initialize the map
function initMap() {
  var defer = $.Deferred();
  var locations = getLocations();
  var largeInfowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 38.76, lng: -77.10},
  zoom: 12 
  });

  bounds = new google.maps.LatLngBounds();

  createMarkers(locations);
  deferScript.resolve(markers);
}   

function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
  map.fitBounds(bounds);
}

function hideMarkers(markers) {
  for(var i=0; i<markers.length; i++) {
    markers[i].setMap(null);
  }
}

function showMarkers() {
  for(var i=0; i<markers.length; i++) {
    markers[i].setMap(map);
  }
}

function hideMarkerAtIndex(index) {
  markers[index].setMap(null);
}

function showMarkerAtIndex(index) {
  markers[index].setMap(map);
}

function getPlacesDetails(marker, infowindow) {

  var service = new google.maps.places.PlacesService(map);
  var streetViewService = new google.maps.StreetViewService();
  var radius = 50;

  service.getDetails({placeId: marker.id}, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Set the marker property on this infowindow so it isn't created again.
      infowindow.marker = marker;
      var innerHTML = '<div>';
      innerHTML += '<div>'
      if (place.name) {
        innerHTML += '<strong>' + marker.title + '</strong>';
      }
      if (place.formatted_address) {
        innerHTML += '<br>' + place.formatted_address;
      }
      if (place.formatted_phone_number) {
        innerHTML += '<br>' + place.formatted_phone_number;
      }
      if (place.photos) {
        innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
        {maxHeight: 100, maxWidth: 200}) + '">';
      }else {
        innerHTML += '</div>';
        innerHTML += '<div>';
        //getting street image 
        var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + place.formatted_address + '';
        innerHTML += '<br><img src= "' + streetviewUrl + '">';
        innerHTML += '</div>';
      }

      innerHTML += '</div>';

      //setting infowindow criterias
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  });
}

function loadData(searchCriteria) {

  var defer = $.Deferred();
  var articles = [];
  var title = searchCriteria;     
  //load nytimes API
  var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + title + '&sort=newest&api-key=1a6c37c75f0f45a487cabe2221eb530f';

  $.getJSON(nytimesUrl, function(data){
    articles = data.response.docs;
    var maxArticles = ((articles.length < 3)? articles.length: 3);
    articles = articles.slice(0, maxArticles);
    defer.resolve(articles);          
  }).fail(function() {
    console.log("Request failed. Try again later.");
    defer.reject();
  });
  return defer;
}
