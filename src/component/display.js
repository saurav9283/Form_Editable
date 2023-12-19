import React, { useState, useEffect } from "react";
import "./display.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const FormDataDisplay = () => {
  const location = useLocation();
  const initialFormData = location.state?.formData;
  const [formData, setFormData] = useState(initialFormData);
  const [showModal, setShowModal] = useState(false);
  const [editedFormData, setEditedFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setEditedFormData(initialFormData || {});
  }, [initialFormData]);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setFormData(editedFormData);
    setShowModal(false);
    toast.success("Changes saved successfully!", {
      duration: 4000,
      position: "top-center",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setFormData({});
    toast.info("Form data deleted!", {
      duration: 4000,
      position: "top-center",
    });
    navigate("/");
  };
  return (
    <div className="display-container">
      <h2>Submitted Details</h2>
      <div>
        <div>
          <p>
            <strong>First Name:</strong> {formData.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {formData.lastName}
          </p>
          <p>
            <strong>Father's Name:</strong> {formData.fatherName}
          </p>
          <p>
            <strong>Mother's Name:</strong> {formData.motherName}
          </p>
          <p>
            <strong>Address:</strong> {formData.address}
          </p>
          <div className="buttons">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Edit Details</h2>
            <form>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={editedFormData.firstName || formData.firstName}
                onChange={handleChange}
              />
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={editedFormData.lastName || formData.lastName}
                onChange={handleChange}
              />
              <label>Father's Name:</label>
              <input
                type="text"
                name="fatherName"
                value={editedFormData.fatherName || formData.fatherName}
                onChange={handleChange}
              />
              <label>Mother's Name:</label>
              <input
                type="text"
                name="motherName"
                value={editedFormData.motherName || formData.motherName}
                onChange={handleChange}
              />
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={editedFormData.address || formData.address}
                onChange={handleChange}
              />
              <button type="button" onClick={handleSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FormDataDisplay;
