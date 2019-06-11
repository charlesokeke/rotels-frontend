import React from 'react'

import './renderMapCss.css'


const RenderMap = (props) => {
    
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc&callback=initMap")

  
	window.initMap = function () {
            var directionsDisplay = new window.google.maps.DirectionsRenderer();
            var directionsService = new window.google.maps.DirectionsService();
            if(document.getElementById('map')){
              document.getElementById('map').innerHTML = "";
              
            }
            if(document.getElementById('right-panel')){
              document.getElementById('right-panel').innerHTML = "";
            }
            var map = new window.google.maps.Map(document.getElementById('map'), {
              zoom: 7,
              center: {lat:props.lat, lng: props.lng}
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));
            window.calculateAndDisplayRoute(directionsService, directionsDisplay);
      }

      window.calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
              directionsService.route({
                origin: props.changedAddress || `${props.lat},${props.lng}`,
                destination: props.destination,
                travelMode: 'DRIVING'
              }, function(response, status) {
                if (status === 'OK') {
                  directionsDisplay.setDirections(response);
                } else {
                   document.getElementById('map').style.height = "0px";
                   document.getElementById('right-panel').style.height = "0px";
                   window.alert('Directions request failed due to ' + status);
                }
              });
      }

      return (
      	<div style={{flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center'}}>
      		<div id="right-panel"></div>
         <div id="map"></div>

      	</div>



      	)



}

function loadScript (url) {
  var index = document.getElementsByTagName('script')[0]
  var script = document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)



}


export default React.memo(RenderMap)