import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCategoriesPage = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editTeam, setEditTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const teamsPerPage = 6;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://framedigitalbackend.onrender.com/teams/Team');
        setTeams(response.data);
      } catch (err) {
        setError('Failed to fetch teams');
      }
    };

    fetchTeams();
  }, []);

  const handleEdit = (team) => {
    setEditTeam(team);
    setName(team.name);
    setPosition(team.position);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://framedigitalbackend.onrender.com/teams/Team/${id}`);
      setTeams(teams.filter(team => team._id !== id));
    } catch (err) {
      setError('Failed to delete team member');
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://framedigitalbackend.onrender.com/teams/Team/${editTeam._id}`, { name, position });
      setTeams(teams.map(team => (team._id === editTeam._id ? response.data : team)));
      setShowModal(false);
    } catch (err) {
      setError('Failed to update team member');
    }
  };

  // Pagination logic
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);
  const totalPages = Math.ceil(teams.length / teamsPerPage);

  return (
    <div className="p-6 min-h-screen">
      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}

      {/* Display Team Members */}
      <h2 className="text-3xl font-bold text-blue-900 mt-12 mb-6 text-center">Team Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {currentTeams.map((team) => (
          <div key={team._id} className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 transform hover:scale-105 transition duration-300 relative">
            <img src={team.photo} alt={team.name} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
            <h2 className="text-xl font-semibold text-gray-800 text-center">{team.name}</h2>
            <p className="text-center text-gray-600">{team.position}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => handleEdit(team)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Edit</button>
              <button onClick={() => handleDelete(team._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Edit Team Member</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Name"
            />
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="Position"
            />
            <div className="flex justify-between">
              <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCategoriesPage;