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
import { CONTRACTS } from "../assets/DUMMY_DATA";

// api
import { createContract } from "../api/post-create-contract";
import { getContract } from "../api/get-contract";
import { deleteContract } from "../api/delete-contract";
import { updateContract } from "../api/put-contract";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "type", headerName: "Type", width: 150 },
  { field: "address", headerName: "Address", width: 300 },
];

export default function ContractPageContent() {
  const dispatch = useDispatch();
  const contractData = useSelector((state) => state.contract.contractData);
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

  const { address } = useParams();

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
                value={updateInput.name}
                onChange={(e) =>
                  setUpdateInput({ ...updateInput, name: e.target.value })
                }
              />
              <TextField
                margin="dense"
                id="type"
                label="Type"
                select
                fullWidth
                variant="standard"
                value={updateInput.type}
                onChange={(e) =>
                  setUpdateInput({ ...updateInput, type: e.target.value })
                }
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
                value={updateInput.address}
                disabled={disableAddress}
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
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <Button onClick={() => setOpenEnroll(true)} sx={{ color: "#5270ff" }}>
          Enroll new contract
        </Button>
      </div>
      <Dialog open={openEnroll} onClose={() => setOpenEnroll(false)}>
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
            value={contractInput.name}
            onChange={(e) =>
              setContractInput({ ...contractInput, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="type"
            label="Type"
            select
            fullWidth
            variant="standard"
            defaultValue={"ERC721"}
            value={contractInput.type}
            onChange={(e) =>
              setContractInput({ ...contractInput, type: e.target.value })
            }
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
            placeholder="e.g. 0xAdeb833eee668e50761B4BC8b3Ef476Dc2C81234"
            value={contractInput.address}
            onChange={(e) =>
              setContractInput({ ...contractInput, address: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#5270ff" }}
            onClick={() => setOpenEnroll(false)}
          >
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
            rows={rows}
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
