import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCommunityData } from "./reducers/communityReducer";
import { setDashboardData } from "./reducers/dashboardReducer";
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
import ErrorPage from "./components/ErrorPage";
import SettingPage from "./pages/SettingPage";

function App() {
  const [web3Auth, setWeb3Auth] = useState(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
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

    initWeb3Auth();
  }, []);

  return (
    <div id="App">
      <Router>
        <Routes>
          {/* public service */}
          <Route path="/" element={<HomePage />} />
          <Route path="/community" element={<CreateTbaPage />} />

          {/* admin service */}
          <Route
            path="/authentication"
            element={<AuthPage web3Auth={web3Auth} setWeb3Auth={setWeb3Auth} />}
          />
          <Route path="/main" element={<DashboardPage />}>
            <Route path="/main/:address" element={<DashboardPage />} />
          </Route>
          <Route path="/tbalist" element={<TbaListPage />}>
            <Route path="/tbalist/:address" element={<TbaListPage />} />
          </Route>
          <Route path="/contract" element={<ContractPage />}>
            <Route path="/contract/:address" element={<ContractPage />} />
          </Route>
          <Route path="/airdrop" element={<AirdropPage web3Auth={web3Auth} />}>
            <Route
              path="/airdrop/:address"
              element={<AirdropPage web3Auth={web3Auth} />}
            />
          </Route>
          <Route path="/manager" element={<ManagerPage web3Auth={web3Auth} />}>
            <Route
              path="/manager/:address"
              element={<ManagerPage web3Auth={web3Auth} />}
            />
          </Route>
          <Route
            path="/setting"
            element={<SettingPage web3Auth={web3Auth} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
