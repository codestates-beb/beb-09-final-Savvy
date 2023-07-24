import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

  const handleLogoClick = () => {
    window.location.href = "http://localhost:3000";
  };

  const handleCreateTBAClick = () => {
    if (window.location.href.includes("community")) {
      return;
    }
    window.location.href = "http://localhost:3000/community";
  };

  const isCreateTBAActive = window.location.href.includes("community");

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

  const connectWalletStyles = isCreateTBAActive
    ? {
        fontFamily: "Dongle",
        marginLeft: "-150px",
        marginTop: "24px",
        border: "2px solid #576ff6",
        borderRadius: "20px",
        width: "130px",
        height: "40px",
        fontSize: "12px",
      }
    : {};

  const loginButtonStyles = {
    backgroundColor: "#000",
    color: "#fff",
    marginTop: "24px",
    marginLeft: "10px",
    fontFamily: "Dongle",
    fontWeight: "800",
    borderRadius: "20px",
    width: "80px",
    height: "40px",
    transition: "background-color 0.5s, color 0.5s",
    "&:hover": {
      backgroundColor: "#000",
      color: "#b4b4b4",
    },
  };

  const signUpButtonStyles = {
    backgroundColor: "#fff",
    color: "#000",
    marginTop: "23px",
    marginLeft: "8px",
    marginRight: "16px",
    fontFamily: "Dongle",
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

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#000", boxShadow: "none", height: "85px" }}
    >
      <Toolbar>
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Logo"
          style={{
            width: "110px",
            height: "auto",
            marginTop: "18px",
            marginLeft: "25px",
            cursor: "pointer",
          }}
          onClick={handleLogoClick}
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            {!isCreateTBAActive ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  marginTop: "25px",
                  fontFamily: "Dongle",
                  fontWeight: "800",
                  transition: "background-color 0.5s, color 0.5s",
                  ...connectWalletStyles,
                  "&:hover": {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                }}
                onClick={handleCreateTBAClick}
              >
                Create TBA
              </Button>
            ) : wallet.accounts.length > 0 ? (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  backgroundColor: "#000",
                  color: "#576ff6",
                  marginTop: "25px",
                  fontFamily: "Dongle",
                  fontWeight: "800",
                  transition: "background-color 0.5s, color 0.5s",
                  ...connectWalletStyles,
                  "&:hover": {
                    backgroundColor: "#576ff6",
                    color: "#fff",
                  },
                }}
                onClick={handleConnectWallet}
              >
                {`${wallet.accounts[0].substring(0, 8)}...`}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{
                  backgroundColor: "#000",
                  color: "#576ff6",
                  marginTop: "25px",
                  fontFamily: "Dongle",
                  fontWeight: "800",
                  transition: "background-color 0.5s, color 0.5s",
                  ...connectWalletStyles,
                  "&:hover": {
                    backgroundColor: "#576ff6",
                    color: "#fff",
                  },
                }}
                onClick={handleConnectWallet}
              >
                Connect Wallet
              </Button>
            )}
          </Grid>
          <Grid item>
            <a href="http://localhost:3000/authentication">
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={signUpButtonStyles}
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
