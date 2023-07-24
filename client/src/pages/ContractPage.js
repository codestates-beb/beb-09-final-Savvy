import React from "react";
import SideNav from "../components/SideNav";
import ContractPageContent from "../components/ContractPageContent";

// css
import "../App.css";
import "../assets/Admin.css";

export default function ContractPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <ContractPageContent />
    </div>
  );
}
