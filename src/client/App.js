import React from "react";
import Homepage from "./components/homePage/homePage";
import MealWtihId from "./components/mealPages/mealWtihId";
import MealsPage from "./components/mealPages/mealsPage";
import AddMeal from "./components/mealPages/mealAddPage";
import { BrowserRouter as Routes, Route } from "react-router-dom";

function App() {
  return (
        <center>
    <Routes>
      <Route exact path="/">
          <Homepage />
      </Route>
      <Route exact path="/meals">
          <MealsPage />
      </Route>
      <Route path="/meals/:id">
          <MealWtihId />
      </Route>
      <Route exact path="/add-meal">
          <AddMeal />
      </Route>
    </Routes>
        </center>
  );
}

export default App;
