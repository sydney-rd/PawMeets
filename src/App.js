import HomePage from "./screens/HomePage/HomePage.jsx";
import Login from "./screens/Login/Login.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import SignOut from "./screens/SignOut.jsx";
import Profile from "./screens/Profile/Profile.jsx";
import CreateADog from "./screens/CreateADog/CreateADog.jsx";
import EditDog from "./screens/EditDog/EditDog.jsx";
import Matches from "./screens/Matches/Matches.jsx";
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
    if (!user) {
      return;
    }

    fetchUserDogs();
  }, [toggle, currentDog, user]);

  const handleSetCurrentDog = (dog) => {
    setCurrentDog(dog);
    localStorage.setItem("currentProfile", JSON.stringify(dog));
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              user={user}
              setUser={setUser}
              setCurrentDog={setCurrentDog}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route
          path="/sign-out"
          element={<SignOut setUser={setUser} setCurrentDog={setCurrentDog} />}
        />
        <Route
          path="/homepage"
          element={
            <HomePage currentDog={currentDog} setCurrentDog={setCurrentDog} />
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
        <Route
          path="/create"
          element={<CreateADog setCurrentDog={setCurrentDog} user={user} />}
        />
        <Route
          path="/edit/:id"
          element={
            <EditDog
              currentDog={currentDog}
              setUserDogs={setUserDogs}
              setCurrentDog={handleSetCurrentDog}
            />
          }
        />
        <Route
          path="/Matches"
          element={
            <Matches
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
