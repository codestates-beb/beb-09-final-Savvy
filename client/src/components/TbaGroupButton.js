import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// api
import { createTbaGroup } from "../api/post-tba-group";

const StyledButton = styled(Button)({
  width: "auto",
  height: "40px",
  marginTop: "-123px",
  marginRight: "110px",
  color: "#fff",
  fontSize: "11px",
  fontWeight: "600",
  userSelect: "none",
  position: "absolute",
  right: "0px",
  top: "190%",
  transform: "translateY(-50%)",
  boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  transition: "background-color 0.5s ease",
  backgroundColor: "#576ff6",
  "&:hover": {
    backgroundColor: "#3351e2",
  },
});

export default function TbaGroupButton({ selectedItems }) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { address } = useParams();

  const handleClose = () => setOpen(false);

  const handleCreateGroup = async () => {
    // const tbaIds = selectedItems.map((item) => item.id);
    const response = await createTbaGroup(address, groupName, selectedItems);
    setOpen(false);
    setOpenSnackbar(true);
    setGroupName("");
    console.log("response:", response);
  };

  console.log("selectedItems:", selectedItems);
  const selectedItemsLength = selectedItems.length;
  console.log("selectedItemsLength:", selectedItemsLength);

  return (
    <div className="page-content">
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Create New Group
      </StyledButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Selected: ${selectedItemsLength}`}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateGroup}>Create</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Group created successfully"
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Group created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
