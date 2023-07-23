import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import CreateTbaPage from "./pages/CreateTbaPage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import TbaListPage from "./pages/TbaListPage";
import ContractPage from "./pages/ContractPage";
import AirdropPage from "./pages/AirdropPage";
import ManagerPage from "./pages/ManagerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/community" element={<CreateTbaPage />} />
        <Route path="/authentication" element={<AuthPage />} />
        <Route path="/main" element={<DashboardPage />} />
        <Route path="/tbalist" element={<TbaListPage />} />
        <Route path="/contract" element={<ContractPage />} />
        <Route path="/airdrop" element={<AirdropPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
