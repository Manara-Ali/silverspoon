import "./Greetings.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Greetings = (props) => {
  console.log(props);
  if (props.city || props.state) {
    return (
      <div className="greetings">
        <h4>{props.greet}, Manara!</h4>
        <p>
          {props.city}, {props.state}
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Waiting for your location...</div>
            {/* REMEMBER TO DEAL WITH THE CASE WHERE USER BLOCK THERE LOCATION BEFORE SUBMITTING THE PROJECT */}
          </div>
          <p></p>
        </div>
      </div>
    );
  }
};

// STEP 4. EXPORT COMPONENT TO BE USED IN OTHER PARTS OF OUR APPLICATION
export default Greetings;
