import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    address: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("submittedData");
    if (savedData) {
      setSubmittedData(JSON.parse(savedData));
    }
  }, []);
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

  const handleEdit = (index) => {
    setEditedIndex(index);
    setFormData(submittedData[index]);
  };
  const handleSubmit1 = (e) => {
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

  const handleSave = (index) => {
    const updatedData = submittedData.map((data, dataIndex) =>
      dataIndex === index ? formData : data
    );
    setSubmittedData(updatedData);
    localStorage.setItem("submittedData", JSON.stringify(updatedData));
    setEditedIndex(null);
    toast.success("Data updated successfully!", { position: "top-center" });
  };

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
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
        <button onClick={openModalToAdd}>+Add</button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>{isEditing ? "Edit Details" : "Add Details"}</h2>
            <form onSubmit={handleSubmit1}>
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
      {submittedData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.map((data, index) => (
              <tr key={index}>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange(e, "firstName")}
                    />
                  ) : (
                    data.firstName
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange(e, "lastName")}
                    />
                  ) : (
                    data.lastName
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleChange(e, "fatherName")}
                    />
                  ) : (
                    data.fatherName
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={formData.motherName}
                      onChange={(e) => handleChange(e, "motherName")}
                    />
                  ) : (
                    data.motherName
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleChange(e, "address")}
                    />
                  ) : (
                    data.address
                  )}
                </td>
                <td>
                  <div className="buttons">
                    {editedIndex === index ? (
                      <button onClick={() => handleSave(index)}>Save</button>
                    ) : (
                      <>
                        <EditIcon onClick={() => handleEdit(index)} />
                        <DeleteIcon onClick={() => handleDelete(index)} />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No data available. Please add something.</h1>
      )}
      <ToastContainer />
    </>
  );
};

export default Form;
