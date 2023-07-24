import React, { useEffect, useRef } from "react";
import { styled } from "@mui/system";

const Container = styled("div")({
  width: "100%",
  height: "calc(100% - 100px)", 
  backgroundColor: "#000",
  display: "flex",
  alignItems: "center",
  position: "relative"
});

const CustomMaskedTextWrapper = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",  
    paddingTop: "80px",     
    width: "100%",
    overflow: "hidden"
  });  

const CustomMaskedText = styled("h1")({
  width: "100%", 
  textAlign: "center",
  fontSize: "170px",
  fontWeight: "800",
  color: "transparent",
  background: "url('/mainfirst.gif') no-repeat center center",
  backgroundSize: "cover",
  "-webkit-background-clip": "text",
  backgroundClip: "text",
  "-webkit-text-fill-color": "transparent",
  fontFamily: "Dongle",
  userSelect: "none", 
  "@media screen and (max-width: 1400px)": {
    fontSize: "140px",
  },
  "@media screen and (max-width: 1400px)": {
    fontSize: "130px",
  },
  "@media screen and (max-width: 1200px)": {
    fontSize: "110px",
  },
  "@media screen and (max-width: 1000px)": {
    fontSize: "90px",
  },
  "@media screen and (max-width: 768px)": {
    fontSize: "60px",
  },
  "@media screen and (max-width: 500px)": {
    fontSize: "50px",
  },
  "@media screen and (max-width: 480px)": {
    fontSize: "50px",
  },
});

export default function HomePageFirst() {
  const textRef = useRef(null);

  useEffect(() => {
    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('dragstart', preventDragStart);
    textRef.current.addEventListener('copy', preventCopy);  

    return () => {
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('dragstart', preventDragStart);
      textRef.current.removeEventListener('copy', preventCopy); 
    };
  }, []);

  const preventContextMenu = (e) => {
    e.preventDefault();
  };

  const preventDragStart = (e) => {
    e.preventDefault();
  };

  const preventCopy = (e) => {
    e.preventDefault();
    alert('Copying is not allowed!');
  };

  return (
    <Container>
      <CustomMaskedTextWrapper>
        <CustomMaskedText ref={textRef}>NFT COMMUNITY MANAGEMENT</CustomMaskedText>
      </CustomMaskedTextWrapper>
    </Container>
  );
}