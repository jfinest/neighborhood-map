     //create a map variable
     var map;

     //create blank array of listing marker
     var markers = [];
     var bounds;

     //creating blank array for the places markers: once then replace with my own location arrays
     //var placeMarkers = [];

     //initialize the map
     function initMap() {
      
       map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.7573595, lng: -77.10},
        zoom: 13 
       });

       bounds = new google.maps.LatLngBounds();

       var locations = [
        {title: 'Hayfield Farm Swim Club', location: {lat: 38.745084, lng: -77.133093}, id: 'ChIJIRWMs7utt4kRNxWfTjUIYYM'},
        {title: 'Home', location: {lat: 38.760342, lng: -77.13842299999999}, id: 'ChIJVROMZ5qtt4kRVJ6BrrEv06o'},
        {title: 'Public Storage', location: {lat: 38.754219, lng: -77.085419}, id: 'ChIJz8zMMhGut4kR65spWyUsq-A'},
        {title: 'Mt Vernon Plaza', location: {lat: 38.749636, lng: -77.085861}, id: 'ChIJ_T_LdBOut4kR9U4xINY9qis'},
        {title: 'Walmart', location: {lat: 38.74378, lng: -77.087549}, id: 'ChIJFUJDSGyut4kRGh7P2j7C_gc'},
        {title: 'Krispy Kreme', location: {lat: 38.778887, lng: -77.080446}, id: 'ChIJkQCMPeixt4kRX_CAwpx8KGU'},
        {title:'Belle Haven Country Club', location: {lat: 38.787275, lng: -77.060251}, id: 'ChIJP-abu7Wxt4kRx9yUoE5n8sg'},
        {title:'Huntington Metro Station', location: {lat: 38.793855, lng: -77.075288}, id: 'ChIJfzZRkryxt4kRExOcTcMsA6E'},
        {title: 'Cava', location: {lat: 38.769571, lng: -77.139957}, id: 'ChIJNZpOiIatt4kRquFdw5_C4xs'},
        {title: 'Regal Cinemas Kingstowne 16', location: {lat: 38.772009, lng: -77.138221}, id: 'ChIJLfK4x4ett4kRKVMtGApGYj8'},
        {title: 'Hayfield Secondary School', location: {lat: 38.750166, lng: -77.144265}, id: 'ChIJwx5l3KOtt4kR4d34PxFKJX0'}
        ];

        var largeInfowindow = new google.maps.InfoWindow();
        
        // using location array to create them into markers array 
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
            id: id
          });

          var placeInfoWindow = new google.maps.InfoWindow();

          //pushing marker to array of marker
          markers.push(marker);
          $("#listing").append('<li class="list-group-item" data-marker-index="' +i +'">' + title +  '</li>');
          bounds.extend(marker.position);
          
          //adding click listner to each marker
            marker.addListener('click', function() {
              if (placeInfoWindow.marker == this) {
                console.log("This infowindow already is on this marker!");
              } else {
                getPlacesDetails(this, placeInfoWindow);
              }
          });
        }
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

      function showMarkers(markers) {
        for(var i=0; i<markers.length; i++) {
          markers[i].setMap(map);
        }
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
            innerHTML += '<div>;'
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
            
            loadData(marker.title);
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

    function loadData(marker) {

      var $nytHeaderElem = $('#nytimes-header');
      var $nytElem = $('#nytimes-articles');
      var title = marker;
      // clear out old data before new request
      $nytElem.text("");
      //load nytimes
      var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + title + '&sort=newest&api-key=1a6c37c75f0f45a487cabe2221eb530f';

      $.getJSON(nytimesUrl, function(data){
          var articles = data.response.docs;
          var maxArticles = ((articles.length < 3)? articles.length: 3);

          $nytHeaderElem.text('NY Times Articles Search of : ' + title);

          if(maxArticles < 1){
            $('#nytimes-articles').html('<li class="article">No Articles Found</li>');
          }else{
            for (var i = 0; i<maxArticles; i++) {
              var article = articles[i];
              $nytElem.append('<li class="article">' +
                  '<a href="'+article.web_url+'">'+article.headline.main+'</a>' +
                  '</li>');
            };   
          }
      });
      return false;
    };