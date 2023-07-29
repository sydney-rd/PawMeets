import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDog } from "../../services/dogs.js";
import Nav from "../../components/Nav/Nav.jsx";
import "./Profile.css";

function Profile({ user, userDogs, setToggle, setCurrentDog }) {
  const [selectedDogId, setSelectedDogId] = useState(null);

  useEffect(() => {
    setToggle((prev) => !prev);
  }, []);

  const handleDeleteDog = async (dogId) => {
    await deleteDog(dogId);
    setToggle((prev) => !prev);
  };

  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      <Nav />
      <div className="header-container">
        <div className="header">
          <h1>Welcome, {user?.username}! Please see your dogs below</h1>
          <Link to="/create">Add a new dog profile here</Link>
        </div>
      </div>
      <div className="profile-container">
        {userDogs.length > 0 &&
          userDogs.map((dog) => (
            <div key={dog?._id}>
              <div className="dog-profile-container">
                <h3 className="profile-dog-name">{dog?.name}</h3>
                <img className="profile-img" src={dog?.image} />
                <Link to={`/edit/${dog?._id}`}>
                  <button className="edit-btn">Edit Dog</button>
                </Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteDog(dog?._id)}
                >
                  Delete Dog
                </button>
                <button
                  className="select-btn"
                  onClick={() => {
                    setSelectedDogId(dog?._id);
                    setCurrentDog(dog);
                  }}
                >
                  {selectedDogId === dog?._id
                    ? "Dog Selected"
                    : "Select as Current Dog"}
                </button>{" "}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
