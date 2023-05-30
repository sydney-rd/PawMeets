import HomePage from "./screens/HomePage.jsx";
import Messages from "./screens/Messages/Messages.jsx";
import Login from "./screens/Login/Login.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import SignOut from "./screens/SignOut.jsx";
import Profile from "./screens/Profile/Profile.jsx";
import Create from "./screens/Create/Create.jsx";
import EditDog from "./screens/Edit/EditDog.jsx";
import DogProfile from "./screens/DogProfile/DogProfile.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "./services/users.js";
import { getUserDogs } from "./services/dogs.js";

function App() {
  const [user, setUser] = useState(null);
  const [userDogs, setUserDogs] = useState([]);
  const [currentDog, setCurrentDog] = useState(() => {
    const profile = localStorage.getItem("currentProfile");
    if (profile) {
      return JSON.parse(profile);
    } else {
      return null;
    }
  });
  const [toggle, setToggle] = useState(false);

  const fetchUser = async () => {
    const user = await verifyUser();
    user ? setUser(user) : setUser(null);
  };

  const fetchUserDogs = async () => {
    let userDogsData = await getUserDogs();
    setUserDogs(userDogsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUserDogs();
  }, [toggle, currentDog]);

  const handleSetCurrentDog = (dog) => {
    setCurrentDog(dog);
    localStorage.setItem("currentProfile", JSON.stringify(dog));
  };

  console.log(userDogs)
  console.log("current dog", currentDog)
  
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
        <Route
          path="/homepage"
          element={<HomePage currentDog={currentDog} setCurrentDog={setCurrentDog} />}
        />
        <Route
          path="/messages"
          element={
            <Messages
              user={user}
              userDogs={userDogs}
              currentDog={currentDog}
              setCurrentDog={handleSetCurrentDog}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              user={user}
              userDogs={userDogs}
              setToggle={setToggle}
              setCurrentDog={handleSetCurrentDog}
            />
          }
        />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<EditDog />} />
        <Route
          path="/dog-profile"
          element={
            <DogProfile
              user={user}
              userDogs={userDogs}
              setToggle={setToggle}
              currentDog={currentDog}
              setCurrentDog={handleSetCurrentDog}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
