import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCategoriesPage = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [formData, setFormData] = useState({ name: '', position: '', photo: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const teamsPerPage = 6;

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('https://framedigitalbackend.onrender.com/teams/Team');
      setTeams(response.data);
    } catch (err) {
      setError('Failed to fetch teams');
    }
  };

  const handleAddTeam = async () => {
    try {
      await axios.post('https://framedigitalbackend.onrender.com/teams/creatTeam', formData);
      setIsAddModalOpen(false);
      setFormData({ name: '', position: '', photo: '' });
      fetchTeams();
    } catch (err) {
      setError('Failed to add team member');
    }
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      position: team.position,
      photo: team.photo
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://framedigitalbackend.onrender.com/teams/Team/${id}`);
      setTeams(teams.filter(team => team._id !== id));
    } catch (err) {
      setError('Failed to delete team member');
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://framedigitalbackend.onrender.com/teams/Team/${selectedTeam._id}`, formData);
      setSelectedTeam(null);
      fetchTeams();
    } catch (err) {
      setError('Failed to update team member');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', 'marketdata');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/de4ks8mkh/image/upload', imageData);
      setFormData((prev) => ({ ...prev, photo: response.data.secure_url }));
    } catch (err) {
      setError('Image upload failed');
    }
  };

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);
  const totalPages = Math.ceil(teams.length / teamsPerPage);

  return (
    <div className="p-2 min-h-screen">
      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

      <h2 className="text-3xl font-bold text-black mt-12 mb-6 text-center">Team Members</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
        >
          Add Team Member
        </button>
      </div>

      {/* Display Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {currentTeams.map((team) => (
          <div key={team._id} className="bg-white p-6 rounded-lg shadow-xl">
            <img src={team.photo} alt={team.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 text-center">{team.name}</h2>
            <p className="text-center text-gray-600">{team.position}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => handleEdit(team)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</button>
              <button onClick={() => handleDelete(team._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Team Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-center mb-4">Add Team Member</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Name"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Position"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg mb-4"
            />
            {formData.photo && <img src={formData.photo} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-4" />}
            <div className="flex justify-between">
              <button onClick={handleAddTeam} className="bg-green-500 text-white px-4 py-2 rounded-lg">Add</button>
              <button onClick={() => setIsAddModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCategoriesPage;
