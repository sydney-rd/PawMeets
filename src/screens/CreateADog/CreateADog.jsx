import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDog, getDogBreeds } from "../../services/dogs.js";
import DogFormFields from "../../components/DogFormFields/DogFormFields.jsx";
import "./CreateADog.css";

const CreateADog = ({ setCurrentDog, user: currentUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
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
          {/* Dog Form Input */}
          <DogFormFields
            register={register}
            errors={errors}
            dogBreeds={dogBreeds}
            isEdit={false}
            watch={watch}
          />

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
