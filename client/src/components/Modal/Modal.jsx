import React from "react";
import "./Modal.css";

export default function Modal({ showModal, setShowModal, dog, currentDog }) {
  if (!showModal) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-title">
          {currentDog.name} and {dog.name} are a Match!
        </h2>
        <div className="images-container">
          <img className="modal-dog-img" src={dog.image} alt={dog.name} />
          <img
            className="modal-dog-img"
            src={currentDog.image}
            alt={currentDog.name}
          />
        </div>
        <button className="close-btn" onClick={() => setShowModal(false)}>
          Keep swiping ♡
        </button>
      </div>
    </div>
  );
}
