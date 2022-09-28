const express = require("express");
const router = express.Router();
const { response } = require("../app");
const knex = require("../database");

// GET Returns all reviews.
router.get("/", async (req, res) => {
  try{
    const getAllReviews = await knex('review').select('*')
    if (!getAllReviews) {
      res.status(400).json({ error: "Could not fetch the reviews"})
    } else {
    res.json(getAllReviews)
    // console.log("Success Fetched All Reviews" + getAllReviews);
  }
  } catch(error){
    throw(error)
 }
})

// GET	Returns all reviews for a specific meal.
router.get('/:id', async (req, res) => {
 try {
     const id = req.params.id
     const reviewList = await knex.from('review').select('*').where('meal_id', id);
     if (!reviewList) {
      res.status(400).json({ error: "Id doesn't exist in table" })
    } else {
     res.json(reviewList);
    }
 } catch (error) {
     throw error
  }
})

// Adds a new review to the database.
router.post("/", async (req, res) => {
 try {
   const insertReview = await knex('review').insert({ id: req.body.id, title: req.body.title, star: req.body.star, created_date: req.body.created_date, meal_id: req.body.meal_id});
   if (!deleteMeal) {
    res.status(400).json({ error: "meal doesn't exist in table" })
  } else {
   res.json(insertReview);
  //  console.log("Success Added Review" + insertReview);
}
 } catch (error) {
throw(error)
 }
})

// GET	Returns a review by id.
router.get("/:id", async (req, res) => {
 try{
   const getReviewsById = await knex('review').where('id', req.params.id);
   if (getReviewsById.length === 0) {
     res.status(404).json("Id is not available in database")
   } else {
     res.json(getReviewsById);
   }
 } catch (error) {
   throw(error)
 }
})

// PUT	Updates the review by id.
router.put("/:id", async (req, res) => {
 try {
   const updateData = await knex('meal').where('id', req.params.id).update("title", req.body.title)
   if (!updateData) {
    res.status(400).json({ error: "Id doesn't exist in table" })
  } else {
   res.json(updateData)
  //  console.log("Success Updated Review" + updateData);
  }
 } catch (error) {
   throw(error)
 }
})

// DELETE	Deletes the review by id.
router.delete("/:id", async (req, res) => {
 try {
   const deleteMeal = await knex('review').where('id', req.body).del();
  if (!deleteMeal) {
     res.status(400).json({ error: "Id doesn't exist in table" })
   } else {
     res.json({ "Success": "Deleted Review"})
   }
   console.log(deleteMeal);
 } catch (error) {
   throw(error)
 }
})

module.exports = router;

