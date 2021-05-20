import "./Recipes.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Recipes = (props) => {
  // console.log(props.recipes); // Get confirmation that props were correctly passed to the child component
  // console.log(props.foodMood);
  if (props.recipes) {
    const propsRecipe = props.recipes.map((element) => {
      // Create a new array that will store all the data that we need from the recipes props
      return (
        // Store in the propsRecipe array, from here line 13.
        <div className="container manara" key={element.id}>
          <p>
            You have in your fridge,{" "}
            <span className="used">{element.usedIngredientCount}</span> out of
            the{" "}
            <span className="need">
              {element.usedIngredientCount + element.missedIngredientCount}
            </span>{" "}
            necessary ingredients to make:
          </p>
          <div className="card">
            <h4 style={{ color: "#d8456b" }}>{element.title}</h4>
            <img src={element.image} alt="recipe" />
          </div>
          <div className="missing">
            <h5>Missing Ingredients: ({element.missedIngredientCount})</h5>
            <ul>
              {element.missedIngredients.map((dish) => {
                return <li key={dish.id}>{dish.name.toUpperCase()}</li>;
              })}
            </ul>
          </div>
          <hr />
        </div>
      );
    }); // Store in the propsRecipe array, to here line 41.
    return (
      // Return all the stored data inside the propsRecipe as a JS variable
      <div>{propsRecipe}</div>
    );
  }
  // const propsRecipe = props.recipes.map((element) => {
  //   // Create a new array that will store all the data that we need from the recipes props
  //   return (
  //     // Store in the propsRecipe array, from here line 13.
  //     <div className="container manara" key={element.id}>
  //       <p>
  //         You have in your fridge,{" "}
  //         <span className="used">{element.usedIngredientCount}</span> out of the{" "}
  //         <span className="need">
  //           {element.usedIngredientCount + element.missedIngredientCount}
  //         </span>{" "}
  //         necessary ingredients to make:
  //       </p>
  //       <div className="card">
  //         <h4 style={{ color: "#d8456b" }}>{element.title}</h4>
  //         <img src={element.image} alt="recipe" />
  //       </div>
  //       <div className="missing">
  //         <h5>Missing Ingredients: ({element.missedIngredientCount})</h5>
  //         <ul>
  //           {element.missedIngredients.map((dish) => {
  //             return <li key={dish.id}>{dish.name.toUpperCase()}</li>;
  //           })}
  //         </ul>
  //       </div>
  //       <hr />
  //     </div>
  //   );
  // }); // Store in the propsRecipe array, to here line 41.
  // return (
  //   // Return all the stored data inside the propsRecipe as a JS variable
  //   <div>{propsRecipe}</div>
  // );
  else if (props.foodMood) {
    const propsFoodMood = props.foodMood.map((element) => {
      // Create a new array that will store all the data that we need from the recipes props
      return (
        // Store in the propsRecipe array, from here line 13.
        <div className="container foodmood" key={element.id}>
          <div className="card foodmood">
            <h4>{element.title}</h4>
            <img src={element.image} alt="recipe" />
          </div>
        </div>
      );
    }); // Store in the propsRecipe array, to here line 41.
    return (
      // Return all the stored data inside the propsRecipe as a JS variable
      <div>{propsFoodMood}</div>
    );
  }
  return <div></div>;
};

// STEP 4. EXPORT COMPONENT
export default Recipes;

// deployed to heroku
