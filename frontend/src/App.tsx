import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, Dashboard, Login, Signup, NotFound } from "./Sections/Section";
import ProtectedRoute from "./Components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Non Registered User */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {/* Registered User */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
