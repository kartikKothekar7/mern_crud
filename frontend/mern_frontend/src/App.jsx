import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./Notes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar/>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected route (we’ll enforce protection next) */}
      <Route path="/" element={<Notes />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </div>
  );
};

export default App;
