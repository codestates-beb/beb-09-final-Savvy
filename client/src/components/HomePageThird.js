import React, { useState, useEffect } from "react";
import { Box, styled } from "@mui/material";
import Typography from "@mui/material/Typography";

const HomePageThird = () => {
  const containerStyle = {
    height: "35vh",
    background: "#000",
    paddingBottom: "35rem",
  };

  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  const preventCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const [industryFontSize, setIndustryFontSize] = useState(30);
  const [nftFontSize, setNftFontSize] = useState(30);
  const [thirdFontSize, setthirdFontSize] = useState(30);
  const [bottomFontSize, setbottomFontSize] = useState(30);
  const [marginTopValue, setMarginTopValue] = useState("10px");
  const [marginTopBox, setMarginTopBox] = useState(50);
  const [marginLeftValue, setMarginLeftValue] = useState("-115px");

  const [flexDirection, setFlexDirection] = useState("row");

  const [isDisplayImage, setIsDisplayImage] = useState(window.innerWidth > 900);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    setIsDisplayImage(screenWidth > 900);
    if (screenWidth >= 1280) {
      setbottomFontSize(14);
      setIndustryFontSize(16);
      setthirdFontSize(22);
      setNftFontSize(30);
      setMarginTopBox(50);
      setMarginTopValue("10px");
      setMarginLeftValue("0px");
      setFlexDirection("row");
    } else if (screenWidth >= 960) {
      setbottomFontSize(13);
      setIndustryFontSize(15);
      setthirdFontSize(20);
      setNftFontSize(28);
      setMarginTopBox(50);
      setMarginTopValue("10px");
      setMarginLeftValue("0px");
      setFlexDirection("row");
    } else if (screenWidth > 900) {
      setbottomFontSize(12);
      setIndustryFontSize(14);
      setthirdFontSize(18);
      setNftFontSize(25);
      setMarginTopBox(50);
      setMarginTopValue("10px");
      setMarginLeftValue("0px");
      setFlexDirection("row");
    } else {
      setbottomFontSize(12);
      setIndustryFontSize(13);
      setthirdFontSize(16);
      setNftFontSize(20);
      setMarginTopBox(32);
      setMarginTopValue("-10px");
      setMarginLeftValue("0px");
      setFlexDirection("column");
    }
  };

  const ResponsiveCubecolor = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "32px",
    top: "780px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "0",
    [theme.breakpoints.up("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
      top: "780px",
      width: "28px",
    },
    [theme.breakpoints.up("lg")]: {
      top: "780px",
      width: "32px",
    },
    [theme.breakpoints.up("xl")]: {
      top: "780px",
      width: "32px",
    },
  }));

  useEffect(() => {
    handleResize();
    console.log("Initial marginTopValue:", marginTopValue);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const styles = {
    pageContent: {
      position: "relative",
      color: "#fff",
      fontSize: `${industryFontSize}px`,
      fontWeight: "bold",
      whiteSpace: "nowrap",
      userSelect: "none",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      top: "179px",
    },
    textWithBackground: {
      display: "inline-block",
      background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
      color: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    },
  };

  const typographyStyle = {
    position: "relative",
    top: "200px",
    width: "auto",
    color: "#fff",
    fontWeight: "bold",
    fontSize: `${nftFontSize}px`,
    userSelect: "none",
    whiteSpace: "nowrap",
    textAlign: "center",
    marginLeft: marginLeftValue,
  };

  return (
    <Box
      style={containerStyle}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      textAlign="center"
    >
      <ResponsiveCubecolor
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
        component="img"
        src={`${process.env.PUBLIC_URL}/Cubecolor.png`}
        alt="Cubecolor Image"
      />
      <Box
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
        component="img"
        src={`${process.env.PUBLIC_URL}/purplebackground.jpg`}
        alt="purplebackground Image"
        sx={{
          position: "relative",
          width: "350px",
          top: "670px",
          left: "33%",
          transform: "translateX(-50%)",
          opacity: "0.22",
          zIndex: 1,
        }}
      />
      <Box
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
        component="img"
        src={`${process.env.PUBLIC_URL}/purplebackground.jpg`}
        alt="purplebackground Image"
        sx={{
          position: "relative",
          width: "350px",
          top: "660px",
          left: "63%",
          transform: "translateX(-50%)",
          opacity: "0.22",
        }}
      />
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>LEADING THE INDUSTRY</span>
      </div>
      <Typography variant="h4" style={typographyStyle}>
        Convenient and Safe<span style={{ marginLeft: "8px" }}></span>
        <span
          style={{
            background: "linear-gradient(to left, #576ff6, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          NFT Community
        </span>
      </Typography>
      <Box
        display="flex"
        flexDirection={flexDirection}
        width="100%"
        justifyContent="space-between"
        mt={marginTopBox}
        px={0}
        style={{ marginBottom: flexDirection === "column" ? "-30px" : "0" }}
      >
        <Box
          position="relative"
          flex="1"
          border="none"
          height="250px"
          mx={3}
          marginBottom={7}
          bgcolor="rgba(255, 255, 255, 0)"
          borderRadius="30px"
        >
          {isDisplayImage && (
            <img
              src="/third3.png"
              alt="Box Image"
              style={{
                width: `75px`,
                position: "absolute",
                top: -90,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              onContextMenu={preventRightClick}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          )}
          <Typography
            variant="h5"
            style={{
              marginTop: `${marginTopValue}px`,
              background: "linear-gradient(to right, #576ff6, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: `${thirdFontSize}px`,
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Security System
          </Typography>

          <Typography
            variant="body1"
            style={{
              marginTop: "18px",
              padding: "0 10px",
              color: "#a6a5a5",
              fontSize: `${bottomFontSize}px`,
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Savvy provides encryption and secure access to yourties. riles
            shared with you can de scannec and proactively removed for malvare.
          </Typography>
        </Box>

        <Box
          position="relative"
          flex="1"
          border="none"
          height="250px"
          mx={3}
          marginBottom={7}
          bgcolor="rgba(255, 255, 255, 0)"
          borderRadius="30px"
        >
          {isDisplayImage && (
            <img
              src="/third2.png"
              alt="Box Image"
              style={{
                width: "75px",
                height: "75px",
                position: "absolute",
                top: -90,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              onContextMenu={preventRightClick}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          )}
          <Typography
            variant="h5"
            style={{
              marginTop: `${marginTopValue}px`,
              background: "linear-gradient(to right, #576ff6, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: `${thirdFontSize}px`,
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Many Integration
          </Typography>

          <Typography
            variant="body1"
            style={{
              marginTop: "18px",
              padding: "0 10px",
              color: "#a6a5a5",
              fontSize: `${bottomFontSize}px`,
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Savvy complements and integrates with the
            techno/ocyvourteamalreadyuses.collaborate.on various Microsoft
            Office files.
          </Typography>
        </Box>

        <Box
          position="relative"
          flex="1"
          border="none"
          height="250px"
          mx={3}
          marginBottom={7}
          bgcolor="rgba(255, 255, 255, 0)"
          borderRadius="30px"
        >
          {isDisplayImage && (
            <img
              src="/third1.png"
              alt="Box Image"
              style={{
                width: "70px",
                height: "70px",
                position: "absolute",
                top: -82,
                left: "50%",
                transform: "translateX(-50%)",
              }}
              onContextMenu={preventRightClick}
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          )}
          <Typography
            variant="h5"
            style={{
              marginTop: `${marginTopValue}px`,
              background: "linear-gradient(to right, #576ff6, white)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: `${thirdFontSize}px`,
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Search System
          </Typography>

          <Typography
            variant="body1"
            style={{
              marginTop: "18px",
              padding: "0 10px",
              color: "#a6a5a5",
              fontSize: `${bottomFontSize}px`,
              fontWeight: "bold",
              userSelect: "none",
            }}
          >
            Savvy brovising capabilities are cutting edgein offering speed,
            reliability, and collaboration. And the chip features that help in
            file discovery
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePageThird;
