import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
  TextField,
  Chip,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Stack,
} from "@mui/material";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
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
import { updateCommunity } from "../api/put-community";
import { deleteCommunity } from "../api/delete-community";

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

  const [communityChecked, setCommunityChecked] = useState([]);
  const [isMovingModal, setIsMovingModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityAddress, setCommunityAddress] = useState("");
  const [currentCommunityAddress, setCurrentCommunityAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const data = await getManagerData();
        const { admin, communities, items } = data;
        dispatch(
          setManagerData({
            admin: admin,
            communities: communities,
            items: items,
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
      localStorage.removeItem("currentCommunity");
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

  const handleUpdateCommunity = async () => {
    communityChecked.forEach(async (data) => {
      // 수정 예정
      // const CommunityData = await updateCommunity(data, "alias", communityName);
      // const newCommunity = managerData.communities.map((data) => {
      //   if (data._id === CommunityData._id) {
      //     return CommunityData;
      //   }
      //   return data;
      // });
      // dispatch(
      //   setManagerData({
      //     admin: managerData.admin,
      //     communities: newCommunity,
      //     items: managerData.items,
      //   })
      // );
    });
    setOpenUpdate(false);
  };

  const handleDeleteCommunity = async () => {
    communityChecked.forEach(async (data) => {
      if (data === localStorage.getItem("currentCommunity")) {
        alert("You cannot delete current community.");
        return;
      }
      const newCommunity = managerData.communities.filter(
        (community) => community.address !== data
      );
      dispatch(
        setManagerData({
          admin: managerData.admin,
          communities: newCommunity,
          items: managerData.items,
        })
      );
      await deleteCommunity(data);
    });
    setOpenDelete(false);
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
        items: managerData.items,
      })
    );
    setOpenAdd(false);
  };

  const confirmMoveCommunity = () => {
    localStorage.setItem("currentCommunity", currentCommunityAddress);
    navigate(`/manager/${currentCommunityAddress}`);
    setIsMovingModal(false);
  };

  const handleMoveCommunity = (e, communityAddress) => {
    if (e.target.type === "checkbox") return;
    setIsMovingModal(true);
    setCurrentCommunityAddress(communityAddress);
  };

  const handleCommunityChecked = (e) => {
    if (e.target.checked === false) {
      const newCommunityChecked = communityChecked.filter(
        (data) => data !== e.target.value
      );
      setCommunityChecked(newCommunityChecked);
      return;
    }
    setCommunityChecked([...communityChecked, e.target.value]);
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
                <CopyToClipboard
                  text={managerData?.admin.address}
                  onCopy={() => setIsCopied(true)}
                >
                  <div
                    style={{
                      padding: "0.3rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {`${
                      managerData
                        ? managerData.admin.address.substring(0, 4)
                        : null
                    }...${
                      managerData
                        ? managerData.admin.address.substring(37)
                        : null
                    }`}
                    <FileCopyOutlinedIcon
                      style={{ color: "grey", fontSize: "medium" }}
                    />
                  </div>
                </CopyToClipboard>

                {/* copy alert */}
                <Snackbar
                  open={isCopied}
                  autoHideDuration={3000}
                  onClose={() => setIsCopied(false)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <Alert
                    variant="filled"
                    onClose={() => setIsCopied(false)}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Copied to clipboard!
                  </Alert>
                </Snackbar>
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
            <div>
              {communityChecked?.length > 0 ? (
                <>
                  <button
                    style={{
                      backgroundColor: "#5270ff",
                      color: "#ffffff",
                      borderRadius: "0.3rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenUpdate(true)}
                  >
                    update
                  </button>
                  <button
                    style={{
                      backgroundColor: "#5270ff",
                      color: "#ffffff",
                      borderRadius: "0.3rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenDelete(true)}
                  >
                    delete
                  </button>
                </>
              ) : null}

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
            </div>

            {/* add community modal */}
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

            {/* delete community modal */}
            <Dialog open={openDelete}>
              <DialogTitle>Delete Community</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete community?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ color: "#5270ff" }}
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                  onClick={handleDeleteCommunity}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            {/* update community modal */}
            <Dialog open={openUpdate}>
              <DialogTitle>Update Community</DialogTitle>
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
                <Button
                  sx={{ color: "#5270ff" }}
                  onClick={() => setOpenUpdate(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                  onClick={handleUpdateCommunity}
                >
                  Update
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="community">
            <List>
              {managerData?.communities.map((data) => {
                return (
                  <ListItem key={data._id} disablePadding>
                    <ListItemButton
                      onClick={(e) => handleMoveCommunity(e, data.address)}
                    >
                      <ListItemIcon>
                        <input
                          value={data.address}
                          type="checkbox"
                          onChange={handleCommunityChecked}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={data.alias}
                        secondary={`${data.address?.substring(
                          0,
                          4
                        )}...${data.address?.substring(37)}`}
                      />
                      <Stack style={{ alignItems: "center" }}>
                        {data.address ===
                        localStorage.getItem("currentCommunity") ? (
                          <Chip
                            sx={{
                              height: "auto",
                              width: "5rem",
                              "& .MuiChip-label": {
                                display: "block",
                                whiteSpace: "normal",
                              },
                            }}
                            label={`current`}
                            variant="outlined"
                          />
                        ) : null}
                        <Chip
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "block",
                              whiteSpace: "normal",
                            },
                          }}
                          variant="outlined"
                          label={`Created At: ${data.createdAt.substring(
                            0,
                            10
                          )}`}
                        />
                      </Stack>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            {/* confirm moving community */}
            <Dialog
              open={isMovingModal}
              onClose={() => setIsMovingModal(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Move to other Community"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to move to other community?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ color: "#5270ff" }}
                  onClick={() => setIsMovingModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                  onClick={confirmMoveCommunity}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
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
