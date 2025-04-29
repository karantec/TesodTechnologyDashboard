import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    photo: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/teams/Team");
      setTeamMembers(response.data);
    } catch (err) {
      setError("Failed to fetch team data");
    }
  };

  const handleFormSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:8000/teams/Team/${editId}`, formData);
      } else {
        await axios.post("http://localhost:8000/teams/creatTeam", formData);
      }
      resetForm();
      fetchTeamMembers();
    } catch (err) {
      setError("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/teams/Team/${id}`);
      fetchTeamMembers();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      position: item.position,
      photo: item.photo,
      category: item.category,
    });
    setEditId(item._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "marketdata");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload",
        imageData
      );
      setFormData((prev) => ({ ...prev, photo: response.data.secure_url }));
    } catch (err) {
      setError("Image upload failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: "", position: "", photo: "", category: "" });
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teamMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Team Manager</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setFormData({ name: "", position: "", photo: "", category: "" });
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow relative"
          >
            {item.photo && (
              <img
                src={item.photo}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.position}</p>
            <p className="text-gray-500">{item.category}</p>
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {teamMembers.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl transform transition-all duration-500 ease-in-out scale-100 opacity-100">
            <h2 className="text-xl font-semibold text-center mb-4">
              {isEditMode ? "Edit Team Member" : "Add Team Member"}
            </h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-3 p-2 border rounded"
            />
            {formData.photo && (
              <img
                src={formData.photo}
                alt="preview"
                className="w-full h-32 object-cover rounded mb-3"
              />
            )}
            <div className="flex justify-between">
              <button
                onClick={handleFormSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center min-w-[100px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTeam;
