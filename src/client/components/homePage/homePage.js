import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../homePage/homePage.css";
import logo from "./assets/logo.png";
import Slideshow from "./slideshow/slideshow";
import Navbar from "./navbar/Navbar";

function homePage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((r) => r.json())
      .then((r) => setMeals(r));
  }, []);

  return (
    <>
      <div className="heading">
        <header className="titles">
          Food food
          <h3>Best Food</h3>
        </header>
        <img src={logo}></img>
      </div>
      <Navbar />
      <Slideshow />
      <div className="viewMenu">
        <h2>Check out our latest Menu</h2>
        <br />
        <br />
        <Link to="/meals">
          <button>View More</button>
        </Link>
      </div>

      {/* {meals.map((meal) => (
        <div className="meals">
          <div className="mealInfo">
            <li>
              <p>{meal.id}</p>{" "}
              <p>
               Meal Name: {meal.title}................
                <br />
               Meal Description: {meal.description}........
              </p>
              <p>Meal Price: {meal.price}kr</p>
            </li>
          </div>
        </div>
      ))} */}

      {/* {Footer} */}

      <footer>
     <h3> &copy; Copyright Food food</h3>
      </footer>
    </>
  );
}

export default homePage;
