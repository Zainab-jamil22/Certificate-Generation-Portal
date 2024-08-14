import React, { useState } from 'react';
import { FaAward, FaEye, FaEdit } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Sample student data
const students = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    // Add more student data here
];

const StudentManagement = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [certificateTitle, setCertificateTitle] = useState('');
    const [certificateFile, setCertificateFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setCertificateFile(e.target.files[0]);
    };

    const handleIssueCertificate = () => {
        if (!certificateFile || !certificateTitle) {
            toast.error('Please fill in all fields and upload a certificate.');
            return;
        }

        // Add logic to handle certificate issuing here
        toast.success(`Certificate titled "${certificateTitle}" requested for ${selectedStudent.name}`);

        // Reset fields after issuing
        setCertificateFile(null);
        setCertificateTitle('');
        setSelectedStudent(null);
    };

    const handleAcceptRequest = () => {
        // Redirect to the custom certificate page
        navigate('/admin/certificates');
        setSelectedStudent(null);
    };

    const handleRejectRequest = () => {
        toast.error(`Certificate request for ${selectedStudent.name} has been rejected.`);
        setSelectedStudent(null);
    };

    const handleEditClick = () => {
        // Redirect to the certificates page
        navigate('/admin/certificates');
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
            <ToastContainer />

            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Certificate Requests</h1>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b">
                                    <td className="py-2 px-4 text-gray-700">{student.id}</td>
                                    <td className="py-2 px-4 text-gray-700">{student.name}</td>
                                    <td className="py-2 px-4 text-gray-700">{student.email}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => setSelectedStudent(student)}
                                            className="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                        >
                                            <FaEye />
                                            <span className="hidden md:inline">View</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {selectedStudent && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
                            <button
                                onClick={handleEditClick}
                                className="absolute top-4 right-4 text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                <FaEdit size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Details</h2>
                            <p className="text-gray-700 mb-4">Student: {selectedStudent.name}</p>
                            <p className="text-gray-700 mb-4">Email: {selectedStudent.email}</p>

                        

                            <label className="block mb-6">
                                <span className="text-gray-700 font-semibold">Upload Supporting Document</span>
                                <input
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    onChange={handleFileChange}
                                    className="block w-full mt-1 text-gray-700"
                                />
                            </label>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleRejectRequest}
                                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                                >
                                    Decline Request
                                </button>
                                <button
                                    onClick={handleIssueCertificate}
                                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                                >
                                    Issue Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentManagement;
