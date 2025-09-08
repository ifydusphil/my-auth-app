import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ Import toaster provider
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./routes/ProtectedRoute";

// ✅ Import all pages
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // ✅ Run once when the app starts: restore user/token from localStorage
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <>
      {/* ✅ Toaster provider: enables toast notifications globally */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* ✅ Router setup for navigating between pages */}
      <BrowserRouter>
        <Routes>
          {/* ---------- Public routes ---------- */}
          <Route path="/signup" element={<SignUp />} /> {/* Sign Up page */}
          <Route path="/signin" element={<SignIn />} /> {/* Sign In page */}
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot password page */}
          <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Reset password with token */}
          <Route path="/verify-email/:token" element={<VerifyEmail />} /> {/* Email verification */}

          {/* ---------- Protected routes ---------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {/* Dashboard is wrapped in ProtectedRoute (requires login) */}
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------- Fallback route ---------- */}
          {/* If user enters an unknown URL, send them to Sign In */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;