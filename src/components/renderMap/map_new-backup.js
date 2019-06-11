import React from 'react'
import './renderMapCss.css'
import scriptLoader from 'react-async-script-loader'

class RenderMap extends React.Component {

  componentWillUpdate ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
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
              center: {lat:this.props.lat, lng: this.props.lng}
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('right-panel'));

            directionsService.route({
                origin: this.props.changedAddress || `${this.props.lat},${this.props.lng}`,
                destination: this.props.destination,
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
      else this.props.onError()
    }
  }
  render(){
      return (
        <div style={{flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div id="right-panel"></div>
         <div id="map"></div>

        </div>

        )
  }

}

export default scriptLoader(
  [
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc"
  ]
  
)(RenderMap)