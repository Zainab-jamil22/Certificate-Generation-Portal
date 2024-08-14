import React from 'react';
import img from '../../assets/adminimg.jpg';

const AdminDashboard = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-4xl text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Welcome to the Admin Dashboard</h1>
                <img
                    src={img}
                    alt="Dashboard Overview"
                    className="hidden md:block w-full md:w-72 max-w-md h-auto mx-auto mb-6 rounded-lg shadow-md"
                />
                <p className="text-gray-800 text-base md:text-lg mb-4">
                    This is your central hub for managing the certificate generation process. Use the sidebar to navigate through various sections including managing students, certificates, and viewing analytics.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;
