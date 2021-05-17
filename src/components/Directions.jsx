import "./Directions.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE A FUNCTION BASED COMPONENT TO DISPLAY DATA
const Directions = (props) => {
  console.log(props.onSubmit);
  console.log(props.directions);
  if (props.directions.length) {
    const directionList = props.directions.map((element) => {
      return element.step;
    });
    return (
      <div className="directions">
        <hr />
        <h3 style={{ textAlign: "center", color: "#d8456b" }}>
          Cooking Directions ({directionList.length})
        </h3>
        <ol>
          {directionList.map((element) => {
            return <li>{element}</li>;
          })}
        </ol>
      </div>
    );
  } else {
    return <div>I am a directions bar</div>;
  }
};

// STEP 4. EXPORT COMPONENT TO BE USED IN OTHER PARTS OF OUR APPLICATION
export default Directions;
