import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentLoginPage from './Pages/StudentLoginPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import StudentRegister from './Components/Auth/StudentRegister';
import AdminDashboard from './Components/Admin/AdminDashboard';
import StudentDashboardPage from './Pages/StudentDashboardPage';
import ProfileManagement from './Components/Students/ProfileManagement';
import CertificateAccess from './Components/Students/CertificateAccess';
import AdminLayout from './Components/Layout/AdminLayout';
import AnalyticsPage from './Pages/AnalyticsPage';
import StudentManagement from './Components/Admin/StudentManagement';
import CertificateCustomization from './Components/Admin/CertificateCustomization';
import ApplyCertificatePage from './Pages/ApplyCertificatePage';
import Forgetpassword from './Components/Auth/forgetpassword';

const App = () => {

  const [pageloader, setpageloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setpageloader(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (pageloader) {
    return <><div className="loader-container"><div className="loader"></div></div></>;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AdminLoginPage />} />
        {/* <Route path="/admin" element={<AdminLoginPage />} /> */}
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/forgetpassword" element={<Forgetpassword />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="certificates" element={<CertificateCustomization />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/student/profile" element={<ProfileManagement />} />
        <Route path="/student/certificates" element={<CertificateAccess />} />
        <Route path="/student/apply-certificate" element={<ApplyCertificatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
