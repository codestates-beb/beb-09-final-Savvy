import React, { useState, useRef, useEffect } from "react";
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
  Slide,
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

const TRANSITION_DURATION = 350;

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" ref={ref} timeout={TRANSITION_DURATION} {...props} />
  );
});

const boxStyle1 = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "14.5rem",
  marginTop: "2.1rem",
  marginLeft: "0.5rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  overflow: "hidden",
};

const boxStyle2 = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "19rem",
  marginLeft: "0.5rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  overflowY: "auto",
};

const textStyle1 = {
  fontFamily: "'tektur', sans-serif",
  fontSize: "1.1rem",
  fontWeight: "800",
  color: "#576ff6",
  backgroundColor: "#fff",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid transparent",
  borderImage: "linear-gradient(100deg, #f8f8f8, #576ff6, #f8f8f8)",
  borderImageSlice: 1,
  textAlign: "center",
  margin: "0 auto",
  userSelect: "none",
};

const CommunitytextStyle = {
  fontFamily: "'tektur', sans-serif",
  fontSize: "1.1rem",
  fontWeight: "800",
  color: "#576ff6",
  backgroundColor: "#fff",
  paddingBottom: "0.5rem",
  borderImageSlice: 1,
  marginTop: "0.3rem",
  textAlign: "left",
  margin: "0 auto",
  userSelect: "none",
  whiteSpace: "nowrap",
};

const styles = {
  pageContent: {
    display: "flex",
    color: "#576ff6",
    fontSize: "38px",
    fontWeight: "bold",
    marginTop: "-7px",
    marginLeft: "10px",
    userSelect: "none",
    fontFamily: "'tektur', sans-serif",
    userSelect: "none",
  },
  textWithBackground: {
    display: "inline-block",
    background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    marginTop: "2rem",
  },
};

