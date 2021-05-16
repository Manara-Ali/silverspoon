import "./Home.css";

// STEP 1. IMPORT REACT
import React from "react";

// STEP 2. ADDITIONAL IMPORTS GO HERE

// STEP 3. CREATE COMPONENT
const Home = (props) => {
  return (
    <div>
      {props.children}
      <div className="main">
        <div className="stacked">
          <div className="current-ingredients">
            <div className="current-ingredients-text">
              <h2>
                <a href="/fridgeitems">What's in your fridge?</a>
              </h2>
              <p>
                We have all been there, looking through the fridge trying to
                figure out what we can quickly cook with the ingredients we
                currently have in our fridge. Doesn't that sucks...
              </p>
              <p>
                Fortunately, with <em>Silver Spoon</em>, this hassle is no more.
                You can easily enter the ingredient that you currently have
                inside your fridge, and instantly receive a list of recipes that
                you can prepare from the ingredients at hand.
              </p>
              <p>
                If that sounds like interresting to you, head over to our
                "What's In Your Fridge?" section and start exploring fresh
                recipes!
              </p>
            </div>
            <div className="current-ingredients-image">
              <img
                src="./images/opened-fridge.jpg"
                alt="fridge"
                style={{ width: "400px", height: "100%" }}
              />
            </div>
          </div>

          <div className="current-mood">
            <div className="current-mood-image">
              <img
                src="/images/foodmood.jpg"
                alt="fridge"
                style={{ width: "400px", height: "100%" }}
              />
            </div>
            <div className="current-mood-text">
              <h2>
                <a href="/foodmood">What is your food mood?</a>
              </h2>
              <p>
                Sometimes we are in the mood for a particular dish, or as we say
                here, we are in a particular "food mood". The only probleme is,
                we do not know how to put together and cook, and present the
                dish we are craving.
              </p>
              <p>
                Fear no more! <em>Silver Spoon</em> makes it easy! With one
                click of of a button, get the necessary ingredients you will
                need to quickly build a shopping list before heading out to the
                super market. <em>Silver Spoon</em> also provides you with
                directions, cooking time and servings in case you are planning
                family dinner.
              </p>
              <p>
                Give <em>Silver Spoon</em> a try today and say bye to boring
                meals!
              </p>
            </div>
          </div>
          <div className="instructions">
            <div className="instructions-text">
              <h2>
                <a href="/instructions">Get Instructions</a>
              </h2>
              <p>
                Some people say cooking is an art, we at <em>Silver Spoon</em>{" "}
                believe cooking is a "directive art", meaning one must follow
                certain steps to be able to produce those delicious meals over
                and over again.
              </p>
              <p>
                <em>Silver Spoon</em> provide you with step by step directions
                to creating stunning dishes and delicious meals. These
                directions are provided in a very elegant and fool proof
                fashion, paired with ingredients, required utensils and cooking
                times.
              </p>
              <p>
                <em>Silver Spoon</em> makes it difficult for anyone to use the
                good old excuse of not knowing how to cook, so take advantage of
                it today!
              </p>
            </div>
            <div className="instructions-image">
              <img
                src="./images/cookbook.jpg"
                alt="fridge"
                style={{ width: "400px", height: "100%" }}
              />
            </div>
          </div>
          <div className="suggestions">
            <div className="suggestions-image">
              <img
                src="./images/random.jpg"
                alt="fridge"
                style={{ width: "400px", height: "100%" }}
              />
            </div>
            <div className="suggestions-text">
              <h2>
                <a href="/randomrecipes">Random Recipes</a>
              </h2>
              <p>
                At <em>Silver Spoon</em>, we dont take ourselves too seriously
                and understand that cooking is also fun, and can also be a fun
                activity for the entire family.
              </p>
              <p>
                This is the reason why we provided you with the ability to
                randomly select a dish from our vast repertoire, and instantly
                provide you with necessary instructions to quickly cook that
                dish as if it was not your first time
              </p>
              <p>
                Remember that old saying, "if you can dream it you can hold it?"
                Well at Silver Spoon we have a different one, "if you can spell
                it, you can eat!"{" "}
              </p>
            </div>
          </div>
          <div className="footer">
            <p>Copyright &copy; Manara Ali 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// STEP 4. EXPORT COMPONENT
export default Home;
