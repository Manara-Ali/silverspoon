import "./Recipes.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE FUNCTION BASED COMPONENT
const Recipes = (props) => {
  console.log(props.recipes);
  const propsRecipe = props.recipes.map((element) => {
    return (
      <div className="container" key={element.id}>
        <div className="card">
          <h4 style={{ color: "#d8456b" }}>{element.title}</h4>
          <img src={element.image} alt="recipe" />
          {/* <p>{element.id}</p> */}
        </div>
      </div>
    );
  });
  return (
    <div>
      {propsRecipe}
      {/* <div className="footer">
        <p>Copyright &copy; Manara Ali 2021</p>
      </div> */}
    </div>
  );
};

// STEP 4. EXPORT COMPONENT
export default Recipes;

// deployed to heroku
