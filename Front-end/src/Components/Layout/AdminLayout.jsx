import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCertificate, FaChartLine, FaBell, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import logo from '../../assets/logo.png'
const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const navigate = useNavigate();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleNotifications = () => setNotificationsVisible(!notificationsVisible);

    const handleNotificationClick = (notification) => {
        setSelectedNotification(notification);
        setNotificationsVisible(false); // Close notifications dropdown
    };

    const handleIssueCertificate = () => {
        // Redirect to the students page
        navigate('/admin/students');
        setSelectedNotification(null); // Close the modal
    };

    const notifications = [
        { id: 1, type: 'approved', message: 'James requested a certificate.' },
        { id: 2, type: 'approved', message: 'Ali requested a certificate.' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-200">
            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 shadow-lg transform transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <h1 className=" font-bold text-gray-800 logo-styling"><img src={logo} alt="" /></h1>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-600">
                        <FaTimes size={24} />
                    </button>
                </div>
                <nav className="mt-4">
                    <Link to="/admin/dashboard" className="flex items-center p-4 text-gray-800 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <FaHome size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Home</span>
                    </Link>
                    <Link to="/admin/students" className="flex items-center p-4 text-gray-800 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <FaUser size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Students Request</span>
                    </Link>
                    <Link to="/admin/certificates" className="flex items-center p-4 text-gray-800 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <FaCertificate size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Certificates</span>
                    </Link>
                    <Link to="/admin/analytics" className="flex items-center p-4 text-gray-800 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <FaChartLine size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Analytics</span>
                    </Link>
                    <Link to="/" className="flex items-center p-4 text-gray-800 hover:bg-gray-200 hover:text-blue-600 transition-colors">
                        <FaSignOutAlt size={20} className="mr-3 text-blue-600" />
                        <span className="font-medium">Log Out</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
                {/* Header */}
                <header className="bg-gradient-to-r from-blue-800 to-blue-500 text-white p-4 flex items-center justify-between shadow-md">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                    <div className="flex items-center space-x-4">
                        <button className="relative text-white hover:text-gray-300" onClick={toggleNotifications}>
                            <FaBell size={20} />
                            {notifications.length > 0 && (
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
                            )}
                        </button>
                        <button onClick={toggleSidebar} className="md:hidden text-white">
                            <FaBars size={24} />
                        </button>
                    </div>
                </header>

                {/* Notifications Dropdown */}
                {notificationsVisible && (
                    <div className="absolute top-16 right-4 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10 transition-transform transform opacity-100">
                        <div className="p-4 text-lg font-bold text-gray-800 bg-gray-100 border-b border-gray-300 rounded-t-lg">
                            Notifications
                        </div>
                        <ul className="max-h-60 overflow-y-auto">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    onClick={() => handleNotificationClick(notification)}
                                    className={`flex items-center p-4 border-b border-gray-200 text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors ${notification.type === 'approved' ? 'bg-green-50' : 'bg-red-50'}`}
                                >
                                    <div className={`w-3 h-3 rounded-full mr-3 ${notification.type === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {notification.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Notification Detail Modal */}
                {selectedNotification && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Notification Details</h2>
                            <p className="text-gray-700 mb-4">{selectedNotification.message}</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedNotification(null)}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleIssueCertificate}
                                    className="bg-blue-600 text-white py-2 px-4 rounded"
                                >
                                    Issue Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content */}
                <main className="flex-1 p-6 bg-gray-100">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="bg-gradient-to-r from-blue-800 to-blue-500 text-white p-4 text-center shadow-inner">
                    &copy; 2024 Certificate Generation Portal
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
