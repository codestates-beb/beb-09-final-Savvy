import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
import Mintingpage from "./pages/MintingPage";
import Loading from "./components/Loading";

function Content(props) {
  const location = useLocation();

  useEffect(() => {
    const patternsToShowLoading = [
      /^\/main/,
      /^\/tbalist/,
      /^\/contract/,
      /^\/manager/,
      /^\/airdrop/,
      /^\/setting/,
      /^\/mint/,
    ];

    const isMatchingPath = patternsToShowLoading.some((pattern) =>
      pattern.test(location.pathname)
    );

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
      } catch (error) {
        console.error(
          "There was a problem with the fetch operation:",
          error.message
        );
        throw error;
      }
    };

    const minimumLoadingTime = new Promise((resolve) =>
      // 최소 로딩화면 시간
      setTimeout(resolve, 500)
    );

    if (isMatchingPath) {
      console.log("Setting isLoading to true for:", location.pathname);
      props.setIsLoading(true);

      Promise.all([fetchData(), minimumLoadingTime])
        .then(() => {
          props.setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error in one of the promises:", error);
          props.setIsLoading(false);
        });
    }
  }, [location.pathname, props.setIsLoading]);

  return (
    <div style={{ position: "relative" }}>
      {props.isLoading && <Loading />}
      {props.children}
    </div>
  );
}

function App() {
  const [web3Auth, setWeb3Auth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
        <Content isLoading={isLoading} setIsLoading={setIsLoading}>
          <Routes>
            {/* public service */}
            <Route path="/" element={<HomePage />} />
            <Route path="/community" element={<CreateTbaPage />} />

            {/* admin service */}
            <Route
              path="/authentication"
              element={
                <AuthPage web3Auth={web3Auth} setWeb3Auth={setWeb3Auth} />
              }
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
            <Route
              path="/airdrop"
              element={<AirdropPage web3Auth={web3Auth} />}
            >
              <Route
                path="/airdrop/:address"
                element={<AirdropPage web3Auth={web3Auth} />}
              />
            </Route>
            <Route
              path="/manager"
              element={<ManagerPage web3Auth={web3Auth} />}
            >
              <Route
                path="/manager/:address"
                element={<ManagerPage web3Auth={web3Auth} />}
              />
            </Route>
            <Route
              path="/setting"
              element={<SettingPage web3Auth={web3Auth} />}
            />
            <Route path="/mint/" element={<Mintingpage web3Auth={web3Auth} />}>
              <Route
                path="/mint/:address"
                element={<Mintingpage web3Auth={web3Auth} />}
              />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Content>
      </Router>
    </div>
  );
}

export default App;