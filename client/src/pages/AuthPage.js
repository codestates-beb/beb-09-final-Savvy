import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";

import Login from "../components/Login.js";
import Signup from "../components/Signup.js";

import ethersRPC from "../ethersRPC.js";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [provider, setProvider] = useState(null);

  const web3Auth = new Web3Auth({
    clientId: `${process.env.REACT_APP_WEB3_CLIENT_ID}`,
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x1",
      rpcTarget: "https://rpc.ankr.com/eth",
    },
  });

  useEffect(() => {
    const init = async () => {
      await web3Auth.initModal();
    };
    init();
  });

  const handleLogin = async () => {
    const web3AuthProvider = await web3Auth.connect();
    setProvider(web3AuthProvider);
    setIsLogin(true);
  };

  const handleUserInfo = async () => {
    const result = await web3Auth.getUserInfo();
    console.log(result);
  };

  const handleLogout = async () => {
    const result = await web3Auth.logout();
    console.log(result);
    console.log("logout");
    setIsLogin(false);
  };

  const handleAuthentication = async () => {
    const result = await web3Auth.authenticateUser();
    console.log(result);
    setProvider(result);
  };

  //   const getBalance = async () => {
  //     const rpc = await ethersRPC(provider);
  //     console.log(rpc);
  //     const result = rpc.getBalance();
  //     console.log(result);
  //   };

  return (
    <div>
      <h1>Hello from Auth Page</h1>
      <div>{`${isLogin}`}</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleUserInfo}>getUserInfo</button>
      <button onClick={handleAuthentication}>getAuthentication</button>
      {/* <button onClick={getBalance}>Balance</button> */}
      <button onClick={handleLogout}>Logout</button>
      <Login />
      <Signup />
    </div>
  );
}
