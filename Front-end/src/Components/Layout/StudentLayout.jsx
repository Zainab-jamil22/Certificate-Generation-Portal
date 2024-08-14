import React from 'react';
import StudentLayout from '../Students/StudentDashboard';
import img from '../../assets/adminimg.jpg';
import { FaUser, FaCertificate, FaCogs } from 'react-icons/fa';
import logo from '../../assets/logo.png'


const StudentDashboard = () => {
    const name = localStorage.getItem('name')
    return (
        <StudentLayout>
            <div className="flex flex-col bg-gradient-to-r  py-12 px-6 sm:px-8 lg:px-12">
                <div className="flex-1 max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
                    <div className="relative">
                        <img
                            src={img}
                            alt="Dashboard"
                            className="w-56 mt-3 mx-auto object-cover rounded-t-lg shadow-md"
                        />
                        <div className="px-8 py-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Dashboard <span className='text-blue-600'>{name}</span></h2>
                            <p className="text-md text-gray-700 mb-8">
                                Manage your profile, view your certificates, and access all the features you need from this centralized dashboard. Use the navigation links below to explore different sections.
                            </p>
                            <div className="flex justify-around mb-6">
                                <div className="flex flex-col items-center">
                                    <FaUser className="text-4xl text-blue-600 mb-2" />
                                    <span className="text-lg font-medium text-gray-800">Profile</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FaCertificate className="text-4xl text-blue-600 mb-2" />
                                    <span className="text-lg font-medium text-gray-800">Certificates</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FaCogs className="text-4xl text-blue-600 mb-2" />
                                    <span className="text-lg font-medium text-gray-800">Update Profile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
};

export default StudentDashboard;
