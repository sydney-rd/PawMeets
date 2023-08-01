import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDogs } from "../../services/dogs.js";
import Nav from "../../components/Nav/Nav.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import "./Matches.css";

export default function Matches({ user, userDogs }) {
  const location = useLocation();
  const [likedDogs, setLikedDogs] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
              <button className="close-btn" onClick={() => setShowModal(true)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <h1>No matches found.</h1>
        )}
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
