import React from 'react'
import './renderMapCss.css'


class  RenderMap extends React.PureComponent {
    constructor (props) {
      super(props)
      this.state ={
        test: ''
      }
    }
    componentDidMount () {
      this.initMap()
    }
    componentDidUpdate(){
      this.initMap()
    }
  

  
  initMap = () => {
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
            this.calculateAndDisplayRoute(directionsService, directionsDisplay);
      }

      calculateAndDisplayRoute =   (directionsService, directionsDisplay) => {
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

      render(){
      console.log(this.props.lng)
      console.log(this.state.test)


        return (
        <div style={{flexDirection:'column',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div id="right-panel"></div>
         <div id="map"></div>

        </div>



        )
      }



}




export default RenderMap