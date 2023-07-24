import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import SidebarFooter from "./SidebarFooter";

// icon
import MenuIcon from "@mui/icons-material/Menu";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// css
import "../assets/SideNav.css";

export default function SideNav() {
  const { collapseSidebar } = useProSidebar();

  return (
    <Sidebar id="sideNav">
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div icon={<MenuIcon />} style={{ textAlign: "center" }}>
          <h2>Savvy</h2>
        </div>
        <div style={{ flex: "1" }}>
          <Menu>
            <MenuItem
              onClick={() => {
                collapseSidebar();
              }}
              icon={<SpaceDashboardIcon />}
              component={<Link to="/main" />}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                collapseSidebar();
              }}
              icon={<SwitchAccountIcon />}
              component={<Link to="/tbalist" />}
            >
              TBAs
            </MenuItem>
            <MenuItem
              onClick={() => {
                collapseSidebar();
              }}
              icon={<LibraryBooksIcon />}
              component={<Link to="/contract" />}
            >
              Contracts
            </MenuItem>
            <MenuItem
              onClick={() => {
                collapseSidebar();
              }}
              icon={<CardGiftcardIcon />}
              component={<Link to="/airdrop" />}
            >
              Airdrop
            </MenuItem>
            <MenuItem
              onClick={() => {
                collapseSidebar();
              }}
              icon={<ManageAccountsIcon />}
              component={<Link to="/manager" />}
            >
              Manager
            </MenuItem>
          </Menu>
        </div>
        <SidebarFooter />
      </div>
    </Sidebar>
  );
}
