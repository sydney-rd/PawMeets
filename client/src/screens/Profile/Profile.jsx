import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserDogs, deleteDog } from "../../services/dogs.js";
import Nav from "../../components/Nav/Nav.jsx";
import "./Profile.css";

function Profile({ user, userDogs, setToggle, setCurrentDog }) {
  const navigate = useNavigate();
  useEffect(() => {
    setToggle((prev) => !prev);
  }, [])

  const handleDeleteDog = async (dogId) => {
    await deleteDog(dogId);
    setToggle((prev) => !prev);
  };

  const handleClick = (dog) => {
    navigate("/dog-profile", { state: dog });
  };

  if (!user) return <h1>Loading...</h1>;

  return (
    <div>
      <Nav />
      <div className="header-container">
        <h1>Welcome, {user?.username}!</h1>
        <p>Please find a list of your dogs below!</p>
        <Link to="/create">Have a new dog? Add to your list :)</Link>
      </div>
      <div className="profile-container">
        {userDogs.length > 0 &&
          userDogs.map((dog) => (
            <div key={dog?._id}>
              <h3 className="profile-dog-name">{dog?.name}</h3>
              <img
                onClick={() => handleClick(dog)}
                className="profile-img"
                src={dog?.image}
              />
              <Link to={`/edit/${dog?._id}`}>
                <button className="edit-btn">
                  Edit your pet profile
                </button>
              </Link>
              <button
                className="delete-btn"
                onClick={() => handleDeleteDog(dog?._id)}
              >
                delete your pet profile
              </button>
              <button
                className="select-btn"
                onClick={() => setCurrentDog(dog)}>
                Select Current Dog
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Profile;
