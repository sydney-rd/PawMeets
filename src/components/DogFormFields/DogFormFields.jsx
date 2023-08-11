import React from "react";

const DogFormFields = ({ register, errors, dogBreeds, isEdit }) => {
  const checkValidBreed = (value) => {
    if (!dogBreeds.includes(value)) {
      return "invalidBreed";
    }
    return undefined;
  };

  return (
    <>
      <input
        type="text"
        placeholder="Dog's Name"
        {...register("name", { required: true })}
      />
      {errors.name && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Name is required.
        </span>
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
      {errors.breed && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Please select a breed from the list.
        </span>
      )}
      {errors.breed && errors.breed.type === "minLength" && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Breed should be at least 2 characters long.
        </span>
      )}

      {/* Dog's Age */}
      <input
        className="age-container"
        type="number"
        placeholder="Dog's Age"
        {...register("age", { required: true, pattern: /^[1-9][0-9]?$/ })}
        min="1"
        max="20"
      />
      {errors.age && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Age is required.
        </span>
      )}
      {errors.age && errors.age.type === "pattern" && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Age must be a number between 1 and 20.
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
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Gender is required.
        </span>
      )}
      {errors.gender && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
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
        ></textarea>
      </label>
      {errors.about && errors.about.type === "minLength" && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Description should be at least 2 characters long.
        </span>
      )}
      {errors.about && errors.about.type === "maxLength" && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          Description should be no longer than 200 characters.
        </span>
      )}
      {errors.about && (
        <span className={`${isEdit ? "edit" : "create"}-error-msg`}>
          About is required.
        </span>
      )}
    </>
  );
};

export default DogFormFields;
