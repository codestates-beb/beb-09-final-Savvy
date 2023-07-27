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
} from "@mui/material";

import "../assets/ManagerPageContent.css";

const boxStyle1 = {
  backgroundColor: "#f8f8f8",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "29rem",
  height: "13rem",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
};

const boxStyle2 = {
  backgroundColor: "#f8f8f8",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "29rem",
  height: "17rem",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
};

const dummyData1 = {
  address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  ethBalance: "0x00",
  chainId: 11155111,
  email: "chancold123@gmail.com",
  name: "박찬우",
  profileImage:
    "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
  appPubKey:
    "02c20627b0e7993f77e0edc44c150e2ad57c385eb061dd1b953e2920ef9386a975",
  createdAt: "2023-07-25T02:05:47.530+00:00",
};

const dummyData2 = [
  {
    token: "ETH",
    amount: "10.34",
  },
  {
    token: "WETH",
    amount: "0.56",
  },
  {
    token: "USDT",
    amount: "100.00",
  },
];

const dummyData3 = [
  {
    communityName: "테스트 커뮤니티1",
    communityAddress: "0x2B839411985B474B725fd5E562E7969172F58f55",
    createdAt: "2023-07-25T02:05:47.530+00:00",
  },
  {
    communityName: "테스트 커뮤니티2",
    communityAddress: "0x2B839411985B474B725fd5E562E7969172F58f55",
    createdAt: "2023-07-25T02:05:47.530+00:00",
  },
  {
    communityName: "테스트 커뮤니티3",
    communityAddress: "0x2B839411985B474B725fd5E562E7969172F58f55",
    createdAt: "2023-07-25T02:05:47.530+00:00",
  },
];

const dummyData4 = [
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test1",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test2",
    type: "ERC-1155",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test3",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
  {
    image:
      "https://lh3.googleusercontent.com/a/AAcHTte83IMxEWM9hrGZHygQDWwhkB8TacLUQDEtXOeHvfvqAA=s96-c",
    name: "test4",
    type: "ERC-721",
    address: "0x2B839411985B474B725fd5E562E7969172F58f55",
  },
];

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
                padding: "1rem",
                border: "1px solid #f5f5f5",
                borderRadius: "0.5rem",
              }}
              src={dummyData1.profileImage}
            ></img>
            <div style={{ padding: "1rem" }}>
              <div>
                <div>Name</div>
                <div
                  style={{
                    padding: "0.3rem",
                    border: "1px solid #f5f5f5",
                    borderRadius: "0.5rem",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {dummyData1.name}
                </div>
              </div>
              <div>
                <div>Email</div>
                <div
                  style={{
                    padding: "0.3rem",
                    border: "1px solid #f5f5f5",
                    borderRadius: "0.5rem",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {dummyData1.email}
                </div>
              </div>
              <div>
                <div>Address</div>
                <div
                  style={{
                    padding: "0.3rem",
                    border: "1px solid #f5f5f5",
                    borderRadius: "0.5rem",
                    backgroundColor: "#f5f5f5",
                  }}
                >{`${dummyData1.address.substring(
                  0,
                  6
                )}...${dummyData1.address.substring(36)}`}</div>
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
                {dummyData2.map((data) => {
                  return <li key={data.token}>{data.token}</li>;
                })}
              </ul>
            </div>
            <div>
              <div className="balance-category">Amount</div>
              <ul className="balance-ul">
                {dummyData2.map((data) => {
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
                backgroundColor: "#d742f5",
                color: "white",
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
                  <div>
                    <div>Community Name</div>
                    <input
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <div>Community Address</div>
                    <input
                      value={communityAddress}
                      onChange={(e) => setCommunityAddress(e.target.value)}
                    ></input>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button color="secondary" onClick={handleCloseAdd}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
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
                {dummyData3.map((data) => {
                  return <li key={data.communityName}>{data.communityName}</li>;
                })}
              </ul>
            </div>
            <div>
              <div className="community-category">Address</div>
              <ul className="community-ul">
                {dummyData3.map((data) => {
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
                {dummyData3.map((data) => {
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
                {dummyData3.map((data) => {
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
              {dummyData4.map((data) => {
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
          color="secondary"
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
            <Button color="secondary" onClick={handleCloseLogout}>
              Close
            </Button>
            <Button
              variant="contained"
              color="secondary"
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
