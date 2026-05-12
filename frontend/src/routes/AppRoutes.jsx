import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//////////////////////////////////////////////////////
// PUBLIC PAGES
//////////////////////////////////////////////////////
import Home from "../pages/Home";

import Login from "../pages/Auth/Login";

import Register from "../pages/Auth/Register";

//////////////////////////////////////////////////////
// ADMIN PAGES
//////////////////////////////////////////////////////
import Dashboard from "../pages/Dashboard/Dashboard";

import Templates from "../pages/Dashboard/Templates";

import CreateTemplate from "../pages/Dashboard/CreateTemplate";

import CreateCertificate from "../pages/Dashboard/CreateCertificate";

import AuditLogs from "../pages/Dashboard/AuditLogs";

import BulkUpload from "../pages/Dashboard/BulkUpload";

//////////////////////////////////////////////////////
// STUDENT PAGES
//////////////////////////////////////////////////////
import StudentDashboard from "../pages/Student/StudentDashboard";

//////////////////////////////////////////////////////
// VERIFY
//////////////////////////////////////////////////////
import Verify from "../pages/Verify/Verify";

import VerifyBox from "../components/VerifyBox";

//////////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////////
import ProtectedRoute from "./ProtectedRoute";

import RoleRoute from "./RoleRoute";

//////////////////////////////////////////////////////
// FALLBACK PAGE
//////////////////////////////////////////////////////
function Unauthorized() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

      <div className="text-center">

        <h1 className="text-6xl font-black text-red-500">
          403
        </h1>

        <p className="text-2xl mt-4">
          Unauthorized Access
        </p>

      </div>

    </div>
  );
}

//////////////////////////////////////////////////////
// APP ROUTES
//////////////////////////////////////////////////////
export default function AppRoutes() {

  return (
    <BrowserRouter>

      <Routes>

        //////////////////////////////////////////////////////
        // PUBLIC ROUTES
        //////////////////////////////////////////////////////
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        //////////////////////////////////////////////////////
        // PUBLIC VERIFICATION
        //////////////////////////////////////////////////////
        <Route
          path="/verify"
          element={<VerifyBox />}
        />

        <Route
          path="/verify/:id"
          element={<Verify />}
        />

        //////////////////////////////////////////////////////
        // ADMIN DASHBOARD
        //////////////////////////////////////////////////////
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "admin",
                ]}
              >

                <Dashboard />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // TEMPLATES
        //////////////////////////////////////////////////////
        <Route
          path="/templates"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "admin",
                  "manager",
                ]}
              >

                <Templates />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // CREATE TEMPLATE
        //////////////////////////////////////////////////////
        <Route
          path="/templates/create"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "admin",
                ]}
              >

                <CreateTemplate />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // CREATE CERTIFICATE
        //////////////////////////////////////////////////////
        <Route
          path="/certificates/create"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "admin",
                  "manager",
                ]}
              >

                <CreateCertificate />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // BULK UPLOAD
        //////////////////////////////////////////////////////
        <Route
          path="/dashboard/bulk"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "admin",
                  "manager",
                ]}
              >

                <BulkUpload />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // AUDIT LOGS
        //////////////////////////////////////////////////////
        <Route
          path="/audit"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "admin",
                ]}
              >

                <AuditLogs />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // STUDENT DASHBOARD
        //////////////////////////////////////////////////////
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "student",
                ]}
              >

                <StudentDashboard />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // MANAGER DASHBOARD
        //////////////////////////////////////////////////////
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute>

              <RoleRoute
                roles={[
                  "manager",
                ]}
              >

                <Dashboard />

              </RoleRoute>

            </ProtectedRoute>
          }
        />

        //////////////////////////////////////////////////////
        // ADMIN REDIRECT
        //////////////////////////////////////////////////////
        <Route
          path="/admin"
          element={
            <Navigate
              to="/dashboard"
            />
          }
        />

        //////////////////////////////////////////////////////
        // MANAGER REDIRECT
        //////////////////////////////////////////////////////
        <Route
          path="/manager"
          element={
            <Navigate
              to="/manager/dashboard"
            />
          }
        />

        //////////////////////////////////////////////////////
        // STUDENT REDIRECT
        //////////////////////////////////////////////////////
        <Route
          path="/student"
          element={
            <Navigate
              to="/student/dashboard"
            />
          }
        />

        //////////////////////////////////////////////////////
        // UNAUTHORIZED
        //////////////////////////////////////////////////////
        <Route
          path="/unauthorized"
          element={<Unauthorized />}
        />

        //////////////////////////////////////////////////////
        // 404
        //////////////////////////////////////////////////////
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">

              <div className="text-center">

                <h1 className="text-7xl font-black">
                  404
                </h1>

                <p className="text-2xl mt-4 text-gray-400">
                  Page Not Found
                </p>

              </div>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}