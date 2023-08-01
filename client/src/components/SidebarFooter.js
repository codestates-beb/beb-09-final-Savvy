import React from "react";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

export default function SidebarFooter({ collapsed, user = {} }) {
    const { address } = useParams();

    return (
        <div>
            {collapsed ? (
                <div style={{ margin: "1.5rem 0", display: "flex", justifyContent: "center" }}>
                    <div style={{ 
                        background: "#fff", 
                        borderRadius: "50%", 
                        padding: "3px", 
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)"
                    }}>
                        <Avatar 
                            src={`https://i.pravatar.cc/300?u=${user?.id}`} 
                            sx={{ bgcolor: "#576ff6", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}
                        >
                            SA
                        </Avatar>
                    </div>
                </div>
            ) : (
                <Link
                    to={`/manager/${address}`}
                    style={{ textDecoration: "none", color: "black" }}
                >
                    <div id="sidebar-footer">
                        <div style={{ 
                            background: "#fff", 
                            borderRadius: "50%", 
                            padding: "3px", 
                            marginLeft: "-0.1rem",
                            marginRight: "-0.95rem",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" 
                        }}>
                            <Avatar 
                                src={`https://i.pravatar.cc/300?u=${user?.id}`} 
                                sx={{ bgcolor: "#576ff6" }}
                            >
                                SA
                            </Avatar>
                        </div>
                        <div style={{ 
                            textAlign: "left", 
                            padding: "0 0.3rem", 
                            fontSize: "0.85rem",
                            fontWeight: "700",
                            color: "#323232", 
                            marginLeft: "1rem",
                        }}>
                            <div>Admin</div>
                            <div style={{ 
                                textAlign: "left", 
                                fontSize: "0.75rem", 
                                fontWeight: "500",
                                color: "#a6a4a4",
                                marginTop: "0.1rem",
                            }}>
                                Free Account
                            </div>
                        </div>
                        <div style={{ 
                            width: "35px",
                            height: "35px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "25px",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)"
                        }}>
                            <LogoutRoundedIcon style={{ fontSize: "17px", color: "#666" }} />
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}