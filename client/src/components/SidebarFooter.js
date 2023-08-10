import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function SidebarFooter({ collapsed, user = {} }) {
  const managerData = useSelector((state) => state.manager.managerData);
  const { address } = useParams();

  return (
    <div>
      {collapsed ? (
        <div
          style={{
            margin: "1.5rem 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              padding: "3px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Avatar
              src={
                managerData?.admin?.profileImage ||
                `https://i.pravatar.cc/300?u=${user?.id}`
              }
              sx={{
                bgcolor: "#576ff6",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              SA
            </Avatar>
          </div>
        </div>
      ) : (
        <Link
          to={`/manager/${address}`}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "12px",
              borderColor: "#fff",
            }}
            id="sidebar-footer"
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "50%",
                padding: "3px",
                marginLeft: "-0.1rem",
                marginRight: "-0.95rem",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
            >
              <Avatar
                src={
                  managerData?.admin?.profileImage ||
                  `https://i.pravatar.cc/300?u=${user?.id}`
                }
                sx={{ bgcolor: "#576ff6" }}
              >
                SA
              </Avatar>
            </div>
            <div
              style={{
                textAlign: "left",
                padding: "0 0.3rem",
                fontSize: "0.85rem",
                fontWeight: "700",
                color: "#272727",
                marginLeft: "1rem",
              }}
            >
              <div>{managerData?.admin?.name}</div>
              <div
                style={{
                  textAlign: "left",
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  color: "#7a7a7a",
                  marginTop: "0.1rem",
                }}
              >
                {`${managerData?.admin?.plan} plan`}
              </div>
            </div>
            <div
              style={{
                width: "35px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "25px",
                borderRadius: "10px",
                boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              <LogoutRoundedIcon style={{ fontSize: "17px", color: "#666" }} />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
