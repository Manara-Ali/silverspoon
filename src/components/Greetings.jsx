import "./Greetings.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Greetings = (props) => {
  // console.log(props); // Verify what type of data I get here before consumming props
  // console.log(props.weather); // Verify what type of data I get here before consumming props
  if (props.city && props.state && props.weather) {
    // Unless all props are available, continue showing the Loading spinner
    const tempFarenheit = Math.floor(
      // Convert temparature from Kelvin to Farenheit
      (props.weather[0].main.temp - 273.15) * (9 / 5) + 32
    );
    return (
      <div className="greetings">
        <h4>{props.greet}, Manara!</h4>
        <p>
          {props.city}, {props.state} {props.weather.base}
          <span className="locator">
            <img
              src={`http://openweathermap.org/img/w/${props.weather[0].weather[0].icon}.png`}
              alt="weather icon"
            />
            {tempFarenheit}ºF
          </span>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="ui segment spinner">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading your location...</div>
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
