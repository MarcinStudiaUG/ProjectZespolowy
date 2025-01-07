import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community/:communityId" element={<CommunityPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;