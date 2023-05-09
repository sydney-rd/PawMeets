import {useState, useEffect} from "react";
import { getDogs } from "../../services/dogs.js";
import { getUser } from "../../services/users.js";
import "./Messages.css";
import Nav from "../../components/Nav/Nav.jsx";

function Messages({user}) {
  const [likedDogs, setLikedDogs] = useState([])

  useEffect(()=>{
    const fetchLikedDogs = async () => {
      await getUser(user.id) // Update token
      const dogs = await getDogs()
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
      <div class="messages-container">
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
      <div class="messages-text-container">
        <div class="messages-text-box">
          <p>MSG 1</p>
        </div>
        <div class="messages-text-box">
          <p>Text 2</p>
        </div>
        <div class="messages-text-box">
          <p>Text 3</p>
        </div>
      </div>
    </>
  );
}

export default Messages;
