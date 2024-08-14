import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

// SVG graphics
export const SvgGraphics = () => (
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

const StudentRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // Basic Validation
        if (!name || !email || !password || !confirmPassword) {
            toast.error('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Invalid email address.');
            return;
        }
        if (password.length < 4) {
            toast.error('Password must be at least 4 characters.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                name,
                email,
                password
            };

            await axios.post('https://auth-apis.vercel.app/auth/signup', payload);

            toast.success('Registration successful!');
            setTimeout(() => {
                navigate('/'); // Redirect after success
            }, 2000); // Delay redirect to allow toast to show
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
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
                    <p className="text-lg text-white mt-2">Register to create a new account</p>
                </div>
            </header>

            {/* Register Form */}
            <div className="flex items-center justify-center flex-1 p-4 mb-20">
                <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Student Register</h2>
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaUserAlt className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
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
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <FaLock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 ease-in-out ${loading ? 'bg-blue-400 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">
                        <Link to="/" className="text-blue-600 hover:underline font-medium">
                            Already have an account? Login here
                        </Link>
                    </p>
                </div>
            </div>
            <footer className="bg-gradient-to-r from-blue-500 to-teal-500 py-6 mt-5 text-white text-center py-2 absolute bottom-0 w-full">
                <p className="text-sm">© 2024 Certificate Generation Portal. All rights reserved.</p>
            </footer>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default StudentRegister;
