import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  TextField,
  Chip,
} from "@mui/material";
import {
  ADMIN_INFO,
  ADMIN_TOKEN_LIST,
  COMMUNITY_LIST,
  ADMIN_NFT_LIST,
} from "../assets/DUMMY_DATA";

import "../assets/ManagerPageContent.css";

const boxStyle1 = {
  backgroundColor: "#f8f8f8",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "13rem",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
};

const boxStyle2 = {
  backgroundColor: "#f8f8f8",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "17rem",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
};

export default function ManagerPageContent({ web3Auth }) {
  const [openLogout, setOpenLogout] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityAddress, setCommunityAddress] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("app_pub_key");
      await web3Auth.logout();
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/");

      return;
    }
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleAddCommunity = () => {
    // TODO: Add community to database
    setOpenAdd(false);
  };

  return (
    <div className="page-content">
      <h1>Manager</h1>
      <div className="content">
        <Box sx={boxStyle1}>
          <div style={{ fontWeight: "600" }}>Admin information</div>
          <div style={{ display: "flex", margin: "1rem" }}>
            <img
              style={{
                width: "8rem",
                height: "10rem",
                border: "1px solid #f5f5f5",
                borderRadius: "0.5rem",
              }}
              src={ADMIN_INFO.profileImage}
            ></img>
            <div style={{ padding: "1rem" }}>
              <div className="admin-info-content">
                <Chip
                  label="Name"
                  sx={{ bgcolor: "#5270ff", color: "white" }}
                />
                <div
                  style={{
                    padding: "0.3rem",
                  }}
                >
                  {ADMIN_INFO.name}
                </div>
              </div>
              <div className="admin-info-content">
                <Chip
                  label="Email"
                  sx={{ bgcolor: "#5270ff", color: "white" }}
                />
                <div
                  style={{
                    padding: "0.3rem",
                  }}
                >
                  {ADMIN_INFO.email}
                </div>
              </div>
              <div className="admin-info-content">
                <Chip
                  sx={{ bgcolor: "#5270ff", color: "white" }}
                  label="Address"
                />
                <div
                  style={{
                    padding: "0.3rem",
                  }}
                >{`${ADMIN_INFO.address.substring(
                  0,
                  6
                )}...${ADMIN_INFO.address.substring(36)}`}</div>
              </div>
            </div>
          </div>
        </Box>
        <Box sx={boxStyle1}>
          <div style={{ fontWeight: "600" }}>Balance</div>
          <div
            style={{
              display: "flex",
              margin: "1rem",
              justifyContent: "space-between",
              overflow: "auto",
            }}
          >
            <div>
              <div className="balance-category">Token</div>
              <ul className="balance-ul">
                {ADMIN_TOKEN_LIST.map((data) => {
                  return <li key={data.token}>{data.token}</li>;
                })}
              </ul>
            </div>
            <div>
              <div className="balance-category">Amount</div>
              <ul className="balance-ul">
                {ADMIN_TOKEN_LIST.map((data) => {
                  return <li key={data.token}>{data.amount}</li>;
                })}
              </ul>
            </div>
          </div>
        </Box>
        <Box sx={boxStyle2}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "600" }}>Community list</div>
            <button
              style={{
                backgroundColor: "#5270ff",
                color: "#ffffff",
                borderRadius: "0.3rem",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleOpenAdd}
            >
              +
            </button>
            <Dialog open={openAdd}>
              <DialogTitle>Add Community</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    placeholder="e.g. My Community"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    placeholder="e.g. 0x2B839411985B474B725fd5E562E7969172F58f55"
                    value={communityAddress}
                    onChange={(e) => setCommunityAddress(e.target.value)}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button sx={{ color: "#5270ff" }} onClick={handleCloseAdd}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                  onClick={handleAddCommunity}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0.5rem",
              overflow: "auto",
              height: "14rem",
            }}
          >
            <div>
              <div className="community-category">Name</div>
              <ul className="community-ul">
                {COMMUNITY_LIST.map((data) => {
                  return <li key={data.communityName}>{data.communityName}</li>;
                })}
              </ul>
            </div>
            <div>
              <div className="community-category">Address</div>
              <ul className="community-ul">
                {COMMUNITY_LIST.map((data) => {
                  return (
                    <li key={data.communityName}>
                      {`${data.communityAddress.substring(
                        0,
                        4
                      )}...${data.communityAddress.substring(38)}`}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="community-category">Date</div>
              <ul className="community-ul">
                {COMMUNITY_LIST.map((data) => {
                  return (
                    <li key={data.communityName}>
                      {data.createdAt.substring(0, 10)}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div className="community-category">Status</div>
              <ul className="community-ul">
                {COMMUNITY_LIST.map((data) => {
                  return (
                    <li key={data.communityName}>
                      <input type="checkbox" />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Box>
        <Box sx={boxStyle2}>
          <div style={{ fontWeight: "600" }}>NFT list</div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                justifyItems: "center",
                margin: "0.5rem",
              }}
            >
              <div className="nft-category">Image</div>
              <div className="nft-category">Name</div>
              <div className="nft-category">Type</div>
              <div className="nft-category">Address</div>
            </div>
            <div style={{ overflow: "auto", height: "14rem" }}>
              {ADMIN_NFT_LIST.map((data) => {
                return (
                  <div className="nft-list" key={data.name}>
                    <div>
                      <img
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                        src={data.image}
                      ></img>
                    </div>
                    <div>{data.name}</div>
                    <div>{data.type}</div>
                    <div>{`${data.address.substring(
                      0,
                      4
                    )}...${data.address.substring(38)}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
        }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
          onClick={handleOpenLogout}
        >
          Logout
        </Button>
      </div>
      <div>
        <Dialog
          open={openLogout}
          onClose={handleCloseLogout}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Logout from Manager Page"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "#5270ff" }} onClick={handleCloseLogout}>
              Close
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
              onClick={handleLogout}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
