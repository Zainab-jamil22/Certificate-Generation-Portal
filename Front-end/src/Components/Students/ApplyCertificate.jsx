import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplyCertificate = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            course: '',
            dateOfCompletion: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            course: Yup.string().required('Course name is required'),
            dateOfCompletion: Yup.date().required('Date of completion is required'),
        }),
        onSubmit: (values) => {
            // Simulate form submission
            setTimeout(() => {
                console.log('Form data:', values);
                toast.success('Certificate application submitted successfully!');
            }, 500); // Simulating network request delay
        },
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Apply for Certificate</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-sm">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="course" className="block text-gray-700 text-sm font-semibold mb-2">Course Name</label>
                        <input
                            id="course"
                            name="course"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('course')}
                        />
                        {formik.touched.course && formik.errors.course ? (
                            <div className="text-red-500 text-sm">{formik.errors.course}</div>
                        ) : null}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dateOfCompletion" className="block text-gray-700 text-sm font-semibold mb-2">Date of Completion</label>
                        <input
                            id="dateOfCompletion"
                            name="dateOfCompletion"
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            {...formik.getFieldProps('dateOfCompletion')}
                        />
                        {formik.touched.dateOfCompletion && formik.errors.dateOfCompletion ? (
                            <div className="text-red-500 text-sm">{formik.errors.dateOfCompletion}</div>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Apply
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ApplyCertificate;
