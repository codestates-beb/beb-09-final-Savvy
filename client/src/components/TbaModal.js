import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { keyframes } from "@mui/system";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import TbaModalExpBar from "./TbaModalExpBar";

// api
import { getTbaById } from "../api/get-tba";

function TbaModal({ open, handleClose, userId, tbaId }) {
  // 더미 데이터
  const [userData, setUserData] = useState({
    name: "Adriene Watson",
    address: "0x5E22031e91C6f30392e2A3Cd6a56f80B48f9fAdA",
    image: `${process.env.PUBLIC_URL}/Dashboarddummy1.png`,
    text1: "Pixel Dummy Data 1",
    text2: "Pixel Dummy Data 2",
  });
  const [tbaItemData, setTbaItemData] = useState([]);
  const [tbaData, setTbaData] = useState(null);

  useEffect(() => {
    if (open) {
      const fetchTba = async () => {
        const response = await getTbaById(tbaId);
        // console.log(response);
        if (response) {
          setTbaItemData(response.items);
          setTbaData(response.TBA);
        }
      };
      fetchTba();
    }
  }, [tbaId]);

  const truncateText = (text) => {
    const maxLength = 16;
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const truncateAddress = (address) => {
    const maxLength = 42;
    if (address?.length > maxLength) {
      return address?.slice(0, maxLength) + "...";
    }
    return address;
  };

  const preventRightClick = (e) => {
    e.preventDefault();
  };

  const preventImageDrag = (e) => {
    e.preventDefault();
  };

  const imageUrl = `https://i.pravatar.cc/300?u=${userId}`;

  const slideUp = keyframes`
    from {
      transform: translate(-50%, 5%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  `;

  const slideDown = keyframes`
    from {
      transform: translate(-50%, -50%);
    }
    to {
      transform: translate(-50%, 5%);
    }
  `;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="image-modal-description"
    >
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 410,
          height: 510,
          bgcolor: "background.paper",
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none",
          borderRadius: 5,
          outline: "none",
          background: "linear-gradient(90deg, #fff, #fff)",
          animation: open
            ? `${slideUp} 0.3s ease-out`
            : `${slideDown} 0.3s ease-in`,
        }}
        onContextMenu={preventRightClick}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{
            mt: -1,
            fontSize: "18px",
            fontWeight: "600",
            color: "#272727",
            marginTop: "-16px",
            position: "relative",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/tbadetail.png"}
            alt="icon"
            style={{
              width: "27px",
              verticalAlign: "middle",
              marginRight: "8px",
            }}
          />
          TBA Detail
          <span
            style={{
              content: '""',
              position: "absolute",
              left: 0,
              right: "-100%",
              bottom: "-5px",
              height: "2px",
              marginLeft: "-130px",
              background: "linear-gradient(100deg, white, #576ff6, white)",
              borderRadius: "3px",
            }}
          />
        </Typography>

        <div
          className="profile-image-box"
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            display: "flex",
            opacity: 1.5,
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.25)",
            transform: "translateY(10px)",
            marginTop: "20px",
            marginRight: "250px",
            marginBottom: "5px",
            backgroundImage: `url(${process.env.PUBLIC_URL}/TbaModalImage.gif)`,
            backgroundSize: "150%",
            backgroundPosition: "center",
            zIndex: "1111",
          }}
        >
          <img
            src={imageUrl}
            alt="User"
            style={{ width: "150px", borderRadius: "50%" }}
            onDragStart={preventImageDrag}
          />
        </div>

        <div
          className="nftbox"
          style={{
            width: "220px",
            height: "160px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "-150px",
            marginBottom: "5px",
            marginLeft: "180px",
            borderRadius: "15px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
            overflowY: "auto",
            maxHeight: "160px",
          }}
        >
          {tbaItemData &&
            tbaItemData.map((item) => (
              <div
                key={item._id}
                className="nftsmallbox"
                style={{
                  width: "200px",
                  height: "40px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginTop: "5px",
                  marginBottom: "5px",
                  pointerEvents: "none",
                }}
              >
                <img
                  src={userData.image}
                  alt="NFT Image"
                  style={{
                    width: "32px",
                    borderRadius: "10px",
                    marginLeft: "10px",
                    marginBottom: "-28px",
                    left: "0",
                  }}
                />

                <span
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    fontWeight: "bold",
                    transform: "translateY(-3px)",
                    marginLeft: "53px",
                    left: "0",
                  }}
                >
                  {truncateText(item?.address, 20)}
                </span>

                <span
                  style={{
                    color: "#888",
                    fontSize: "11px",
                    transform: "translateY(2px)",
                    marginLeft: "53px",
                  }}
                >
                  {truncateText(item?.tokenId, 20)}
                </span>
              </div>
            ))}
        </div>

        <div
          className="namebox"
          style={{
            width: "400px",
            height: "40px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "15px",
            marginBottom: "-25px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            opacity: "0.8",
          }}
        >
          <div
            style={{
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ManagerIcon.png`}
              alt="Manager Icon"
              style={{ transform: "translateX(10px)", width: "25px" }}
            />

            <Typography
              variant="body1"
              sx={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#272727",
                marginLeft: "20px",
              }}
            >
              {tbaData?.owner}
            </Typography>
          </div>
        </div>

        <div
          className="addressbox"
          style={{
            width: "400px",
            height: "40px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
            transform: "translateY(30px)",
            marginBottom: "-25px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            opacity: "0.8",
            position: "relative",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/walletIcon.png`}
            alt="wallet Icon"
            style={{
              transform: "translateX(16px)",
              width: "25px",
              position: "relative",
              top: "23px",
            }}
          />

          <Typography
            variant="body1"
            sx={{
              fontSize: "13px",
              fontWeight: "600",
              color: "#666",
              marginLeft: "24.5px",
              marginBottom: "5px",
              transform: "translateY(25px)",
            }}
          >
            {truncateAddress(tbaData?.address)}
          </Typography>
        </div>

        <div
          className="levelbox"
          style={{
            width: "400px",
            height: "100px",
            backgroundColor: "#e0e0e0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            marginTop: "45px",
            backgroundColor: "#fff",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
          }}
        >
          <TbaModalExpBar
            currentExp={userData.currentExp}
            maxExp={userData.maxExp}
          />
        </div>

        <Button
          variant="contained"
          color="primary"
          onClick={handleClose}
          sx={{
            width: "200px",
            height: "40px",
            fontSize: "13px",
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: "auto",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.3)",
            borderRadius: "20px",
            backgroundColor: "#576ff6",
            "&:hover": {
              backgroundColor: "#3351e2",
            },
            transition: "background-color 0.5s ease",
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default TbaModal;
