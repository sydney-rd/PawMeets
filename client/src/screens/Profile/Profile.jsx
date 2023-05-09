import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { verifyUser, getUser } from '../../services/users.js';
import { deleteDog } from "../../services/dogs.js";
import Nav from "../../components/Nav/Nav.jsx";
import "./Profile.css"

function Profile({user, setUser}) {
    const [dog, setDog] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            let newUser = await getUser(user?.id)
            setDog(newUser.dog)
        }
        fetchUser()
    }, [user, toggle])

    const handleDeleteDog = async (dogId) => {
        await deleteDog(dogId, user.id);
        const newUser = await verifyUser()
        setUser(newUser)
        setToggle(prev => !prev)
    }

    if (!user) return <h1>Loading...</h1>

    return (
        <div>
            <Nav />
            <div className='header-container'>
                <h1>Welcome, {user?.username}!</h1>
                <p>Please find a list of your dogs below!</p>
                <Link to="/create">Have a new dog? Add to your list :)</Link>
            </div>
            <div className='profile-container'>
                {/* {dogs.length > 0 && dogs.map((dog)=>( */}
                <div key={dog?._id}>
                    <h3 className="profile-dog-name">{dog?.name}</h3>
                    <img className="profile-img" src={dog?.image} alt={dog?.name} />
                    <Link to={`/edit/${dog?._id}`}>
                        <button className="update-profile">Edit your pet profile</button>
                    </Link>
                    <button className="delete-profile" onClick={() => handleDeleteDog(dog?._id)}>delete your pet profile</button>
                </div>
                {/* ))} */}
            </div>
        </div>
    )
}

export default Profile
