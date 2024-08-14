import React, { useState } from 'react';
import StudentLayout from './StudentDashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileManagement = () => {
    const [profile, setProfile] = useState({
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (profile.password !== profile.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // Replace this URL with your API endpoint
            const response = await fetch('https://auth-apis.vercel.app/auth/update-profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Include JWT token
                },
                body: JSON.stringify({
                    name: profile.fullName,
                    password: profile.password,
                })
            });

            if (!response.ok) {
                throw new Error('Profile update failed');
            }

            const data = await response.json();

            // Show success toast
            toast.success('Profile updated successfully!');

            // Reset form or handle further actions here

        } catch (error) {
            // Show error toast
            toast.error('Profile update failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout>
            <div className="min-h-screen bg-gray-100  sm:px-6">
                <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Management</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profile.fullName}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profile.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={profile.confirmPassword}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                            </div>
                            <button
                                type="submit"
                                className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </StudentLayout>
    );
};

export default ProfileManagement;
