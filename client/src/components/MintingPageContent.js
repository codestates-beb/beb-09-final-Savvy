import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setContractData } from "../reducers/contractReducer";
import axios from "axios";
import {
  Button,
  TextField,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

import "../assets/MintingPageContent.css";
import { createTicket } from "../api/post-create-ticket";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

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

export default function MintingPageContent({ web3Auth }) {
  const dispatch = useDispatch();
  const contractData = useSelector((state) => state.contract.contractData);

  const fileInput = useRef(null);

  const [mintTxHash, setMintTxHash] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [QR, setQR] = useState(null);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [ticketInfo, setTicketInfo] = useState({
    eventName: "",
    date: "",
    numberOfTickets: "",
    location: "",
    siteUrl: "",
  });

  const communityAddress = window.location.pathname.split("/")[2];

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    console.log(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    console.log(imageURL);
    setPreviewURL(imageURL);
    setFile(imageFile);
  };

  const handlePreview = async () => {
    setIsError(false);
    if (
      !file ||
      !ticketInfo.eventName ||
      !ticketInfo.date ||
      !ticketInfo.numberOfTickets ||
      !ticketInfo.location ||
      !ticketInfo.siteUrl
    ) {
      setIsError(true);
      return;
    }

    setIsPreview(true);
    setQR(
      `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        ticketInfo.siteUrl
      )}&size=150x150`
    );
    console.log(QR);
  };

  const handleCreateTicket = async () => {
    setIsError(false);
    if (
      !file ||
      !ticketInfo.eventName ||
      !ticketInfo.date ||
      !ticketInfo.numberOfTickets ||
      !ticketInfo.location ||
      !ticketInfo.siteUrl
    ) {
      setIsError(true);
      setIsOpen(false);
      return;
    }

    if (!isPreview) {
      setIsError(true);
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
    setIsLoading(true);
    setIsPreview(true);
    // setQR(
    //   `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    //     ticketInfo.siteUrl
    //   )}&size=150x150`
    // );
    // console.log(QR);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("eventName", ticketInfo.eventName);
    formData.append("date", ticketInfo.date);
    formData.append("numberOfTickets", ticketInfo.numberOfTickets);
    formData.append("location", ticketInfo.location);
    formData.append("siteUrl", ticketInfo.siteUrl);
    formData.append("QR", QR);

    const response = await createTicket(formData, web3Auth, communityAddress);
    if (!response) {
      return;
    } else {
      const { address, deployTxHashtxHash, mintTxHash, contractData } =
        response;
      console.log(response);
      setMintTxHash(mintTxHash);
      setIsLoading(false);
      setSuccess(true);
      dispatch(setContractData([contractData]));
      console.log(contractData);
    }
  };

  return (
    <div className="page-content">
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>Ticket</span>
      </div>
      <div className="content">
        <div className="ticket-box">
          <div className="ticket-box-title">Create New Ticket</div>
          <div className="ticket-box-file">
            {file ? (
              <img
                className="ticket-box-img"
                src={previewURL && previewURL}
                alt="logo"
              />
            ) : (
              <div
                onClick={() => fileInput.current.click()}
                className="file-box"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/upload.png`}
                  alt="Upload"
                  style={{
                    width: "32px",
                    height: "32px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
              </div>
            )}

            <input
              ref={fileInput}
              style={{ display: "none" }}
              type="file"
              onChange={(e) => handleImage(e)}
            ></input>
          </div>
          <div className="ticket-box-form">
            <div className="ticket-box-input">
              <TextField
                sx={{
                  width: "95%",
                  height: "50px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  marginTop: "5px",
                  userSelect: "none",
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
                id="outlined-basic"
                label="Event Name"
                variant="outlined"
                value={ticketInfo.eventName}
                onChange={(e) =>
                  setTicketInfo({ ...ticketInfo, eventName: e.target.value })
                }
              />
            </div>
            <div className="ticket-box-input">
              <TextField
                sx={{
                  width: "95%",
                  height: "50px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  marginTop: "5px",
                  userSelect: "none",
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
                id="outlined-basic"
                label="Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{ placeholder: "YYYY-MM-DD" }}
                value={ticketInfo.date}
                onChange={(e) =>
                  setTicketInfo({ ...ticketInfo, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="ticket-box-form">
            <div className="ticket-box-input">
              <TextField
                sx={{
                  width: "97.5%",
                  height: "50px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  marginTop: "5px",
                  userSelect: "none",
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
                id="outlined-basic"
                label="Number of Tickets"
                variant="outlined"
                type="Number"
                fullWidth
                value={ticketInfo.numberOfTickets}
                onChange={(e) =>
                  setTicketInfo({
                    ...ticketInfo,
                    numberOfTickets: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="ticket-box-form">
            <div className="ticket-box-input">
              <TextField
                sx={{
                  width: "97.5%",
                  height: "50px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  marginTop: "5px",
                  userSelect: "none",
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
                id="outlined-basic"
                label="Location"
                variant="outlined"
                fullWidth
                value={ticketInfo.location}
                onChange={(e) =>
                  setTicketInfo({ ...ticketInfo, location: e.target.value })
                }
              />
            </div>
          </div>
          <div className="ticket-box-form">
            <div className="ticket-box-input">
              <TextField
                sx={{
                  width: "97.5%",
                  height: "50px",
                  whiteSpace: "nowrap",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  borderRadius: "10px",
                  marginTop: "5px",
                  userSelect: "none",
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
                id="outlined-basic"
                label="Site URL"
                variant="outlined"
                fullWidth
                type="url"
                value={ticketInfo.siteUrl}
                onChange={(e) =>
                  setTicketInfo({ ...ticketInfo, siteUrl: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            {isError && (
              <div className="form-error-message">
                Please fill out all the fields & preview your ticket first
              </div>
            )}
          </div>
          <div className="ticket-box-btn">
            <Button
              variant="outlined"
              sx={{
                color: "#fff",
                width: "45%",
                height: "45px",
                fontSize: "12px",
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: "20px",
                marginRight: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                borderRadius: "15px",
                border: "none",
                userSelect: "none",
                background:
                  "linear-gradient(to right, #30aed6, #7f4df0, #e198c3)",
                "&:hover": {
                  background:
                    "linear-gradient(to right, #239dc3, #6836da, #d075aa)",
                  border: "none",
                },
                transition: "background-color 0.5s ease",
              }}
              onClick={handlePreview}
            >
              Preview
            </Button>
            <Button
              variant="contained"
              sx={{
                width: "45%",
                height: "45px",
                fontSize: "12px",
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: "20px",
                border: "none",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                borderRadius: "15px",
                backgroundColor: "#576ff6",
                userSelect: "none",
                "&:hover": {
                  backgroundColor: "#3351e2",
                },
                transition: "background-color 0.5s ease",
              }}
              onClick={() => setIsOpen(true)}
            >
              Create ticket
            </Button>
          </div>
          {/* Ticket loading dialog */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
              "& .MuiDialog-paper": {
                width: "415px",
                height: "210px",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <DialogTitle
              sx={{
                color: "#272727",
                fontSize: "16px",
                fontWeight: "600",
                marginTop: "12px",
                marginRight: "38px",
                userSelect: "none",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              id="alert-dialog-title"
            >
              <img
                src={process.env.PUBLIC_URL + "/ticketIcon.png"}
                alt="icon"
                style={{
                  width: "30px",
                  verticalAlign: "middle",
                  marginRight: "10px",
                }}
              />
              {`Mint your Ticket`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                sx={{
                  color: "#838383",
                  fontSize: "14px",
                  fontWeight: "400",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                  marginTop: "9px",
                }}
                id="alert-dialog-description"
              >
                {isLoading ? (
                  <CircularProgress />
                ) : success ? (
                  <>
                    `Ticket minted successfully. You can check it on`
                    <a
                      href={`https://sepolia.etherscan.io/tx/${mintTxHash}`}
                      target="_blank"
                      style={{
                        color: "#576ff6",
                        fontWeight: "600",
                      }}
                    >
                      Etherscan
                    </a>
                  </>
                ) : (
                  <>
                    Are you sure you want mint your{" "}
                    <span style={{ color: "#576ff6", fontWeight: "600" }}>
                      Ticket?
                    </span>
                  </>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  backgroundColor: "#f88181",
                  color: "#fff",
                  width: "43%",
                  height: "40px",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginBottom: "5px",
                  marginRight: "11px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#eb6363",
                  },
                }}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#576ff6",
                  color: "#fff",
                  width: "43%",
                  height: "40px",
                  fontSize: "12px",
                  fontWeight: "600",
                  marginRight: "19px",
                  marginBottom: "5px",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#3351e2",
                  },
                }}
                onClick={
                  success
                    ? () => {
                        setIsOpen(false);
                        setSuccess(false);
                      }
                    : handleCreateTicket
                }
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="ticket-box">
          <div className="ticket-box-title">Preview</div>
          <div className="preview-content">
            <div className="preview-content-logo">
              {isPreview ? (
                <img src={previewURL && previewURL} alt="logo" />
              ) : (
                <div className="preview-logo">
                  <img
                    src={`${process.env.PUBLIC_URL}/picture.png`}
                    alt="picture"
                    style={{
                      width: "32px",
                      height: "32px",
                      userSelect: "none",
                      pointerEvents: "none",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <div>Your Logo will appear here</div>
                </div>
              )}
            </div>

            <div className="preview-content-qr">
              {isPreview ? (
                <img src={QR && QR} alt="qr code" />
              ) : (
                <div className="preview-qr">
                  <img
                    src={`${process.env.PUBLIC_URL}/qrImg.png`}
                    alt="qrImg"
                    style={{
                      width: "32px",
                      height: "32px",
                      userSelect: "none",
                      pointerEvents: "none",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <div>QR code</div>
                </div>
              )}
            </div>

            <div className="preview-content-info">
              <div className="preview-content-info-header">
                {/* 
               <img
                  src={`${process.env.PUBLIC_URL}/name.png`}
                  alt="name Icon"
                  style={{
                    width: "30px",
                    height: "30px"
                    marginRight: "6px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                */}
                {isPreview ? ticketInfo.eventName : "Event Name"}
              </div>

              <div className="preview-content-info-sub">
                {/*
                <img
                  src={`${process.env.PUBLIC_URL}/sandWatch.png`}
                  alt="sandWatch Icon"
                  style={{
                    width: "24px",
                    height: "24px",
                    marginTop: "1.5px",
                    marginRight: "2px",
                    marginLeft: "8px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                */}
                <div className="preview-content-info-sub-span">
                  {isPreview ? ticketInfo.date : "Date"}
                </div>
                <div className="preview-content-info-sub-span">
                  {isPreview ? ticketInfo.location : "Location"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
