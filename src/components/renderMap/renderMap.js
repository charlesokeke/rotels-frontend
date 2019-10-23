import React from "react";
import AddStyles from "../../hoc/center";
import "./renderMapCss.css";

class RenderMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      noMap: null
    };
    this.mapRef = React.createRef();
    this.panelRef = React.createRef();
  }
  componentDidMount() {
    this.initMap();
    
  }
  componentDidUpdate() {
    this.initMap();
    this.props.checkForDrivingDirections(this.state.noMap)
  }

  initMap = () => {
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    const directionsService = new window.google.maps.DirectionsService();
    const rightPanel = this.panelRef.current;
    const mapReference = this.mapRef.current;
    if (mapReference) mapReference.innerHTML = "";
    if (rightPanel) rightPanel.innerHTML = "";

    const map = new window.google.maps.Map(mapReference, {
      zoom: 7,
      center: { lat: this.props.lat, lng: this.props.lng }
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(rightPanel);
    this.calculateAndDisplayRoute(
      directionsService,
      directionsDisplay,
      rightPanel,
      mapReference
    );
  };

  calculateAndDisplayRoute = (
    directionsService,
    directionsDisplay,
    rightPanel,
    mapReference
  ) => {
    const { changedAddress, lat, lng, destination } = this.props;
    directionsService.route(
      {
        origin: changedAddress || `${lat},${lng}`,
        destination: destination,
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          directionsDisplay.setDirections(response);
        } else {
          mapReference.style.height = "0px";
          rightPanel.style.height = "0px";
          this.setState({ noMap: "Driving direction unavailable" });
        }
      }
    );
  };

  render() {
    return (
      <div style={this.props.center}>
        <div ref={this.panelRef} id="right-panel"></div>
        <div ref={this.mapRef} id="map"></div>
        {this.state.noMap ? (
          <div
            style={{
              backgroundColor: "#f2dede",
              borderColor: "#ebccd1",
              color: "#a94442",
              padding: "15px",
              border: "1px solid transparent",
              borderRadius: "4px"
            }}
          >
            <strong>{this.state.noMap}</strong>
          </div>
        ) : null}
      </div>
    );
  }
}

export default AddStyles(RenderMap, "column");
