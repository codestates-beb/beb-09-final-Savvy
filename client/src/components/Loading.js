import zIndex from "@mui/material/styles/zIndex";
import React from "react";

const Loading = () => {
  const containerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 2,
  };

  const iconStyle = {
    width: "100px",
    height: "100px",
  };

  return (
    <div style={containerStyle}>
      <img
        src={process.env.PUBLIC_URL + "/loadingImg.gif"}
        alt="icon"
        style={iconStyle}
      />
    </div>
  );
};

export default Loading;
