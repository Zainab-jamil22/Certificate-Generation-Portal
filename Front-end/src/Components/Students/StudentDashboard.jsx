import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCertificate, FaBars, FaTimes, FaPlusCircle, FaBell, FaUserCircle, FaHome, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png'
const StudentLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const notificationsRef = useRef(null);
    const [notifications] = useState([
        'Certificate Request Approved',
        'Certificate Request Rejected',
    ]);

    // Dummy user data

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleNotifications = () => setNotificationsVisible(!notificationsVisible);

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setNotificationsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-md transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-300 text-black">
                    <Link  className="font-semibold"><img className='logo-styling' src={logo} alt="" /></Link>
                    <button onClick={toggleSidebar} className="md:hidden">
                        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <nav className="mt-4">
                    <Link to="/student/dashboard" className="flex items-center p-4 text-gray-700 hover:bg-blue-50 transition-colors">
                        <FaHome size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Home</span>
                    </Link>
                    <Link to="/student/profile" className="flex items-center p-4 text-gray-700 hover:bg-blue-50 transition-colors">
                        <FaUser size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Update Profile</span>
                    </Link>
                    <Link to="/student/apply-certificate" className="flex items-center p-4 text-gray-700 hover:bg-blue-50 transition-colors">
                        <FaPlusCircle size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Apply for Certificate</span>
                    </Link>
                    <Link to="/student/certificates" className="flex items-center p-4 text-gray-700 hover:bg-blue-50 transition-colors">
                        <FaCertificate size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Certificates</span>
                    </Link>
                    <Link to="/" className="flex items-center p-4 text-gray-700 hover:bg-blue-50 transition-colors">
                        <FaSignOutAlt size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Log Out</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300 ease-in-out md:ml-64`}>
                {/* Header */}
                <header className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold">Student Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={toggleNotifications} className="relative">
                            <FaBell size={24} />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-3 h-3 flex items-center justify-center">3</span>
                        </button>
                        {notificationsVisible && (
                            <div
                                ref={notificationsRef}
                                className="absolute right-4 top-16 w-80 bg-white border border-gray-300 shadow-xl rounded-lg z-10 transition-transform transform opacity-100"
                            >
                                <div className="flex items-center p-4 text-lg font-bold text-white bg-gradient-to-r bg-blue-400 rounded-t-lg">
                                    <FaBell className="mr-2 text-white" />
                                    Notifications
                                </div>
                                <ul className="max-h-60 overflow-y-auto">
                                    {notifications.map((notification, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-200 text-gray-800 transition-colors duration-150"
                                        >
                                            <FaBell className="mr-3 text-blue-600" />
                                            {notification}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="flex items-center space-x-4">
                            <FaUserCircle size={24} />
                        </div>
                        <button onClick={toggleSidebar} className="md:hidden">
                            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    {children}
                </main>

                <footer className="bg-blue-800 text-white py-6">
                    <div className="container mx-auto text-center">
                        <p className="text-sm">&copy; 2024 Certificate Generation Portal. <br /> All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default StudentLayout;
