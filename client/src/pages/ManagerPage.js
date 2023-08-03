import React from "react";
import SideNav from "../components/SideNav";
import ManagerPageContent from "../components/ManagerPageContent";
import CurrentTimeBox from "../components/CurrentTimeBox";

export default function ManagerPage({ web3Auth }) {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <ManagerPageContent web3Auth={web3Auth} />
      <CurrentTimeBox />
    </div>
  );
}
