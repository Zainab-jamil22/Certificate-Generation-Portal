import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('https://auth-apis.vercel.app/auth/admin-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()

            // Save JWT token to local storage
            localStorage.setItem('jwtToken', data.jwtToken)

            // Show success toast
            toast.success('Login successful! Redirecting...')

            // Wait for 2 seconds before redirecting
            setTimeout(() => {
                setLoading(false)
                navigate('/admin/dashboard')
            }, 2000)

        } catch (error) {
            // Show error toast
            toast.error('Login failed. Please try again.')

            // Reset loading state
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="relative w-full max-w-md p-10 bg-white rounded-lg shadow-xl border border-gray-300">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <FaUserAlt />
                        </div>
                        <input
                            type="email"
                            className="w-full px-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            disabled={loading}
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <FaLock />
                        </div>
                        <input
                            type="password"
                            className="w-full px-12 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminLogin
