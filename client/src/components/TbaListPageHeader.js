import React from "react";
import "../assets/Admin.css";

export default function TbaListPageHeader() {
  const styles = {
    pageContent: {
      display: "flex",
      justifyContent: "center",
      height: "10vh",
      color: "#576ff6",
      fontSize: "38px",
      fontWeight: "bold",
      marginLeft: "40px",
      marginTop: "25px",
      userSelect: "none",
      fontFamily: "'tektur', sans-serif",
    },
    textWithBackground: {
      display: 'inline-block', 
      background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
      color: 'transparent',
      WebkitBackgroundClip: 'text', 
      backgroundClip: 'text',
    }
  };

  return (
    <div style={styles.pageContent}>
      <span style={styles.textWithBackground}>TBA</span>
    </div>
  );
}