import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCommunityData } from "../reducers/communityReducer.js";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// api
import { getAdminCommunity } from "../api/get-admin-community.js";

function CurrentTimeBox() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [currentDate, setCurrentDate] = useState(new Date());
  // const [currentCommunity, setCurrentCommunity] = useState(null);

  // community data
  const communityData = useSelector((state) => state.community.communityData);
  const currentCommunity = localStorage.getItem("currentCommunity");
  const currentCommunityData = communityData?.find(
    (community) => community.address === currentCommunity
  );

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const daysOfWeekAbbrev = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeekAbbrev = daysOfWeekAbbrev[date.getDay()];

    return `${year}-${month}-${day} (${dayOfWeekAbbrev})`;
  };

  useEffect(() => {
    const initCommunity = async () => {
      try {
        const communityData = await getAdminCommunity();
        dispatch(setCommunityData(communityData));
      } catch (error) {
        console.log(error);
        return;
      }
    };
    initCommunity();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, null);

  if (window.innerWidth <= 1150 || isMobile) {
    return null;
  }

  return (
    <Box
      width={125}
      height={20}
      border={1}
      padding={2}
      borderColor="#fff"
      style={{
        marginTop: "20px",
        marginRight: "30px",
        userSelect: "none",
        position: "absolute",
        right: 0,
        boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.3)",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        style={{
          color: "#3276f0",
          fontSize: "12.5px",
          fontFamily: "'tektur', sans-serif",
          fontWeight: "800",
          textAlign: "center",
        }}
        as="div"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={`${process.env.PUBLIC_URL}/adminheaderImage.png`} 
            alt="adminheader Icon" 
            style={{ width: "20px", marginRight: "4px", marginLeft: "5px" }} 
          />
          {currentCommunityData?.alias}
        </div>
        <div>{`${currentCommunityData?.address.substring(
          0,
          4
        )}...${currentCommunityData?.address.substring(37)}`}</div>
        {/* {formatDate(currentDate)} */}
      </Typography>
    </Box>
  );
}

export default CurrentTimeBox;
