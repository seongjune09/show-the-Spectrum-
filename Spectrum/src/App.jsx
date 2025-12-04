import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main/main.jsx";
import PeriodicTable from "./pages/PeriodicTable/PeriodicTable.jsx";
import Callback from "./pages/Callback/Callback.jsx";
import quiz from './pages/Quiz/quiz.jsx'
import ranking from './pages/Ranking/ranking.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/PeriodicTable" element={<PeriodicTable />} />
        <Route path="/callback" element={<Callback />} />
        <Rout path="/quiz" element={<quiz />} />
        <Rout path="/ranking" element={<ranking />} />
      </Routes>
    </Router>
  );
}

export default App;