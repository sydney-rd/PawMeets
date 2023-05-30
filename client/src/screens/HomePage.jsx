import DogHomePage from "../components/DogHomePage/DogHomePage.jsx";
import { useState, useEffect, useMemo } from "react";
import { getDogs, likeDog } from "../services/dogs.js";
import "../components/DogHomePage/DogHomePage.css";
import Nav from "../components/Nav/Nav.jsx";

export default function Dogs({ currentDog, setCurrentDog }) {
  const [dogs, setDogs] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);

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

  if (filteredDogs.length === 0) return <h1>No dogs found in your area ...</h1>


  return (
    <div>
      <Nav />
      {filteredDogs.length > 0 && (
        <DogHomePage
          dog={filteredDogs[currentDogIndex]}
          handleDislikeBtnClick={handleDislikeBtnClick}
          handleLikeClick={handleLikeClick}
        />
      )}
    </div>
  );
}
