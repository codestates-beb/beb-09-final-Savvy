import React from "react";

export default function ContractPageContent() {
  const styles = {
    pageContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "10vh",
      color: "#576ff6",
      fontSize: "36px",
      fontWeight: "800",
      marginLeft: "40px",
      marginTop: "-15px",
      userSelect: 'none',
    },
  };

  return (
    <div style={styles.pageContent}>
      <span style={styles.textMoveRight}>TBA</span>
    </div>
  );
}