import React, { useState } from "react";
import "../assets/AirdropPageContent.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { TBA_GROUP, CONTRACTS } from "../assets/DUMMY_DATA";

const boxStyle1 = {
  backgroundColor: "#f8f8f8",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "17rem",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
  overflow: "auto",
  boxSizing: "border-box",
};

const boxStyle2 = {
  gridColumn: "1 / 3",
  backgroundColor: "#f8f8f8",
  borderRadius: "1rem",
  padding: "1rem",
  height: "15rem",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)",
};

const boxStyle3 = {
  gridColumn: "1 / 3",
  display: "flex",
  justifyContent: "center",
};

export default function AirdropPageContent() {
  const [openProgress, setOpenProgress] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [contract, setContract] = useState({
    id: 0,
    name: "",
    type: "",
    address: "",
  });

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

  const selectedTbaGroup = TBA_GROUP.filter((group, idx) => {
    return selectedGroup.includes(idx.toString());
  });

  return (
    <div className="page-content">
      <h1>Airdrop</h1>
      <div className="content">
        <Box sx={boxStyle1}>
          <div className="subtitle">Customized TBA group</div>
          <List>
            {TBA_GROUP.map((group, idx) => {
              return (
                <div key={group.name} id={idx}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <Checkbox
                        value={idx}
                        edge="end"
                        onChange={(e) => handleGroup(e)}
                      />
                    }
                  >
                    <ListItemButton>
                      <ListItemText primary={`${group.name}`} />
                      <ListItemText
                        style={{ textAlign: "right" }}
                        primary={
                          <div>
                            <Chip
                              sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                              label={`total: ${group.total}`}
                            />
                          </div>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </Box>
        <Box sx={boxStyle1} style={{ paddingTop: "0" }}>
          <div className="subtitle" style={{ paddingTop: "1rem" }}>
            Selected TBA
          </div>
          <List style={{ overflow: "auto" }}>
            {selectedTbaGroup.map((group, idx) => {
              return group.tba.map((tba) => {
                return (
                  <div key={tba.address} id={idx}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText
                          primary={`${tba.address.substring(
                            0,
                            5
                          )}...${tba.address.substring(38)}`}
                        />
                        <ListItemText
                          style={{ textAlign: "right" }}
                          primary={
                            <div>
                              <Chip
                                sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                                label={`level: ${tba.level}`}
                              />
                            </div>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </div>
                );
              });
            })}
          </List>
        </Box>
        <Box sx={boxStyle2}>
          <div className="subtitle">Airdrop Options</div>
          <FormControl
            variant="standard"
            style={{ marginTop: "1rem", width: "90%", minWidth: "15rem" }}
            required
          >
            <InputLabel id="select-contract-label">Select Contract</InputLabel>
            <Select
              labelId="select-contract-label"
              id="select-contract"
              label="Select Contract"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {CONTRACTS.map((option) => (
                <MenuItem
                  onClick={() => handleOption(option)}
                  key={option.id}
                  value={option.id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Chip
                    label={option.type}
                    size="small"
                    sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                  />
                  <div>
                    {`${option.name}(${option.address.substring(
                      0,
                      5
                    )}...${option.address.substring(38)})`}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {contract.type === "ERC721" ? (
              <div>
                <TextField
                  helperText="You need to input token ID same as the number of selected TBA"
                  placeholder="e.g. 1, 2, 3, 4, ..."
                  id="outlined-basic"
                  label="Token ID"
                  variant="standard"
                  style={{ marginTop: "1rem", width: "80%", minWidth: "10rem" }}
                  required
                />
              </div>
            ) : contract.type === "ERC20" ? (
              <div>
                <TextField
                  helperText="You need to input token amount same as the number of selected TBA"
                  placeholder="e.g. 100, 110, 110, 20, ..."
                  id="outlined-basic"
                  label="Amount"
                  variant="standard"
                  style={{ marginTop: "1rem", width: "80%", minWidth: "10rem" }}
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <TextField
                    helperText="You need to input token ID same as the number of selected TBA"
                    placeholder="e.g. 1, 2, 3, 4, ..."
                    id="outlined-basic"
                    label="Token ID"
                    variant="standard"
                    style={{
                      marginTop: "1rem",
                      width: "80%",
                      minWidth: "10rem",
                    }}
                    required
                  />
                </div>
                <div>
                  <TextField
                    helperText="You need to input token amount same as the number of selected TBA"
                    placeholder="e.g. 100, 110, 110, 20, ..."
                    id="outlined-basic"
                    label="Amount"
                    variant="standard"
                    style={{
                      marginTop: "1rem",
                      width: "80%",
                      minWidth: "10rem",
                    }}
                    required
                  />
                </div>
              </>
            )}
          </div>
        </Box>
        <div style={boxStyle3}>
          <Button
            sx={{ bgcolor: "#5270ff" }}
            onClick={() => setOpenProgress(true)}
            variant="contained"
          >
            Execute
          </Button>
        </div>
      </div>

      {/* progress dialog */}
      <Dialog open={openProgress}>
        <DialogTitle>Airdrop Progress</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>Progress bar will be displayed</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#5270ff" }}
            onClick={() => setOpenProgress(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
