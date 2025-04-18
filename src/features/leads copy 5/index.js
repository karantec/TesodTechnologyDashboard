import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCrousel = () => {
  const [crouselItems, setCrouselItems] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchCrouselItems();
  }, []);

  const fetchCrouselItems = async () => {
    try {
      const response = await axios.get('https://tesodtechnologyfinal.onrender.com/crousel');
      setCrouselItems(response.data);
    } catch (err) {
      setError('Failed to fetch carousel data');
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put(`https://tesodtechnologyfinal.onrender.com/crousel/${editId}`, formData);
      } else {
        await axios.post('https://tesodtechnologyfinal.onrender.com/crousel/create', formData);
      }
      resetForm();
      fetchCrouselItems();
    } catch (err) {
      setError('Failed to submit form');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tesodtechnologyfinal.onrender.com/crousel/${id}`);
      fetchCrouselItems();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
    });
    setEditId(item._id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'marketdata');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload', imageData);
      setFormData((prev) => ({ ...prev, image: response.data.secure_url }));
    } catch (err) {
      setError('Image upload failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', image: '' });
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditId(null);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = crouselItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(crouselItems.length / itemsPerPage);

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Carousel Manager</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditMode(false);
            setFormData({ title: '', description: '', image: '' });
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Add Carousel Item
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow relative">
            {item.image && (
              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-md mb-3" />
            )}
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
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
      {crouselItems.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
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
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-semibold text-center mb-4">
              {isEditMode ? 'Edit Carousel Item' : 'Add Carousel Item'}
            </h2>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-3 p-2 border rounded"
            />
            {formData.image && (
              <img src={formData.image} alt="preview" className="w-full h-32 object-cover rounded mb-3" />
            )}
            <div className="flex justify-between">
              <button onClick={handleFormSubmit} className="bg-green-600 text-white px-4 py-2 rounded-lg">
                {isEditMode ? 'Update' : 'Submit'}
              </button>
              <button onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCrousel;
