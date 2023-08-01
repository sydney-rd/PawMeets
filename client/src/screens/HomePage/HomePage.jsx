import { Link } from "react-router-dom";
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
    setCurrentDogIndex((currentDogIndex + 1) % filteredDogs.length);
  };

  const handleLikeClick = async () => {
    const likedDogId = filteredDogs[currentDogIndex]._id;
    const doggy = await likeDog(currentDog._id, likedDogId);
    localStorage.setItem("currentProfile", JSON.stringify(doggy));
    setCurrentDog((prev) => {
      return { ...prev, likes: [...prev.likes, likedDogId] };
    });
    const matchedDog = dogs.find(
      (dog) => dog.likes.includes(currentDog._id) && dog._id === likedDogId
    );
    if (matchedDog) {
      setLikedByLikedDog(matchedDog); // Store the matched dog in the state
      setShowModal(true);
    }
  };

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await getDogs();
      setDogs(response);
    };
    fetchDogs();
  }, []);

  const filteredDogs = useMemo(
    () => dogs.filter((dog) => !currentDog?.likes.includes(dog._id)),
    [dogs, currentDog?.likes]
  );

  useEffect(() => {
    if (filteredDogs.length > 0 && currentDogIndex >= filteredDogs.length) {
      setCurrentDogIndex(0);
    }
  }, [filteredDogs, currentDogIndex]);

  if (filteredDogs.length === 0) return <h1>No dogs found in your area ...</h1>;

  // console.log(
  //   "------------------------------------------------------------------------------------"
  // );
  // console.log(
  //   "------------------------------------------------------------------------------------"
  // );
  // console.log("dogs: ", dogs);
  // console.log("currentDog?.likes: ", currentDog?.likes);
  // console.log("filteredDogs: ", filteredDogs);
  // console.log("currentDogIndex: ", currentDogIndex);
  const dog = filteredDogs[currentDogIndex];
  // console.log("dog: ", dog);

  return (
    <div>
      <Nav />
      {filteredDogs.length > 0 && (
        <div className="homepage-container">
          <div className="overlay"> </div>
          <div className="dog-container">
            <h1 className="home-page-dog-name">{dog.name}</h1>
            <div className="dog-image-container">
              <Link to={`/dogs/${dog._id}`}>
                <img
                  className="homepage-dog-image"
                  src={dog.image}
                  alt={dog.name}
                />
              </Link>
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
                {dog.name} the {dog.breed}. {dog.gender}, {dog.age} years young.
              </p>
              <br />
              <p>{dog.about}</p>
            </div>
          </div>
        </div>
      )}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        dog={likedByLikedDog}
      />
    </div>
  );
}
