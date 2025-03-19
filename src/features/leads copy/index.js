import React, { useEffect, useState } from "react";
import axios from "axios";

const FinanceAccounting = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingJob, setEditingJob] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const jobsPerPage = 5;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://framedigitalbackend.onrender.com/job/job");
      setJobs(response.data);
    } catch (err) {
      setError("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`https://framedigitalbackend.onrender.com/job/job/${jobId}`);
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const openEditModal = (job) => {
    setEditingJob({ ...job, keySkills: job.keySkills.join(", "), keyResponsibilities: job.keyResponsibilities.join("\n") });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditingJob({ ...editingJob, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      const updatedJob = {
        ...editingJob,
        keySkills: editingJob.keySkills.split(",").map((skill) => skill.trim()),
        keyResponsibilities: editingJob.keyResponsibilities.split("\n").map((resp) => resp.trim()),
      };

      await axios.put(`https://framedigitalbackend.onrender.com/job/job/${editingJob._id}`, updatedJob);
      setJobs(jobs.map((job) => (job._id === editingJob._id ? updatedJob : job)));
      setEditModal(false);
    } catch (err) {
      alert("Failed to update job");
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="py-4 bg-gray-50 flex flex-col items-center justify-center">
      {isLoading && <p>Loading jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-7xl">
        <h3 className="text-lg font-semibold mb-4 text-center">Create Jobs</h3>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Job Title</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Employment Type</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Key Skills</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Responsibilities</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Apply</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentJobs.map((job) => (
                <tr key={job._id} className="border-b border-gray-300">
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{job.jobTitle}</td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{job.employmentType}</td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{job.keySkills.join(", ")}</td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">
                    <ul className="list-disc ml-4">
                      {job.keyResponsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">
                    <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Apply Here
                    </a>
                  </td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">
                    <div className="flex space-x-4">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => openEditModal(job)}>
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteJob(job._id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-100 rounded-md">Page {currentPage} of {totalPages}</span>
          <button className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && editingJob && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Job</h3>
            {["jobTitle", "employmentType", "applyLink"].map((field) => (
              <input key={field} className="w-full p-2 border rounded mb-2" name={field} value={editingJob[field]} onChange={handleEditChange} placeholder={field} />
            ))}
            <textarea className="w-full p-2 border rounded mb-2" name="keySkills" value={editingJob.keySkills} onChange={handleEditChange} placeholder="Key Skills (comma-separated)" />
            <textarea className="w-full p-2 border rounded mb-2" name="keyResponsibilities" value={editingJob.keyResponsibilities} onChange={handleEditChange} placeholder="Responsibilities (one per line)" />
            <div className="flex justify-end space-x-4">
              <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={saveEdit}>Save</button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceAccounting;
