import "./NavBar.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE CLASS BASED COMPONENT
const NavBar = () => {
  return (
    <div className="navbar">
      <h1>
        <a href="/">Silver/Spoon</a>
      </h1>
      <ul>
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <a href="/">SERVICE</a>
        </li>
        <li>
          <a href="/">CONTACT</a>
        </li>
        <li>
          <a href="/">LOGIN</a>
        </li>
        <li>
          <a href="/">SIGN UP</a>
        </li>
      </ul>
    </div>
  );
};

// STEP 4. EXPORT COMPONENT
export default NavBar;
