import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateDog, getDog } from "../../services/dogs.js";
import "./EditDog.css"

export default function EditDog() {
  const dogNameRef = useRef();
  const dogBreedRef = useRef();
  const dogAgeRef = useRef();
  const dogAboutRef = useRef();
  const dogGenderRef = useRef();
  const dogPersonalityRef = useRef();
  const dogImageRef = useRef();
 
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchDog = async () => {
        const dog = await getDog(id)

        dogNameRef.current.defaultValue = dog.name
        dogBreedRef.current.defaultValue = dog.breed
        dogAgeRef.current.defaultValue = dog.age
        dogAboutRef.current.defaultValue = dog.about
        dogGenderRef.current.defaultValue = dog.gender
        dogPersonalityRef.current.defaultValue = dog.personality
        dogImageRef.current.defaultValue = dog.image
    }
    fetchDog()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: dogNameRef.current.value,
      breed: dogBreedRef.current.value,
      age: dogAgeRef.current.value,
      about: dogAboutRef.current.value,
      gender: dogGenderRef.current.value,
      personality: [dogPersonalityRef.current.value],
      image: dogImageRef.current.value,
    };
    await updateDog(id, data);
    navigate("/profile");
  };

  return (
    <div className="form-edit">
    <h3>Edit Dog's Profile</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Dog's Name" ref={dogNameRef}></input>
        <input type="text" placeholder="Dog's Breed" ref={dogBreedRef}></input>
        <input type="text" placeholder="Dog's Age" ref={dogAgeRef}></input>
        <input type="text" placeholder="Tell us about yourself" ref={dogAboutRef}></input>

        <input type="text" placeholder="Dog's Gender" ref={dogGenderRef}></input>
        <input
          type="text"
          placeholder="Dog's Personality"
          ref={dogPersonalityRef}
        ></input>
        <input type="text" placeholder="URL" ref={dogImageRef}></input>
        <input className="btn" type="submit" value="Submit"></input>
      </form>{" "}
    </div>
  );
}
