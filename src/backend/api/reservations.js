const express = require("express");
const router = express.Router();
const knex = require("../database");
router.use(express.json())


router.get("/", async (req, res) => {
  try{
    const getAllReservation = await knex('reservation').select('*')
    res.json(getAllReservation)
    console.log(getAllReservation);
  } catch(err){
    throw(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const insertMeal = await knex('reservation').insert({ id: req.body.id, number_of_guests: req.body.number_of_guests, contact_phone_number: req.body.contact_phone_number, contact_name: req.body.contact_name ,crated_date: req.body.when_date, contact_email: req.body.contact_email, meal_id: req.body.meal_id});
    res.json(insertMeal);
  } catch (error) {
 throw(error)
  }
})

router.get("/:id", async (req, res) => {
  try{
    const getReservationById = await knex('reservation').where('id', req.params.id);
    if (getReservationById.length === 0) {
      res.status(404).json("Id is not available in database")
    } else {
      res.json(getReservationById);
    }
  } catch (error) {
    throw(error)
  }
})


router.put("/:id", async (req, res) => {
  try {
    const updateReservation = await knex('reservation').where('id', req.params.id).update(req.body.meal_id, '7')
    res.json(updateReservation)
    console.log(updateReservation);
  } catch (error) {
    throw(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deleteReservation = await knex('reservation').where('id', req.body);
   if (!deleteMeal) {
      res.status(400).json({ error: "Id doesn't exist in table" })
    } else {
      res.json({ "Error": "Deleted reservation"})
    }
    console.log(deleteReservation);
  } catch (error) {
    throw(error)
  }
})


module.exports = router;