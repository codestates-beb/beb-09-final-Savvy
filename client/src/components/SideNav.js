import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";

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
      <Menu
        onClick={() => {
          collapseSidebar();
        }}
      >
        <MenuItem icon={<MenuIcon />} style={{ textAlign: "center" }}>
          <h2>Savvy</h2>
        </MenuItem>
        <MenuItem icon={<SpaceDashboardIcon />} component={<Link to="/main" />}>
          Dashboard
        </MenuItem>
        <MenuItem
          icon={<SwitchAccountIcon />}
          component={<Link to="/tbalist" />}
        >
          TBAs
        </MenuItem>
        <MenuItem
          icon={<LibraryBooksIcon />}
          component={<Link to="/contract" />}
        >
          Contracts
        </MenuItem>
        <MenuItem
          icon={<CardGiftcardIcon />}
          component={<Link to="/airdrop" />}
        >
          Airdrop
        </MenuItem>
        <MenuItem
          icon={<ManageAccountsIcon />}
          component={<Link to="/manager" />}
        >
          Manager
        </MenuItem>
        <MenuItem
          id="admin"
          icon={<MenuIcon />}
          component={<Link to="/manager" />}
        >
          Admin
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
