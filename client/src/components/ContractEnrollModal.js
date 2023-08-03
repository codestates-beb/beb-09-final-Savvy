import React from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  Slide
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} timeout={{ enter: 350, exit: 350 }} {...props} />;
});

function ContractEnrollModal({ open, handleClose, contractInput, setContractInput, handleEnroll }) {

  const preventCopy = (e) => {
    e.preventDefault();
    alert('Text copying is not allowed.');
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onCopy={preventCopy}
      style={{ userSelect: "none" }}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          width: '500px',
          height: 'auto',
          borderRadius: '20px',
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        },
      }}
    >

      <video width="100%" autoPlay loop muted>
        <source src={process.env.PUBLIC_URL + '/Second3.mp4'} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <DialogTitle style={{ color: "#272727", textAlign: "center", fontSize: "16px", fontWeight: "600" }}>
        <img src={process.env.PUBLIC_URL + '/contractImage.png'} alt="icon" style={{ width: "5%", verticalAlign: 'middle', marginRight: '8px' }} />
        Enroll new Contract
      </DialogTitle>

      <div
        style={{
          width: "100%",
          borderTop: "1px solid #e3e3e3",
          marginBottom: "0px",
        }}
      />

      <DialogContent style={{ background: "#fff" }}>
        <DialogContentText style={{ fontSize: "13px", fontWeight: "300", marginBottom: "16px", marginTop: "-5px" }}>
          To airdrop items to community members, please{" "}
          <b>Enroll your contract</b> Here Then, you can send items at{" "}
          <Link to="/airdrop" style={{ textDecoration: "none", color: "#5270ff" }}>
            <b>Airdrop page</b>
          </Link>
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
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              }
            },
            '& .MuiInputLabel-root': {
              color: '#a6a4a4',
              fontSize: '12px',
              fontWeight: 'bold',
            },
            '& .MuiOutlinedInput-input::placeholder': {
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#8d8c8c',
            },
          }}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          placeholder="e.g. My NFT"
          value={contractInput.name}
          onChange={(e) =>
            setContractInput({ ...contractInput, name: e.target.value })
          }
        />

        <TextField
          sx={{
            width: "100%",
            height: "50px",
            whiteSpace: "nowrap",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            marginTop: "20px",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              }
            },
            '& .MuiInputLabel-root': {
              color: '#a6a4a4',
              fontSize: '12px',
              fontWeight: 'bold',
            },
            '& .MuiMenuItem-root': {
              fontSize: '12px',
            },
          }}
          margin="dense"
          id="type"
          label="Type"
          select
          fullWidth
          variant="outlined"
          defaultValue={"ERC721"}
          value={contractInput.type}
          onChange={(e) =>
            setContractInput({ ...contractInput, type: e.target.value })
          }
        >

          {["ERC20", "ERC721", "ERC1155"].map((option) => (
            <MenuItem key={option} value={option} sx={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#666',
            }}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          sx={{
            width: "100%",
            height: "50px",
            whiteSpace: "nowrap",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            borderRadius: "10px",
            marginBottom: "-5px",
            marginTop: "20px",
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              }
            },
            '& .MuiInputLabel-root': {
              color: '#a6a4a4',
              fontSize: '12px',
              fontWeight: 'bold',
            },
            '& .MuiOutlinedInput-input::placeholder': {
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#8d8c8c',
            },
          }}
          autoFocus
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          variant="outlined"
          placeholder="e.g. 0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81234"
          value={contractInput.address}
          onChange={(e) =>
            setContractInput({ ...contractInput, address: e.target.value })
          }
        />
      </DialogContent>

      <DialogActions style={{ background: "#fff", justifyContent: "space-between", padding: "16px 24px" }}>
        <Button
          sx={{
            backgroundColor: "#f88181",
            color: "#fff",
            width: "30%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "600",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#eb6363",
            },
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "#576ff6",
            color: "#fff",
            width: "30%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "600",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "#3351e2",
            },
          }}
          onClick={handleEnroll}
        >
          Enroll
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContractEnrollModal;