import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDogs } from "../../services/dogs.js";

export default function DogProfile( {user} ) {
  const location = useLocation();
  console.log(location.state)
  const [likedDogs, setLikedDogs] = useState([]);

  useEffect(() => {
    const fetchLikedDogs = async () => {
      const dogs = await getDogs();
      const likedDogsData = dogs.filter((dog) => location.state.likes.includes(dog._id));      
      setLikedDogs(likedDogsData);
    };
    fetchLikedDogs();
  }, [user]);

  console.log(likedDogs)
  
  return (
    <>
      <div>DogProfile</div>
      <h1>{location.state.name}</h1>
      <div className="messages-container">
        {likedDogs.map((dog) => (
          <div key={dog._id} class="messages-image-container">
            <img className="messages-img" src={dog.image} alt={dog.name} />
          </div>
        ))}
      </div>
    </>
  );
}
