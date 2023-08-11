import React, { useState, useEffect, useMemo } from "react";
import { getDogs, likeDog } from "../../services/dogs.js";
import Nav from "../../components/Nav/Nav.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import "./HomePage.css";

export default function HomePage({ currentDog, setCurrentDog }) {
  const [dogs, setDogs] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [likedByLikedDog, setLikedByLikedDog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleDislikeBtnClick = () => {
    setCurrentDogIndex((prev) => (prev + 1) % filteredDogs.length);
  };

  // Like and Match Logic
  const handleLikeClick = async () => {
    const likedDogId = filteredDogs[currentDogIndex]._id;
    const dog = await likeDog(currentDog._id, likedDogId);
    localStorage.setItem("currentProfile", JSON.stringify(dog));
    setCurrentDog((prev) => {
      return { ...prev, likes: [...prev.likes, likedDogId] };
    });

    const matchedDog = dogs.find(
      (dog) => dog.likes.includes(currentDog._id) && dog._id === likedDogId
    );
    if (matchedDog) {
      setLikedByLikedDog(matchedDog);
      setShowModal(true);
    }
    if (filteredDogs.length - 1 <= currentDogIndex) {
      setCurrentDogIndex(0);
    }
  };

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await getDogs();
      setDogs(response);
    };
    fetchDogs();
  }, []);

  // filter dogs based on likes
  const filteredDogs = useMemo(
    () => dogs.filter((dog) => !currentDog?.likes.includes(dog._id)),
    [dogs, currentDog?.likes]
  );

  useEffect(() => {
    if (filteredDogs.length > 0 && currentDogIndex >= filteredDogs.length) {
      setCurrentDogIndex(0);
    }
  }, [filteredDogs, currentDogIndex]);

  const currentlyViewedDog = filteredDogs[currentDogIndex];

  return (
    <div>
      <Nav />
      <div className="homepage-container">
        <div className="overlay"> </div>
        <div className="dog-container">
          {filteredDogs.length > 0 ? (
            <>
              <h1 className="home-page-dog-name">{currentlyViewedDog.name}</h1>
              <div className="dog-image-container">
                <img
                  className="homepage-dog-image"
                  src={currentlyViewedDog.image}
                  alt={currentlyViewedDog.name}
                />
                <div>
                  <button
                    className="dislike-button"
                    onClick={handleDislikeBtnClick}
                  >
                    BARK
                  </button>
                  <button className="like-button" onClick={handleLikeClick}>
                    BONE
                  </button>
                </div>
              </div>
              <div className="homepage-description">
                <p>
                  {currentlyViewedDog.name} the {currentlyViewedDog.breed}.{" "}
                  {currentlyViewedDog.gender}, {currentlyViewedDog.age} years
                  young.
                </p>
                <br />
                <p>{currentlyViewedDog.about}</p>
              </div>
            </>
          ) : (
            <h1 className="loading-msg">Loading...🐾</h1>
          )}
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        dog={likedByLikedDog}
        currentDog={currentDog}
      />
    </div>
  );
}
