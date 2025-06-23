import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddResident from "./components/AddResident";
import ResidentList from "./components/ResidentList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <nav className="mb-6 flex gap-4">
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl">
            Add Resident
          </Link>
          <Link to="/residents" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl">
            View Residents
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<AddResident />} />
          <Route path="/residents" element={<ResidentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
