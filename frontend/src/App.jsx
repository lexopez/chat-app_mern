import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isUserNotNull = authUser !== null;
  console.log("user is not null", isUserNotNull);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            isUserNotNull ? (
              <Navigate to="/homepage" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/homepage"
          element={isUserNotNull ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!isUserNotNull ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isUserNotNull ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={isUserNotNull ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
