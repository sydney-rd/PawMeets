// Matches.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDogs } from "../../services/dogs.js";
import Nav from "../../components/Nav/Nav.jsx";
import "./Matches.css";

export default function Matches({ user, userDogs }) {
  const location = useLocation();
  const [likedDogs, setLikedDogs] = useState([]);

  useEffect(() => {
    const fetchLikedDogs = async () => {
      const dogs = await getDogs();
      // Filter dogs that have liked the current dog and the current dog has liked them
      const matchedDogs = dogs.filter(
        (dog) => userDogs.includes(dog._id) && dog.likes.includes(user._id)
      );
      setLikedDogs(matchedDogs);
    };
    fetchLikedDogs();
  }, [user, userDogs]);

  console.log(likedDogs);

  return (
    <>
      <Nav />
      <div className="matches-container">
        {likedDogs.length > 0 ? (
          likedDogs.map((dog) => (
            <div key={dog._id} className="match-card">
              <h2>You and {dog.name} are a Match!</h2>
              <img className="match-dog-image" src={dog.image} alt={dog.name} />
              {/* Display other details of the matched dog if desired */}
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age}</p>
              {/* ... and so on */}
            </div>
          ))
        ) : (
          <h1>No matches found.</h1>
        )}
      </div>
    </>
  );
}
