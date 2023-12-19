// Form.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
  });

  const [submittedData, setSubmittedData] = useState([]);
  const navigate = useNavigate();

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
    navigate("/display", { state: { formData: formData } });
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
          <ul>
            {submittedData.map((data, index) => (
              <li key={index}>
                <strong>First Name:</strong> {data.firstName}, &nbsp;
                <strong>Last Name:</strong> {data.lastName}, &nbsp;
                <strong>Father's Name:</strong> {data.fatherName}, &nbsp;
                <strong>Mother's Name:</strong> {data.motherName}, &nbsp;
                <strong>Address:</strong> {data.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Form;
