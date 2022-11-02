import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./formStyle/form.css"
import "./mealWithId.css";

function MealWithId() {
  const [meals, setMeals] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((res) => setMeals(res));
  }, []);

  const { id } = useParams();
  const singleMeal = meals.filter((meal) => meal.id == id);
  const mealId = singleMeal.map((meal) => meal.id);
  const title = singleMeal.map((meal) => meal.title);
  const description = singleMeal.map((meal) => meal.description);
  const price = singleMeal.map((meal) => meal.price);
  const maxGuests = singleMeal.map((meal) => meal.max_reservation);

  const reservation = {
    contact_name: name,
    contact_email: email,
    contact_phone_number: phone,
    number_of_guests: guests,
    meal_id: mealId[0],
  };

  function submitReservation(e) {
    e.preventDefault();
    fetch("/api/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reservation),
    }).then((response) => {
      if (response.status < 200 || response.status > 200) {
        alert("your reservation did not go through correct (Try agian)");
      } else {
        alert("Reservation Added");
      }
    });

    setGuests("");
    setName("");
    setPhone("");
    setEmail("");
  }

  return (
    <>
      <div className="meals3">
        <div className="mealInfo3">
          <li>
            <p>{mealId}</p>{" "}
            <p>
              Meal Name: {title}................
              <br />
              Meal Description: {description}........
            </p>
            <p>Meal Price: {price}kr</p>
          </li>
        </div>
        <br/>
        <br/>
        <div>
          <form className="reserve-form" onSubmit={submitReservation}>
            <div className="info">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="info">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="info">
              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="info">
              <input
                type="number"
                placeholder="Total Guest"
                value={guests}
                min={1}
                max={maxGuests}
                onChange={(e) => setGuests(e.target.value)}
                required
              />
            </div>
            <button className="reserve-btn">Book Seats</button>
            <br/>
            <br/>
            <Link to="/meals"><button className="reserve-btn">Back to the menu</button></Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default MealWithId;
