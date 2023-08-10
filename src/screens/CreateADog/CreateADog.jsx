import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDog, getDogBreeds } from "../../services/dogs.js";
import "./CreateADog.css";

const CreateADog = ({ setCurrentDog, user: currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    getValues,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    console.log("CreateADog currentUser: ", currentUser);
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser]);

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

  const onSubmit = async (data) => {
    const dog = await createDog(data);
    setCurrentDog(dog);
    localStorage.setItem("currentProfile", JSON.stringify(dog));
    navigate("/profile");
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
    widget.open();
    clearErrors("image");
  };

  return (
    <div className="create-container">
      <div className="form-create">
        <h3>Create Your Dog Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Dog's Name */}
          <input
            type="text"
            placeholder="Dog's Name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="create-error-msg">Name is required.</span>
          )}

          {/* Dog's Breed */}
          <input
            type="text"
            placeholder="Dog's Breed"
            {...register("breed", {
              required: true,
              minLength: 3,
              validate: checkValidBreed,
            })}
            list="dog-breeds-list"
          />
          <datalist id="dog-breeds-list">
            {dogBreeds.map((breed) => (
              <option key={breed} value={breed} />
            ))}
          </datalist>
          {errors.breed && errors.breed.type === "required" && (
            <span className="create-error-msg">Breed is required.</span>
          )}
          {errors.breed && errors.breed.type === "minLength" && (
            <span className="create-error-msg">
              Breed should be at least 2 characters long.
            </span>
          )}
          {errors.breed && errors.breed.type === "invalidBreed" && (
            <span className="create-error-msg">"Invalid Breed"</span>
          )}

          {/* Dog's Age */}
          <input
            type="number"
            placeholder="Dog's Age"
            {...register("age", { required: true, pattern: /^[1-9][0-9]?$/ })}
            min="1"
            max="20"
          />
          {errors.age && errors.age.type === "required" && (
            <span className="create-error-msg">
              Age is required and must be a number between 1 and 20
            </span>
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
            <span className="create-error-msg">Gender is required.</span>
          )}
          {errors.gender && errors.gender.type === "pattern" && (
            <span className="create-error-msg">
              Gender must be Male or Female.
            </span>
          )}

          {/* Dog's About */}
          <label className="text-area-label">
            <textarea
              placeholder="Tell us about your dog"
              {...register("about", {
                required: true,
                minLength: 2,
                maxLength: 200,
              })}
              style={{ resize: "none", minHeight: "100px" }}
            ></textarea>
            {/* <span className="character-count">
              {watch("about")?.length || 0}/200
            </span> */}
          </label>

          {errors.about && errors.about.type === "minLength" && (
            <span className="description-error-msg">
              Description should be at least 2 * characters long.
            </span>
          )}
          {errors.about && errors.about.type === "maxLength" && (
            <span className="description-error-msg">
              Description should be no longer than 200 characters
            </span>
          )}
          {errors.about && errors.about.type === "required" && (
            <span className="description-error-msg">
              Description is required.
            </span>
          )}

          {/* Image Input */}
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
              <span className="create-img-error-msg">Image is required.</span>
            )}

            {/* Submit Btn */}
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
