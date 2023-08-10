import React, { useEffect } from "react";
import { styled } from "@mui/system";

const Container = styled("div")({
  maxWidth: "100%",
  maxHeight: "100%",
  width: "100%",
  backgroundColor: "#000",
});

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  '@media (min-width: 1000px)': {
    maxHeight: "calc(1600px * (7.80 / 16))",
  },
  '@media (max-width: 768px)': {
    maxHeight: "calc(768px * (16 / 16))",
  },
});

export default function CreateTbaMain() {
  useEffect(() => {
    window.addEventListener('contextmenu', preventContextMenu);
    window.addEventListener('dragstart', preventDragStart);
    return () => {
      window.removeEventListener('contextmenu', preventContextMenu);
      window.removeEventListener('dragstart', preventDragStart);
    };
  }, []);

  const preventContextMenu = (e) => {
    e.preventDefault();
  };

  const preventDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <Image src="/CreateTbaMain.gif" alt="GIF" />
    </Container>
  );
}