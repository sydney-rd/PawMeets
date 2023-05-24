import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createDog } from "../../services/dogs.js";
import "../../screens/Create/Create.css";

export default function Create() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await createDog(data);
    navigate("/homepage");
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
        />
        {errors.breed && errors.breed.type === "minLength" && (
          <span>Breed should be at least 2 characters long.</span>
        )}

        <input
          type="number"
          placeholder="Dog's Age"
          {...register("age", { required: true, pattern: /^\d+$/})}
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
          {...register("gender", { required: true, pattern: /^(Male|Female)$/i })}
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

        <input type="text" placeholder="URL" {...register("image")} />

        <input className="btn" type="submit" value="Submit" />
      </form>
    </div>
  );
}
