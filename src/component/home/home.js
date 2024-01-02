import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  const openModalToAdd = () => {
    setIsEditing(false);
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedSubmittedData = submittedData.map((data, index) =>
        index === editedIndex ? formData : data
      );
      setSubmittedData(updatedSubmittedData);
      localStorage.setItem("submittedData", JSON.stringify(updatedSubmittedData));
      toast.success("Data updated successfully!", { position: "top-center" });
    } else {
      const updatedSubmittedData = [...submittedData, formData];
      setSubmittedData(updatedSubmittedData);
      localStorage.setItem("submittedData", JSON.stringify(updatedSubmittedData));
      toast.success("Data added successfully!", { position: "top-center" });
    }
    setShowModal(false);
    setFormData({
      firstName: "",
      lastName: "",
      fatherName: "",
      motherName: "",
      address: "",
    });
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditedIndex(index);
    setFormData(submittedData[index]);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedSubmittedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedSubmittedData);
    localStorage.setItem("submittedData", JSON.stringify(updatedSubmittedData));
    toast.info("Data deleted!", { position: "top-center" });
  };

  return (
    <>
    <div className="add">
      <button onClick={openModalToAdd} >+Add</button>
    </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>{isEditing ? "Edit Details" : "Add Details"}</h2>
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
          </div>
        </div>
      )}
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
      <ToastContainer />
    </>
  );
};

export default Form;

