import React from "react";
import "../assets/Admin.css";

export default function TbaListPageContent() {
  const styles = {
    pageContent: {
      display: "flex",
      justifyContent: "center",
      height: "10vh",
      marginLeft: "40px",
      marginTop: "25px",
      userSelect: 'none',
      fontSize: "38px",
      fontWeight: "bold",
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
      <span style={styles.textWithBackground}>Dashboard</span>
    </div>
  );
}
