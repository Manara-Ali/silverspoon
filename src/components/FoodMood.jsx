// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE COMPONENT. BECAUSE I WILL KEEP TRACK OF DATA USER PASS INSIDE THE FORM AND STORE THEM, I WILL USE A CLASS BASED COMPONENT SO I CAN TAKE ADVANTAGE OF STATE
class FoodMood extends React.Component {
  // I need a state to keep track of user input
  constructor(props) {
    super(props);

    this.state = {
      usersFavoriteFood: "",
    };
  }

  // I need a function for handling user input change
  handleInputChange = (e) => {
    this.setState({ usersFavoriteFood: e.target.value });
  };

  //   I need a function to handle my form submission
  handleFormSubmission = (e) => {
    // Prevent the form from reloading upon submission
    e.preventDefault();
    // I want to pass this user input back to the parent component App() and have a separation of concern.
    // 1. First concern, the for is solely responsible of collecting user's data and nothing else.
    // 2. Second concern, the data is then passed from the form to the parent component (App) for manipulation
    this.props.onSubmit(this.state.usersFavoriteFood);

    // Clear the form input and have it ready for the next request
    this.setState({ usersFavoriteFood: "" });
  };
  render() {
    return (
      <div
        className="container"
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <div className="ui segment">
          <h2 style={{ textAlign: "center", color: "#d8456b" }}>Food Mood</h2>
          <form className="ui form" onSubmit={this.handleFormSubmission}>
            {" "}
            <div className="field">
              <label style={{ fontSize: "1.25em" }}>
                What are you in the mood for right now?
              </label>
              <input
                type="text"
                onChange={this.handleInputChange}
                value={this.state.usersFavoriteFood}
              />
            </div>
            <button
              className="ui inverted green button"
              type="submit"
              // style={{ color: "#7dbf27" }}
            >
              Picture My Mood
            </button>
          </form>
        </div>
        {/* <div className="card">
          <h4>Recipes</h4>
          <p></p>
        </div> */}
      </div>
    );
  }
}

// STEP 4. EXPORT COMPONENT
export default FoodMood;
