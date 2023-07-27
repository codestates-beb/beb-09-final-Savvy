import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { CONTRACTS } from "../assets/DUMMY_DATA";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "address", headerName: "Address", width: 300 },
];

export default function ContractPageContent() {
  const [openEnroll, setOpenEnroll] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleCloseEnroll = () => {
    setOpenEnroll(false);
  };

  const handleOpenEnroll = () => {
    setOpenEnroll(true);
  };

  const handleEnroll = () => {
    // TODO: enroll contract
    setOpenEnroll(false);
  };

  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    console.log(newRowSelectionModel);
  };

  const handleOpenUpdate = () => {
    if (rowSelectionModel.length > 1) {
      alert("Please select only one contract to update.");
      return;
    }
    setOpenUpdate(true);
  };

  const handleUpdate = () => {
    // TODO: update contract
    setOpenUpdate(false);
  };

  const handleDelete = () => {
    console.log("delete", rowSelectionModel);
  };

  return (
    <div className="page-content">
      <h1>Contract</h1>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "lightslategray", marginTop: "-0.8rem" }}>
            Manage your CONTRACTS
          </div>
          {rowSelectionModel.length > 0 ? (
            <div>
              <Button
                onClick={handleDelete}
                size="small"
                sx={{ color: "#5270ff" }}
              >
                Delete
              </Button>
              <Button
                onClick={handleOpenUpdate}
                size="small"
                sx={{ color: "#5270ff" }}
              >
                Update
              </Button>
            </div>
          ) : null}

          <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)}>
            <DialogTitle>Update Contract</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To airdrop items to community members, please{" "}
                <b>enroll your contract</b> here. Then, you can send items at{" "}
                <Link to="/airdrop" style={{ textDecoration: "none" }}>
                  <b>airdrop page</b>
                </Link>
                .
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
              <Button
                sx={{ color: "#5270ff" }}
                onClick={() => setOpenUpdate(false)}
              >
                Cancel
              </Button>
              <Button
                sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
                onClick={handleUpdate}
              >
                Enroll
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Button onClick={handleOpenEnroll} sx={{ color: "#5270ff" }}>
          Enroll new contract
        </Button>
      </div>
      <Dialog open={openEnroll} onClose={handleCloseEnroll}>
        <DialogTitle>Enroll new Contract</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To airdrop items to community members, please{" "}
            <b>enroll your contract</b> here. Then, you can send items at{" "}
            <Link to="/airdrop" style={{ textDecoration: "none" }}>
              <b>airdrop page</b>
            </Link>
            .
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
          <Button sx={{ color: "#5270ff" }} onClick={handleCloseEnroll}>
            Cancel
          </Button>
          <Button
            sx={{ bgcolor: "#5270ff", color: "#ffffff" }}
            onClick={handleEnroll}
          >
            Enroll
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <Box
          sx={{
            height: "78vh",
            width: "100%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <DataGrid
            columns={columns}
            rows={CONTRACTS}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              handleRowSelectionModelChange(newRowSelectionModel);
            }}
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
                backgroundColor: "#5270ff",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#748af436",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#5270ff",
              },
              "& .MuiCheckbox-root": {
                // color: `grey !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#5270ff !important`,
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
}
