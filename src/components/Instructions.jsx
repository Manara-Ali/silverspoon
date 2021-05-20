// STEP 1. IMPORT REACT
import React, { useState, useEffect } from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Instructions = () => {
  // USER INPUT IS RELEVANT INFORMATION TO OUR APPLICATION. I WILL NEED TO STORE IT INTO STATE
  const [searchTerm, setSearchTerm] = useState("fettuccine"); // This line initializes the search term value to the one inside of useState.

  //   CREATE ANOTHER VARIABLE TO KEEP TRACK OF THE RESULTS FROM OUR API CALL
  const [searchResults, setSearchResults] = useState([]);

  //   I also need to store the different steps
  const [stepsData, setStepsData] = useState([]);

  // LETS CREATE A HELPER FUNCTION TO HANDLE USER INPUT
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // This will update the search term to the one the user type inside the search bar
  };

  // Now that we have the user's search term, we can go ahead and make our API request
  useEffect(() => {
    // Let's make our API request.

    // 1. Create a helper function to help with JS asynchronity
    const helperFunction = async () => {
      const response = await fetch(
        `https://gentle-bayou-02230.herokuapp.com/https://api.spoonacular.com/recipes/complexSearch?apiKey=4553ea25c09b431a97981f54f6f7f33c&query=${searchTerm}`
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.results);
    };
    helperFunction();
  }, [searchTerm]);

  console.log(searchResults);

  //   Update the search results IDs
  let searchResultsIds = [];
  //   let stepsData = [];
  //   let listOfInstructions;
  if (searchResults) {
    searchResults.forEach((element) => {
      searchResultsIds.push(element.id);
    });
  }

  // LET'S USE ANOTHER useEffet function for the steps
  useEffect(() => {
    const secondHelperFunction = async () => {
      if (searchResultsIds.length) {
        const response = await fetch(
          `https://gentle-bayou-02230.herokuapp.com/https://api.spoonacular.com/recipes/${searchResultsIds[0]}/analyzedInstructions?apiKey=4553ea25c09b431a97981f54f6f7f33c`
        );
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (data) {
          console.log("I am here");
          setStepsData(data[0].steps);
        }
      }
    };
    secondHelperFunction();
    console.log("on initial render");
  }, [searchResults]);

  console.log(stepsData);
  const listOfInstructions = stepsData.map((element) => {
    return (
      <div key={element.number}>
        <h3 style={{ textAlign: "center", color: "#d8456b" }}></h3>
        <ul>
          <li>{element.step}</li>
        </ul>
      </div>
    );
  });

  const listOfImages = searchResults.map((element) => {
    return (
      <div key={element.image} className="card foodmood">
        <h4 style={{ color: "#d8456b" }}>{element.title}</h4>
        <img src={element.image} alt="" />
      </div>
    );
  });

  // NOW THAT WE SUCCESSFULLY STORED THE RESULTS INSIDE OF OUR STATE, LET'S DISPLAY OUR RESULTS
  return (
    <div
      className="container"
      style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
    >
      <div className="ui segment">
        <h2 style={{ textAlign: "center", color: "#d8456b" }}>
          Get Cooking Instructions
        </h2>
        <form className="ui form">
          {" "}
          <div className="field">
            <label style={{ fontSize: "1.25em" }}>
              What would you like instructions for?
            </label>
            <input
              type="text"
              onChange={handleInputChange}
              value={searchTerm}
            />
          </div>
          <button
            className="ui inverted green button"
            type="submit"
            // style={{ color: "#7dbf27" }}
          >
            Instructions
          </button>
        </form>
      </div>
      <div className="directions" style={{ marginBottom: "50px" }}>
        <h3
          style={{
            textAlign: "center",
            color: "#d8456b",
            marginTop: "-30px",
            paddingBottom: "30px",
          }}
        >
          Cooking Directions ({stepsData.length})
        </h3>
        {listOfInstructions}
      </div>
      <hr style={{ marginBottom: "100px" }} />
      {listOfImages[0]}
    </div>
  );
};
// };

// STEP 4. EXPORT COMPONENT SO IT CAN BE USED IN OTHER PARTS OF OUR APPLICATION
export default Instructions;
