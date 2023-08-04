import { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateDog, getDog } from "../../services/dogs.js";
import "./EditDog.css";

export default function EditDog() {
  const dogNameRef = useRef();
  const dogBreedRef = useRef();
  const dogAgeRef = useRef();
  const dogAboutRef = useRef();
  const dogGenderRef = useRef();
  const dogImageRef = useRef();

  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const fetchDog = async () => {
      const dog = await getDog(id);
      dogNameRef.current.defaultValue = dog.name;
      dogBreedRef.current.defaultValue = dog.breed;
      dogAgeRef.current.defaultValue = dog.age;
      dogAboutRef.current.defaultValue = dog.about;
      dogGenderRef.current.defaultValue = dog.gender;
      setCurrentImage(dog.image); // Set the current image
    };
    fetchDog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: dogNameRef.current.value,
      breed: dogBreedRef.current.value,
      age: dogAgeRef.current.value,
      about: dogAboutRef.current.value,
      gender: dogGenderRef.current.value,
      image: currentImage, // Use the currentImage state as the image URL
    };
    await updateDog(id, data);
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <div className="form-edit">
        <h3>Edit Dog's Profile</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Dog's Name" ref={dogNameRef} />
          <input type="text" placeholder="Dog's Breed" ref={dogBreedRef} />
          <input type="text" placeholder="Dog's Age" ref={dogAgeRef} />
          <textarea
            placeholder="Tell us about yourself"
            ref={dogAboutRef}
            style={{ resize: "none" }}
          />
          <input type="text" placeholder="Dog's Gender" ref={dogGenderRef} />
          <label className="image-label" htmlFor="file-input">
            {currentImage ? (
              <img className="current-image" src={currentImage} alt="Dog" />
            ) : (
              "Change Image"
            )}
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
