import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Slide,
  CircularProgress,
} from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";

const TRANSITION_DURATION = 350;

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide direction="up" ref={ref} timeout={TRANSITION_DURATION} {...props} />
  );
});

// 더미 데이터
export const DUMMY_DATA_AIRDROP_PROGRESS = [
  {
    progress: 0,
    userName: "Jane Samith",
    userId: 1,
    status: "Processing",
    profileImage: `https://i.pravatar.cc/300?u=1`,
  },
  {
    progress: 0,
    userName: "Robert Brown",
    userId: 2,
    status: "Pending",
    profileImage: `https://i.pravatar.cc/300?u=2`,
  },
  {
    progress: 0,
    userName: "Emily Clark",
    userId: 3,
    status: "Processing",
    profileImage: `https://i.pravatar.cc/300?u=3`,
  },
  {
    progress: 0,
    userName: "Michael Johnson",
    userId: 4,
    status: "Failed",
    profileImage: `https://i.pravatar.cc/300?u=4`,
  },
  {
    progress: -10,
    userName: "Sophia Turner",
    userId: 5,
    status: "Completed",
    profileImage: `https://i.pravatar.cc/300?u=5`,
  },
];

const API_URL = "https://api.example.com/airdrop-progress";
const useDummyData = true;

function setStatusBasedOnProgress(data) {
  return data.map((item) => {
    const { progress } = item;

    if (progress >= 100) {
      item.status = "Completed";
    } else if (progress === 0) {
      item.status = "Pending";
    } else if (progress > 0 && progress < 100) {
      item.status = "Processing";
    } else {
      item.status = "Failed";
    }

    return item;
  });
}

async function getAirdropProgressData() {
  let data = [];

  if (useDummyData) {
    data = DUMMY_DATA_AIRDROP_PROGRESS;
  } else {
    try {
      const response = await axios.get(API_URL);
      data = response.data;
    } catch (error) {
      console.error("Error fetching airdrop progress data:", error);
      return [];
    }
  }

  return setStatusBasedOnProgress(data);
}

