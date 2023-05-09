import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createDog } from "../../services/dogs.js";
import '../../screens/Create/Create.css'


export default function Create() {
  const dogNameRef = useRef();
  const dogBreedRef = useRef();
  const dogAgeRef = useRef();
  const dogAboutRef = useRef();
  const dogGenderRef = useRef();
  const dogPersonalityRef = useRef();
  const dogImageRef = useRef();
  const navigate = useNavigate();

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
    await createDog(data);
    navigate("/homepage");
  };
  return (
    <div className="form-create">
      <h3>Create Dog Profile</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Dog's Name" ref={dogNameRef}></input>

        <input type="text" placeholder="Dog's Breed" ref={dogBreedRef}></input>
        <input type="text" placeholder="Dog's Age" ref={dogAgeRef}></input>
        <input
          type="text"
          placeholder="Tell us about yourself"
          ref={dogAboutRef}></input>

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
