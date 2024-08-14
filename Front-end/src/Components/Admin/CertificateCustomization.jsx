import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import { FaBrush, FaClosedCaptioning, FaTimes } from 'react-icons/fa';
import { FaDoorClosed } from 'react-icons/fa6';
import sylani from '../../assets/logo.png'
Modal.setAppElement('#root'); // Set the root element for accessibility

const CertificateCustomization = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [title, setTitle] = useState('Certificate of Achievement');
    const [date, setDate] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const certificateRef = useRef(null);

    const handleCustomize = (e) => {
        e.preventDefault();
        setModalIsOpen(false); // Close the modal after customization
    };

    const handleDownload = () => {
        if (!name || !course || !date) {
            toast.error('Please fill in all details');
            return;
        }

        const element = certificateRef.current;

        if (element) {
            html2canvas(element, {
                scale: 2, // Increase scale for higher resolution
                backgroundColor: null // Use transparent background if needed
            }).then((canvas) => {
                const dataURL = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dataURL;
                link.download = 'certificate.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen relative">
            <h1 className="text-3xl font-bold mb-8 text-center">Certificate Customization</h1>

            {/* Brush Icon to Open Modal */}
            <button
                onClick={() => setModalIsOpen(true)}
                className="absolute top-4 right-4 bg-teal-900 text-white p-2 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300"
                title="Customize Certificate"
            >
                <FaBrush size={24} />
            </button>

            {/* Certificate Display */}
            <div
                ref={certificateRef}
                className="mt-12 max-w-4xl mx-auto p-8 bg-white border-8 border-gray-300 rounded-lg shadow-xl relative"
                style={{ backgroundColor: color }}
            >
                {/* Top Decorative Elements */}
                <svg
                    className="absolute top-0 left-0 w-full h-24 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="1"
                        d="M0,64L30,96C60,128,120,192,180,186.7C240,181,300,107,360,101.3C420,96,480,160,540,202.7C600,245,660,267,720,245.3C780,224,840,160,900,144C960,128,1020,160,1080,186.7C1140,213,1200,235,1260,213.3C1320,192,1380,128,1410,96L1440,64Z"
                    />
                </svg>

                {/* Bottom Decorative Elements */}
                <svg
                    className="absolute bottom-0 left-0 w-full h-24 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="currentColor"
                        fillOpacity="1"
                        d="M0,256L30,245.3C60,235,120,213,180,186.7C240,160,300,128,360,133.3C420,139,480,181,540,181.3C600,181,660,139,720,122.7C780,107,840,117,900,133.3C960,149,1020,171,1080,186.7C1140,203,1200,213,1260,213.3C1320,213,1380,203,1410,197.3L1440,192Z"
                    />
                </svg>

                {/* Corner Decorations */}
                <svg
                    className="absolute top-0 left-0 w-16 h-16 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="currentColor"
                        d="M0,0L100,0L0,100H0Z"
                    />
                </svg>
                <svg
                    className="absolute top-0 right-0 w-16 h-16 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="currentColor"
                        d="M0,0L100,0L100,100H0Z"
                    />
                </svg>
                <svg
                    className="absolute bottom-0 left-0 w-16 h-16 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="currentColor"
                        d="M0,100L100,100L0,0H0Z"
                    />
                </svg>
                <svg
                    className="absolute bottom-0 right-0 w-16 h-16 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                >
                    <path
                        fill="currentColor"
                        d="M100,100L0,100L100,0H100Z"
                    />
                </svg>

                <div className="text-center mt-20 mb-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
                    <p className="text-xl font-medium mb-4">This is to certify that</p>
                    <p className="text-3xl font-bold mb-4">{name}</p>
                    <p className="text-xl mb-4">has successfully completed the course</p>
                    <p className="text-2xl font-semibold mb-6">{course}</p>
                    <p className="text-lg mt-4">{date}</p>
                    <img src={sylani} alt="Signature" className="w-32 mx-auto mt-6" />
                </div>
            </div>

            <button
                onClick={handleDownload}
                className="w-full mt-8 bg-teal-900 text-white py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Download Certificate as PNG
            </button>

            {/* Modal for Customization Form */}
            <Modal
                isOpen={modalIsOpen}
                closeTimeoutMS={200}
                
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Certificate Customization"
                className="fixed inset-0  mx-auto flex items-center justify-center z-50"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto relative">
                    <div className="flex items-center justify-between gap-28">
                        <h2 className="text-2xl font-bold mb-2">Customize Your Certificate</h2>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="bg-gray-200 p-2 rounded-full transition-transform transform hover:scale-105 focus:outline-none"
                            title="Close"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleCustomize}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Student Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Course Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1">Background Color</label>
                            <input
                                type="color"
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-teal-900 text-white py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-300"
                            >
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <ToastContainer />
        </div>
    );
};

export default CertificateCustomization;
