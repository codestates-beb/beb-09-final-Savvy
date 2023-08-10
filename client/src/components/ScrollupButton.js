import React, { useState, useEffect } from "react";
import { Button, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <IconButton
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        display: showButton ? "block" : "none",
        zIndex: 999,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
      color="primary"
      aria-label="scroll-up"
    >
      <KeyboardArrowUpIcon style={{ color: "white", width: "30px" }} />
    </IconButton>
  );
};

export default ScrollUpButton;
