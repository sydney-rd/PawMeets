import { Link } from "react-router-dom";
import React from "react";
import "./DogHomePage.css";

export default function DogHomePage({ dog, handleDislikeBtnClick, handleLikeClick }) {
  if (!dog) return <h1>Loading...</h1>
  return (
    <div className="dog-container">
      <h1 className="home-page-dog-name">{dog.user?.username} owns {dog.name}</h1>
      <div className="dog-image-container">
        <Link to={`/dogs/${dog._id}`}>
          <img className="homepage-dog-image" src={dog.image} alt={dog.name} />
        </Link>
        <div className="homepage-button-container">
          <button className="dislike-button" onClick={handleDislikeBtnClick}>
            BARK
          </button>
          <button className="like-button" onClick={handleLikeClick}>
            BONE
          </button>
        </div>
      </div>
      <div className="homepage-description">
        <p>
          {dog.name} the {dog.breed}. {dog.gender}, {dog.age} years young
        </p>
        <p>{dog.about}</p>
        <div className="homepage-personality-container">
          <p className="homepage-personality-button">{dog.personality[0]}</p>
          <p className="homepage-personality-button">{dog.personality[1]}</p>
          <p className="homepage-personality-button">{dog.personality[2]}</p>
          <p className="homepage-personality-button">{dog.personality[3]}</p>
        </div>
      </div>
    </div>
  );
}