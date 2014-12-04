var sv = new google.maps.StreetViewService();
var width = 400;
var height = 150;
var overlap = 30;
var fullY = height + overlap;
var panos = new Array();
var index = 0;
var mouseDown = 0;
var needsUpdate = false;
var currHeading = 120;
var currPitch = 0;

function initialize() {
  var startingLat = 37.780;//sf
  var startingLong = -122.44;//sf
  var startingLat =  4.6097100 
  var startingLong =  -74.0817500

  var latStep = -0.002;
  var longStep = 0.002;
  for(var j = 0; j < 3; j++){
    for (var i = 0; i < 3; i++){
        createSV(startingLat+j*latStep, startingLong + i*longStep, i*width, j*height);
    }
  }
  //document.body.addEventListener('click', 'updateGlobalPOV', true); 
  //createSV(42.345573, -71.08, 200, 200);
  //map.setStreetView(panorama);
  var prevX, prevY, currX, currY;
  document.body.onmousedown = function(e) { 
    prevX = currX = e.clientX;
    prevY = currY = e.clientY;
  ++mouseDown;

}
document.body.onmouseup = function() {
  --mouseDown;

}
  document.body.onmousemove = function(e){
  //currPitch-=10;
  if(mouseDown){
  prevX = currX;
  prevY = currY;
  currX = e.clientX;
  currY = e.clientY;
  var diffX = currX - prevX;
  var diffY = currY - prevY;
  currHeading -= diffX/2;
  currPitch += diffY/2;
  
  // function updateGlobalPOV(){
    //alert("updating");
   for(var i = 0; i < panos.length; i++){
      panos[i].setPov({
        heading: currHeading,
        pitch: currPitch,
        zoom: 2
      });
    }
    //console.log("updating pov");
  //}

}
}

}

google.maps.event.addDomListener(window, 'load', initialize);

//document.body.onclick = 'updateGlobalPOV()';

function createSV(lat, lon, x, y){
  var fenway = new google.maps.LatLng(lat, lon);
  sv.getPanoramaByLocation(fenway, 100, processSVData);
  //
  /*var newDiv = document.createElement('div');
  document.body.appendChild(newDiv);
  newDiv.id = 'newDiv';
  newDiv.className = 'pano-holders';
  newDiv.style.width = '400px';
  newDiv.style.height = '600px';
  newDiv.style.position = 'absolute';
  newDiv.style.left = x + 'px';
  newDiv.style.top = y + 'px';*/
  //newDiv.style="position:absolute; left:100px; top:170px;";
  /*var panoramaOptions = {
    position: fenway,
    pov: {
      heading: 34,
      pitch: 10
    }
  };
  var panorama = new google.maps.StreetViewPanorama(newDiv, panoramaOptions);*/
  function processSVData(data, status) {
  if (status == google.maps.StreetViewStatus.OK) {
     var newDiv = document.createElement('div');
  document.body.appendChild(newDiv);
  newDiv.id = 'newDiv';
  newDiv.className = 'pano-holders';
  newDiv.style.width = width + 'px';
  newDiv.style.height = fullY + 'px';
  newDiv.style.position = 'absolute';
  newDiv.style.left = x + 'px';
  newDiv.style.top = y + 'px';
  var panoOptions = {
  linksControl: false,
  panControl: false,
  zoomControl: false,
  addressControl: false,
    enableCloseButton: false
  };
  var panorama = new google.maps.StreetViewPanorama(newDiv, panoOptions);
  panos[index] = panorama;
  index++;
    /*var marker = new google.maps.Marker({
      position: data.location.latLng,
      map: map,
      title: data.location.description
    });

    google.maps.event.addListener(marker, 'click', function() {

      var markerPanoID = data.location.pano;*/
      // Set the Pano to use the passed panoID
      panorama.setPano(data.location.pano);
      panorama.setPov({
        heading: 120,
        pitch: 0,
        zoom: 3
      });
      panorama.setVisible(true);
      google.maps.event.addListener(panorama, 'pov_changed', function() {
      /*var headingCell = document.getElementById('heading_cell');
      var pitchCell = document.getElementById('pitch_cell');
      headingCell.firstChild.nodeValue = panorama.getPov().heading;
      pitchCell.firstChild.nodeValue = panorama.getPov().pitch;*/
      //alert();
      if(mouseDown){
          needsUpdate = true;
          
        } else {
          needsUpdate = false;
          //updateGlobalPOV();
        }
  });
    }
  }
 

}


