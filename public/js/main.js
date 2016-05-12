$(function initializeMap (){

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  var markers = [];

  function drawMarker (type, coords, name) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.name = name;
    markers.push(marker)
    // marker.setMap(currentMap);
  }


  function setMapOnAll(map) {
   for (var i = 0; i < markers.length; i++) {
     markers[i].setMap(map);
     console.log(markers[i])
   }
  }

  function clearMarkers(markers){
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  function showMarkers(){
    setMapOnAll(currentMap)
  }

  function deleteMarkers() {
     clearMarkers();
     markers = [];
  }

  // drawMarker('hotel', [40.705137, -74.007624]);
  // drawMarker('restaurant', [40.705137, -74.013940]);
  // drawMarker('activity', [40.716291, -73.995315]);



$(document).ready(function(){
  for(var i =0; i<hotels.length; i++){
    $('#hotel-choices').append('<option>'+hotels[i].name+'</option>');
  }
  for(var i =0; i<restaurants.length; i++){
    $('#restaurant-choices').append('<option>'+restaurants[i].name+'</option>');
  }
  for(var i =0; i<activities.length; i++){
    $('#activity-choices').append('<option>'+activities[i].name+'</option>');
  }


  $('#hotelbutton').on('click', function(){
    var hotelName = $('#hotel-choices option:selected').val();
    for(var i =0; i<hotels.length; i++){
      if(hotels[i].name === hotelName){
        var hotelLatLong = hotels[i].place.location;
      }
    }
    $('#selectedhotel').append('<div class="itinerary-item"><span class="title">'+hotelName+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    drawMarker('hotel', hotelLatLong, hotelName);
    showMarkers();
  });


  $('#restaurantbutton').on('click', function(){
    var restaurantName = $('#restaurant-choices option:selected').val();
        for(var i =0; i<hotels.length; i++){
      if(restaurants[i].name === restaurantName){
        var restaurantLatLong = restaurants[i].place.location;
      }
    }
    $('#selectedrestaurant').append('<div class="itinerary-item"><span class="title">'+restaurantName+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    drawMarker('restaurant', restaurantLatLong, restaurantName);
    showMarkers();
  });


  $('#activitybutton').on('click', function(){
    var activityName = $('#activity-choices option:selected').val();
        for(var i =0; i<activities.length; i++){
      if(activities[i].name === activityName){
        var activityLatLong = activities[i].place.location;
      }
    }
    $('#selectedactivity').append('<div class="itinerary-item"><span class="title">'+activityName+'</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>');
    drawMarker('activity', activityLatLong, activityName);
    showMarkers();
  });


  $('.title').on('click', '.remove', function () {
    var hotelToRemove = $(this).prev().text()
    for(i=0; i<markers.length; i++){
      if(markers[i].name === hotelToRemove){
        markers.splice(i, 1);
      }
    }
    clearMarkers(markers);
    setMapOnAll(currentMap);
    $(this).prev().remove()
    $(this).remove(); 
  });

  var num=1;

  $("#day-add").on('click', function(){
    num++
    $('<button class="btn btn-circle day-btn">'+num+'</button>').insertBefore($(this));
  })


});

});
