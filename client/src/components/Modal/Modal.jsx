import React from "react";
import "./Modal.css";

export default function Modal({ showModal, setShowModal, dog }) {
  if (!showModal) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>You and {dog.name} are a Match!</h2>
        <img className="modal-dog-img" src={dog.image} alt={dog.name} />
        <button className="close-btn" onClick={() => setShowModal(false)}>
          Keep swiping
        </button>
      </div>
    </div>
  );
}
