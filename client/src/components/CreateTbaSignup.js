import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import WalletIcon from "@mui/icons-material/Wallet";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

// api
import { createTba, postTxHash } from "../api/post-createTba.js";

const ETHERSCAN_SEPOLIA_NETWORK = "https://sepolia.etherscan.io/tx/";

export default function Login() {
  const [address, setAddress] = useState("");
  const [nftId, setNftId] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [createTbaResult, setCreateTbaResult] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const txHash = await createTba(address, nftId);
      console.log(txHash);
      setOpen(true);
      setCreateTbaResult(txHash);
      setAddress("");
      setNftId("");
      try {
        const result = await postTxHash(txHash);
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;

    if (!addressRegex.test(address)) {
      setErrorMessage("유효한 NFT Collection address 형식이 아닙니다.");
      isValid = false;
    } else if (nftId.length === 0) {
      setErrorMessage("유효한 NFT ID가 아닙니다.");
      isValid = false;
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  const handleNftIdChange = (event) => {
    setNftId(event.target.value);
  };

  const caprasimoFont = {
    fontFamily: "'Caprasimo', sans-serif",
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        ...caprasimoFont,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "auto",
        marginTop: "11vh",
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {createTbaResult
            ? `Check your transaction on Etherscan`
            : `Failed to create TBA`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {createTbaResult && (
              <a
                href={`${ETHERSCAN_SEPOLIA_NETWORK}${createTbaResult}`}
                target="_blank"
              >
                {createTbaResult}
              </a>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#5270ff" }} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        component="h2"
        sx={{
          ...caprasimoFont,
          fontWeight: "bold",
          fontSize: "45px",
          my: 2,
          position: "relative",
          marginLeft: "80px",
        }}
      >
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "70%",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>
      <Typography
        sx={{
          ...caprasimoFont,
          color: "#9a9ab5",
          fontWeight: "bold",
          fontSize: "15px",
          marginTop: "20px",
          marginBottom: "-10px",
        }}
      >
        NFT Collection address
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          width: "40%",
          margin: "0 auto",
        }}
      >
        <TextField
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          margin="normal"
          required
          sx={{
            ...caprasimoFont,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              borderRadius: "12px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              color: "#576ff6",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              boxShadow: "inset 0 3px 8px rgba(255, 255, 255, 0.25)",
              borderRadius: "12px",
              borderColor: "#576ff6",
            },
          }}
        />
      </Box>
      <Typography
        sx={{
          ...caprasimoFont, // 폰트 스타일 적용
          color: "#9a9ab5",
          fontWeight: "bold",
          fontSize: "15px",
          marginTop: "20px",
          marginBottom: "-10px",
        }}
      >
        NFT ID
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          width: "40%",
          margin: "0 auto",
          borderRadius: "12px",
        }}
      >
        <TextField
          value={nftId}
          onChange={handleNftIdChange}
          margin="normal"
          required
          sx={{
            ...caprasimoFont,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.07)",
              borderRadius: "12px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              color: "#576ff6",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              boxShadow: "inset 0 3px 8px rgba(255, 255, 255, 0.25)",
              borderRadius: "12px",
              borderColor: "#576ff6",
            },
          }}
        />
      </Box>

      {/* <Box
        sx={{
          ...caprasimoFont,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          width: "40%",
          margin: "0 auto",
          justifyContent: "flex-start",
        }}
      >
        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          sx={{
            ...caprasimoFont, 
            "& .MuiSvgIcon-root": {
              marginTop: "3px",
              marginLeft: "-5px",
              fontSize: "22px",
              color: "#82829c",
            },
          }}
        />
        <span
          sx={{
            ...caprasimoFont, 
            fontWeight: "600",
            color: "#82829c",
            fontSize: "13px",
            marginLeft: "-20px",
          }}
        >
          Remember me
        </span>
      </Box> */}

      <Box
        sx={{
          ...caprasimoFont,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          width: "40%",
          margin: "2rem auto 0",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            ...caprasimoFont,
            mt: 2,
            width: "100%",
            height: 55,
            borderRadius: "12px",
            backgroundImage: "linear-gradient(to bottom, #6c61fe, #2a3da7)",
            boxShadow:
              "0px 2px 5px rgba(0, 0, 0, 0.4), 0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundImage: "linear-gradient(to bottom, #554ae4, #1c2e92)",
            },
            position: "sticky",
            top: "12vh",
            fontSize: "13px",
            fontWeight: "800",
            color: "#e9ebf7",
            display: "flex",
            alignItems: "center",
          }}
        >
          <WalletIcon sx={{ marginRight: 1, marginTop: -0.2 }} /> Create NFT
          Wallet
        </Button>
      </Box>

      <Box
        sx={{
          ...caprasimoFont,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "39%",
          margin: "0 auto",
          marginTop: "2.5%",
        }}
      >
        {errorMessage && (
          <span style={{ color: "red", marginTop: "1rem", zIndex: "1" }}>
            {errorMessage}
          </span>
        )}
      </Box>
    </Box>
  );
}
