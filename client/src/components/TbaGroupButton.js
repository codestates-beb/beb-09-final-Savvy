import React, { useState, useEffect } from "react";
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
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// api
import { createTbaGroup } from "../api/post-tba-group";

const TRANSITION_DURATION = 350;

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
  right: "-8px",
  top: "190%",
  transform: "translateY(-50%)",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  borderRadius: "10px",
  transition: "background-color 0.5s ease",
  backgroundColor: "#576ff6",
  "&:hover": {
    backgroundColor: "#3351e2",
  },
  whiteSpace: "nowrap",
});

const BlueButton = styled(Button)(({ theme, cancelButton }) => ({
  width: "41.7%",
  height: "40px",
  fontSize: "12px",
  fontWeight: "600",
  margin: "7px",
  borderRadius: "10px",
  backgroundColor: cancelButton ? "#f88181" : "#576ff6",
  color: "#fff",
  "&:hover": {
    backgroundColor: cancelButton ? "#eb6363" : "#3351e2",
  },
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ".MuiDialog-paper": {
    borderRadius: "15px",
    width: "300px",
    height: "240px",
    maxWidth: "none",
  },
  "& .MuiDialogTitle-root": {
    userSelect: "none",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
  },
  "& .MuiDialogContent-root": {
    userSelect: "none",
    textAlign: "center",
  },
  "& .MuiDialogContentText-root": {
    userSelect: "none",
    fontSize: "15px",
    fontWeight: "600",
  },
}));

const CenteredDialogActions = styled(DialogActions)({
  justifyContent: "center",
});

// const SnackbarWrapper = styled("div")({
//   position: "fixed",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   bottom: "30px",
//   left: "50%",
//   transform: "translateX(-50%)",
//   zIndex: 9999,
// });

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" ref={ref} timeout={TRANSITION_DURATION} {...props} />
  );
});

export default function TbaGroupButton({ selectedItems }) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { address } = useParams();

  useEffect(() => {
    const preventCopy = (e) => {
      e.preventDefault();
      alert("Copying text is not allowed on this page!");
    };

    const preventCut = (e) => {
      e.preventDefault();
      alert("Cutting text is not allowed on this page!");
    };

    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCut);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCut);
    };
  }, []);

  const handleClose = () => setOpen(false);

  const handleCreateGroup = async () => {
    // const tbaIds = selectedItems.map((item) => item.id);
    const response = await createTbaGroup(address, groupName, selectedItems);
    setOpen(false);
    setOpenSnackbar(true);
    setGroupName("");
    console.log("response:", response);
  };

  const selectedItemsLength = selectedItems.length;

  return (
    <div
      className="page-content"
      style={{ userSelect: "none", overflow: "visible" }}
    >
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Create New Group
      </StyledButton>

      <StyledDialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        transitionDuration={TRANSITION_DURATION}
      >
        <DialogTitle
          style={{ fontSize: "14px", fontWeight: "bold", color: "#272727" }}
        >
        <img src={process.env.PUBLIC_URL + '/createnewgroup.png'} alt="icon" style={{ width: "9%", verticalAlign: 'middle', marginRight: '7px' }} />
          Create New Group
        </DialogTitle>
        <div
          style={{
            width: "90%",
            border: "1px solid transparent",
            borderImage: "linear-gradient(100deg, #f8f8f8, #576ff6, #f8f8f8)",
            borderImageSlice: 1,
            marginLeft: "18px",
            marginTop: "-3px",
          }}
        />
        <DialogContent
          style={{ marginTop: "5px", overflow: "hidden", position: "relative" }}
        >
          <DialogContentText
            style={{
              width: "38%",
              height: "25px",
              fontSize: "13px",
              fontWeight: "bold",
              color: "#fff",
              marginLeft: "31.5%",
              overflow: "hidden",
              marginBottom: "0px",
              backgroundColor: "#576ff6",
              borderRadius: "5px",
              position: "relative",
              top: "-10px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            {`Selected: ${selectedItemsLength}`}
          </DialogContentText>

          <TextField
            sx={{
              width: "100%",
              height: "50px",
              whiteSpace: "nowrap",
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              borderRadius: "10px",
              marginTop: "5px",
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
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
        </DialogContent>
        <CenteredDialogActions>
          <BlueButton cancelButton onClick={handleClose}>
            Cancel
          </BlueButton>
          <BlueButton onClick={handleCreateGroup}>Create</BlueButton>
        </CenteredDialogActions>
      </StyledDialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Group created successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity="success"
          sx={{ width: "100%", whiteSpace: "nowrap" }}
        >
          Group created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
