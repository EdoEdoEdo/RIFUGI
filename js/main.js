// necessary variables
var map;
var infoWindow;

// markersData variable stores the information necessary to each marker
var markersData = [
   {
      lat: 42.476552,
      lng: 13.565509,
      name: "Rifugio Franchetti",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.447813,
      lng: 13.552083,
      name: "Rifugio Duca Degli Abruzzi",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.327332,
      lng: 13.691194,
      name: "Rifugio Della Rocca",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.037716,
      lng: 14.161675,
      name: "Rifugio Fonte Tarì",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.160832,
      lng: 14.132208,
      name: "Rifugio Bruno Pomilio",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.475655,
      lng: 13.459759,
      name: "Rifugio Domenico Fioretti",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 41.831384,
      lng: 13.934291,
      name: "Rifugio Selva Bella",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.185424,
      lng: 13.391417,
      name: "Rifugio Sebastiani",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   },
   {
      lat: 42.498017,
      lng: 13.499927,
      name: "Rifugio Del Monte",
      address1:"Parco Nazionale",
      address2: "23-456-6789",
      postalCode: "42.476552 - 13.565509" // don't insert comma in the last item of each marker
   }
];


function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(41.601203,13.668173),
      zoom: 9,
      mapTypeId: 'roadmap',
      scrollwheel: false,
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

   // a new Info Window is created
   infoWindow = new google.maps.InfoWindow();

   // Event that closes the Info Window with a click on the map
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Finally displayMarkers() function is called to begin the markers creation
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initialize);


// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
   
   // for loop traverses markersData array calling createMarker function for each marker 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var name = markersData[i].name;
      var address1 = markersData[i].address1;
      var address2 = markersData[i].address2;
      var postalCode = markersData[i].postalCode;

      createMarker(latlng, name, address1, address2, postalCode);

      // marker position is added to bounds variable
      bounds.extend(latlng);  
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);
}

// This function creates each marker and it sets their Info Window content
function createMarker(latlng, name, address1, address2, postalCode){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });

   // This event expects a click on a marker
   // When this event is fired the Info Window content is created
   // and the Info Window is opened.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Creating the content to be inserted in the infowindow
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + name + '</div>' +
         '<div class="iw_content">' + address1 + '<br />' +
         address2 + '<br />' +
         postalCode + '</div></div>';
      
      // including content to the Info Window.
      infoWindow.setContent(iwContent);

      // opening the Info Window in the current map and at the current marker location.
      infoWindow.open(map, marker);
   });
}