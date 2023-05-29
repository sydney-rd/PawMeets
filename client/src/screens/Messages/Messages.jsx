import {useState, useEffect} from "react";
import { getUserDogs, messageDog, likeDog } from "../../services/dogs.js";
import "./Messages.css";
import Nav from "../../components/Nav/Nav.jsx";

function Messages({user}) {
  const [likedDogs, setLikedDogs] = useState([])

  useEffect(()=>{
    const fetchLikedDogs = async () => {
      const dogs = await getUserDogs()
      let likedDogsData = dogs.filter((dog) => {
        return user?.dog?.like.includes(dog._id)
      })
      setLikedDogs(likedDogsData)
    }
    fetchLikedDogs()
  }, [user])

  return (
    <>
      <Nav />
      <div className="messages-container">
        {likedDogs.map((dog)=>(
          <div key={dog._id} class="messages-image-container">
            <img
              className="messages-img"
              src={dog.image}
              alt={dog.name}
            />
          </div>
        ))}
      </div>
      <div className="messages-text-container">
        <div className="messages-text-box">
          <p>MSG 1</p>
        </div>
        <div className="messages-text-box">
          <p>Text 2</p>
        </div>
        <div className="messages-text-box">
          <p>Text 3</p>
        </div>
      </div>
    </>
  );
}

export default Messages;
