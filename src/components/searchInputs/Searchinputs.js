import React from "react"
import MediaCard from '../../components/cards/Card'
import PlaceDetailsInfo from '../../components/placeDetails/PlaceDetails'
import Spinners from '../../components/spinners/Spinner'
import _ from 'lodash'
import './form-input.css'


class NameForm extends React.PureComponent {
  constructor(props) {
    super(props);
    const {displayHotelOrRestaurantsResult, selectedOption}= this.props
    this.state = {
    value: '', 
    nearbySearch: false, 
    searchOption: selectedOption.value,
    displayHotelOrRestaurantsResult: displayHotelOrRestaurantsResult,
    hotelOrRestaurantData: [],
    location: {
    	lat: 0,
    	lng:0
    },
    placeDetails: false,
    confirmPlaceDetail:true,
    checkboxDisabled: false,
    pageToken: '',
    spinners: false,
    dataCollection: [],

  };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    
  }


  componentDidMount (){
    /**var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "us"}
       }
    var autocomplete = new window.google.maps.places.Autocomplete(this.myRef2.current, options)
  	 window.google.maps.event.addListener(autocomplete, 'place_changed', function(){
         var place = autocomplete.getPlace()
      })
**/

    navigator.geolocation.getCurrentPosition(
         (position) => {
              let {latitude, longitude} = position.coords
              this.setState({
               location: {
                lat: latitude,
                lng: longitude
              }
           })
      },
        (error) => {
        console.error(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )

  }

  componentDidUpdate () {
    if(window.scrollY > Math.round(window.innerHeight/2))window.scrollTo(0, 0)
  }

  fetchHotelAndRestaurantData = (url,object) => {
    // this state change shows the spinners component and hides the next button if a new query is done. confirmPlaceDetails
    // was set to false so the spiner will show when searches are submited from the deatails page
     this.setState({spinners:true, hotelOrRestaurantData: '', pageToken: '', confirmPlaceDetail: false})
  	fetch(url, {
    			method:'post',
    			headers:{'content-type':'application/json'},
    			body:JSON.stringify(object)
    		})
    		.then(response => response.json())
    		.then(data =>{
    			console.log(data)
    			this.setState((prevState, props) => {
            return {
              hotelOrRestaurantData:data.results,
              displayHotelOrRestaurantsResult:true,
              confirmPlaceDetail:false,
              pageToken: data.next_page_token,
              spinners:false,
              dataCollection: prevState.dataCollection.concat(data.results)
          }

          })
    		})


  }
// function defined to get place detail

fetchHotelAndRestaurantDetails = (url,object) => {
  // this state change shows the spinners component and hides the next buttonif a new query is done
      this.setState({spinners:true, 
      hotelOrRestaurantData: '', 
      pageToken: ''
    })
    fetch(url, {
          method:'post',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(object)
        })
        .then(response => response.json())
        .then(data =>{
          console.log(JSON.parse(JSON.stringify(data)).result)
          this.setState({
            spinners:false,
            placeDetails:JSON.parse(JSON.stringify(data)).result,
            displayHotelOrRestaurantsResult:false,
            confirmPlaceDetail:true,
          })
        
        })

}

// function to get details of places
  getPlaceDetails = (place_id) => {
    //This state change makes sure that the next button does not appear after you go to the details page and return to another view
    this.setState({
      pageToken: null
    })
    this.fetchHotelAndRestaurantDetails('https://fast-plains-49197.herokuapp.com/place_details',{id:place_id})
  }
  
handleToken = () => {
   this.fetchHotelAndRestaurantData('https://fast-plains-49197.herokuapp.com/place_token', {token:this.state.pageToken})
   this.setState({token:null
   })
}
  

  handleChange(event) {
    event.stopPropagation()
    //const node = this.myRef.current;
    //console.log(node)
    let {checkboxDisabled} = this.state
  	let element = this.myRef.current
  	let elementValue = event.target.value
    elementValue ? element.disabled = !checkboxDisabled : element.disabled = checkboxDisabled
    this.setState({
      value: elementValue,
      confirmPlaceDetail: false
    });
  }

  handleSubmit(event) {
    // This ref disables the element so it will work when when the query submits a search string
    this.myRef.current.disabled = false
    const {value, nearbySearch, searchOption, location} = this.state;
    event.preventDefault();
    this.setState({
      value: '',
    })
  	
  	if(value || nearbySearch){
    	if(nearbySearch){
    	     this.fetchHotelAndRestaurantData('https://fast-plains-49197.herokuapp.com/nearby_restaurants', {...location, keyword:searchOption.toLowerCase()})
    	
    	}else if(value)
      {
    		  this.fetchHotelAndRestaurantData('https://fast-plains-49197.herokuapp.com/state_restaurants', {name: value, searchOption:searchOption.toLowerCase()})
    	}
    } else{
        alert('you have to pick a choice')
  }
    
}


  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let element = this.myRef2.current
    value ? element.disabled = true : element.disabled = false
    this.setState({
     nearbySearch: value
    });
  }

  handleSearch = (event) => {
    //this.setState({confirmPlaceDetail:false, displayHotelOrRestaurantsResult:false}
    const{dataCollection} = this.state
    if(dataCollection.length === 0) {
      event.target.value = ''
      alert('You dont have any recent searches')
      return;
    }
    let filteredSearches = dataCollection.filter((element,index) => {
      console.log(element)
      return element.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    filteredSearches = _.uniqBy(filteredSearches, function(element){
      return element.formatted_address || element.vicinity
    })
    this.setState({
      hotelOrRestaurantData: filteredSearches, 
      confirmPlaceDetail: false, 
      displayHotelOrRestaurantsResult:true, 
      pageToken:false
    })

  }
  
  handleHotelData = (data) => {
  	const cleanData = data.map((element, index) =>{
  		const {photos, name, formatted_address, opening_hours, user_ratings_total,rating,place_id} = element
  		return <MediaCard 
  		image={photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc` : 'https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406__340.jpg'}
  		name={name} 
  		address={formatted_address || element.vicinity} 
  		openHours={opening_hours !== undefined && opening_hours.open_now ? 'Status: Open': opening_hours === undefined ? "Status: N/A":"Status: Closed"}  
  		user_rating= {user_ratings_total !== undefined? `Total user rating: ${user_ratings_total}` : 'none'} 
  		rating={rating !== undefined && rating.toString().includes('.') ? `Overall rating: ${rating}` : rating === undefined ? 'none':`Overall rating: ${element.rating}.0`}
      getPlaceDetails= {this.getPlaceDetails.bind(this, place_id)}
      key={index}

  		/>
  	})
  	return cleanData

  }
  
  render() {
    const{
          confirmPlaceDetail, 
          nearbySearch, 
          searchOption, 
          value, 
          placeDetails, 
          location, 
          hotelOrRestaurantData,
          displayHotelOrRestaurantsResult,
          pageToken
        } = this.state

    const{
      resetSearchOptions, 
      selectOptionComponentShowing
      } = this.props   
    
    return (
    	<div className='form-container'>
            <input type="text" 
            className="input-box" 
            placeholder="Search past or current results" 
            id="input-box" 
            onChange={this.handleSearch}
            />
		      
          <form onSubmit={this.handleSubmit} className="formInputs">
		          <input type="text" 
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
            {!selectOptionComponentShowing ? 
              <button onClick={resetSearchOptions} className="reset-button">Reset</button> : 
              null
            }</div>

		      </form>
		      
          	<div className="hotel-container">
          	{displayHotelOrRestaurantsResult && hotelOrRestaurantData.length ? 
          	this.handleHotelData(hotelOrRestaurantData) : console.log('data is not showing')}
          	</div>
              {placeDetails && confirmPlaceDetail ? 
                <PlaceDetailsInfo 
                placeDetailsData = {placeDetails} 
                lat={location.lat} 
                lng={location.lng}/> : 
                ''}
                {pageToken  && !(confirmPlaceDetail && placeDetails)? 
                  <button onClick={this.handleToken} className="next-button">Load More</button> :
                   ''}
                   <Spinners spin={this.state.spinners}/>
      </div>
    );
  }
}
export default NameForm;
