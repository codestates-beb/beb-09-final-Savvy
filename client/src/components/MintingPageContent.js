import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

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

  const handleImage = (e) => {
    const imageFile = e.target.files[0];
    console.log(e.target.files[0]);
    const imageURL = URL.createObjectURL(e.target.files[0]);
    console.log(imageURL);
    setPreviewURL(imageURL);
    setFile(imageFile);
  };

  const handlePreview = async () => {
    setQR(
      `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        ticketInfo.siteUrl
      )}&size=150x150`
    );
    console.log(QR);
  };

  const handleCreateTicket = async () => {
    setQR(
      `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        ticketInfo.siteUrl
      )}&size=150x150`
    );
    const formData = new FormData();
    formData.append("file", file);
    formData.append("eventName", ticketInfo.eventName);
    formData.append("date", ticketInfo.date);
    formData.append("numberOfTickets", ticketInfo.numberOfTickets);
    formData.append("location", ticketInfo.location);
    formData.append("siteUrl", ticketInfo.siteUrl);
    formData.append("QR", QR);

    const response = await createTicket(formData, web3Auth);
    const { address, txHash } = response;
    console.log(address, txHash);
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
            <input type="file" onChange={(e) => handleImage(e)}></input>
          </div>
          <div className="ticket-box-form">
            <div className="ticket-box-input">
              <TextField
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
                id="outlined-basic"
                label="Date"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
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
          <div className="ticket-box-btn">
            <Button variant="outlined" color="primary" onClick={handlePreview}>
              Preview
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTicket}
            >
              Create ticket
            </Button>
          </div>
        </div>
        <div className="ticket-box">
          <div className="ticket-box-title">Preview</div>
          <div>
            <img src={previewURL && previewURL} alt="logo" />
          </div>
          <div>
            <img src={QR && QR} alt="qr code" />
          </div>
        </div>
      </div>
    </div>
  );
}
