import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Performance from "./pages/Performance";
import InjuryPrevention from "./pages/InjuryPrevention";
import Recovery from "./pages/Recovery";
import Nutrition from "./pages/Nutrition";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            AUTHENTICATION
        ===================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =====================================
            MAIN APPLICATION
        ===================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/injury-prevention"
          element={<InjuryPrevention />}
        />

        <Route
          path="/recovery"
          element={<Recovery />}
        />

        <Route
          path="/nutrition"
          element={<Nutrition />}
        />

        <Route
          path="/performance"
          element={<Performance />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =====================================
            DEFAULT
        ===================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        {/* =====================================
            UNKNOWN ROUTES
        ===================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;