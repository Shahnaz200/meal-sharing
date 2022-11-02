const express = require("express");
const { response } = require("../app");
const { select, as } = require("../database");
const router = express.Router();
const knex = require("../database");

//returns all meals in database

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const meals = await knex("meal").select();
    response.json(meals);
  } catch (error) {
    throw error;
  }
});



module.exports = router;