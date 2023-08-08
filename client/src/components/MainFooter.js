import React from "react";
import { Typography, Link } from "@mui/material";
import Button from "@mui/material/Button";

const preventCopy = (e) => {
  e.preventDefault();
};

const preventRightClick = (e) => {
  e.preventDefault();
};

const MainFooter = () => {
  const footerStyle = {
    backgroundColor: "#000",
    padding: "100px",
    textAlign: "center",
    fontFamily: "Dongle",
    color: "#fff",
    marginTop: "-12px",
    userSelect: "none",
  };

  const logoStyle = {
    width: "80px",
    marginBottom: "8px",
    marginLeft: "-12px",
  };

  const titleStyle = {
    color: "#fff",
    fontWeight: "600",
    fontSize: "15px",
    marginTop: "5px",
    marginLeft: "-10px",
    fontFamily: "'tektur', sans-serif",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "underline",
    width: "28px",
    height: "auto",
    marginTop: "12px",
    marginLeft: "12px",
  };

  const buttonStyle = {
    variant: "contained",
    color: "primary",
    size: "small",
    sx: {
      backgroundColor: "#000",
      marginLeft: "5px",
      fontFamily: "'tektur', sans-serif",
      fontWeight: "600",
      transition: "background-color 0.3s, color 0.3s",
      "&:hover": {
        backgroundColor: "#000",
        color: "#b4b4b4",
      },
      fontSize: "12px",
    },
  };

  const rightsReservedLineStyle = {
    position: "relative",
    marginTop: "20px",
    marginLeft: "0px",
    width: "100%",
    height: "1px",
    backgroundImage: "linear-gradient(to right, #000, #fff, #000)",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 0",
    backgroundClip: "content-box",
    borderTop: "1px solid transparent",
  };

  const rightsReservedStyle = {
    color: "#99999b",
    marginTop: "20px",
    marginLeft: "-6px",
    marginBottom: "-50px",
    fontSize: "12px",
  };

  return (
    <footer style={footerStyle}>
      <img
        src="/logo.png"
        alt="Logo"
        style={logoStyle}
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
      />

      <Typography variant="body2" style={titleStyle}>
        We use ERC-6551 to create a new NFT community management
      </Typography>
      <Typography
        variant="body2"
        style={{ marginTop: "10px", marginLeft: "-50px" }}
      >
        <Link
          href="https://github.com/codestates-beb/beb-09-final-Savvy"
          target="_blank"
          style={linkStyle}
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
        >
          <img
            src="/github.png"
            alt="GitHub"
            style={linkStyle}
            onDragStart={preventCopy}
            onMouseDown={preventCopy}
            onContextMenu={preventRightClick}
          />
        </Link>
        <Link href="https://discord.com" target="_blank" style={linkStyle}>
          <img
            src="/discord.png"
            alt="Discord"
            style={linkStyle}
            onDragStart={preventCopy}
            onMouseDown={preventCopy}
            onContextMenu={preventRightClick}
          />
        </Link>
        <Link href="https://instagram.com" target="_blank" style={linkStyle}>
          <img
            src="/instagram.png"
            alt="Instagram"
            style={linkStyle}
            onDragStart={preventCopy}
            onMouseDown={preventCopy}
            onContextMenu={preventRightClick}
          />
        </Link>
        <Link
          href="https://www.notion.so/ko-kr"
          target="_blank"
          style={linkStyle}
        >
          <img
            src="/notion.png"
            alt="Notion"
            style={linkStyle}
            onDragStart={preventCopy}
            onMouseDown={preventCopy}
            onContextMenu={preventRightClick}
          />
        </Link>
        <Link href="https://twitter.com" target="_blank" style={linkStyle}>
          <img
            src="/twitter.png"
            alt="Twitter"
            style={linkStyle}
            onDragStart={preventCopy}
            onMouseDown={preventCopy}
            onContextMenu={preventRightClick}
          />
        </Link>
      </Typography>
      <div style={{ marginLeft: "-16px", paddingTop: "20px" }}>
        <Button {...buttonStyle}>Company</Button>
        <Button {...buttonStyle}>Resources</Button>
        <Button {...buttonStyle}>Legal</Button>
        <Button {...buttonStyle}>Terms of Service</Button>
        <Button {...buttonStyle}>Papers</Button>
        <Button {...buttonStyle}>Documentation</Button>
        <Button {...buttonStyle}>Cookies Policy</Button>
        <Button {...buttonStyle}>Privacy Policy</Button>
        <Button {...buttonStyle}>About Us</Button>
        <Button {...buttonStyle}>Data Processing</Button>
      </div>
      <div style={rightsReservedLineStyle}></div>
      <Typography variant="body2" style={rightsReservedStyle}>
        &copy; {new Date().getFullYear()} Savvy Inc. All rights reserved.
      </Typography>
    </footer>
  );
};

export default MainFooter;
