import React from "react";
import SideNav from "../components/SideNav";
import TbaListPageHeader from "../components/TbaListPageHeader";
import CurrentTimeBox from "../components/CurrentTimeBox";
import TbaList from "../components/TbaList";

import { USERS } from "../assets/DUMMY_DATA";

export default function TbaListPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <TbaListPageHeader />
      <CurrentTimeBox />
      <TbaList data={USERS} />
    </div>
  );
}
