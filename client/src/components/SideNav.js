import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
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
  const communityData = useSelector((state) => state.community.communityData);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // 나중에 수정할 코드, 현재는 임시로 사용
  // 시작
  let { addressParams } = useParams();
  let addressCommunityData = communityData ? communityData[0].address : null;
  let address = addressParams ? addressParams : addressCommunityData;
  console.log("addressParams:", addressParams);
  console.log("addressCommunityData:", addressCommunityData);
  // 끝

  const preventImageActions = (event) => {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  };

  const logopurpleStyle = {
    width: "25px",
    height: "auto",
    marginTop: "27px",
    marginBottom: "25px",
  };

  const logoblackStyle = {
    width: "98px",
    height: "auto",
    marginTop: "25px",
    marginBottom: "25px",
  };

  const activeStyle = {
    color: "#576ff6",
    background: "linear-gradient(to right, #e0e3f7, #fff)",
    fontWeight: "800",
    marginTop: "20px",
    transform: "scale(1.03)",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
    fontWeight: "800",
    fontFamily: "'tektur', sans-serif",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    letterSpacing: "0.8px",
  };

  const inactiveStyle = {
    color: "#757575",
    fontWeight: "bold",
    marginTop: "15px",
    fontWeight: "600",
    fontFamily: "'tektur', sans-serif",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const iconStyles = {
    width: "20px",
    marginTop: "-1px",
  };

  const lineStyle = {
    borderBottom: "1px solid #a6a6a6",
    marginBottom: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  };

  const preventImageCopy = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ background: "#f5f5f5" }}>
      <Sidebar
        collapsed={collapsed}
        id="sideNav"
        onContextMenu={preventImageActions}
        onDragStart={preventImageActions}
        style={{
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {collapsed ? (
            <div style={{ textAlign: "center" }}>
              <Link to={`/main/${address}`}>
                <img
                  src="/logopurple.png"
                  alt="Logopurple"
                  style={logopurpleStyle}
                  onContextMenu={preventImageCopy}
                />
              </Link>
            </div>
          ) : (
            <div icon={<MenuIcon />} style={{ textAlign: "center" }}>
              <Link to={`/main/${address}`}>
                <img
                  src="/logoblack.png"
                  alt="Logoblack"
                  style={logoblackStyle}
                  onContextMenu={preventImageCopy}
                />
              </Link>
            </div>
          )}
          <div style={lineStyle} />
          <div style={{ flex: "1", userSelect: "none" }}>
            <Menu>
              <MenuItem
                onClick={() => {
                  setCollapsed((prev) => !prev);
                }}
                icon={<SpaceDashboardIcon style={iconStyles} />}
                component={<Link to={`/main/${address}`} />}
                style={
                  location.pathname === `/main/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCollapsed((prev) => !prev);
                }}
                icon={<SwitchAccountIcon style={iconStyles} />}
                component={<Link to={`/tbalist/${address}`} />}
                style={
                  location.pathname === `/tbalist/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                TBAs
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCollapsed((prev) => !prev);
                }}
                icon={<LibraryBooksIcon style={iconStyles} />}
                component={<Link to={`/contract/${address}`} />}
                style={
                  location.pathname === `/contract/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Contracts
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCollapsed((prev) => !prev);
                }}
                icon={<CardGiftcardIcon style={iconStyles} />}
                component={<Link to={`/airdrop/${address}`} />}
                style={
                  location.pathname === `/airdrop/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Airdrop
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setCollapsed((prev) => !prev);
                }}
                icon={<ManageAccountsIcon style={iconStyles} />}
                component={<Link to={`/manager/${address}`} />}
                style={
                  location.pathname === `/manager/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Manager
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
    </div>
  );
}
