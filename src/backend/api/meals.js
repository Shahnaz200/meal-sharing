const express = require("express");
const router = express.Router();
const knex = require("../database");
router.use(express.json())


router.get("/", async (req, res) => {
  try{
    const getAllMeals = await knex('meal').select('*')
    res.json(getAllMeals)
    console.log(getAllMeals);
  } catch(err){
    throw(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const insertMeal = await knex('meal').insert({ id: req.body.id, title: req.body.title, description: req.body.description, location: req.body.location, when_date: req.body.when_date, max_reservations: req.body.max_reservations, price: req.body.price, created_date: req.body.created_date});
    res.json(insertMeal);
  } catch (error) {
 throw(error)
  }
})

router.get("/:id", async (req, res) => {
  try{
    const getMealsById = await knex('meal').where('id', req.params.id);
    if (getMealsById.length === 0) {
      res.status(404).json("Id is not available in database")
    } else {
      res.json(getMealsById);
    }
  } catch (error) {
    throw(error)
  }
})


router.put("/:id", async (req, res) => {
  try {
    const updateData = await knex('meal').where('id', req.params.id).update(req.body.price, '95.00')
    res.json(updateData)
    console.log(updateData);
  } catch (error) {
    throw(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const deleteMeal = await knex('meal').where('id', req.body);
   if (!deleteMeal) {
      res.status(400).json({ error: "Id doesn't exist in table" })
    } else {
      res.json({ "Error": "Deleted meal"})
    }
    console.log(deleteMeal);
  } catch (error) {
    throw(error)
  }
})


module.exports = router;