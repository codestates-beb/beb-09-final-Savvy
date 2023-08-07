import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setContractData } from "../reducers/contractReducer";
import "../assets/AirdropPageContent.css";
import {
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TBA_GROUP } from "../assets/DUMMY_DATA";
import AirdropProgressModal from "./AirdropProgressModal";

// api
import { airdrop } from "../api/post-airdrop";
import { getAllTbaGroup } from "../api/get-all-tba-group";
import { getContract } from "../api/get-contract";

const boxStyle1 = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "15rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  overflow: "auto",
  boxSizing: "border-box",
  marginTop: "2.1rem",
  marginLeft: "0.5rem",
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
};

const boxStyle2 = {
  gridColumn: "1 / 3",
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  height: "15rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  marginLeft: "0.5rem",
};

const boxStyle3 = {
  gridColumn: "1 / 3",
  display: "flex",
  justifyContent: "center",
};

const listItemTextStyle = {
  color: "#666",
  "& .MuiListItemText-primary": {
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
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

export default function AirdropPageContent({ web3Auth }) {
  const contractData = useSelector((state) => state.contract.contractData);
  const dispatch = useDispatch();

  const [tbaGroupData, setTbaGroupData] = useState([]);
  const [openProgress, setOpenProgress] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [contract, setContract] = useState({
    _id: "",
    alias: "",
    type: "",
    address: "",
    community_id: "",
  });
  const [amounts, setAmounts] = useState("");
  const [tokenIds, setTokenIds] = useState("");

  const selectedTbaGroup = tbaGroupData?.filter((group, idx) => {
    return selectedGroup.includes(idx.toString());
  });

  const selectedTbaAddress = selectedTbaGroup?.map((group) => {
    return group.TBAs.map((tba) => {
      return tba.address;
    });
  });

  useEffect(() => {
    function disableTextSelection(event) {
      event.preventDefault();
    }

    const preventRightClick = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        alert("이미지 복사가 금지되어 있습니다.");
      }
    };

    document.addEventListener("selectstart", disableTextSelection);
    document.addEventListener("contextmenu", preventRightClick);

    return () => {
      document.removeEventListener("selectstart", disableTextSelection);
      document.removeEventListener("contextmenu", preventRightClick);
    };
  }, []);

  useEffect(() => {
    const initContract = async () => {
      const response = await getContract();
      // console.log(response);
      dispatch(setContractData(response.ContractData));
    };
    initContract();
  }, []);

  useEffect(() => {
    const initTbaGroup = async () => {
      const tbaGroup = await getAllTbaGroup();
      if (tbaGroup) {
        setTbaGroupData(tbaGroup);
      } else {
        setTbaGroupData(null);
      }
    };
    initTbaGroup();
  }, []);

  const handleGroup = (e) => {
    if (e.target.checked) {
      setSelectedGroup((prev) => [...prev, e.target.value]);
    } else {
      setSelectedGroup((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    }
  };

  const handleOption = (option) => {
    setContract(option);
  };

  const handleExecute = async () => {
    setOpenProgress(true);
    console.log(contract.address);
    const response = await airdrop(
      web3Auth,
      contract.address,
      contract.type,
      amounts,
      tokenIds,
      selectedTbaAddress
    );
    console.log("response:", response);
  };

  return (
    <div className="page-content" onCopy={(e) => e.preventDefault()}>
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>Airdrop</span>
      </div>
      <div className="content">
        <Box sx={boxStyle1}>
          {/* Customized TBA group */}
          <div className="subtitle" style={textStyle1}>
            Customized TBA group
          </div>
          <List>
            {/* Mapping TBA groups */}
            {tbaGroupData?.map((group, idx) => {
              return (
                <div key={group.name} id={idx}>
                  <ListItem
                    sx={{
                      bgcolor: "#fff",
                      color: "#fff",
                      marginTop: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "1rem",
                    }}
                    disablePadding
                    secondaryAction={
                      <Checkbox
                        value={idx}
                        edge="end"
                        onChange={(e) => handleGroup(e)}
                        sx={{
                          color: "#d0cfcf",
                          "&.Mui-checked": { color: "#576ff6" },
                        }}
                      />
                    }
                  >
                    <ListItemButton>
                      <ListItemText
                        primary={`${group.name}`}
                        sx={{ ...listItemTextStyle }}
                      />
                      <ListItemText
                        style={{ textAlign: "right" }}
                        primary={
                          <div>
                            <Chip
                              sx={{
                                bgcolor: "#5270ff",
                                color: "#fff",
                                fontSize: "0.8rem",
                                fontWeight: "700",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                              }}
                              label={`total: ${group.TBAs.length}`}
                            />
                          </div>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ visibility: "hidden" }} />
                </div>
              );
            })}
          </List>
        </Box>

        {/* Selected TBA */}
        <Box sx={boxStyle1} style={{ paddingTop: "0" }}>
          <div
            className="subtitle"
            style={{
              textAlign: "center",
              margin: "0 auto",
              paddingTop: "1rem",
              fontFamily: "'tektur', sans-serif",
              fontSize: "1.1rem",
              fontWeight: "800",
              color: "#576ff6",
              backgroundColor: "#fff",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid transparent",
              borderImage: "linear-gradient(100deg, #f8f8f8, #576ff6, #f8f8f8)",
              borderImageSlice: 1,
            }}
          >
            Selected TBA
          </div>
          <List style={{ overflow: "auto" }}>
            {selectedTbaGroup?.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/AirdropPageimage.gif`}
                  alt="Dummy"
                  style={{
                    marginTop: "23px",
                    marginLeft: "2px",
                    width: "120px",
                    pointerEvents: "none",
                    userDrag: "none",
                    WebkitUserDrag: "none",
                  }}
                />
              </div>
            ) : (
              selectedTbaGroup?.map((group, idx) => {
                return group.TBAs.map((tba) => (
                  <div key={tba._id} id={idx}>
                    <ListItem
                      sx={{
                        width: "96.5%",
                        marginLeft: "0.5rem",
                        bgcolor: "#fff",
                        color: "#fff",
                        marginTop: "0.5rem",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        borderRadius: "1rem",
                      }}
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText
                          primary={`${tba.address?.substring(
                            0,
                            5
                          )}...${tba.address?.substring(38)}`}
                          sx={{ ...listItemTextStyle }}
                        />
                        <ListItemText
                          style={{ textAlign: "right" }}
                          primary={
                            <div>
                              <Chip
                                sx={{
                                  bgcolor: "#5270ff",
                                  color: "#fff",
                                  fontSize: "0.8rem",
                                  fontWeight: "700",
                                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                                }}
                                label={`level: ${tba.level}`}
                              />
                            </div>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider sx={{ visibility: "hidden" }} />
                  </div>
                ));
              })
            )}
          </List>
        </Box>

        {/* Airdrop Options */}
        <Box sx={boxStyle2}>
          <div className="subtitle" style={textStyle1}>
            Airdrop Options
          </div>
          <FormControl
            variant="filled"
            style={{
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "1rem",
              marginTop: "1.2rem",
              width: "100%",
              minWidth: "15rem",
              borderBottom: "none",
            }}
            required
          >
            <InputLabel
              id="select-contract-label"
              sx={{
                color: "#666",
                fontSize: "0.8rem",
                fontWeight: "bold",
                marginLeft: "0.1rem",
                marginTop: "0.3rem",
              }}
            >
              Select Contract
            </InputLabel>
            <Select
              labelId="select-contract-label"
              id="select-contract"
              label="Select Contract"
              variant="filled"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                backgroundColor: "#fff",
                "&.MuiFilledInput-root": {
                  borderRadius: "1rem",
                  paddingTop: "0.4rem",
                  "&:after, &:before": {
                    display: "none",
                  },
                },
                "&.MuiFilledInput-root:hover, &.MuiFilledInput-root.Mui-focused":
                  {
                    borderRadius: "1rem",
                    "&:before": {
                      borderBottom: "none !important",
                    },
                  },
                "&.MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
                "&.MuiFilledInput-underline:after": {
                  borderBottom: "none",
                },
                "&.MuiFilledInput-underline:before": {
                  borderBottom: "none",
                },
              }}
            >
              <MenuItem value="">
                <em
                  style={{
                    color: "#fff",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    fontFamily: "'tektur', sans-serif",
                    fontStyle: "normal",
                    padding: "0.4rem",
                    width: "100%",
                    display: "block",
                    textAlign: "center",
                    backgroundColor: "#f88181",
                    borderRadius: "0.7rem",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                  }}
                >
                  None
                </em>
              </MenuItem>
              {contractData
                ? contractData.map((option) => (
                    <MenuItem
                      onClick={() => handleOption(option)}
                      key={option._id}
                      value={option._id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderRadius: "0.7rem",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                        marginLeft: "1rem",
                        marginRight: "1.1rem",
                      }}
                    >
                      <Chip
                        label={option.type}
                        size="small"
                        sx={{
                          bgcolor: "#5270ff",
                          color: "#fff",
                          fontSize: "0.7rem",
                          fontWeight: "600",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: "600",
                          color: "#666",
                          fontSize: "0.8rem",
                          margin: "0.3rem",
                        }}
                      >
                        {`${option.alias}(${option.address?.substring(
                          0,
                          5
                        )}...${option.address?.substring(38)})`}
                      </div>
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {contract.type === "ERC721" ? (
              <div>
                <TextField
                  value={tokenIds}
                  onChange={(e) => setTokenIds(e.target.value)}
                  helperText="You need to input token ID same as the number of selected TBA"
                  placeholder="e.g. 1, 2, 3, 4, ..."
                  id="outlined-basic"
                  label="Token ID"
                  variant="filled"
                  style={{
                    marginTop: "1.6rem",
                    width: "100%",
                    minWidth: "10rem",
                  }}
                  required
                  InputLabelProps={{
                    style: {
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color: "#666",
                      marginLeft: "0rem",
                      marginTop: "-0.1rem",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      height: "3rem",
                      fontSize: "0.85rem",
                      marginTop: "0rem",
                      backgroundColor: "#fff",
                      borderRadius: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                      marginLeft: "0.2rem",
                      fontSize: "0.7rem",
                      whiteSpace: "nowrap",
                      fontWeight: "600",
                      color: "#9b9b9b",
                      width: "100%",
                    },
                  }}
                />
              </div>
            ) : contract.type === "ERC20" ? (
              <div style={{ backgroundColor: "#fff", marginTop: "1.5rem" }}>
                <TextField
                  value={amounts}
                  onChange={(e) => setAmounts(e.target.value)}
                  helperText="You need to input token amount same as the number of selected TBA"
                  placeholder="e.g. 100, 110, 110, 20, ..."
                  id="outlined-basic"
                  label="Amount"
                  variant="filled"
                  style={{
                    marginTop: "1.6rem",
                    width: "100%",
                    minWidth: "10rem",
                  }}
                  required
                  InputLabelProps={{
                    style: {
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      color: "#666",
                      marginLeft: "0rem",
                      marginTop: "-1.7rem",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      height: "3rem",
                      fontSize: "0.85rem",
                      marginTop: "-1.5rem",
                      backgroundColor: "#fff",
                      borderRadius: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                  FormHelperTextProps={{
                    style: {
                      marginTop: "0.5rem",
                      marginBottom: "0.5rem",
                      marginLeft: "0.2rem",
                      fontSize: "0.7rem",
                      whiteSpace: "nowrap",
                      fontWeight: "600",
                      color: "#9b9b9b",
                      width: "100%",
                    },
                  }}
                />
              </div>
            ) : (
              <>
                <div style={{ marginRight: "1.2rem" }}>
                  <TextField
                    value={tokenIds}
                    onChange={(e) => setTokenIds(e.target.value)}
                    helperText="You need to input token ID same as the number of selected TBA"
                    placeholder="e.g. 1, 2, 3, 4, ..."
                    id="outlined-basic"
                    label="Token ID"
                    variant="filled"
                    style={{
                      marginTop: "2rem",
                      width: "100%",
                      minWidth: "10rem",
                    }}
                    required
                    InputLabelProps={{
                      style: {
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        color: "#666",
                        marginLeft: "0.1rem",
                        marginTop: "-0.1rem",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        height: "3rem",
                        fontSize: "0.85rem",
                        backgroundColor: "#fff",
                        borderRadius: "0.5rem",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                    FormHelperTextProps={{
                      style: {
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        marginLeft: "0.15rem",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        color: "#9b9b9b",
                        width: "100%",
                      },
                    }}
                  />
                </div>
                <div style={{ marginLeft: "1.2rem" }}>
                  <TextField
                    value={amounts}
                    onChange={(e) => setAmounts(e.target.value)}
                    helperText="You need to input token amount same as the number of selected TBA"
                    placeholder="e.g. 100, 110, 110, 20, ..."
                    id="outlined-basic"
                    label="Amount"
                    variant="filled"
                    style={{
                      marginTop: "2rem",
                      width: "100%",
                      marginRight: "1rem",
                      minWidth: "10rem",
                    }}
                    required
                    InputLabelProps={{
                      style: {
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        color: "#666",
                        marginLeft: "0.1rem",
                        marginTop: "-0.1rem",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        height: "3rem",
                        fontSize: "0.85rem",
                        backgroundColor: "#fff",
                        borderRadius: "0.5rem",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                    FormHelperTextProps={{
                      style: {
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        marginLeft: "0.15rem",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        color: "#9b9b9b",
                        width: "100%",
                      },
                    }}
                  />
                </div>
              </>
            )}
          </div>
          <Divider sx={{ visibility: "hidden" }} />
        </Box>

        {/* Exeute Button */}
        <div style={boxStyle3}>
          <Button
            sx={{
              width: "200px",
              height: "45px",
              fontSize: "13px",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: "auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",
              backgroundColor: "#576ff6",
              "&:hover": {
                backgroundColor: "#3351e2",
              },
              transition: "background-color 0.5s ease",
            }}
            onClick={handleExecute}
            variant="contained"
          >
            Execute
          </Button>
        </div>
      </div>

      {/* progress dialog */}
      <AirdropProgressModal
        open={openProgress}
        onClose={() => setOpenProgress(false)}
      />
    </div>
  );
}
