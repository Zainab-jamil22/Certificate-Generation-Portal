import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

// SVG graphics
const SvgGraphics = () => (
    <svg
        className="absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="200" cy="200" r="200" fill="#D1D5DB" opacity="0.5" />
        <circle cx="800" cy="800" r="200" fill="#D1D5DB" opacity="0.5" />
    </svg>
);

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Perform login request
            const response = await axios.post('https://auth-apis.vercel.app/auth/login', { email, password });
            // Assuming the token is in response.data.token
            const { jwtToken } = response.data;
            const { name } = response.data;
            // Save jwtToken in local storage
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('name', name);
            // Handle successful login
            toast.success('Login successful!');
            navigate('/student/dashboard');
        } catch (error) {
            // Handle login failure
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-100 flex flex-col overflow-hidden">
            {/* SVG Graphics */}
            <SvgGraphics />

            {/* Header */}
            <header className="relative bg-gradient-to-r from-blue-500 to-teal-500 py-6">
                <div className="container mx-auto text-center px-4">
                    <h1 className="text-3xl font-extrabold text-white">Certificate Generation Portal</h1>
                    <p className="text-lg text-white mt-2">Login to access your dashboard</p>
                </div>
            </header>

            {/* Login Form */}
            <div className="flex items-center justify-center flex-1 p-4 mb-16">
                <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Student Login</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaUserAlt className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                disabled={loading}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaLock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 ease-in-out ${loading ? 'bg-blue-400 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="mt-4 text-gray-600 text-xs text-end">
                        <Link to="/forgetpassword" className="text-blue-600 hover:underline font-medium ">
                            <span>Oops! Forgot Password?</span>
                        </Link>
                    </p>

                    <p className="mt-4 text-center text-gray-600">
                        <Link to="/register" className="text-blue-600 hover:underline font-medium">
                            Don’t have an account? Register here
                        </Link>
                    </p>
                </div>
            </div>
            <footer className=" bg-gradient-to-r from-blue-500 to-teal-500 py-6 mt-5 text-white text-center py-2 absolute bottom-0 w-full">
                <p className="text-sm">© 2024 Certificate Generation Portal. All rights reserved.</p>
            </footer>
            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default StudentLogin;
