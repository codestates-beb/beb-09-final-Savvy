import React from "react";
import "../assets/Admin.css";
import { Box } from "@mui/material";
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
  return (
    <div className="page-content">
      <h1>Contract</h1>
      <div style={{ color: "lightslategray", marginTop: "-0.8rem" }}>
        Manage your contracts
      </div>
      <div>
        <Box sx={{ m: "1rem 0", height: "80vh", width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </div>
    </div>
  );
}
