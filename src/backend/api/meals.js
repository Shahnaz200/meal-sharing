const express = require("express");
const router = express.Router();
const knex = require("../database");
router.use(express.json())


router.get("/", async (req, res) => {
  try{
    const getAllMeals = await knex('meal').select('*')
    res.json(getAllMeals)
    console.log("Success Fetched All Meals From DB");
  } catch(err){
    throw(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const insertMeal = await knex('meal').insert({title: req.body.title, description: req.body.description, location: req.body.location, when_date: req.body.when_date, max_reservation: req.body.max_reservation, create_date: req.body.create_date, price: req.body.price});
    res.json(insertMeal);
    if (insertMeal){
      console.log("Success Added Meal" + insertMeal);
    }
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
    const updateData = await knex('meal').where("title", req.body.title).update("id", req.body.id)
    res.json(updateData)
    console.log( "Success Updated meal");
  } catch (error) {
    throw(error)
  }
})


router.delete("/:id", async (req, res) => {
  try {
    const deleteMeal = await knex('meal').where('id', req.body.id).del();
   if (!deleteMeal) {
      res.status(400).json({ error: "Id doesn't exist in table" })
    } else {
      res.json({ "Success": "Deleted meal"})
    }
    console.log(deleteMeal);
  } catch (error) {
    throw(error)
  }
})


module.exports = router;