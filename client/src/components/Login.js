import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

export default function Login() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);  
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle = {
    display: "flex",
    justifyContent: "flex-end",  
    alignItems: "center",
    height: "100%", 
    position: "relative", 
  };

  const videoStyle = {
    width: "550px",  
    height: windowHeight > 850 ? `${windowHeight}px` : "100%", 
    objectFit: "cover",
    objectPosition: windowWidth > windowHeight ? "center" : "top",  
    display: windowWidth < 1175 ? "none" : "block",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
    borderTopLeftRadius: "50px",    
    borderBottomLeftRadius: "50px",  
  };
 
  const logoStyle = {
    position: "absolute", 
    top: "0",          
    left: "0",          
    width: "100px",
    height: "auto",
    margin: "1rem",  
  };

  return (
    <div style={containerStyle}>
      <Link to="/"> 
        <img src="/logocolor.png" alt="Logocolor" style={logoStyle} />
      </Link>
      <video src="/login.mp4" autoPlay loop muted style={videoStyle} />
    </div>
  );
}