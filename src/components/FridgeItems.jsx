// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE COMPONENT
class FridgeItems extends React.Component {
  // I need a state to keep track of user input
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
    };
  }

  // I need a function for handling user input change
  handleInputChange = (e) => {
    this.setState({ userInput: e.target.value });
  };

  //   I need a function to handle my form submission
  handleFormSubmission = (e) => {
    e.preventDefault();

    // I want to pass this user input back to the parent component App()
    this.props.onSubmit(this.state.userInput);

    // Clear the form input
    this.setState({ userInput: "" });
  };
  render() {
    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="ui segment">
          <h2>Fridge Items</h2>
          <form className="ui form" onSubmit={this.handleFormSubmission}>
            <div className="field">
              <label>What's in your fridge?</label>
              <input
                type="text"
                onChange={this.handleInputChange}
                value={this.state.userInput}
              />
            </div>
            <button
              className="ui inverted green button"
              type="submit"
              // style={{ color: "#7dbf27" }}
            >
              Suggest Recipes
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
export default FridgeItems;
