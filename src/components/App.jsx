import "./App.css";

// STEP 1. IMPORT REACT
import React from "react";
import NavBar from "./NavBar";
import Greetings from "./Greetings";
import Home from "./Home";
import FridgeItems from "./FridgeItems";
import FoodMood from "./FoodMood";
import Recipes from "./Recipes";
import Directions from "./Directions";
import Instructions from "./Instructions";
import Random from "./Random";
import Footer from "./Footer";
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
      weatherData: null, // weatherDate is created by API thru the openweather API. When the application loads, the call hasn't been sent yet, therefore no weather information is available
      recipes: [], // Recipes created by user inputs. When the application loads, there is no user input so recipes = []
      id: [],
      foodMoodData: [],
      foodMoodDataId: [],
      foodMoodDirections: [],
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
    // Here we are using JS Rest Pattern
    // NOW THAT IS HAVE THE USER SEACH ITEM, GO AHEAD AND DO YOUR API CALL HERE

    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?apiKey=4553ea25c09b431a97981f54f6f7f33c&ingredients=${searchInput}&number=2`
    ); // We are calling on the food API to get data on the searched ingredients
    const data = await response.json();
    // console.log(data);
    // console.log(searchInput);
    // The number of returned recipes is then updated to the initial state we add on line 26.
    this.setState({
      recipes: data,

      //   I need to find a way to retrieve recipes IDs in order to get the instructions
      id: data.map((element) => {
        return element.id; // Those dishes ID is also collected and updated in state
      }),
    });
    // console.log(this.state.id);
  };

  //   //   CREATE A FUNCTION CALL TO THE API TO GET COOKING INSTRUCTIONS
  // recipeInstructions = async (recipeId) => {
  //   const response = await fetch(
  //     `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=4553ea25c09b431a97981f54f6f7f33c`
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // };

  // WRITE A CALL BACK FUNCTION TO HANDLE FOOD MOOD REQUEST FROM USERS
  onFoodMoodSubmit = async (userFoodMood) => {
    // console.log("I am coming from onFoodSubmit");
    // console.log(userFoodMood); // Verify that user request was carried over to App.jsx
    // I turned this function into an asynchronous function because I will be making API call to my second endpoint here
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=4553ea25c09b431a97981f54f6f7f33c&query=${userFoodMood}&number=1`
    );
    // console.log(response); // Verify that we get a response from the API
    const data = await response.json();
    // console.log(data); // Verify that data is returned from the API
    // I want to store the Food Mood of our user, therefore I save it into state
    this.setState({
      foodMoodData: data.results.map((element) => {
        return element;
      }),
    });
    // console.log(this.state.foodMoodData); // Verify that user Food Mood was in fact store into state
    // Because the endpoint returning cooking directions needs the dish id, I went ahead and saved user Food Mood id into state
    this.setState({
      foodMoodDataId: this.state.foodMoodData.map((element) => {
        return element.id;
      }),
    });
    // console.log(this.state.foodMoodDataId); // Verify that the Food Mood id was properly stored into state

    // I tried using the Lifecycle method here but it kept re-rendering my application until it crashed
    // Instead, I will call the cooking directions function as soon as the form is submitted
    // ADVANTAGE: The call is made only once and done so the component gets updated and rendered only once!!
    this.cookingDirections();
  };

  // I NEED TO USE USER'S FOOD MOOD ID TO MAKE A CALL TO OUR API FOR COOKING DIRECTIONS
  cookingDirections = async () => {
    // console.log("I am coming from cooking directions");
    // console.log(this.state.foodMoodDataId); // Verify that I have access to the user food Id
    if (this.state.foodMoodDataId.length) {
      // Use the if statement logic to prevent React from lauching an API request until the user entered there Food Mood and the Id for that particular Food Mood is returned
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${this.state.foodMoodDataId[0]}/analyzedInstructions?apiKey=4553ea25c09b431a97981f54f6f7f33c`
      );
      const data = await response.json();
      // console.log(data);
      this.setState({
        foodMoodDirections: data[0].steps, //Store the cooking directions for the user dish into our state for later use
      });
    }
    // this.setState({
    //   foodMoodDirections: ''
    // });
    // console.log(this.state.foodMoodDirections);  // Verify that the Food Mood directions were properly stored
  };

  render() {
    return (
      <Router>
        <div className="wrapper">
          <NavBar />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Home>
                    {/* I passed the Greeting component as a props to the Home component because I was the Greeting component to only show inside the home component otherwise, every time I change pages the position and Loading will repeat */}
                    <Greetings
                      city={this.state.location.city} // Pass the users city through props to the Greetings component
                      state={this.state.location.state} // Pass the users state through props to the Greetings component
                      greet={this.timeOfDay()} // Call the timeOfDay() function directly as a props here
                      weather={this.state.weatherData} // Pass the users current weather information through props to the Greetings component
                    />
                  </Home>
                );
              }}
            />
            <Route
              path="/fridgeitems"
              render={() => {
                return (
                  <div>
                    {/* Use the call back function defined on line 100 to receive a notification each time the user submits a search and pass it through props to the FridgeItems component */}
                    <FridgeItems onSubmit={this.onFormSubmit} />
                    <Recipes
                      // Pass the recipes variable that is inside the state and containing the list of potential recipes suggested to our user and the recipe IDs as props to the Recipes component
                      recipes={this.state.recipes}
                      instructions={this.state.id}
                    />
                  </div>
                );
              }}
            />
            <Route
              path="/foodmood"
              render={() => {
                return (
                  <div>
                    {/* Use the call back function defined on line 100 to receive a notification each time the user submits a search and pass it through props to the FoodMood component */}
                    <FoodMood onSubmit={this.onFoodMoodSubmit} />
                    <Recipes
                      // Pass the recipes variable that is inside the state and containing the list of potential recipes suggested to our user and the recipe IDs as props to the Recipes component
                      foodMood={this.state.foodMoodData}
                      // instructions={this.state.id}
                    />
                    <Directions
                      onSubmit={this.onFoodMoodSubmit} // Here I attach my Food Mood call back function to the Directions component so I can pass it as props to notify me every time the use makes a Food Mood request
                      directions={this.state.foodMoodDirections} // Send all the cooking directions to the Directions Component and use it as props
                    />
                  </div>
                );
              }}
            />
            <Route
              path="/cooking-instructions"
              render={() => {
                return (
                  <div>
                    <Instructions />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/random-recipes"
              render={() => {
                return (
                  <div>
                    <Random />
                  </div>
                );
              }}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

// STEP 4. EXPORT COMPONENT
export default App;
