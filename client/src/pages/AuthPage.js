import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import Login from "../components/Login.js";
import Signup from "../components/Signup.js";
import ethersRPC from "../ethersRPC.js";
import { getPublicCompressed } from "@toruslabs/eccrypto";

// api
import { postLogin } from "../api/post-login.js";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);
  const [provider, setProvider] = useState(null);

  const web3Auth = new Web3Auth({
    clientId: `${process.env.REACT_APP_WEB3_CLIENT_ID}`,
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0xAA36A7", // 0x1(mainet)
      rpcTarget: `https://rpc.ankr.com/eth_sepolia`, // https://rpc.ankr.com/eth(mainet)
    },
  });

  useEffect(() => {
    const init = async () => {
      await web3Auth.initModal();
    };
    init();
  });

  useEffect(() => {
    const login = async () => {
      if (isLogin) {
        const rpc = new ethersRPC(provider);
        const address = await rpc.getAddress();
        const balance = await rpc.getBalance();
        const chainId = await rpc.getChainId();
        const userInfo = await web3Auth.getUserInfo();
        const { email, name, profileImage, idToken } = userInfo;
        localStorage.setItem("token", idToken);
        const app_scoped_privkey = await web3Auth.provider?.request({
          method: "eth_private_key", // use "private_key" for other non-evm chains
        });
        const app_pub_key = getPublicCompressed(
          Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")
        ).toString("hex");

        const result = await postLogin(
          address,
          balance,
          chainId,
          email,
          name,
          profileImage,
          app_pub_key
        );
        return result;
      }
    };
    login();
  }, [isLogin]);

  const handleLogin = async () => {
    const web3AuthProvider = await web3Auth.connect();
    setProvider(web3AuthProvider);
    setIsLogin(true);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      const result = await web3Auth.logout();
      setIsLogin(false);
      setProvider(result);
    } catch (error) {
      console.log(error);
      console.log("web3auth not initialized yet");
      return;
    }
  };

  return (
    <div>
      <h1>Hello from Auth Page</h1>
      <div>{`${isLogin}`}</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <Login />
      <Signup />
    </div>
  );
}
