import "./App.css";

// STEP 1. IMPORT REACT
import React from "react";
import NavBar from "./NavBar";
import Greetings from "./Greetings";
import Home from "./Home";
import FridgeItems from "./FridgeItems";
import Recipes from "./Recipes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE CLASS BASED COMPONENT

class App extends React.Component {
  // CREATE A STATE TO KEEP TRACK OF THE API DATA
  constructor(props) {
    super(props);

    this.state = {
      location: [],
      lat: null,
      long: null,
      weatherData: null,
      recipes: [],
      id: [],
    };
  }

  // GET THE DATE FROM JS OBJECT TO GREET USER
  timeOfDay = () => {
    const time = new Date().getHours();
    if (time >= 5 && time < 12) {
      return "Good Morning";
    } else if (time >= 12 && time < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // COLLECTING USERS LOCATION HERE
  getPosition = async () => {
    // Call on the web browser API to get users location (default set to: Allow)
    await window.navigator.geolocation.getCurrentPosition(
      (response) => {
        // The response is the user coordinates including set of latitude and longitude coordinates;
        const latitude = response.coords.latitude;
        const longitude = response.coords.longitude;
        // Save this latitude and longitude inside our state as this is relevant data to our program
        this.setState({
          lat: latitude,
          long: longitude,
        });
        // Use the Geocode.xyz API to reverse code my location
        return fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
          .then((response) => {
            return response.json();
          })
          .then((locationData) => {
            // This data is the relevant information that I need to run my application therefore I will store into state
            this.setState({
              location: locationData,
            });
            console.log(this.state.location);

            // I want to chain my .then() method therefore I need to explicitly return the promise by using the return keyword
            // Make the open weather API call here to get my weather data
            return fetch(
              `https://gentle-bayou-02230.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=34.1651&lon=-84.7999&appid=723c2cacb52863c4cdaadea46e89044f`
            );
          })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            // The weather data will be passed through props to my Greeting component therefore I need to save it into state
            this.setState({
              weatherData: new Array(data),
            });
          });
      },
      // If the user deny the web browser API request for location this will produce this error.
      // I need to write some logic to handle this error
      (error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      }
    );
  };

  // RETRIEVE LOCATION AS SOON AS THE APPLICATION LOADS
  componentDidMount() {
    this.getPosition();
  }

  //   CREATE A CALL BACK THAT WILL NOTIFY ME EACH TIME THE FORM IS SUBMITTED
  onFormSubmit = async (...searchInput) => {
    // NOW THAT IS HAVE THE USER SEACH ITEM, GO AHEAD AND DO YOUR API CALL HERE

    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=4553ea25c09b431a97981f54f6f7f33c&ingredients=${searchInput}&number=2`
    );
    const data = await response.json();
    console.log(data);
    console.log(searchInput);
    // number of recipes
    this.setState({
      recipes: data,

      //   I need to find a way to retrieve recipes IDs in order to get the instructions
      id: data.map((element) => {
        return element.id;
      }),
    });
    console.log(this.state.id);
  };

  //   //   CREATE A FUNCTION CALL TO THE API TO GET COOKING INSTRUCTIONS
  //   recipeInstructions = async (recipeId) => {
  //     const response = await fetch(
  //       `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=4553ea25c09b431a97981f54f6f7f33c`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //   };

  render() {
    return (
      <Router>
        <div className="wrapper">
          <NavBar />
          <Greetings
            city={this.state.location.city}
            state={this.state.location.state}
            greet={this.timeOfDay()} // Call the timeOfDay() function directly as a props here
            weather={this.state.weatherData}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Home />;
              }}
            />
            <Route
              path="/fridgeitems"
              render={() => {
                return (
                  <div>
                    <FridgeItems onSubmit={this.onFormSubmit} />
                    <Recipes
                      recipes={this.state.recipes}
                      instructions={this.state.id}
                    />
                  </div>
                );
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

// STEP 4. EXPORT COMPONENT
export default App;
