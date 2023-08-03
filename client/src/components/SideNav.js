import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import SidebarFooter from "./SidebarFooter";

// icon
import MenuIcon from "@mui/icons-material/Menu";
/*
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
*/

// css
import "../assets/SideNav.css";

const logopurpleStyle = {
  width: "23px",
  height: "auto",
  marginTop: "26px",
  marginBottom: "18px",
};

const logoblackStyle = {
  width: "70px",
  height: "auto",
  marginTop: "26px",
  marginBottom: "18px",
  marginLeft: "-123px",
};

const activeStyle = {
  color: "#576ff6",
  background: "#f0f2fd",
  fontSize: "14px",
  fontWeight: "600",
  marginTop: "18px",
  fontFamily: "'tektur', sans-serif",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  position: "relative",
};

const inactiveStyle = {
  color: "#a6a4a4",
  fontSize: "14px",
  fontWeight: "500",
  marginTop: "18px",
  fontFamily: "'tektur', sans-serif",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const rectangleStyle = {
  position: "absolute",
  right: "0px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "3px",
  height: "50px",
  backgroundColor: "#576ff6",
  borderRadius: "10px",
};

const dashboardIconStyles = {
  width: "30px",
  marginLeft: "3px",
};

const tbaiconStyles = {
  width: "28px",
};

const contractsiconStyles = {
  width: "28px",
  marginLeft: "3px",
};

const airdropIconStyles = {
  width: "32px",
  marginRight: "2px",
};

const managericonStyles = {
  width: "30px",
  marginRight: "3.3px",
};

const settingiconStyles = {
  width: "30px",
  marginRight: "3.3px",
};

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const currentCommunity = localStorage.getItem("currentCommunity");
  let addressCurrent = currentCommunity ? currentCommunity : "";

  const preventImageActions = (event) => {
    if (event.target.tagName === "IMG") {
      event.preventDefault();
    }
  };

  const preventImageCopy = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{}}>
      <Sidebar
        collapsed={collapsed}
        id="sideNav"
        onContextMenu={preventImageActions}
        onDragStart={preventImageActions}
        style={{
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0)",
          backgroundColor: "rgba(87, 111, 246, 0.01)",
          borderRight: "1px solid #e1e3e5",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          {collapsed ? (
            <div style={{ textAlign: "center" }}>
              <Link to={`/main/${addressCurrent}`}>
                <img
                  src="/logopurple.png"
                  alt="Logopurple"
                  style={logopurpleStyle}
                  onContextMenu={preventImageCopy}
                />
              </Link>
              <hr
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#fff",
                  marginTop: "4px",
                  marginBottom: "14px",
                }}
              />
            </div>
          ) : (
            <div icon={<MenuIcon />} style={{ textAlign: "center" }}>
              <Link to={`/main/${addressCurrent}`}>
                <img
                  src="/logocolor2.png"
                  alt="Logoblack"
                  style={logoblackStyle}
                  onContextMenu={preventImageCopy}
                />
              </Link>
              <hr
                style={{
                  width: "100%",
                  height: "4px",
                  backgroundColor: "#fff",
                  marginTop: "4px",
                  marginBottom: "14px",
                }}
              />
            </div>
          )}
          <div style={{ flex: "1", userSelect: "none" }}>
            <Menu>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/dashboardIcon.png"}
                    alt="Custom Icon"
                    style={dashboardIconStyles}
                  />
                }
                component={<Link to={`/main/${addressCurrent}`} />}
                style={
                  location.pathname === `/main/${addressCurrent}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Dashboard
                {location.pathname === `/main/${addressCurrent}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/TbaIcon.png"}
                    alt="Custom Icon"
                    style={tbaiconStyles}
                  />
                }
                component={<Link to={`/tbalist/${addressCurrent}`} />}
                style={
                  location.pathname === `/tbalist/${addressCurrent}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                TBAs
                {location.pathname === `/tbalist/${addressCurrent}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/ContractsIcon.png"}
                    alt="Custom Icon"
                    style={contractsiconStyles}
                  />
                }
                component={<Link to={`/contract/${addressCurrent}`} />}
                style={
                  location.pathname === `/contract/${addressCurrent}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Contracts
                {location.pathname === `/contract/${addressCurrent}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/airdropIcon.png"}
                    alt="Custom Icon"
                    style={airdropIconStyles}
                  />
                }
                component={<Link to={`/airdrop/${addressCurrent}`} />}
                style={
                  location.pathname === `/airdrop/${addressCurrent}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Airdrop
                {location.pathname === `/airdrop/${addressCurrent}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/ManagerIcon.png"}
                    alt="Custom Icon"
                    style={managericonStyles}
                  />
                }
                component={<Link to={`/manager/${addressCurrent}`} />}
                style={
                  location.pathname === `/manager/${addressCurrent}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Manager
                {location.pathname === `/manager/${addressCurrent}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/settingIcon.png"}
                    alt="Custom Icon"
                    style={settingiconStyles}
                  />
                }
                component={<Link to={`/setting`} />}
                style={
                  location.pathname === `/setting` ? activeStyle : inactiveStyle
                }
              >
                Setting
                {location.pathname === `/setting` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
            </Menu>
          </div>
          <SidebarFooter collapsed={collapsed} />
        </div>
      </Sidebar>
    </div>
  );
}
