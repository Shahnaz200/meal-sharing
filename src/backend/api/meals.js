const express = require("express");
const { response } = require("../app");
const { select, as } = require("../database");
const router = express.Router();
const knex = require("../database");

//Returns all meals that are cheaper than maxPrice

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const maxPrice = request.query.maxPrice
    const maxPriceMeals = await knex("meal").where('meal.price', '<', `${maxPrice}`);
    response.json(maxPriceMeals);
  } catch (error) {
    throw error;
  }
});
//Returns all meals that still have available spots left

router.get("/", async (request, response) => {
 let spotLeft = await knex.raw(`select * 
 ,(max_reservation) - (number_of_guests) 
 as SpotsLeft from meal 
 inner join reservation on meal.id = reservation.meal_id
 where (max_reservation) - (number_of_guests) > 0`);

let availableReservations = request.query.availableReservations;
  
if (availableReservations != "true") {
  response.json("Reservation spots are not available")
}
else {
    console.log(spotLeft);
  }
});

//Returns all meals that partially match the given title. Rød grød will match the meal with the title Rød grød med fløde.

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    c= await knex("meal").where('meal.title', 'like', `%${title}%`);
    response.json(mealsWithTitle);
  } catch (error) {
    throw error;
  }
});

// Returns all meals where the date for when is after the given date.
router.get("/", async (request, response) => {
  const dateAfter = request.query.dateAfter;
  const date = new Date(dateAfter);
  const meals = await knex('meal').where("when_date", ">", date)
    if (!meals.length) {
      response.status(403).json("There is not available any meal in during this date");
    } else {
      response.json(meals)
    }
  });

  // Returns all meals where the date for when is before the given date. 
router.get("/", async (request, response) => {
  const dateBefore = request.query.dateBefore;
  const date = new Date(dateBefore);
  const meals = await knex('meal').where("when_date", "<", date)
    if (!meals.length) {
      response.status(403).json("There is not available any meal in during this date");
    } else {
      response.json(meals)
    }
  });

//Return the given number of meals
router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const limit = request.query.limit
    const limitNumOfMeals = await knex("meal").limit(limit);
    response.json(limitNumOfMeals);
  } catch (error) {
    throw error;
  }
});

// Returns all meals sorted by the given key. Allows when, max_reservations and price as keys. Default sorting order = asc.
router.get("/", async (request, response) => {
  let listOfMeals = knex("meal").select("*")
  const sort = request.query.sort_key;
  const order = sort.toString()

try {
   if (sort === "price" || sort === "when_date" || sort === "max_reservation") {
      listOfMeals = listOfMeals.orderByRaw(order)
      const data = await listOfMeals
      response.json(data)
    }
  } catch {
    throw response.status(500).send
  }
  });

  // Returns all meals sorted in the given direction. Only works combined with the sort_key and allows asc or desc. 
router.get("/", async (request, response) => {
  let listOfMeals = knex("meal").select("*")
  const sort = request.query.sort_key;
  const dir = request.query.sort_dir;
  const order = sort.toString()

try {
   if (sort === "price" && dir === "desc" || sort === "when_date" && dir === "desc" || sort === "max_reservation" && dir === "desc" ) {
      listOfMeals = listOfMeals.orderByRaw(order)
      const data = await listOfMeals
      response.json(data)
    }
  } catch {
    throw response.status(500).send
  }
  });

module.exports = router;
