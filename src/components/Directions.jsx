import "./Directions.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE A FUNCTION BASED COMPONENT TO DISPLAY DATA
const Directions = (props) => {
  //   console.log(props.onSubmit); // Verify that the props were properly passed
  //   console.log(props.directions);  // Verify that directions props were properly passed
  if (props.directions.length) {
    //   Use a if statement here again to keep React from throwing an error because when the application starts and until the user submits a Food Mood request props.directions is undefined and attempting to loop through undefined using the map() method will cause React to throw an error
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
    return <div></div>;
  }
};

// STEP 4. EXPORT COMPONENT TO BE USED IN OTHER PARTS OF OUR APPLICATION
export default Directions;
