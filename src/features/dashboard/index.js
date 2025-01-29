import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiSearch } from 'react-icons/fi';

const DashboardMetric = ({ title, value, data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold mb-4">{value}</p>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const Dashboard = () => {
  const metricsData = {
    registeredClients: [
      { name: 'Mon', value: 20 },
      { name: 'Tue', value: 40 },
      { name: 'Wed', value: 30 },
      { name: 'Thu', value: 50 },
      { name: 'Fri', value: 35 }
    ],
    companyP: [
      { name: 'Mon', value: 15 },
      { name: 'Tue', value: 25 },
      { name: 'Wed', value: 20 },
      { name: 'Thu', value: 35 },
      { name: 'Fri', value: 30 }
    ],
    unusedClients: [
      { name: 'Mon', value: 25 },
      { name: 'Tue', value: 35 },
      { name: 'Wed', value: 30 },
      { name: 'Thu', value: 45 },
      { name: 'Fri', value: 20 }
    ],
    assetsRelated: [
      { name: 'Mon', value: 10 },
      { name: 'Tue', value: 18 },
      { name: 'Wed', value: 22 },
      { name: 'Thu', value: 25 },
      { name: 'Fri', value: 30 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Good Afternoon, Manish</h1>
        <div className="relative w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardMetric 
          title="Total Registered Clients" 
          value="10" 
          data={metricsData.registeredClients} 
        />
        <DashboardMetric 
          title="Total Company P" 
          value="₹2,50,000" 
          data={metricsData.companyP} 
        />
        <DashboardMetric 
          title="Total Unused Registered Client" 
          value="5" 
          data={metricsData.unusedClients} 
        />
        <DashboardMetric 
          title="Total Assets Related" 
          value="₹5,00,000" 
          data={metricsData.assetsRelated} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Calendar</h3>
          {/* Calendar component would go here */}
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Common Registration Form</h3>
          {/* Registration form component would go here */}
        </div>
        
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600">Daily</button>
              <button className="px-3 py-1 rounded-lg bg-gray-100">Weekly</button>
              <button className="px-3 py-1 rounded-lg bg-gray-100">Monthly</button>
            </div>
          </div>
          {/* Activity list would go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;