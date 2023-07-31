import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

  const iconStyles = {
    width: "40px",
    marginTop: "2px",
  };

  const dashboardIconStyles = {
    width: "25px",
    marginLeft: "4px",
  };

  const airdropIconStyles = {
    width: "36px",
  };

  const contractsiconStyles = {
    width: "40px",
    marginLeft: "3px",
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
              <Link to={`/main/${address}`}>
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
              <Link to={`/main/${address}`}>
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
                component={<Link to={`/main/${address}`} />}
                style={
                  location.pathname === `/main/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Dashboard
                {location.pathname === `/main/${address}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/TbaIcon.png"}
                    alt="Custom Icon"
                    style={iconStyles}
                  />
                }
                component={<Link to={`/tbalist/${address}`} />}
                style={
                  location.pathname === `/tbalist/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                TBAs
                {location.pathname === `/tbalist/${address}` && (
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
                component={<Link to={`/contract/${address}`} />}
                style={
                  location.pathname === `/contract/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Contracts
                {location.pathname === `/contract/${address}` && (
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
                component={<Link to={`/airdrop/${address}`} />}
                style={
                  location.pathname === `/airdrop/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Airdrop
                {location.pathname === `/airdrop/${address}` && (
                  <div style={rectangleStyle}></div>
                )}
              </MenuItem>
              <MenuItem
                onClick={() => setCollapsed((prev) => !prev)}
                icon={
                  <img
                    src={process.env.PUBLIC_URL + "/ManagerIcon.png"}
                    alt="Custom Icon"
                    style={iconStyles}
                  />
                }
                component={<Link to={`/manager/${address}`} />}
                style={
                  location.pathname === `/manager/${address}`
                    ? activeStyle
                    : inactiveStyle
                }
              >
                Manager
                {location.pathname === `/manager/${address}` && (
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
