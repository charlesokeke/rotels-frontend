import React from "react";
import Select from "react-select";
import Nameform from "./components/searchInputs/Searchinputs";
import ButtonAppBar from "./components/navbar/Navbar";
import "./App.css";
import Footer from "./components/footer/Footer";
import { BrowserRouter } from "react-router-dom";
import scriptLoader from "react-async-script-loader";
import {options} from "./components/RestaurantTypes/RestaurantTypes"


class App extends React.Component {
  state = {
    selectedOption: null,
    selectOptionComponentShowing: true,
    displayRestaurantsResult: true
  };

  handleChange = selectedOption => {
    this.setState({
      selectedOption: selectedOption,
      selectOptionComponentShowing: false
    });
  };

  resetSearchOptions = event => {
    this.setState({
      selectOptionComponentShowing: true,
      displayRestaurantsResult: false
    });
    event.stopPropagation();
  };
  render() {
    const {
      selectedOption,
      selectOptionComponentShowing,
      displayRestaurantsResult
    } = this.state;
    return (
      <div style={{ minHeight: "100vh", position: "relative" }}>
        <ButtonAppBar />
        <BrowserRouter>
          <div className="container">
            {selectOptionComponentShowing ? (
              <div className="landing-page-message">
                <h3 className="title">
                  {" "}
                  Search for restaurants
                </h3>
                <Select
                  className="test"
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={options}
                  placeholder="select a search option"
                  theme={theme => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary25: "forestgreen",
                      primary: "#ccc"
                    }
                  })}
                />
              </div>
            ) : (
              <Nameform
                selectedOption={selectedOption}
                selectOptionComponentShowing={selectOptionComponentShowing}
                resetSearchOptions={this.resetSearchOptions}
                displayRestaurantsResult={displayRestaurantsResult}
              />
            )}
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
//"https://maps.googleapis.com/maps/api/js?key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc"
export default scriptLoader([
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBUOAf-TRFXcQkDLaGk4kiQZ7ZJSyJzJc&libraries=places"
])(App);