export default function ManagerPageContent({ web3Auth }) {
  const managerData = useSelector((state) => state.manager.managerData);
  console.log(managerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videoRef = useRef(null);

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
    // console.log(managerData);
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
    if (CommunityData === 404) {
      alert("Community already exists.");
      setOpenAdd(false);
      setCommunityAddress("");
      setCommunityName("");
      return;
    }
    const newCommunity = [...managerData.communities, CommunityData];
    dispatch(
      setManagerData({
        admin: managerData.admin,
        communities: newCommunity,
        items: managerData.items,
      })
    );
    setCommunityAddress("");
    setCommunityName("");
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
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>Manager</span>
      </div>
      <div className="content">
        <Box sx={boxStyle1}>
          <div style={textStyle1}>Admin information</div>
          <div style={{ display: "flex", margin: "1rem" }}>
            <img
              style={{
                width: "10.5rem",
                height: "10.5rem",
                marginTop: "0.5rem",
                borderRadius: "2rem",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              }}
              src={managerData ? managerData.admin.profileImage : null}
            ></img>
            <div style={{ padding: "1rem" }}>
              <div className="admin-info-content">
                <Chip
                  label="Name"
                  sx={{
                    bgcolor: "transparent",
                    color: "#272727",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginLeft: "-0.5rem",
                    marginTop: "-1.9rem",
                    userSelect: "none",
                  }}
                />
                {managerData ? (
                  <div
                    className="nft-list"
                    key={managerData.admin.name}
                    style={{
                      width: "20vw",
                      color: "#666",
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "8px",
                      marginBottom: "0.3rem",
                      marginTop: "-0.3rem",
                      marginLeft: "-2.9rem",
                      whiteSpace: "nowrap",
                      borderColor: "#fff",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{managerData.admin.name}</div>
                  </div>
                ) : null}
              </div>
              <div className="admin-info-content">
                <Chip
                  label="Email"
                  sx={{
                    bgcolor: "transparent",
                    color: "#272727",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginLeft: "-0.5rem",
                    marginTop: "-0.3rem",
                    userSelect: "none",
                  }}
                />
                {managerData ? (
                  <div
                    className="nft-list"
                    key={managerData.admin.email}
                    style={{
                      width: "20vw",
                      height: "30px",
                      lineHeight: "30px",
                      color: "#666",
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "8px",
                      marginBottom: "0.3rem",
                      marginTop: "1.4rem",
                      marginLeft: "-2.9rem",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div>{managerData.admin.email}</div>
                  </div>
                ) : null}
              </div>
              <div className="admin-info-content">
                <Chip
                  sx={{
                    bgcolor: "transparent",
                    color: "#272727",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginLeft: "-0.5rem",
                    marginTop: "-0.1rem",
                    userSelect: "none",
                  }}
                  label="Address"
                />
                {managerData ? (
                  <CopyToClipboard
                    text={managerData.admin.address}
                    onCopy={() => setIsCopied(true)}
                  >
                    <div
                      className="address-list"
                      key={managerData.admin.address}
                      style={{
                        width: "20vw",
                        height: "30px",
                        lineHeight: "30px",
                        color: "#666",
                        fontSize: "12px",
                        fontWeight: "bold",
                        userSelect: "none",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                        marginBottom: "0.3rem",
                        marginTop: "1.6rem",
                        marginLeft: "-3.83rem",
                        whiteSpace: "nowrap",
                        backgroundColor: "#fff",
                        borderColor: "#fff",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        {`${managerData.admin.address?.substring(
                          0,
                          4
                        )}...${managerData.admin.address?.substring(30)}`}
                      </div>
                      <FileCopyOutlinedIcon
                        style={{
                          color: "#666",
                          fontSize: "medium",
                          marginBottom: "-0.1rem",
                          marginLeft: "0.3rem",
                        }}
                      />
                    </div>
                  </CopyToClipboard>
                ) : null}

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
          <div style={textStyle1}>Balance</div>
          <div
            style={{
              display: "flex",
              margin: "1rem",
              height: "11.3rem",
              justifyContent: "space-between",
              overflow: "auto",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "1rem",
              borderBottom: "none",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "135px",
                left: "0",
                right: "0",
                borderBottom: "1px solid #e0e1e2",
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                bottom: "90px",
                left: "0",
                right: "0",
                borderBottom: "1px solid #e0e1e2",
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                bottom: "45px",
                left: "0",
                right: "0",
                borderBottom: "1px solid #e0e1e2",
              }}
            ></div>

            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                borderBottom: "1px solid #e0e1e2",
              }}
            ></div>
            <div>
              <div
                className="balance-category"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "transparent",
                  color: "#272727",
                  width: "5rem",
                  height: "1.8rem",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginLeft: "2.1rem",
                  userSelect: "none",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/managerToken.png"}
                  alt="icon"
                  style={{
                    width: "25px",
                    verticalAlign: "middle",
                    marginRight: "5px",
                  }}
                />
                Token
              </div>
              <ul
                className="balance-ul"
                style={{
                  bgcolor: "transparent",
                  color: "#576ff6",
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginLeft: "1rem",
                  width: "8rem",
                  marginTop: "1rem",
                  userSelect: "none",
                  borderRadius: "5px",
                }}
              >
                <li
                  style={{
                    marginBottom: "0.5rem",
                    marginTop: "0.8rem",
                    width: "100px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    borderRadius: "10px",
                  }}
                >
                  {`ETH`}
                </li>
                {managerData?.items?.tokens?.map((data) => {
                  return (
                    <li
                      key={data.tokenName}
                      style={{
                        marginBottom: "0.5rem",
                        marginTop: "0.8rem",
                        width: "100px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        borderRadius: "10px",
                      }}
                    >
                      {data.tokenSymbol?.substring(0, 6)}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <div
                className="balance-category"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "5rem",
                  height: "1.8rem",
                  marginLeft: "-7.15rem",
                  userSelect: "none",
                  textAlign: "center",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/managerAmount.png"}
                  alt="icon"
                  style={{
                    width: "27px",
                    verticalAlign: "middle",
                    marginRight: "3px",
                  }}
                />
                Amount
              </div>
              <ul
                className="balance-ul"
                style={{
                  width: "8rem",
                  bgcolor: "transparent",
                  color: "#576ff6",
                  fontSize: "13px",
                  fontWeight: "bold",
                  marginLeft: "-8rem",
                  marginTop: "1rem",
                  userSelect: "none",
                }}
              >
                <li
                  style={{
                    marginBottom: "0.5rem",
                    marginTop: "0.8rem",
                    width: "100px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    borderRadius: "10px",
                  }}
                >
                  {managerData?.admin?.ethBalance?.substring(0, 6)}
                </li>
                {managerData?.items?.tokens?.map((data) => {
                  return (
                    <li
                      key={data.tokenName}
                      style={{
                        marginBottom: "0.5rem",
                        marginTop: "0.8rem",
                        width: "100px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        borderRadius: "10px",
                      }}
                    >
                      {data.tokenAmount?.substring(0, 6) || "0"}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Box>
        <Box sx={boxStyle2}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={CommunitytextStyle}>Community list</div>
            <div>
              {communityChecked?.length > 0 ? (
                <>
                  <button
                    style={{
                      backgroundColor: "#576ff6",
                      color: "#fff",
                      borderRadius: "0.5rem",
                      width: "4rem",
                      height: "2rem",
                      border: "none",
                      cursor: "pointer",
                      userSelect: "none",
                      fontSize: "13px",
                      fontWeight: "bold",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={() => setOpenUpdate(true)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      backgroundColor: "#576ff6",
                      color: "#fff",
                      borderRadius: "0.5rem",
                      width: "4rem",
                      height: "2rem",
                      border: "none",
                      cursor: "pointer",
                      userSelect: "none",
                      fontSize: "13px",
                      fontWeight: "bold",
                      marginLeft: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={() => setOpenDelete(true)}
                  >
                    Delete
                  </button>
                </>
              ) : null}

              <button
                style={{
                  backgroundColor: "#576ff6",
                  color: "#fff",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  width: "2rem",
                  height: "2rem",
                  fontSize: "12px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginLeft: "0.5rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                }}
                onClick={handleOpenAdd}
              >
                +
              </button>
            </div>

            {/* add community modal */}
            <Dialog
              open={openAdd}
              sx={{
                "& .MuiDialog-paper": {
                  width: "415px",
                  height: "290px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <DialogTitle
                style={{
                  color: "#272727",
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/manageraddModal.png"}
                  alt="icon"
                  style={{
                    width: "25px",
                    verticalAlign: "middle",
                    marginRight: "8px",
                  }}
                />
                Add Community
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <TextField
                    sx={{
                      width: "100%",
                      height: "50px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "-5px",
                      marginTop: "10px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#a6a4a4",
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#8d8c8c",
                      },
                    }}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. My Community"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      height: "50px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "-5px",
                      marginTop: "25px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#a6a4a4",
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#8d8c8c",
                      },
                    }}
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. 0x2B839411985B474B725fd5E562E7969172F58f55"
                    value={communityAddress}
                    onChange={(e) => setCommunityAddress(e.target.value)}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: "#f88181",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    marginRight: "14.5px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#eb6363",
                    },
                  }}
                  onClick={handleCloseAdd}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#576ff6",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginRight: "17px",
                    marginBottom: "8px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#3351e2",
                    },
                  }}
                  onClick={handleAddCommunity}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>

            {/* delete community modal */}
            <Dialog
              open={openDelete}
              sx={{
                "& .MuiDialog-paper": {
                  width: "360px",
                  height: "180px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <DialogTitle
                sx={{
                  color: "#272727",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginTop: "8px",
                  marginLeft: "68px",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/managerdeleteModal.png"}
                  alt="icon"
                  style={{
                    width: "24px",
                    verticalAlign: "middle",
                    marginRight: "10px",
                  }}
                />
                Delete Community
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    color: "#838383",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "5px",
                    marginLeft: "13.7px",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  Are you sure you want to delete{" "}
                  <span style={{ color: "#576ff6", fontWeight: "600" }}>
                    community?
                  </span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: "#f88181",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "5px",
                    marginRight: "10px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#eb6363",
                    },
                  }}
                  onClick={() => setOpenDelete(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#576ff6",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginRight: "14px",
                    marginBottom: "5px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#3351e2",
                    },
                  }}
                  onClick={handleDeleteCommunity}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            {/* update community modal */}
            <Dialog
              open={openUpdate}
              sx={{
                "& .MuiDialog-paper": {
                  width: "415px",
                  height: "290px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <DialogTitle
                style={{
                  color: "#272727",
                  textAlign: "center",
                  marginTop: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/managerupdateModal.png"}
                  alt="icon"
                  style={{
                    width: "25px",
                    verticalAlign: "middle",
                    marginRight: "8px",
                  }}
                />
                Update Community
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <TextField
                    sx={{
                      width: "100%",
                      height: "50px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "-5px",
                      marginTop: "10px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#a6a4a4",
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#8d8c8c",
                      },
                    }}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. My Community"
                    value={communityName}
                    onChange={(e) => setCommunityName(e.target.value)}
                  />
                  <TextField
                    sx={{
                      width: "100%",
                      height: "50px",
                      whiteSpace: "nowrap",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "-5px",
                      marginTop: "25px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "transparent",
                        },
                        "&:hover fieldset": {
                          borderColor: "transparent",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "transparent",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#a6a4a4",
                        fontSize: "12px",
                        fontWeight: "bold",
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "#8d8c8c",
                      },
                    }}
                    autoFocus
                    margin="dense"
                    id="address"
                    label="Address"
                    type="text"
                    fullWidth
                    variant="outlined"
                    placeholder="e.g. 0x2B839411985B474B725fd5E562E7969172F58f55"
                    value={communityAddress}
                    onChange={(e) => setCommunityAddress(e.target.value)}
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: "#f88181",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    marginRight: "14.5px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#eb6363",
                    },
                  }}
                  onClick={() => setOpenUpdate(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#576ff6",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginRight: "17px",
                    marginBottom: "8px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#3351e2",
                    },
                  }}
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
                  <ListItem
                    style={{
                      bgcolor: "transparent",
                      color: "#272727",
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                      marginTop: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      marginBottom: "0.7rem",
                    }}
                    key={data?._id}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={(e) => handleMoveCommunity(e, data?.address)}
                    >
                      <ListItemIcon>
                        <input
                          id={`checkbox-${data?.address}`}
                          value={data?.address}
                          type="checkbox"
                          onChange={handleCommunityChecked}
                          style={{
                            transform: "scale(1.2)",
                            cursor: "pointer",
                          }}
                        />
                        <label htmlFor={`checkbox-${data?.address}`}></label>
                      </ListItemIcon>
                      <ListItemText
                        style={{
                          userSelect: "none",
                          whiteSpace: "nowrap",
                          marginLeft: "-1rem",
                        }}
                        primary={
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: "bold",
                              color: "#000",
                            }}
                          >
                            {data?.alias}
                          </span>
                        }
                        secondary={
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#666",
                            }}
                          >
                            {`${data?.address?.substring(
                              0,
                              4
                            )}...${data?.address?.substring(37)}`}
                          </span>
                        }
                      />
                      <Stack style={{ alignItems: "center" }}>
                        {data?.address ===
                        localStorage.getItem("currentCommunity") ? (
                          <Chip
                            sx={{
                              height: "1.5rem",
                              width: "4.5rem",
                              color: "#fff",
                              fontSize: "13px",
                              fontWeight: "bold",
                              borderRadius: "5px",
                              marginBottom: "0.4rem",
                              backgroundColor: "#576ff6",
                              "& .MuiChip-label": {
                                display: "block",
                                whiteSpace: "normal",
                              },
                            }}
                            label={`current`}
                          />
                        ) : null}
                        <Chip
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              userSelect: "none",
                              whiteSpace: "nowrap",
                              fontSize: "12px",
                              fontWeight: "bold",
                              width: "auto",
                              height: "1.5rem",
                              textAlign: "center",
                              backgroundColor: "#fff",
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                              borderRadius: "5px",
                              color: "#666",
                            },
                          }}
                          label={`Created At: ${data?.createdAt?.substring(
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
              sx={{
                "& .MuiDialog-paper": {
                  width: "415px",
                  height: "190px",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <DialogTitle
                sx={{
                  color: "#272727",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginTop: "12px",
                  marginLeft: "62px",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
                id="alert-dialog-title"
              >
                <img
                  src={process.env.PUBLIC_URL + "/managermoveModal.png"}
                  alt="icon"
                  style={{
                    width: "30px",
                    verticalAlign: "middle",
                    marginRight: "10px",
                  }}
                />
                {"Move to other Community"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  sx={{
                    color: "#838383",
                    fontSize: "14px",
                    fontWeight: "400",
                    marginTop: "4px",
                    marginLeft: "14.5px",
                    userSelect: "none",
                    whiteSpace: "nowrap",
                  }}
                  id="alert-dialog-description"
                >
                  Are you sure you want to move to other{" "}
                  <span style={{ color: "#576ff6", fontWeight: "600" }}>
                    community?
                  </span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{
                    backgroundColor: "#f88181",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "5px",
                    marginRight: "11px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#eb6363",
                    },
                  }}
                  onClick={() => setIsMovingModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#576ff6",
                    color: "#fff",
                    width: "43%",
                    height: "40px",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginRight: "19px",
                    marginBottom: "5px",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#3351e2",
                    },
                  }}
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
          <div style={textStyle1}>NFT list</div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                justifyItems: "center",
                margin: "0.5rem",
              }}
            >
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "14px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Collection
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "14px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                ID
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "14px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Type
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "14px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Address
              </div>
            </div>
            <div style={{ overflow: "auto", height: "14.3rem" }}>
              {managerData?.items?.nfts?.map((data) => {
                return (
                  <div
                    className="nft-list"
                    key={data.tokenURI}
                    style={{
                      bgcolor: "transparent",
                      color: "#272727",
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                      marginTop: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <div style={{ color: "#666" }}>
                      {/* <img
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                        src={data.tokenURI}
                      ></img> */}
                      {data.name}
                    </div>
                    <div style={{ color: "#666" }}>{data.tokenId}</div>
                    <div
                      style={{
                        color: "#fff",
                        backgroundColor: "#576ff6",
                        borderRadius: "6px",
                        padding: "1px",
                        width: "4rem",
                        height: "20px",
                        textAlign: "center",
                        margin: "23px 0",
                      }}
                    >
                      {data.type}
                    </div>
                    <div style={{ color: "#666" }}>{`${data.address?.substring(
                      0,
                      4
                    )}...${data.address?.substring(38)}`}</div>
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
          sx={{
            width: "200px",
            height: "45px",
            fontSize: "13px",
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            backgroundColor: "#576ff6",
            "&:hover": {
              backgroundColor: "#3351e2",
            },
            transition: "background-color 0.5s ease",
          }}
          onClick={handleOpenLogout}
        >
          Logout
        </Button>
      </div>
      <div>
        <Dialog
          open={openLogout}
          onClose={handleCloseLogout}
          TransitionComponent={Transition}
          transitionDuration={TRANSITION_DURATION}
          sx={{
            "& .MuiDialog-paper": {
              width: "400px",
              height: "400px",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <DialogContent
            sx={{
              padding: 0,
              "&:first-child": {
                paddingTop: 0,
              },
            }}
          >
            <video
              ref={videoRef}
              width="100%"
              height="60%"
              autoPlay
              loop
              style={{
                objectFit: "cover",
              }}
            >
              <source src="/Second5.mp4" type="video/mp4" />
            </video>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "27px",
                marginTop: "-15px",
              }}
            >
              <DialogTitle
                sx={{
                  color: "#272727",
                  fontSize: "16px",
                  fontWeight: "600",
                  textAlign: "center",
                  marginTop: "27px",
                  marginLeft: "-26px",
                  userSelect: "none",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/managerlogoutModal.png"}
                  alt="icon"
                  style={{
                    width: "32px",
                    verticalAlign: "middle",
                    marginRight: "7px",
                  }}
                />
                {"Logout from Manager Page"}
              </DialogTitle>
            </div>

            <DialogContentText
              sx={{
                color: "#838383",
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "6px",
                marginLeft: "96px",
                userSelect: "none",
              }}
              id="alert-dialog-description"
            >
              Are you sure you want to{" "}
              <span style={{ color: "#576ff6", fontWeight: "600" }}>
                logout?
              </span>
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{ justifyContent: "center", marginBottom: "10px" }}
          >
            <Button
              sx={{
                backgroundColor: "#f88181",
                color: "#fff",
                width: "40%",
                height: "40px",
                fontSize: "12px",
                fontWeight: "600",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#eb6363",
                },
              }}
              onClick={handleCloseLogout}
            >
              Close
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#576ff6",
                color: "#fff",
                width: "40%",
                height: "40px",
                fontSize: "12px",
                fontWeight: "600",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#3351e2",
                },
              }}
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
