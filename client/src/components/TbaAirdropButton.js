import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)({
  width: "auto",
  height: "40px",
  marginTop: "-123px",
  marginLeft: "-15px",
  marginRight: "5px",
  color: "#fff",
  fontSize: "11px",
  fontWeight: "600",
  position: "absolute",
  right: "0px", 
  top: "190%",   
  transform: "translateY(-50%)",   
  userSelect: "none", 
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
  transition: "background-color 0.5s ease", 
  backgroundColor: "#576ff6",
  "&:hover": {
    backgroundColor: "#3351e2",
  },
});

export default function TbaAirdropButton() {
  const navigate = useNavigate();

  const handleAirdropClick = () => {
    navigate("/airdrop");
  };

  return (
    <div className="page-content">
      <StyledButton
        variant="contained"
        color="primary"
        onClick={handleAirdropClick}
      >
        Airdrop
      </StyledButton>
    </div>
  );
}
