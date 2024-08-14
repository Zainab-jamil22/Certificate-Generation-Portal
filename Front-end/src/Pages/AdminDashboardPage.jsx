import React from 'react';
import AdminLayout from '../Components/Layout/AdminLayout';
import AdminDashboard from '../Components/Admin/AdminDashboard';


const AdminDashboardPage = () => {
    return (
        <AdminLayout>
            <AdminDashboard />
        </AdminLayout>
    );
};

export default AdminDashboardPage;
