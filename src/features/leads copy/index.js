import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinanceAccounting = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jewelleryapp-2.onrender.com/auth/users');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">User Management Board</h2>

      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-7xl">
        <h3 className="text-lg font-semibold mb-4">List of Users</h3>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Profile</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Phone</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Address</th>
                <th className="border border-gray-300 py-3 px-4 text-left text-sm font-medium text-gray-600">Date Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-300">
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">
                    <img src={user.profileImage} alt={user.name} className="w-12 h-12 rounded-full" />
                  </td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{user.name}</td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{user.email}</td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{user.phone}</td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">
                    {user.addresses.map((address) => (
                      <div key={address._id} className="mb-2">
                        <strong>{address.type}:</strong> {address.address}, {address.pinCode}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-300 py-3 px-4 text-sm text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceAccounting;
