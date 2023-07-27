import React from "react";
import "./Modal.css";

export default function Modal({ showModal, setShowModal }) {
  if (!showModal) return null;

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>It's a Match!</h2>
        <p>Both dogs have liked each other!</p>
        <button onClick={() => setShowModal(false)}>Keep swiping</button>
      </div>
    </div>
  );
}
