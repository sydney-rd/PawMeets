import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { updateDog, getDog } from "../../services/dogs.js";
import "./EditDog.css";

export default function EditDog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(null);
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
          {errors.name && <span className="error-msg">Name is required.</span>}

          {/* Dog's Breed */}
          <input
            type="text"
            placeholder="Dog's Breed"
            {...register("breed", { required: true })}
          />
          {errors.breed && (
            <span className="error-msg">Breed is required.</span>
          )}

          {/* Dog's Age */}
          <input
            type="number"
            placeholder="Dog's Age"
            {...register("age", { required: true, min: 1, max: 20 })}
          />
          {errors.age && (
            <span className="error-msg">
              Age must be a number between 1 and 20.
            </span>
          )}

          {/* Dog's About */}
          <textarea
            placeholder="Tell us about yourself"
            {...register("about", { required: true })}
            style={{ resize: "none" }}
          />
          {errors.about && (
            <span className="error-msg">About is required.</span>
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
          {errors.gender && (
            <span className="error-msg">Gender must be Male or Female.</span>
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
