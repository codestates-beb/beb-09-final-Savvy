import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import detectEthereumProvider from "@metamask/detect-provider";

const MainHeader = () => {
  let provider = null;

  detectEthereumProvider()
    .then((res) => {
      if (res) {
        provider = res;
      }
    })
    .then(() => {
      if (provider) {
        console.log("Ethereum successfully detected!");
        startApp(provider);
      } else {
        console.log("Please install MetaMask!");
      }
    })
    .catch((err) => {
      console.log(err);
    });

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
    const account = accounts[0];
    console.log(accounts);
    console.log(account);
  };

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

  const handleConnectWallet = () => {
    alert("Connect Wallet");
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
            {isCreateTBAActive ? (
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
            ) : (
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
            )}

            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={loginButtonStyles}
            >
              Log in
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={signUpButtonStyles}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
