import DogHomePage from '../components/DogHomePage/DogHomePage.jsx';
import { useState, useEffect } from 'react';
import { getDogs, likeDog } from '../services/dogs.js';
import "../components/DogHomePage/DogHomePageStyle.css"
import Nav from '../components/Nav/Nav.jsx'

export default function Dogs({currentDog}) {
  const [dogs, setDogs] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);
  const [userLikedDogIds, setUserLikedDogIds] = useState([]);

  const handleDislikeBtnClick = () => {
    setCurrentDogIndex((currentDogIndex + 1) % dogs.length);
  };

  const handleLikeClick = async () => {
    const likedDogId = dogs[currentDogIndex]._id;
    await likeDog(currentDog._id, likedDogId);
    setUserLikedDogIds([...userLikedDogIds, likedDogId]);
    setCurrentDogIndex((currentDogIndex + 1) % dogs.length);
  };

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await getDogs();
      const filteredDogs = response.filter(dog => !userLikedDogIds.includes(dog._id));
      setDogs(filteredDogs);
    };
    fetchDogs();
  }, [userLikedDogIds]);

  return (
      <div>
        <Nav />
        {dogs.length > 0 && 
          <DogHomePage dog={dogs[currentDogIndex]} handleDislikeBtnClick={handleDislikeBtnClick} handleLikeClick={handleLikeClick}/>}
      </div>
  );
}
