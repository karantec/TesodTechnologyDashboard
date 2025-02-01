import React, { useEffect, useState } from 'react';

// Mock user data (simulating a MongoDB model response)
const mockUserData = [
  { name: 'Alice Johnson', email: 'alice@example.com', createdAt: '2023-05-10' },
  { name: 'Bob Smith', email: 'bob@example.com', createdAt: '2023-06-15' },
  { name: 'Charlie Brown', email: 'charlie@example.com', createdAt: '2023-07-20' },
  { name: 'Dana White', email: 'dana@example.com', createdAt: '2023-08-05' },
  { name: 'Eve Green', email: 'eve@example.com', createdAt: '2023-09-12' },
];

const FinanceAccounting = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch user data
    setUsers(mockUserData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management Board</h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">List of Users</h3>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{user.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-800">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAccounting;
