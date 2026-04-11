import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Templates from "../pages/Dashboard/Templates";
import CreateTemplate from "../pages/Dashboard/CreateTemplate";
import CreateCertificate from "../pages/Dashboard/CreateCertificate";
import VerifyBox from "../components/VerifyBox";

import AuditLogs from "../pages/Dashboard/AuditLogs";
import Verify from "../pages/Verify/Verify";

import BulkUpload from "../pages/Dashboard/BulkUpload";


import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/templates" element={<ProtectedRoute><Templates/></ProtectedRoute>} />
        <Route path="/templates/create" element={<ProtectedRoute><CreateTemplate/></ProtectedRoute>} />
        <Route path="/certificates/create" element={<ProtectedRoute><CreateCertificate/></ProtectedRoute>} />
        <Route path="/verify" element={<VerifyBox />} />
       
        <Route path="/audit" element={<ProtectedRoute><AuditLogs/></ProtectedRoute>} />
        <Route
  path="/dashboard/bulk"
  element={<ProtectedRoute><BulkUpload /></ProtectedRoute>}
/>
         <Route path="/verify/:id" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}