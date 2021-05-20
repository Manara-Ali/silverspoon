// STEP 1. IMPORT REACT
import React, { useState, useEffect } from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Instructions = () => {
  // USER INPUT IS RELEVANT INFORMATION TO OUR APPLICATION. I WILL NEED TO STORE IT INTO STATE
  const [searchTerm, setSearchTerm] = useState(""); // This line initializes the search term value to the one inside of useState.

  // I need to create a new variable that will run intermediate between what the user is entering inside the search bar and what keyword is searched in the API
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  //   CREATE ANOTHER VARIABLE TO KEEP TRACK OF THE RESULTS FROM OUR API CALL
  const [searchResults, setSearchResults] = useState([]);

  //   I also need to store the different steps
  const [stepsData, setStepsData] = useState([]);

  const confirmSearchTerm = () => {
    setDebouncedSearchTerm(searchTerm);
  };

  // LETS CREATE A HELPER FUNCTION TO HANDLE USER INPUT
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // This will update the search term to the one the user type inside the search bar
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(searchTerm);
    confirmSearchTerm();
  };

  //   console.log("debouncedTerm", debouncedSearchTerm);

  //   Create a useEffet function whose function is to wait until the user submit the form and confirm user input
  //   useEffect(() => {
  //     confirmSearchTerm = () => {
  //         setDebouncedSearchTerm(searchTerm)
  //     }
  //   }, [searchTerm])

  // Now that we have the user's search term, we can go ahead and make our API request
  useEffect(() => {
    // Let's make our API request.

    // 1. Create a helper function to help with JS asynchronity
    const helperFunction = async () => {
      const response = await fetch(
        `https://gentle-bayou-02230.herokuapp.com/https://api.spoonacular.com/recipes/complexSearch?apiKey=4553ea25c09b431a97981f54f6f7f33c&query=${debouncedSearchTerm}`
      );
      //   console.log(response);
      const data = await response.json();
      //   console.log(data);
      setSearchResults(data.results);
    };

    helperFunction();
  }, [debouncedSearchTerm]);

  //   console.log(searchResults);

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
        // console.log(response);
        const data = await response.json();
        // console.log(data);
        if (data) {
          //   console.log("I am here");
          setStepsData(data[0].steps);
        }
      }
    };
    if (debouncedSearchTerm) {
      //   console.log("gotcha");
      secondHelperFunction();
    }
    // console.log("on initial render");
  }, [searchResults]);

  //   console.log(stepsData);
  //   const listOfInstructions = stepsData.map((element) => {
  //     return (
  //       <div key={element.number}>
  //         <h3 style={{ textAlign: "center", color: "#d8456b" }}></h3>
  //         <ul>
  //           <li>{element.step}</li>
  //         </ul>
  //       </div>
  //     );
  //   });

  //   console.log(debouncedSearchTerm);

  if (stepsData.length) {
    const listOfInstructions = stepsData.map((element) => {
      return element;
    });

    const listOfImages = searchResults.map((element) => {
      return element;
    });
    return (
      <div className="directions">
        {/* <hr /> */}
        <h3
          style={{
            textAlign: "center",
            color: "#d8456b",
            marginBottom: "50px",
          }}
        >
          Cooking Directions ({listOfInstructions.length})
        </h3>
        <ol>
          {listOfInstructions.map((element) => {
            return <li key={`${Math.random()}`}>{element.step}</li>;
          })}
        </ol>
        <hr />
        <div className="card" style={{ marginTop: "100px", width: "800px" }}>
          <h4
            style={{
              color: "#d8456b",
              paddingTop: "30px",
              paddingBottom: "10px",
              textAlign: "center",
            }}
          >
            {listOfImages[0].title}
          </h4>
          <img
            src={listOfImages[0].image}
            alt="recipe"
            style={{ width: "50em", paddingLeft: "5%", paddingBottom: "40px" }}
          />
        </div>
        <hr style={{ marginTop: "100px" }} />
      </div>
    );
  } else {
    return (
      <div
        className="container"
        style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
      >
        <div className="ui segment">
          <h2 style={{ textAlign: "center", color: "#d8456b" }}>
            Get Cooking Instructions
          </h2>
          <form className="ui form" onSubmit={handleFormSubmit}>
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
      </div>
    );
  }

  //   const listOfImages = searchResults.map((element) => {
  //     return (
  //       <div key={element.image} className="card foodmood">
  //         <h4 style={{ color: "#d8456b" }}>{element.title}</h4>
  //         <img src={element.image} alt="" />
  //       </div>
  //     );
  //   });

  // NOW THAT WE SUCCESSFULLY STORED THE RESULTS INSIDE OF OUR STATE, LET'S DISPLAY OUR RESULTS
  //   return (
  //     // <div>Hello</div>
  //     <div
  //       className="container"
  //       style={{ marginTop: "20px", marginLeft: "30px", marginRight: "30px" }}
  //     >
  //       <div className="ui segment">
  //         <h2 style={{ textAlign: "center", color: "#d8456b" }}>
  //           Get Cooking Instructions
  //         </h2>
  //         <form className="ui form" onSubmit={handleFormSubmit}>
  //           {" "}
  //           <div className="field">
  //             <label style={{ fontSize: "1.25em" }}>
  //               What would you like instructions for?
  //             </label>
  //             <input
  //               type="text"
  //               onChange={handleInputChange}
  //               value={searchTerm}
  //             />
  //           </div>
  //           <button
  //             className="ui inverted green button"
  //             type="submit"
  //             // style={{ color: "#7dbf27" }}
  //           >
  //             Instructions
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //       <div className="directions" style={{ marginBottom: "50px" }}>
  //         <h3
  //           style={{
  //             textAlign: "center",
  //             color: "#d8456b",
  //             marginTop: "-30px",
  //             paddingBottom: "30px",
  //           }}
  //         >
  //           Cooking Directions ({stepsData.length})
  //         </h3>
  //         {listOfInstructions}
  //       </div>
  //       <hr style={{ marginBottom: "100px" }} />
  //       {listOfImages[0]}
  //     </div>
  //   );
};
// };

// STEP 4. EXPORT COMPONENT SO IT CAN BE USED IN OTHER PARTS OF OUR APPLICATION
export default Instructions;
