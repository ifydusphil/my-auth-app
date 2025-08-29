import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuthStore from "./store/authStore";
import ProtectedRoute from "./routes/ProtectedRoute";

// Page imports (we’ll create these soon)
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  // When the app starts, check if user is already logged in (localStorage)
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected route (needs login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback (if someone types unknown URL, send them to Sign In) */}
        <Route path="*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
