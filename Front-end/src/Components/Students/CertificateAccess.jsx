import React from 'react';
import { FaDownload } from 'react-icons/fa';
import StudentLayout from './StudentDashboard';

const CertificateAccess = () => {
    const certificates = [
        { id: 1, name: 'Course 1', date: '2024-07-01', imageUrl: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Course 2', date: '2024-07-15', imageUrl: 'https://via.placeholder.com/150' },
    ];

    return (
        <StudentLayout>
            <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Certificates</h2>
                        <div className="space-y-4">
                            {certificates.map((certificate) => (
                                <div
                                    key={certificate.id}
                                    className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center space-x-4 mb-4">
                                        <img
                                            src={certificate.imageUrl}
                                            alt={certificate.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold text-gray-800">{certificate.name}</h3>
                                            <span className="text-gray-600 text-sm">{certificate.date}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                                        onClick={() => {
                                            // Handle certificate download logic
                                            alert(`Downloading certificate for ${certificate.name}`);
                                        }}
                                    >
                                        <FaDownload className="w-5 h-5 mr-2" />
                                        <span>Download Certificate</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default CertificateAccess;
