import "./App.css";

// STEP 1. IMPORT REACT
import React from "react";
import NavBar from "./NavBar";
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
      recipes: [],
      id: [],
    };
  }

  getPosition = async () => {
    await window.navigator.geolocation.getCurrentPosition(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
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
          <Switch>
            <Route exact path="/" component={Home} />
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
