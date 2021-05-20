import "./Random.css";

// STEP 1. IMPORT REACT
import React, { useState, useEffect } from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Random = () => {
  // Create a state to keep track of the Title
  const [title, setTitle] = useState("");

  //   Create a state to keep track of the Instructions
  const [steps, setSteps] = useState([]);

  //   Create a state to keep track of the Ingredients
  const [ingredients, setIngredients] = useState([]);

  //   Create a state to keep track of the dishID
  const [dishID, setDishID] = useState(null);

  //   Create a state to keep track of the Image
  const [image, setImage] = useState("");

  //   Create a state to keep track of the cookingTime
  const [cookingTime, setCookingTime] = useState(null);

  //   Create a state to keep track of the servings
  const [servings, setServings] = useState(0);
  useEffect(() => {
    const getRandomRecipes = async () => {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=4553ea25c09b431a97981f54f6f7f33c&number=1`
      );
      const data = await response.json();
      console.log(data);

      if (data) {
        setTitle(data.recipes[0].title);
        setSteps(data.recipes[0].analyzedInstructions[0].steps);
        setIngredients(data.recipes[0].extendedIngredients);
        setDishID(data.recipes[0].id);
        setImage(data.recipes[0].image);
        setCookingTime(data.recipes[0].readyInMinutes);
        setServings(data.recipes[0].servings);
      }
    };
    getRandomRecipes();
  }, []);

  const ingredientList = ingredients.map((element) => {
    return (
      <div key={Math.random()}>
        <ul className="no-bullet-points">
          <li>{element.name}</li>
        </ul>
      </div>
    );
  });

  const instructionsList = steps.map((element) => {
    return (
      <div key={Math.random()}>
        <ul className="flex-inner-container">
          <li>{element.step}</li>
        </ul>
      </div>
    );
  });

  return (
    <div className="container-flex">
      <div className="card foodmood">
        <h4 style={{ color: "#d8456b" }}>{title}</h4>
        <div>
          <h5 style={{ color: "#529471", paddingBottom: "10px" }}>
            Preparation Time:{" "}
            <span style={{ color: "#35635b" }}>{cookingTime} Minutes</span>
          </h5>
        </div>
        <div>
          <h5 style={{ color: "#529471", paddingBottom: "10px" }}>
            Servings:{" "}
            <span style={{ color: "#35635b" }}>{servings} People</span>
          </h5>
        </div>
        <div>
          <img src={image} alt="" className="random-img" />
        </div>
      </div>
      <hr style={{ marginTop: "70px" }} />
      <div>
        <div className="ingredients">
          <h4 style={{ color: "#d8456b" }}>
            Ingredients ({ingredientList.length})
          </h4>
          {ingredientList}
        </div>
        <hr style={{ marginTop: "50px" }} />
        <div className="random-instructions">
          <h4 style={{ color: "#d8456b" }}>
            Directions ({instructionsList.length})
          </h4>
          {instructionsList}
        </div>
      </div>
    </div>
  );
};

// STEP 4. EXPORT COMPONENT TO BE USED IN OTHER PARTS OF OUR APPLICATION
export default Random;
