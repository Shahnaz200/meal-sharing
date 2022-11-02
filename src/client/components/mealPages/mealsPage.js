import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./mealsPage.css";
import Navbar from "../homePage/navbar/Navbar";
import logo from "../homePage/assets/logo.png";

function MealsPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((r) => r.json())
      .then((r) => setMeals(r));
  }, []);

  console.log(meals);

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
      <div className="bodyParts">
        <h2>
          Dont like the meals,
          <br /> try your luck and maybe in future
          <br /> your meal idea will be added to the Menu
        </h2>
        <Link to="/add-meal">
          <button className="Viewmore-btn">View More</button>
        </Link>
        <br />
        <br />
        {meals.map((meal) => (
          <div className="meals2">
            <div className="mealInfo2">
              <li>
                <p>{meal.id}</p>{" "}
                <p>
                  Meal Name: {meal.title}................
                  <br />
                  Meal Description: {meal.description}........
                </p>
                <p>Meal Price: {meal.price}kr</p>
                <Link to={`/meals/${meal.id}`}>
                  <button className="reserve-btn">Reserve Meal</button>
                </Link>
              </li>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <h3> &copy; Copyright Food food</h3>
      </footer>
    </>
  );
}

export default MealsPage;
