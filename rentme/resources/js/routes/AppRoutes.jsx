import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth.jsx";
import Layout from "../components/Layout/Layout.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import AdminDashboardPage from "../pages/AdminDashboardPage.jsx";
import UserDashboardPage from "../pages/UserDashboardPage.jsx";
import VehicleDetailPage from "../pages/VehicleDetailPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={
          <RequireAuth role="admin">
            <AdminDashboardPage />
          </RequireAuth>
          } 
        />
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
