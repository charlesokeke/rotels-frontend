import React from "react";
import MediaCard from "../../components/cards/Card";
import PlaceDetailsInfo from "../../components/placeDetails/PlaceDetails";
import Spinners from "../../components/spinners/Spinner";
import _ from "lodash";
import "./form-input.css";

class NameForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const { displayRestaurantsResult, selectedOption } = this.props;
    this.state = {
      value: "",
      nearbySearch: false,
      searchOption: selectedOption.value,
      displayRestaurantsResult: displayRestaurantsResult,
      hotelOrRestaurantData: [],
      location: {
        lat: 0,
        lng: 0
      },
      placeDetails: false,
      confirmPlaceDetail: true,
      checkboxDisabled: false,
      pageToken: "",
      spinners: false,
      dataCollection: []
    };
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
  }
  // Get user current position for location based searches and directions
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        let { latitude, longitude } = position.coords;
        this.setState({
          location: {
            lat: latitude,
            lng: longitude
          }
        });
      },
      error => {
        console.error(JSON.stringify(error));
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  // Scroll to top of page when page updates
  componentDidUpdate() {
    if (window.scrollY > Math.round(window.innerHeight / 2))
      window.scrollTo(0, 0);
  }
  // Get restaurant data from Google places api
  fetchRestaurantData = (url, object) => {
    // this state change shows the spinners component and hides the next button if a new query is done. confirmPlaceDetails
    // was set to false so the spiner will show when searches are submited from the deatails page
    this.setState({
      spinners: true,
      hotelOrRestaurantData: "",
      pageToken: "",
      confirmPlaceDetail: false
    });
    fetch(url, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(object)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(prevState => {
          return {
            hotelOrRestaurantData: data.results,
            displayRestaurantsResult: true,
            confirmPlaceDetail: false,
            pageToken: data.next_page_token,
            spinners: false,
            dataCollection: prevState.dataCollection.concat(data.results)
          };
        });
      });
  };
  //Get resturant details from Google Places API
  fetchRestaurantDetails = (url, object) => {
    // this state change shows the spinners component and hides the next button if a new query is done
    this.setState({
      spinners: true,
      hotelOrRestaurantData: "",
      pageToken: ""
    });
    fetch(url, {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(object)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          spinners: false,
          placeDetails: JSON.parse(JSON.stringify(data)).result,
          displayRestaurantsResult: false,
          confirmPlaceDetail: true
        });
      });
  };
  // Generic function that calls FetchRestaurantDetails with Place Id passed in as parameter
  getPlaceDetails = place_id => {
    //This state change makes sure that the next button does not appear after you go to the details page and return to another view
    this.setState({
      pageToken: null
    });
    this.fetchRestaurantDetails(
      "https://fast-plains-49197.herokuapp.com/place_details",
      { id: place_id }
    );
  };
  // Get additional data from Google API using tokens
  handleToken = () => {
    this.fetchRestaurantData(
      "https://fast-plains-49197.herokuapp.com/place_token",
      { token: this.state.pageToken }
    );
    this.setState({ token: null });
  };

  // Disables and enables  the quick search button and the city/state input field
  handleChange = event => {
    event.stopPropagation();
    let { checkboxDisabled } = this.state;
    let element = this.myRef.current;
    let elementValue = event.target.value;
    elementValue
      ? (element.disabled = !checkboxDisabled)
      : (element.disabled = checkboxDisabled);
    this.setState({
      value: elementValue,
      confirmPlaceDetail: false
    });
  };
  // Handles the search for nearby restaurants or searches based on city, state or country
  handleSubmit = event => {
    // This ref disables the element so it will work when when the query submits a search string
    this.myRef.current.disabled = false;
    const { value, nearbySearch, searchOption, location } = this.state;
    event.preventDefault();
    this.setState({
      value: ""
    });

    if (value || nearbySearch) {
      if (nearbySearch) {
        this.fetchRestaurantData(
          "https://fast-plains-49197.herokuapp.com/nearby_restaurants",
          { ...location, keyword: searchOption.toLowerCase() }
        );
      } else if (value) {
        this.fetchRestaurantData(
          "https://fast-plains-49197.herokuapp.com/state_restaurants",
          { name: value, searchOption: searchOption.toLowerCase() }
        );
      }
    } else {
      alert("Please enter city and state or select the quick search option");
    }
  };

  // Handles the disabling and enabling of the quick search checkbox
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let element = this.myRef2.current;
    value ? (element.disabled = true) : (element.disabled = false);
    this.setState({
      nearbySearch: value
    });
  };
  // Handles the filtered search for current and past search results
  handleSearch = event => {
    const { dataCollection } = this.state;
    if (dataCollection.length === 0) {
      event.target.value = "";
      alert("You dont have any recent searches");
      return;
    }
    let filteredSearches = dataCollection.filter(element =>
      element.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    filteredSearches = _.uniqBy(filteredSearches, function(element) {
      return element.formatted_address || element.vicinity;
    });
    this.setState({
      hotelOrRestaurantData: filteredSearches,
      confirmPlaceDetail: false,
      displayRestaurantsResult: true,
      pageToken: false
    });
  };
  //clears the search input fied onBlur
  clear = event => {
    event.target.value = "";
  };
  // Maps restaurant data to a card component
  handleRestaurantData = data => {
    const cleanData = data.map((element, index) => {
      const {
        photos,
        name,
        formatted_address,
        opening_hours,
        user_ratings_total,
        rating,
        place_id
      } = element;
      return (
        <MediaCard
          image={
            photos
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc`
              : "https://via.placeholder.com/500.png?text=NO+IMAGES+AVAILABLE"
          }
          name={name}
          address={formatted_address || element.vicinity}
          openHours={
            opening_hours !== undefined && opening_hours.open_now
              ? "Status: Open"
              : opening_hours === undefined
              ? "Status: N/A"
              : "Status: Closed"
          }
          user_rating={
            user_ratings_total !== undefined
              ? `Total user rating: ${user_ratings_total}`
              : "none"
          }
          rating={
            rating !== undefined && rating.toString().includes(".")
              ? `Overall rating: ${rating}`
              : rating === undefined
              ? "none"
              : `Overall rating: ${element.rating}.0`
          }
          getPlaceDetails={this.getPlaceDetails.bind(this, place_id)}
          key={index}
        />
      );
    });
    return cleanData;
  };

  render() {
    const {
      confirmPlaceDetail,
      nearbySearch,
      searchOption,
      value,
      placeDetails,
      location,
      hotelOrRestaurantData,
      displayRestaurantsResult,
      pageToken
    } = this.state;

    const { resetSearchOptions, selectOptionComponentShowing } = this.props;

    return (
      <div className="form-container">
        <input
          type="text"
          className="input-box"
          placeholder="Search past or current results"
          id="input-box"
          onChange={this.handleSearch}
          onBlur={this.clear}
        />

        <form onSubmit={this.handleSubmit} className="formInputs">
          <input
            type="text"
            value={value}
            onChange={this.handleChange}
            className="input-box"
            placeholder={`Enter a city & state to search  for ${searchOption.toLowerCase()}`}
            id="input-box"
            ref={this.myRef2}
          />
          <span> OR</span>

          <label className="checkbox-container">
            {`Search nearby ${searchOption.toLowerCase()}`}:
            <input
              name="nearbySearch"
              type="checkbox"
              checked={nearbySearch}
              onChange={this.handleInputChange}
              ref={this.myRef}
              className="checkboxes"
            />
          </label>
          <div className="reset-and-submit-button-container">
            <input type="submit" value="Submit" className="submit-button" />
            {!selectOptionComponentShowing ? (
              <button onClick={resetSearchOptions} className="reset-button">
                Reset
              </button>
            ) : null}
          </div>
        </form>

        <div className="hotel-container">
          {displayRestaurantsResult && hotelOrRestaurantData.length
            ? this.handleRestaurantData(hotelOrRestaurantData)
            : null}
        </div>
        {placeDetails && confirmPlaceDetail ? (
          <PlaceDetailsInfo
            placeDetailsData={placeDetails}
            lat={location.lat}
            lng={location.lng}
          />
        ) : null}
        {pageToken && !(confirmPlaceDetail && placeDetails) ? (
          <button onClick={this.handleToken} className="next-button">
            Load More
          </button>
        ) : null}
        <Spinners spin={this.state.spinners} />
      </div>
    );
  }
}
export default NameForm;
