import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import detectEthereumProvider from "@metamask/detect-provider";

const MainHeader = () => {
  const initialState = { accounts: [], chainId: "", ethBalance: "" };
  const [wallet, setWallet] = useState(initialState);

  // 새로고침 시, wallet 정보 다시 받아오는 useEffect
  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        setWallet({ accounts });
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      console.log("chainId", chainId);
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  // Connect Wallet 버튼 클릭 시, MetaMask 연결
  const handleConnectWallet = async () => {
    const provider = await detectEthereumProvider();

    const startApp = async (provider) => {
      if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
      }

      const accounts = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
      if (!accounts) {
        return;
      }
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      const ethBalance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      setWallet({ accounts, chainId, ethBalance });
    };

    if (provider) {
      console.log("Ethereum successfully detected!");
      startApp(provider);
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const connectWalletStyles = {
    fontFamily: "'tektur', sans-serif",
    fontSize: "10px",
    fontWeight: "800",
    marginLeft: "-135px",
    marginTop: "24px",
    border: "2px solid #576ff6",
    borderRadius: "20px",
    width: "129px",
    height: "40px",
  };

  const loginButtonStyles = {
    backgroundColor: "#fff",
    color: "#000",
    marginTop: "23px",
    marginLeft: "8px",
    marginRight: "-1px",
    fontFamily: "'tektur', sans-serif",
    fontSize: "10px",
    fontWeight: "800",
    borderRadius: "20px",
    width: "80px",
    height: "40px",
    transition: "background-color 0.5s, color 0.5s",
    "&:hover": {
      backgroundColor: "#576ff6",
      color: "#fff",
    },
  };

  const location = useLocation();

  const getAppBarPosition = () => {
    if (location.pathname === "/") {
      return "fixed";
    } else {
      return "relative";
    }
  };

  return (
    <AppBar
      position={getAppBarPosition()}
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        boxShadow: "none",
        height: "85px",
      }}
    >
      <Toolbar>
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Logo"
            style={{
              width: "90px",
              height: "auto",
              marginTop: "25px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Link>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to="/community">
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  marginLeft: "-244px",
                  border: "2px solid #576ff6",
                  borderRadius: "20px",
                  width: "95px",
                  height: "40px",
                  backgroundColor: "#000",
                  color: "#fff",
                  marginTop: "24px",
                  fontSize: "10px",
                  fontFamily: "'tektur', sans-serif",
                  fontWeight: "800",
                  transition: "background-color 0.5s, color 0.5s",
                  "&:hover": {
                    backgroundColor: "#000",
                    color: "#576ff6",
                  },
                }}
              >
                Create TBA
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                marginTop: "24px",
                fontFamily: "'tektur', sans-serif",
                fontWeight: "800",
                fontSize: "10px",
                transition: "background-color 0.5s, color 0.5s",
                ...connectWalletStyles,
                "&:hover": {
                  backgroundColor: "#000",
                  color: "#576ff6",
                },
              }}
              onClick={handleConnectWallet}
            >
              {wallet.accounts.length > 0
                ? `${wallet.accounts[0].substring(0, 8)}...`
                : "Connect Wallet"}
            </Button>
          </Grid>
          <Grid item>
            <a href="http://localhost:3000/authentication">
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={loginButtonStyles}
              >
                Log in
              </Button>
            </a>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
