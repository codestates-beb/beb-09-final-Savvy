import React from "react";
import "../assets/Admin.css";

export default function TbaListPageContent() {
  const styles = {
    pageContent: {
      display: "flex",
      justifyContent: "center",
      height: "10vh",
      color: "#576ff6",
      fontWeight: "800",
      marginLeft: "40px",
      marginTop: "20px",
      userSelect: 'none',
      fontSize: "38px",
      fontWeight: "bold",
      fontFamily: "'tektur', sans-serif",
    },
  };

  return (
    <div style={styles.pageContent}>
      <span style={styles.textMoveRight}>Dashboard</span>
    </div>
  );
}