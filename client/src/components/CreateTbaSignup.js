import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import WalletIcon from '@mui/icons-material/Wallet';

export default function Login() {
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = {
        data: { msg: "로그인에 성공했습니다.", token: "dummyToken" },
      };

      if (response.data.msg === "지갑이 생성 되었습니다.") {
        localStorage.setItem("accessToken", response.data.token);
        alert("지갑 생성에 성공했습니다.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("지갑 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const validateForm = () => {
    let isValid = true;

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(address)) {
      setErrorMessage("유효한 NFT Collection address 형식이 아닙니다.");
      isValid = false;
    } else if (password.length < 8) {
      setErrorMessage("유효한 NFT ID가 아닙니다.");
      isValid = false;
    } else {
      setErrorMessage("");
    }

    return isValid;
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "auto",
        marginTop: "11vh",
      }}
    >
      <Box
        component="h2"
        sx={{
          fontWeight: "bold",
          fontSize: "45px",
          fontFamily: "Dongle",
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
      <Typography style={{ color: '#9a9ab5', fontFamily: 'Dongle', fontWeight: 'bold', fontSize: '15px', marginTop: '20px', marginBottom: '-10px' }}>
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
      <Typography style={{ color: '#9a9ab5', fontFamily: 'Dongle', fontWeight: 'bold', fontSize: '15px', marginTop: '20px', marginBottom: '-10px' }}>
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
    value={password}
    onChange={handlePasswordChange}
    margin="normal"
    required
    sx={{
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

<Box
  sx={{
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
      "& .MuiSvgIcon-root": {
        marginTop: "3px",
        marginLeft: "-5px",
        fontSize: "22px",
        color: "#82829c",
      },
    }}
  />
  <span style={{ fontWeight: "600", color: "#82829c", fontSize: "13px", marginLeft: "-20px" }}>
    Remember me
  </span>
</Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          width: "40%",
          margin: "0 auto",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            height: 55,
            borderRadius: "12px",
            backgroundImage: "linear-gradient(to bottom, #6c61fe, #2a3da7)",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4), 0px 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": { backgroundImage: "linear-gradient(to bottom, #554ae4, #1c2e92)" },
            position: "sticky",
            top: "12vh",
            fontSize: "13px",
            fontWeight: "800",
            fontFamily: 'Dongle',
            color: "#e9ebf7",
            display: "flex",
            alignItems: "center", 
          }}
        >
          <WalletIcon sx={{ marginRight: 1, marginTop: -0.2, }} /> Create Wallet
        </Button>
      </Box>

      {errorMessage && (
        <span style={{ color: "red", marginTop: "1rem" }}>{errorMessage}</span>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "39%",
          margin: "0 auto",
          marginTop: "2.5%",
        }}
      >
      </Box>
    </Box>
  );
}