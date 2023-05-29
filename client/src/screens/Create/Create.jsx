import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDog, getDogBreeds } from "../../services/dogs.js";
import "../../screens/Create/Create.css";

const Create = () => {
  const {
    register,
    handleClick,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const breeds = await getDogBreeds();
        setDogBreeds(breeds);
        console.log(breeds);
      } catch (error) {
        console.error("Failed to fetch dog breeds:", error);
      }
    };

    fetchDogBreeds();
  }, []);

  const onSubmit = async (data) => {
    console.log("onsubmit", data)
    await createDog({ ...data, image: imageUrl });
    navigate("/homepage");
  };

  const widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dhhjypuye",
      uploadPreset: "qzhbngti"
    },
    (error, res) => {
      if (!error && res && res.event === "success") {
        console.log("cloudinary result:", res.info);
        setImageUrl(res.info.url)
      }
    }
  );

  const showWidget = (widget) => {
    widget.open();
  };

  return (
    <div className="form-create">
      <h3>Create Dog Profile</h3>
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
          {...register("breed", { minLength: 2 })}
          list="breedList"
        />
        <datalist id="breedList">
          {dogBreeds.map((breed) => (
            <option key={breed._id} value={breed.name} />
          ))}
        </datalist>
        {errors.breed && errors.breed.type === "minLength" && (
          <span>Breed should be at least 2 characters long.</span>
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

        <input
          type="text"
          placeholder="Tell us about yourself"
          {...register("about", { minLength: 24 })}
        />
        {errors.about && errors.about.type === "minLength" && (
          <span>About should be at least 24 characters long.</span>
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
          type="text"
          placeholder="Dog's Personality"
          {...register("personality")}
        />

        <input
          type="button"
          value="Upload"
          onClick={() => showWidget(widget)}
          {...register("image", { required: true })}
        />
        {errors.image && <span>Image is required.</span>}

        <input className="btn" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Create;
