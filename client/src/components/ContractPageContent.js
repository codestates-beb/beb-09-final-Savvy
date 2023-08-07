import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setContractData } from "../reducers/contractReducer";
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
import ContractEnrollModal from "./ContractEnrollModal";
import { CONTRACTS } from "../assets/DUMMY_DATA";

// API
import { createContract } from "../api/post-create-contract";
import { getContract } from "../api/get-contract";
import { deleteContract } from "../api/delete-contract";
import { updateContract } from "../api/put-contract";

const columns = [
  { field: "id", headerName: "ID", width: 105 },
  { field: "name", headerName: "Name", width: 220 },
  { field: "type", headerName: "Type", width: 220 },
  { field: "address", headerName: "Address", width: 220 },
];

export default function ContractPageContent() {
  const dispatch = useDispatch();
  const contractData = useSelector((state) => state.contract.contractData);
  console.log(contractData);
  const [openEnroll, setOpenEnroll] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [contractInput, setContractInput] = useState({
    name: "",
    type: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [updateInput, setUpdateInput] = useState({
    name: "",
    type: "",
    address: "",
  });
  const [disableAddress, setDisableAddress] = useState(false);
  const id = contractData ? new Array(contractData.length) : [];

  if (contractData) {
    for (let i = 0; i < contractData.length; i++) {
      id[i] = i + 1;
    }
  }

  let rows = contractData
    ? contractData.map((contract) => {
        return {
          id: id[contractData.indexOf(contract)],
          name: contract.alias,
          type: contract.type,
          address: contract.address,
        };
      })
    : [];

  const address = window.location.pathname.split("/")[2];

  useEffect(() => {
    const initContract = async () => {
      const response = await getContract();
      console.log(response);
      dispatch(setContractData(response.ContractData));
    };
    initContract();
  }, [isLoading]);

  const handleEnroll = async () => {
    setIsLoading(true);
    // TODO: enroll contract at DB
    if (contractInput.type === "") {
      alert("Please select contract type.");
      return;
    } else if (contractInput.address === "") {
      alert("Please enter contract address.");
      return;
    } else if (contractInput.name === "") {
      alert("Please enter contract name.");
      return;
    }

    const response = await createContract(
      address,
      contractInput.type,
      contractInput.address,
      contractInput.name
    );
    // console.log(response);
    if (response) {
      setIsLoading(false);
    }
    setOpenEnroll(false);
    setContractInput({
      name: "",
      type: "",
      address: "",
    });
  };

  const handleRowSelectionModelChange = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
    console.log(newRowSelectionModel);
  };

  const handleOpenUpdate = () => {
    const selectedContract = contractData[rowSelectionModel[0] - 1];
    if (rowSelectionModel.length > 1) {
      alert("Please select only one contract to update.");
      return;
    }
    setUpdateInput({
      address: selectedContract.address,
      name: selectedContract.alias,
      type: selectedContract.type,
    });
    setDisableAddress(true);
    setOpenUpdate(true);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    // TODO: update contract at DB
    const response = await updateContract(
      contractData[rowSelectionModel[0] - 1]._id,
      updateInput.type,
      updateInput.name
    );
    console.log(response);
    if (response) {
      setIsLoading(false);
    }
    setOpenUpdate(false);
    setUpdateInput({
      name: "",
      type: "",
      address: "",
    });
    setDisableAddress(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    // TODO: delete contract at DB
    rowSelectionModel.forEach(async (id) => {
      const response = await deleteContract(contractData[id - 1].address);
      // console.log(response);
      if (response) {
        setIsLoading(false);
      }
    });
  };

  const styles = {
    textWithBackground: {
      display: "inline-block",
      background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
      color: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      fontSize: "38px",
      fontWeight: "bold",
      marginLeft: "8px",
      marginTop: "25px",
      userSelect: "none",
      fontFamily: "'tektur', sans-serif",
    },
    manageText: {
      color: "#8f8e8e",
      marginTop: "0.3rem",
      marginBottom: "1.8rem",
      marginLeft: "0.6rem",
      fontSize: "16px",
      fontWeight: "bold",
      whiteSpace: "nowrap",
      fontFamily: "'tektur', sans-serif",
      userSelect: "none",
    },
  };

  return (
    <div className="page-content">
      <div>
        <span style={styles.textWithBackground}>Contract</span>
      </div>
      <div style={styles.manageText}>Manage your CONTRACTS</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          {rowSelectionModel.length > 0 ? (
            <div>
              <Button
                onClick={handleDelete}
                size="small"
                sx={{
                  width: "6rem",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  marginTop: "0.2rem",
                  marginLeft: "0.2rem",
                  backgroundColor: "#f88181",
                  borderRadius: "0.5rem",
                  padding: "0.65rem 1rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  "&:hover": { backgroundColor: "#eb6363", cursor: "pointer" },
                }}
              >
                Delete
              </Button>
              <Button
                onClick={handleOpenUpdate}
                size="small"
                sx={{
                  width: "6rem",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  marginTop: "0.2rem",
                  marginLeft: "0.8rem",
                  backgroundColor: "#576ff6",
                  borderRadius: "0.5rem",
                  padding: "0.65rem 1rem",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  "&:hover": { backgroundColor: "#3351e2", cursor: "pointer" },
                }}
              >
                Update
              </Button>
            </div>
          ) : null}

          <ContractEnrollModal
            open={openEnroll}
            handleClose={() => setOpenEnroll(false)}
            contractInput={contractInput}
            setContractInput={setContractInput}
            handleEnroll={handleEnroll}
          />
        </div>
        <Button
          onClick={() => setOpenEnroll(true)}
          sx={{
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: "600",
            marginRight: "-0.2rem",
            marginBottom: "0.8rem",
            borderRadius: "0.5rem",
            padding: "0.65rem 1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#576ff6",
            "&:hover": {
              backgroundColor: "#3351e2",
              cursor: "pointer",
            },
          }}
        >
          Enroll new contract
        </Button>
      </div>
      <div>
        <Box
          sx={{
            backgroundColor: "#fff",
            border: "none",
            height: "78vh",
            width: "100%",
            marginLeft: "0.2rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          <DataGrid
            density="compact"
            columns={columns}
            rows={rows}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnMenu
            slots={{ toolbar: GridToolbar }}
            rowSelectionModel={rowSelectionModel}
            localeText={{
              toolbarDensityCompact: "Small",
              toolbarDensityStandard: "Medium",
              toolbarDensityComfortable: "Large",
              noRowsLabel: (
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#828282",
                  }}
                >
                  No rows
                </div>
              ),
            }}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              handleRowSelectionModelChange(newRowSelectionModel);
            }}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                color: "#6c6c6c",
                fontSize: "0.8rem",
                fontWeight: "bold",
                backgroundColor: "#ebeefb",
              },
              "& .name-column--cell": {
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderTop: "1px solid #e0e0e0",
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
                fontSize: "0.8rem",
                color: "#828282",
              },
              "& .MuiDataGrid-columnHeaders, .MuiDataGrid-columnHeaders *": {
                fontWeight: "bold !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f5f5f5",
                width: "100%",
              },
              "& .MuiDataGrid-footerContainer, .MuiDataGrid-footerContainer *":
                {
                  color: "#828282 !important",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                },
              "& .MuiCheckbox-root": {
                color: "#828282",
                "&.Mui-checked": {
                  color: "#576ff6",
                },
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#828282`,
                fontSize: "0.75rem",
                fontWeight: "bold",
                textAlign: "left",
                marginLeft: "0.6rem",
              },
              "& .MuiDataGrid-row": {
                marginBottom: "0.4rem",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#828282",
                transform: "scale(0.8)",
              },
              "& .MuiDataGrid-menuOpen": {
                color: "#fff",
              },
              "& .MuiDataGrid-toolbarContainer": {
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "#fff",
              },
              "& .MuiSelect-select": {
                backgroundColor: "#fff",
                borderRadius: "0.5rem",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          />
        </Box>
      </div>
    </div>
  );
}
