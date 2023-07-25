import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
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
  const [web3Auth, setWeb3Auth] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: `${process.env.REACT_APP_WEB3_CLIENT_ID}`,
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0xAA36A7",
            rpcTarget: `https://rpc.ankr.com/eth_sepolia`,
          },
        });

        setWeb3Auth(web3auth);
        await web3auth.initModal();
        console.log("web3Auth:", web3auth);
      } catch (error) {
        console.error("Error during web3Auth.initModal():", error);
        return;
      }
    };
    init();
  }, []);

  return (
    <div id="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CreateTbaPage />} />
          <Route
            path="/authentication"
            element={<AuthPage web3Auth={web3Auth} setWeb3Auth={setWeb3Auth} />}
          />
          <Route path="/main" element={<DashboardPage />} />
          <Route path="/tbalist" element={<TbaListPage />} />
          <Route path="/contract" element={<ContractPage />} />
          <Route path="/airdrop" element={<AirdropPage />} />
          <Route
            path="/manager"
            element={<ManagerPage web3Auth={web3Auth} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
