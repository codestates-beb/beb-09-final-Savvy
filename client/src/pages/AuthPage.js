import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
import Login from "../components/Login.js";
import ethersRPC from "../ethersRPC.js";
import { getPublicCompressed } from "@toruslabs/eccrypto";

// api
import { postLogin } from "../api/post-login.js";
import { getAdminCommunity } from "../api/get-admin-community.js";

export default function AuthPage({ web3Auth, setWeb3Auth }) {
  const [isLogin, setIsLogin] = useState(false);
  const [provider, setProvider] = useState(null);
  const [screenSize, setScreenSize] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const initLogin = async () => {
      console.log("isLogin:", isLogin);
      if (isLogin) {
        const rpc = new ethersRPC(provider);
        const address = await rpc.getAddress();
        const balance = await rpc.getBalance();
        const chainId = await rpc.getChainId();
        const userInfo = await web3Auth.getUserInfo();
        const { email, name, profileImage, idToken } = userInfo;
        localStorage.setItem("token", idToken);
        const app_scoped_privkey = await web3Auth.provider?.request({
          method: "eth_private_key",
        });
        const app_pub_key = getPublicCompressed(
          Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")
        ).toString("hex");
        localStorage.setItem("app_pub_key", app_pub_key);

        const result = await postLogin(
          address,
          balance,
          chainId,
          email,
          name,
          profileImage,
          app_pub_key
        );

        if (result) {
          const community = await getAdminCommunity();
          if (community) {
            navigate(`/main/${community[0].address}`);
          } else {
            navigate("/main");
          }
        }
      }
    };
    initLogin();
  }, [isLogin]);

  const handleLogin = async () => {
    if (!web3Auth) {
      console.error("web3Auth not initialized yet");
      return;
    }
    const web3AuthProvider = await web3Auth.connect();
    setProvider(web3AuthProvider);
    setIsLogin(true);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token", "app_pub_key");
      const result = await web3Auth.logout();
      setIsLogin(false);
      setProvider(result);
    } catch (error) {
      console.log(error);
      console.log("web3auth not initialized yet");
      return;
    }
  };

  const authPageStyle = {
    backgroundColor: "white",
    position: "relative",
  };

  const welcomeTextStyle = {
    position: "absolute",
    top: "440px",
    left: "260px",
    transform: "translate(-50%, -50%)",
    fontSize: "40px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
  };

  const descriptionTextStyle = {
    position: "absolute",
    top: "485px",
    left: "260px",
    transform: "translate(-50%, -50%)",
    fontSize: "16px",
    color: "#919091",
    whiteSpace: "nowrap",
  };

  const buttonStyle = {
    position: "absolute",
    top: "560px",
    width: "300px",
    height: "50px",
    background: "linear-gradient(to right, #576ff6, #a534b7, #d36ae4)",
    transform: "translate(-50%, -50%)",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    fontFamily: "'tektur', sans-serif",
    color: "white",
    borderRadius: "10px",
    cursor: "pointer",
    zIndex: 1,
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    top: "65%",
    display: "none",
    left: "500px",
  };

  const imageStyle = {
    position: "absolute",
    top: "660px",
    left: "290px",
    transform: "translate(-50%, -50%)",
    width: "440px",
    height: "auto",
  };

  useEffect(() => {
    const handleScreenSizeChange = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) {
        setScreenSize("extra-small");
      } else if (screenWidth <= 768) {
        setScreenSize("small");
      } else {
        setScreenSize("");
      }
    };

    const smallScreenQuery = window.matchMedia("(max-width: 768px)");
    const smallerScreenQuery = window.matchMedia("(max-width: 480px)");

    smallScreenQuery.addListener(handleScreenSizeChange);
    smallerScreenQuery.addListener(handleScreenSizeChange);

    handleScreenSizeChange();

    return () => {
      smallScreenQuery.removeListener(handleScreenSizeChange);
      smallerScreenQuery.removeListener(handleScreenSizeChange);
    };
  }, []);

  return (
    <div style={authPageStyle}>
      <div
        style={{
          ...welcomeTextStyle,
          left: screenSize === "small" ? "250px" : "460px",
        }}
      >
        Welcome back 👋🏻
      </div>
      <div
        style={{
          ...descriptionTextStyle,
          left: screenSize === "small" ? "250px" : "460px",
        }}
      >
        Log in and experience the new service
      </div>
      <button
        onClick={handleLogin}
        style={{
          ...buttonStyle,
          left: screenSize === "small" ? "250px" : "460px",
        }}
      >
        <span className="login-button">Log in</span>
      </button>
      <button
        onClick={handleLogout}
        style={{
          ...logoutButtonStyle,
        }}
      >
        Logout
      </button>
      <img
        src="/loginImage.png"
        alt="Login Image"
        style={{
          ...imageStyle,
          left: screenSize === "small" ? "278px" : "488px",
        }}
      />
      <Login />
    </div>
  );
}
