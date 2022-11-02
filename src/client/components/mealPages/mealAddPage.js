import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./formStyle/form.css";

function AddMeal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxNumberOfGuests, setMaxNumberOfGuests] = useState("");
  const [price, setPrice] = useState("");

  const meal = {
    title,
    description,
    maxNumberOfGuests,
    price,
  };

  function submitMeal(e) {
    e.preventDefault();
    fetch("/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    }).then((response) => {
      if (response.status < 200 || response.status > 200) {
        alert("Your meal did not go through correct (Try agian)");
      } else {
        alert("Meal Added");
      }
      setTitle("");
      setDescription("");
      setMaxNumberOfGuests("");
      setPrice("");
    });
  }

  return (
    <div>
      <form className="add-form" onSubmit={submitMeal}>
        <h2>Add Meal form</h2>
        <div className="info">
          <input
            type="text"
            placeholder="Meal Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="info">
          <input
            type="textarea"
            placeholder="Meal Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="info">
          <input
            type="number"
            placeholder="Number Of Guests"
            value={maxNumberOfGuests}
            onChange={(e) => setMaxNumberOfGuests(e.target.value)}
            required
          />
        </div>
        <div className="info">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button className="addMeal-btn">Add Meal</button>
        <br/>
        <br/>
        <Link to="/"><button className="addMeal-btn">Back to home</button></Link>
      </form>
    </div>
  );
}
export default AddMeal;
