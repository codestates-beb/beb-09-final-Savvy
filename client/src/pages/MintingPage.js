import React from "react";
import SideNav from "../components/SideNav";
import MintingPageContent from "../components/MintingPageContent";
import CurrentTimeBox from "../components/CurrentTimeBox";

import "../assets/Admin.css";

export default function Mintingpage({ web3Auth }) {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <CurrentTimeBox />
      <MintingPageContent web3Auth={web3Auth} />
    </div>
  );
}
