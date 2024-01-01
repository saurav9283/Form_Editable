import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
  });
  const [editedFormData, setEditedFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const navigate = useNavigate();
  const [editedIndex, setEditedIndex] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("submittedData");
    if (savedData) {
      setSubmittedData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSave = () => {
    const updatedFormData = { ...formData, ...editedFormData };
    const updatedSubmittedData = submittedData.map((data, index) =>
      index === editedIndex ? updatedFormData : data
    );

    localStorage.setItem("submittedData", JSON.stringify(updatedSubmittedData));
    setSubmittedData(updatedSubmittedData);
    setFormData(updatedFormData);
    setShowModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
    toast.success("Changes saved successfully!", {
      duration: 4000,
      position: "top-center",
    });
  };

  const handleCloseModal = () => {
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSubmittedData = [...submittedData, formData];
    localStorage.setItem("submittedData", JSON.stringify(updatedSubmittedData));
    setSubmittedData(updatedSubmittedData);
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
    // navigate("/display", { state: { formData: formData } });
  };

  const handleEdit = (index) => {
    setEditedFormData({});
    setFormData(submittedData[index]);
    setShowModal(true);
    setEditedIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSubmittedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedSubmittedData);
    localStorage.setItem("submittedData", JSON.stringify(updatedSubmittedData));
    toast.info("Form data deleted!", {
      duration: 4000,
      position: "top-center",
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            required
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            required
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fatherName">Father's Name</label>
          <input
            required
            type="text"
            id="fatherName"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="motherName">Mother's Name</label>
          <input
            required
            type="text"
            id="motherName"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            required
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div className="submitted-data-container">
        <h2>Submitted Data</h2>
        {submittedData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Father's Name</th>
                <th>Mother's Name</th>
                <th>Address</th>
                <th>Handle Change</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.fatherName}</td>
                  <td>{data.motherName}</td>
                  <td>{data.address}</td>
                  <td>
                    <div className="buttons">
                      <button
                        onClick={() => handleEdit(index)}
                        className="edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data submitted yet.</p>
        )}
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

export default Form;
