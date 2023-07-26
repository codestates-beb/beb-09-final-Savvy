import React, { useState } from "react";
import "../assets/Admin.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "address", headerName: "Address", width: 300 },
];

const rows = [
  {
    id: 1,
    name: "SWT",
    type: "ERC721",
    address: "0x0xAdeb833eee668e50761B4BC8b3Ef476Dc2C869461234",
  },
  {
    id: 2,
    name: "WETH",
    type: "ERC20",
    address: "0x236eed76F276A473E96239CEfd42A353A437a0e9",
  },
  {
    id: 3,
    name: "USDS",
    type: "ERC20",
    address: "0x7E42E87B7376dbCA5e9d5E60F3b8125810E8345b",
  },
  {
    id: 4,
    name: "SAT",
    type: "ERC1155",
    address: "0x9d2a6078fA5085F8E9B4C11026cE62C1180a477B",
  },
];

export default function ContractPageContent() {
  const [openEnroll, setOpenEnroll] = useState(false);

  const handleCloseEnroll = () => {
    setOpenEnroll(false);
  };

  const handleOpenEnroll = () => {
    setOpenEnroll(true);
  };

  return (
    <div className="page-content">
      <h1>Contract</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ color: "lightslategray", marginTop: "-0.8rem" }}>
          Manage your contracts
        </div>
        <Button onClick={handleOpenEnroll} color="secondary">
          Enroll new contract
        </Button>
      </div>
      <Dialog open={openEnroll} onClose={handleCloseEnroll}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To airdrop items to community members, please enroll your contract
            here. Then, you can send items at airdrop page.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            placeholder="e.g. My NFT"
          />
          <TextField
            margin="dense"
            id="type"
            label="Type"
            select
            fullWidth
            variant="standard"
            defaultValue={"ERC721"}
          >
            {["ERC20", "ERC721", "ERC1155"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            placeholder="e.g. 0x0xAdeb833eee668e50761B4BC8b3Ef476Dc2C869461234"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEnroll}>Cancel</Button>
          <Button onClick={handleCloseEnroll}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Box sx={{ height: "78vh", width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "grey",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F1DBF1",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#f8f8f8",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#F1DBF1",
              },
              "& .MuiCheckbox-root": {
                color: `grey !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `grey !important`,
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
}
