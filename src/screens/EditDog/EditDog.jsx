import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { updateDog, getDog, getDogBreeds } from "../../services/dogs.js";
import "./EditDog.css";

export default function EditDog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aboutText, setAboutText] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [dogBreeds, setDogBreeds] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      setAboutText(dog.about);
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

  const checkValidBreed = (value) => {
    if (!dogBreeds.includes(value)) {
      console.log("Invalid breed detected:", value);
      return "invalidBreed";
    }
    return true;
  };

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

  const handleAboutChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 200) {
      setAboutText(inputText);
    }
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      image: currentImage,
    };
    await updateDog(id, updatedData);
    navigate("/profile");
  };

  return (
    <div className="edit-container">
      <div className="form-edit">
        <h3>Edit Dog's Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dog's Name */}
          <input
            type="text"
            placeholder="Dog's Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="edit-error-msg">Name is required.</span>
          )}

          {/* Dog's Breed WORK IN PROGRESS */}
          <input
            type="text"
            placeholder="Dog's Breed"
            {...register("breed", {
              // required: true,
              minLength: 3,
              // validate: checkValidBreed,
            })}
            // list="dog-breeds-list"
          />
          {/* <datalist id="dog-breeds-list">
            {dogBreeds.map((breed) => (
              <option key={breed} value={breed} />
            ))}
          </datalist> */}
          {/* {errors.breed && (
            <span className="error-msg">Breed is required.</span>
          )} */}
          {errors.breed && errors.breed.type === "minLength" && (
            <span className="edit-error-msg">
              Breed should be at least 2 characters long.
            </span>
          )}
          {/* {errors.breed && errors.breed.type === "invalidBreed" && (
            <span className="error-msg">Invalid breed.</span>
          )} */}

          {/* Dog's Age */}
          <input
            className="age-container"
            type="number"
            placeholder="Dog's Age"
            {...register("age", { required: true, pattern: /^\d+$/ })}
            min="1"
            max="20"
          />
          {errors.age && (
            <span className="edit-error-msg">
              Age must be a number between 1 and 20.
            </span>
          )}
          {errors.age && errors.age.type === "pattern" && (
            <span className="edit-error-msg">Age must be a number.</span>
          )}

          {/* Dog's Gender */}
          <input
            type="text"
            placeholder="Dog's Gender"
            {...register("gender", {
              required: true,
              pattern: /^(Male|Female)$/i,
            })}
          />
          {errors.gender && errors.gender.type === "required" && (
            <span className="edit-error-msg">Gender is required.</span>
          )}
          {errors.gender && (
            <span className="edit-error-msg">
              Gender must be Male or Female.
            </span>
          )}

          {/* Dog's About */}
          <label className="text-area-label">
            <textarea
              placeholder="Tell us about yourself"
              {...register("about", {
                required: true,
                minLength: 2,
                maxLength: 200,
              })}
              onChange={handleAboutChange}
              value={aboutText}
            />
            <span className="character-count">{aboutText.length || 0}/200</span>
          </label>
          {errors.about && errors.about.type === "minLength" && (
            <span className="edit-error-msg">
              Description should be at least 2 * characters long.
            </span>
          )}
          {errors.about && errors.about.type === "maxLength" && (
            <span className="edit-error-msg">
              Description should be no longer than 200 characters
            </span>
          )}
          {errors.about && (
            <span className="edit-error-msg">About is required.</span>
          )}

          {/* Image Input */}
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

          {/* Submit Button */}
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
