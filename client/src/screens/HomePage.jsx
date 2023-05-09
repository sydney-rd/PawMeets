import DogHomePage from '../components/DogHomePage/DogHomePage.jsx';
import { useState, useEffect } from 'react';
import { getDogs, likeDog } from '../services/dogs.js';
import "../components/DogHomePage/DogHomePageStyle.css"
import Nav from '../components/Nav/Nav.jsx'

export default function Dogs({user}) {
  const [dogs, setDogs] = useState([]);
  const [currentDogIndex, setCurrentDogIndex] = useState(0);

  const handleDislikeBtnClick = () => {
    setCurrentDogIndex((currentDogIndex + 1) % dogs.length);
  };

  const handleLikeClick = async () => {
    // get selected dog's id
    // generate body of request => updated data
    let likedDogId = dogs[currentDogIndex]._id

    await likeDog(user.dog._id, likedDogId)

    setCurrentDogIndex((currentDogIndex + 1) % dogs.length);
  };

  useEffect(() => {
    const fetchDogs = async () => {
      const response = await getDogs();
      setDogs(response);
    };
    fetchDogs();
  }, []);

  return (
      <div>
        <Nav />
        {dogs.length > 0 && 
          <DogHomePage dog={dogs[currentDogIndex]} handleDislikeBtnClick={handleDislikeBtnClick} handleLikeClick={handleLikeClick}/>}
      </div>
  );
}
