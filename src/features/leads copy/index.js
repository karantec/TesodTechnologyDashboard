import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const paymentData = [
  { name: 'Days', value: 2347 },
  { name: 'Weeks', value: 35469 },
  { name: 'Months', value: 120175 }
];

const renewalData = [
  { name: '30 Days', value: 150275 },
  { name: '60 Days', value: 295035 }
];

const FinanceAccounting = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Finance & Accounts</h2>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Financial Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#0088FE" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Customer Payment Scale</h3>
            <ul className="text-gray-700">
              {paymentData.map((item, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{item.name}'s Payment:</span> {item.value.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Upcoming Renewals</h3>
            <ul className="text-gray-700">
              {renewalData.map((item, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{item.name}:</span> {item.value.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceAccounting;
