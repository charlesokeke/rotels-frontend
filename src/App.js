import React from 'react';
import Select from 'react-select';
import Nameform from './components/searchInputs/Searchinputs'
import ButtonAppBar from './components/navbar/Navbar'
import './App.css'
import Footer from './components/footer/Footer'
import{BrowserRouter} from 'react-router-dom'
import scriptLoader from 'react-async-script-loader'


const options = [
  { value: 'Restaurants', label: 'Restaurants' },
  { value: 'Asian restaurants', label: 'Asian restaurants'},
  { value: 'Chinese restaurants', label: 'Chinese restaurants'},
  { value: 'Mexican restaurants', label: 'Mexican restaurants'},
  { value: 'Greek restaurants', label: 'Greek restaurants'},
  { value: 'Pizza restaurants', label: 'Pizza restaurants'},
  { value: 'African restaurants', label: 'African restaurants'},
  { value: 'Indian restaurants', label: 'Indian restaurants'},
  { value: 'Sushi restaurants', label: 'Sushi restaurants'},
  { value: 'Bar and Grill restaurants', label: 'Bar and Grill restaurants'},
  { value: 'Japanese restaurants', label: 'Japanese restaurants'},
  { value: 'Meditaranian restaurants', label: 'Meditaranian restaurants'},
  { value: 'Breakfast restaurants', label: 'Breakfast restaurants'},
  { value: 'Dinner restaurants', label: 'Dinner restaurants'},
  { value: 'Arab restaurants', label: 'Arab restaurants'},
  { value: 'Fast foods restaurants', label: 'Fast foods restaurants'},
  { value: 'Barbeque ribs restaurants', label: 'Barbeque ribs restaurants'},
  { value: 'Soul foods restaurants', label: 'Soul foods restaurants'},
  { value: 'Italian restaurants', label: 'Italian restaurants'}

];


class App extends React.Component {
  state = {
    selectedOption: null,
    selectOptionComponentShowing:true,
    displayRestaurantsResult:true
    
  }

  handleChange = (selectedOption) => {
    this.setState(
                {  
                  selectedOption:selectedOption, 
                  selectOptionComponentShowing:false
                }
              );
  }

  resetSearchOptions = (event) => {
        this.setState({
        selectOptionComponentShowing: true,
        displayRestaurantsResult:false

      })
      event.stopPropagation()
  }
  render() {
    const { selectedOption,selectOptionComponentShowing, displayRestaurantsResult} = this.state;
    return (
      <div style={{minHeight:'100vh',position:'relative'}}>
      <ButtonAppBar />
      <BrowserRouter>
      <div className="container">
         {selectOptionComponentShowing ? 
          (<div className="landing-page-message">
            <h3 className="title"> Search for restaurants nearby and in your city</h3>
              <Select
                className="test"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder="select a search option"
                theme={(theme) => ({
                        ...theme,
                        borderRadius: 5,
                        colors: {
                        ...theme.colors,
                          primary25: 'forestgreen',
                          primary: '#ccc',
                        },
                      })}
                /> 
          </div>): 
          <Nameform 
              selectedOption ={selectedOption} 
              selectOptionComponentShowing={selectOptionComponentShowing}
              resetSearchOptions={this.resetSearchOptions}
              displayRestaurantsResult={displayRestaurantsResult}
          />
          }
      </div>
    </BrowserRouter>
    <Footer />
  </div>

    );
  }
}
//"https://maps.googleapis.com/maps/api/js?key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc"
export default scriptLoader(
[  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc&libraries=places"
  
] 
)(App)
