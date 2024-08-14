import React from 'react';
import { FaUsers, FaCertificate, FaCalendarCheck, FaFileAlt } from 'react-icons/fa';

const AnalyticsPage = () => {
  // Sample data for the analytics page
  const metrics = [
    { title: 'Total Students', value: '1,200', icon: <FaUsers size={24} className="text-blue-600" /> },
    { title: 'Total Certificates Issued', value: '850', icon: <FaCertificate size={24} className="text-green-600" /> },
    { title: 'Pending Requests', value: '120', icon: <FaCalendarCheck size={24} className="text-yellow-600" /> },
    { title: 'Certificates to be Reviewed', value: '30', icon: <FaFileAlt size={24} className="text-red-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <header className=" text-black p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Students Analytics </h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
                <div className="flex-shrink-0">{metric.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{metric.title}</h3>
                  <p className="text-2xl font-bold text-gray-600">{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
