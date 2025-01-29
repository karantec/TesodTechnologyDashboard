import React, { useState } from 'react';
import { FaCalendar, FaUser, FaMapMarkerAlt, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', campaigns: 40, success: 28, pending: 12 },
  { name: 'Feb', campaigns: 55, success: 35, pending: 20 },
  { name: 'Mar', campaigns: 85, success: 60, pending: 25 },
  { name: 'Apr', campaigns: 65, success: 45, pending: 20 },
  { name: 'May', campaigns: 95, success: 75, pending: 20 },
  { name: 'Jun', campaigns: 75, success: 50, pending: 25 }
];

const statusData = [
  { name: 'Active', value: 45 },
  { name: 'Completed', value: 30 },
  { name: 'Pending', value: 15 },
  { name: 'Failed', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const InputGroup = ({ label, icon: Icon, type = "text", name, value, onChange, options = [], placeholder }) => (
  <div className="relative">
    <label className="block text-sm font-semibold mb-2 text-gray-700 tracking-wide">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-0 top-0 h-full flex items-center pl-4">
          <Icon className="w-5 h-5 text-blue-500" />
        </div>
      )}
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 ease-in-out pl-12"
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-gray-50 border-2 border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition-all duration-200 ease-in-out pl-12"
        />
      )}
    </div>
  </div>
);

const StatsCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
    <div className="text-sm font-semibold text-gray-600">{title}</div>
    <div className="mt-2 text-3xl font-bold text-blue-600">{value}</div>
  </div>
);

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    campaignName: '',
    campaignManager: '',
    startDate: '',
    endDate: '',
    country: '',
    state: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaChartLine className="mr-2 text-blue-500" />
            Campaign Analytics
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Campaign Trend Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Campaign Performance Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="campaigns" stroke="#0088FE" />
                    <Line type="monotone" dataKey="success" stroke="#00C49F" />
                    <Line type="monotone" dataKey="pending" stroke="#FFBB28" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Campaign Status Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4">Campaign Status Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Performance Bar Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Monthly Campaign Performance</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="campaigns" fill="#0088FE" />
                    <Bar dataKey="success" fill="#00C49F" />
                    <Bar dataKey="pending" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Daily Campaigns" value="40" />
            <StatsCard title="Weekly Campaigns" value="85" />
            <StatsCard title="Monthly Campaigns" value="350" />
            <StatsCard title="Total Campaigns" value="49" />
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            Create New Campaign
          </h3>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <InputGroup
                  label="Campaign Name"
                  icon={FaBriefcase}
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleChange}
                  placeholder="Enter campaign name"
                />

                <InputGroup
                  label="Campaign Manager"
                  icon={FaUser}
                  name="campaignManager"
                  value={formData.campaignManager}
                  onChange={handleChange}
                  placeholder="Enter manager name"
                />

                <InputGroup
                  label="Country"
                  icon={FaMapMarkerAlt}
                  type="select"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  options={[
                    { value: 'US', label: 'United States' },
                    { value: 'UK', label: 'United Kingdom' },
                    { value: 'CA', label: 'Canada' }
                  ]}
                  placeholder="Select a country"
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <InputGroup
                    label="Start Date"
                    icon={FaCalendar}
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <InputGroup
                    label="End Date"
                    icon={FaCalendar}
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <InputGroup
                  label="State"
                  icon={FaMapMarkerAlt}
                  type="select"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  options={[
                    { value: 'CA', label: 'California' },
                    { value: 'NY', label: 'New York' },
                    { value: 'TX', label: 'Texas' }
                  ]}
                  placeholder="Select a state"
                />

                <InputGroup
                  label="City"
                  icon={FaMapMarkerAlt}
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city name"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;