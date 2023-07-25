import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

// icon
import OutputIcon from "@mui/icons-material/Output";

export default function SidebarFooter({ collapsed }) {
  return (
    <div>
      {collapsed ? (
        <div style={{ margin: "0.5rem 0" }}>
          <Avatar style={{ margin: "0 auto" }}>SA</Avatar>
        </div>
      ) : (
        <Link to="/manager" style={{ textDecoration: "none", color: "black" }}>
          <div id="sidebar-footer">
            <Avatar>SA</Avatar>
            <div style={{ textAlign: "center", padding: "0 0.3rem" }}>
              <div>Admin</div>
              <div style={{ fontSize: "0.8rem", color: "grey" }}>
                Free Account
              </div>
            </div>

            <OutputIcon />
          </div>
        </Link>
      )}
    </div>
  );
}
