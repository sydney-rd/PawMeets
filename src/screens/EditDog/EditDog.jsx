import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateDog,
  getDog,
  getDogBreeds,
  getUserDogs,
} from "../../services/dogs.js";
import DogFormFields from "../../components/DogFormFields/DogFormFields";
import "./EditDog.css";

export default function EditDog({ currentDog, setCurrentDog, setUserDogs }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchDog = async () => {
      const dog = await getDog(id);
      setCurrentImage(dog.image);
      setValue("name", dog.name);
      setValue("breed", dog.breed);
      setValue("age", dog.age);
      setValue("about", dog.about);
      setValue("gender", dog.gender);
    };
    fetchDog();
  }, [id]);

  useEffect(() => {
    getDogBreeds()
      .then((breeds) => {
        setDogBreeds(breeds);
      })
      .catch((error) => {
        console.error("Error fetching dog breeds:", error);
      });
  }, []);

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

  const onSubmit = async (data) => {
    setIsSubmitting(true); // loading state

    const updatedData = {
      ...data,
      image: currentImage,
    };
    await updateDog(id, updatedData);

    setUserDogs(await getUserDogs());

    if (currentDog && currentDog._id === id) {
      const updatedDog = { ...currentDog, ...data, image: currentImage };
      setCurrentDog(updatedDog);
      localStorage.setItem("currentProfile", JSON.stringify(updatedDog));
    }

    setIsSubmitting(false);
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <div className="form-edit">
        <h3>Edit Dog's Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DogFormFields
            register={register}
            errors={errors}
            dogBreeds={dogBreeds}
            isEdit={true}
            watch={watch}
          />

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
          />

          <input
            className="btn"
            type="submit"
            value="Submit"
            disabled={isSubmitting}
          />
          <div className="uploading-container">
            {isSubmitting && <h1 id="edit-uploading">Uploading...</h1>}
          </div>
        </form>
      </div>
    </div>
  );
}
