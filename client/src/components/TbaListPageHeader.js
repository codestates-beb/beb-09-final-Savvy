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
      marginTop: "20px",
      userSelect: "none",
      fontFamily: "'tektur', sans-serif",
    },
  };

  return (
    <div style={styles.pageContent}>
      <span style={styles.textMoveRight}>TBA</span>
    </div>
  );
}