const AirdropProgressModal = ({ open, onClose, airdropOutput }) => {
  const videoRef = useRef(null);
  const [airdropProgressData, setAirdropProgressData] = useState([]);
  const [approveTxHash1, setApproveTxHash1] = useState("");
  const [airdropResult1, setAirdropResult1] = useState(null);
  // console.log(airdropProgressData);
  // console.log(approveTxHash1);

  useEffect(() => {
    console.log(airdropOutput);
    if (airdropOutput) {
      const { approveTxHash, airdropResult } = airdropOutput;
      setApproveTxHash1(approveTxHash);
      setAirdropResult1(airdropResult);
    }
  }, [airdropOutput]);

  useEffect(() => {
    const fetchData = async () => {
      if (airdropOutput === null) return;
      console.log(airdropResult1);
      const data = airdropResult1?.airdropLogs?.map((log, idx) => {
        const { to } = log;
        return {
          progress: 0,
          userName: to.substring(0, 6) + "..." + to.substring(37),
          userId: idx + 1,
          status: "Processing",
          profileImage: `/Dashboarddummy3.png`,
        };
      });
      setAirdropProgressData(data);
    };
    fetchData();
  }, [airdropResult1]);

  useEffect(() => {
    let interval;

    const updateProgress = (user, increment) => {
      let potentialProgress = user.progress + increment;

      const finalProgress = potentialProgress > 100 ? 100 : potentialProgress;

      user.progress = parseFloat(finalProgress.toFixed(1));

      if (finalProgress === 100) {
        user.status = "Completed";
      } else if (finalProgress > 0 && finalProgress < 100) {
        user.status = "Processing";
      } else {
        user.status = "Pending";
      }
    };

    if (airdropResult1) {
      interval = setInterval(() => {
        setAirdropProgressData((prevData) => {
          const newData = prevData && [...prevData];

          // const userUpdates = [
          //   { index: 0, increment: 10 },
          //   { index: 1, increment: 4.8 },
          //   { index: 2, increment: 7.5 },
          //   { index: 3, increment: 5.6 },
          // ];
          const userUpdates = airdropResult1?.airdropLogs?.map((log, idx) => {
            const { to } = log;
            return {
              index: idx,
              increment: 10,
            };
          });

          userUpdates?.forEach((userUpdate) =>
            updateProgress(newData[userUpdate?.index], userUpdate?.increment)
          );

          return newData;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [airdropResult1]);

  const handleClose = (e) => {
    setAirdropProgressData([]);
    setApproveTxHash1("");
    setAirdropResult1(null);
    console.log(approveTxHash1);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      transitionDuration={TRANSITION_DURATION}
      sx={{
        "& .MuiDialog-paper": {
          width: "100%",
          height: "55%",
          borderRadius: "30px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogContent
        sx={{
          padding: 0,
          "&:first-child": {
            paddingTop: 0,
          },
        }}
      >
        <video
          ref={videoRef}
          width="100%"
          height="50%"
          autoPlay
          loop
          style={{
            objectFit: "cover",
          }}
        >
          <source src="/Second4.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "27px",
            marginTop: "-15px",
          }}
        >
          <img
            src="/airdrop.png"
            alt="Airdrop Icon"
            style={{
              width: "22px",
              height: "auto",
              marginRight: "-16px",
              marginTop: "5px",
            }}
          />
          <DialogTitle
            sx={{
              color: "#272727",
              fontSize: "16px",
              fontWeight: "600",
              marginTop: "5px",
            }}
          >
            Airdrop Progress Bar
          </DialogTitle>
        </div>

        <div
          style={{
            width: "100%",
            borderTop: "1px solid #e3e3e3",
            marginBottom: "16px",
          }}
        />

        {airdropProgressData?.length === 0 ||
          (!airdropProgressData && (
            <div
              style={{
                display: approveTxHash1 === "0x" ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress
                style={{
                  marginTop: "20px",
                }}
              />
            </div>
          ))}

        {approveTxHash1 === "0x" && (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "8px",
              }}
            >
              Failed to airdrop
            </div>
          </div>
        )}

        {airdropProgressData?.map((item) => (
          <div
            key={item.userId}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "90%",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexBasis: "25%",
                  flexGrow: 0,
                  flexShrink: 1,
                  marginRight: "10px",
                }}
              >
                <img
                  src={item.profileImage}
                  alt="User Profile"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "8px",
                    marginLeft: "-10px",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#000",
                    marginLeft: "0px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "calc(100% - 50px)",
                  }}
                >
                  {item.userName}
                </span>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "50%",
                  marginLeft: "2px",
                  marginRight: "5px",
                }}
              >
                {item.status === "Failed" ? (
                  <div
                    style={{
                      backgroundColor: "#f65757",
                      height: "17px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    ERROR
                  </div>
                ) : (
                  <ProgressBar
                    completed={item.progress}
                    bgColor="#576ff6"
                    baseBgColor="#ebecef"
                    height="17px"
                    borderRadius="10px"
                  />
                )}
              </div>

              <div
                style={{
                  backgroundColor:
                    item.status === "Processing"
                      ? "#576ff6"
                      : item.status === "Pending"
                      ? "#192ea1"
                      : item.status === "Failed"
                      ? "#f65757"
                      : item.status === "Completed"
                      ? "#11b12f"
                      : "#576ff6",
                  width: "70px",
                  marginLeft: "50px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  marginRight: "-8px",
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </DialogContent>

      <div
        style={{
          width: "100%",
          borderTop: "1px solid #e3e3e3",
          marginTop: "5px",
          marginBottom: "10px",
        }}
      />

      <DialogActions sx={{ justifyContent: "center", marginBottom: "10px" }}>
        <Button
          disabled={approveTxHash1 === ""}
          color="primary"
          onClick={handleClose}
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
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AirdropProgressModal;
