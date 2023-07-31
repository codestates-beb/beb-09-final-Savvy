import React from "react";
import SideNav from "../components/SideNav";
import CurrentTimeBox from "../components/CurrentTimeBox";
import AirdropPageContent from "../components/AirdropPageContent";

export default function AirdropPage({ web3Auth }) {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <CurrentTimeBox />
      <AirdropPageContent web3Auth={web3Auth} />
    </div>
  );
}
