import HomePage from "./screens/HomePage.jsx";
import Messages from "./screens/Messages/Messages.jsx"
import SignIn  from "./screens/SignIn/SignIn.jsx";
import SignUp from "./screens/SignUp/SignUp.jsx";
import SignOut from "./screens/SignOut.jsx";
import Profile from "./screens/Profile/Profile.jsx" 
import Create from "./screens/Create/Create.jsx";
import EditDog from "./screens/Edit/EditDog.jsx";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyUser } from "./services/users.js";
import "./App.css";

function App() {
  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const user = await verifyUser()
    user ? setUser(user) : setUser(null)
  }

  useEffect(()=>{
    fetchUser()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn user={user} setUser={setUser}/>} />
        <Route path="/signup" element={<SignUp user={user} setUser={setUser}/>} />
        <Route path="/sign-out" element={<SignOut setUser={setUser} />} />
        <Route path='/homepage' element={<HomePage user={user} />} />
        <Route path="/messages" element={<Messages user={user}/>} />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<EditDog />} />
      </Routes>
    </div>
  );
  
}

export default App; 

