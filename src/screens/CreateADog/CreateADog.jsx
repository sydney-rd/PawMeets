import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDog, getDogBreeds } from "../../services/dogs.js";
import "./CreateADog.css";

const CreateADog = ({ setCurrentDog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    getDogBreeds()
      .then((breeds) => {
        setDogBreeds(breeds);
      })
      .catch((error) => {
        console.error("Error fetching dog breeds:", error);
      });
  }, []);

  const onSubmit = async (data) => {
    const dog = await createDog(data);
    setCurrentDog(dog);
    localStorage.setItem("currentProfile", JSON.stringify(dog));
    navigate("/homepage");
  };

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dhhjypuye",
      uploadPreset: "qzhbngti",
    },
    (error, res) => {
      if (!error && res && res.event === "success") {
        setValue("image", res.info.url);
        setIsImageUploaded(true);
      }
    }
  );

  const showWidget = (widget) => {
    setIsImageUploaded(false);
    widget.open();
  };

  const handleAboutChange = (event) => {
    const inputText = event.target.value;
    if (inputText.length <= 300) {
      setAboutText(inputText);
    }
  };

  const handleBreedSelect = (event) => {
    setSelectedBreed(event.target.value);
  };

  return (
    <div className="create-container">
      <div className="form-create">
        <h3>Create Your Dog Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Dog's Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="error-msg">Name is required.</span>}
          <div className="custom-dropdown">
            <select value={selectedBreed} onChange={handleBreedSelect} required>
              <option value="" disabled hidden>
                Select Breed
              </option>
              {dogBreeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>{" "}
          {errors.breed && errors.breed.type === "minLength" && (
            <span className="error-msg">
              Breed should be at least 2 characters long.
            </span>
          )}
          {errors.breed && errors.breed.type === "required" && (
            <span className="error-msg">Breed is required.</span>
          )}
          <input
            type="number"
            placeholder="Dog's Age"
            {...register("age", { required: true, pattern: /^\d+$/ })}
            min="1"
            max="20"
          />
          {errors.age && errors.age.type === "required" && (
            <span className="error-msg">Age is required.</span>
          )}
          {errors.age && errors.age.type === "pattern" && (
            <span className="error-msg">Age must be a number.</span>
          )}
          <input
            type="text"
            placeholder="Dog's Gender"
            {...register("gender", {
              required: true,
              pattern: /^(Male|Female)$/i,
            })}
          />
          {errors.gender && errors.gender.type === "required" && (
            <span className="error-msg">Gender is required.</span>
          )}
          {errors.gender && errors.gender.type === "pattern" && (
            <span className="error-msg">Gender must be Male or Female.</span>
          )}
          <label className="text-area-label">
            <textarea
              placeholder="Tell us about your dog"
              {...register("about", {
                required: true,
                minLength: 100,
                maxLength: 250,
              })}
              onChange={handleAboutChange}
              value={aboutText}
              style={{ resize: "none", minHeight: "100px" }}
            />
            <span className="character-count">{aboutText.length || 0}/250</span>
          </label>
          {errors.about && errors.about.type === "minLength" && (
            <span className="error-msg">
              Description should be at least 100 characters long.
            </span>
          )}
          {errors.about && errors.about.type === "maxLength" && (
            <span className="error-msg">
              Description should be no longer than 250 characters
            </span>
          )}
          {errors.about && errors.about.type === "required" && (
            <span className="error-msg">Description is required.</span>
          )}
          <div className="btn-container">
            <button
              type="button"
              className="image-btn"
              onClick={() => showWidget(widget)}
            >
              {isImageUploaded ? "Change Image" : "Upload Image"}
            </button>
            <input type="hidden" {...register("image", { required: true })} />
            {errors.image && (
              <span className="error-msg">Image is required.</span>
            )}
            <button type="submit" className="create-submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateADog;
