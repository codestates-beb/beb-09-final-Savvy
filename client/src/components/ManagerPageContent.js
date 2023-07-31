import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setManagerData } from "../reducers/managerReducer";
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
  Snackbar,
  MuiAlert,
} from "@mui/material";
import {
  ADMIN_INFO,
  ADMIN_TOKEN_LIST,
  COMMUNITY_LIST,
  ADMIN_NFT_LIST,
} from "../assets/DUMMY_DATA";

import "../assets/ManagerPageContent.css";

// api
import { getManagerData } from "../api/get-manager-data.js";
import { createCommunity } from "../api/post-manager-community";

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
  const managerData = useSelector((state) => state.manager.managerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityAddress, setCommunityAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const data = await getManagerData();
        const { admin, communities, tba } = data;
        dispatch(
          setManagerData({
            admin: admin,
            communities: communities,
            tba: tba,
          })
        );
      } catch (error) {
        console.log(error);
        alert("JWT expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("app_pub_key");
        navigate("/authentication");
        return;
      }
    };
    init();
    if (managerData) {
      setIsLoading(false);
    }
    console.log(managerData);
  }, [isLoading]);

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

  const handleAddCommunity = async () => {
    // TODO: Add community to database
    const CommunityData = await createCommunity(
      communityAddress,
      "main",
      communityName
    );
    const newCommunity = [...managerData.communities, CommunityData];
    dispatch(
      setManagerData({
        admin: managerData.admin,
        communities: newCommunity,
        tba: managerData.tba,
      })
    );
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
              src={managerData ? managerData.admin.profileImage : null}
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
                  {managerData ? managerData.admin.name : null}
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
                  {managerData ? managerData.admin.email : null}
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
                >{`${
                  managerData ? managerData.admin.address.substring(0, 6) : null
                }...${
                  managerData ? managerData.admin.address.substring(36) : null
                }`}</div>
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
                {managerData
                  ? managerData.communities.map((data) => {
                      return <li key={data._id}>{data.alias}</li>;
                    })
                  : null}
              </ul>
            </div>
            <div>
              <div className="community-category">Address</div>
              <ul className="community-ul">
                {managerData
                  ? managerData.communities.map((data) => {
                      return (
                        <li key={data._id}>
                          {`${data.address.substring(
                            0,
                            4
                          )}...${data.address.substring(38)}`}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div>
              <div className="community-category">Date</div>
              <ul className="community-ul">
                {managerData
                  ? managerData.communities.map((data) => {
                      return (
                        <li key={data._id}>
                          {data.createdAt.substring(0, 10)}
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div>
              <div className="community-category">Status</div>
              <ul className="community-ul">
                {managerData
                  ? managerData.communities.map((data) => {
                      return (
                        <li key={data._id}>
                          <input type="checkbox" />
                        </li>
                      );
                    })
                  : null}
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
