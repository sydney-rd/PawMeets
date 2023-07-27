// Create.js

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDog } from "../../services/dogs.js";
import "./CreateADog.css";

const CreateADog = ({ setCurrentDog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [imageUrl, setImage] = useState(""); // quotes orrrr null
  const [isImageUploaded, setIsImageUploaded] = useState(false);

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
        setImage(res.info.url);
        setIsImageUploaded(true);
      }
    }
  );

  const showWidget = (widget) => {
    setIsImageUploaded(false);
    widget.open();
  };

  return (
    <div className="create-container">
      <div className="form-create">
        <h3 className="create-title">Create Your Dog Profile</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Dog's Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>Name is required.</span>}
          <input
            type="text"
            placeholder="Dog's Breed"
            {...register("breed", { required: true, minLength: 3 })}
            list="dog-breeds-list"
          />
          <datalist id="dog-breeds-list"></datalist>
          {errors.breed && errors.breed.type === "minLength" && (
            <span>Breed should be at least 2 characters long.</span>
          )}
          {errors.breed && errors.breed.type === "required" && (
            <span>Breed is required.</span>
          )}
          <input
            type="number"
            placeholder="Dog's Age"
            {...register("age", { required: true, pattern: /^\d+$/ })}
            min="1"
            max="20"
          />
          {errors.age && errors.age.type === "required" && (
            <span>Age is required.</span>
          )}
          {errors.age && errors.age.type === "pattern" && (
            <span>Age must be a number.</span>
          )}
          <textarea
            placeholder="Tell us about your dog"
            {...register("about", { required: true, minLength: 100 })}
            style={{ resize: "none", minHeight: "100px" }} 
          />
          {errors.about && errors.about.type === "minLength" && (
            <span>Description should be at least 100 characters long.</span>
          )}
          {errors.about && errors.about.type === "required" && (
            <span>Description is required.</span>
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
            <span>Gender is required.</span>
          )}
          {errors.gender && errors.gender.type === "pattern" && (
            <span>Gender must be Male or Female.</span>
          )}
          <input
            type="button"
            value={isImageUploaded ? "Change Image" : "Upload Image"}
            onClick={() => showWidget(widget)}
          />

          <input type="hidden" {...register("image", { required: true })} />
          {errors.image && <span>Image is required.</span>}
          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default CreateADog;