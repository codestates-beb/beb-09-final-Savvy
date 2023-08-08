import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Hidden } from "@mui/material";

const HomePageZero = () => {
  const preventCopy = (e) => {
    e.preventDefault();
    return false;
  };

  const [isHovered, setIsHovered] = useState(false);

  const preventRightClick = (e) => {
    e.preventDefault();
    return false;
  };

  const scrollToFinalSection = () => {
    const element = document.getElementById("homePageFinal");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const styles = {
    pageContent: {
      position: "relative",
      color: "#fff",
      fontSize: { xs: "25px", sm: "35px", md: "40px", lg: "45px" },
      fontWeight: "bold",
      marginTop: "5px",
      marginRight: "50px",
      lineHeight: "1.5",
      whiteSpace: "nowrap",
      userSelect: "none",
    },
    textWithBackground: {
      display: "inline-block",
      background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
      color: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        height: "770px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
      onCopy={preventCopy}
    >
      <Box
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
        component="img"
        src={`${process.env.PUBLIC_URL}/purplebackground.jpg`}
        alt="purplebackground Image"
        sx={{
          position: "absolute",
          width: "350px",
          top: "100px",
          left: "0%",
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
          position: "absolute",
          width: "350px",
          top: "310px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: "0.22",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "relative",
          color: "#fff",
          fontSize: { xs: "25px", sm: "35px", md: "40px", lg: "45px" },
          fontWeight: "bold",
          marginRight: "50px",
          marginLeft: {
            xs: "50px",
            sm: "100px",
            md: "70px",
            lg: "130px",
            "@media (min-width: 400px) and (max-width: 499px)": "75px",
          },
          lineHeight: "1.5",
          whiteSpace: "nowrap",
          userSelect: "none",
          zIndex: 2,
        }}
      >
        <Box
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          component="img"
          src={`${process.env.PUBLIC_URL}/feltpencircle.png`}
          alt="ERC-6551 Image"
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            mt: { xs: "-13px", sm: "-18px", md: "-18px", lg: "-18px" },
            ml: { xs: "-78px", sm: "-68px", md: "-80px", lg: "-100px" },
            width: { xs: "160px", sm: "220px", md: "240px", lg: "260px" },
            opacity: 0.75,
          }}
        />
        With<span style={{ marginLeft: "30px" }}></span>ERC-6551 <br />
        The Game-Changing Standard <br />
        <Box>
          <div style={styles.pageContent}>
            <span style={styles.textWithBackground}>
              We Prepare For The Future
            </span>
          </div>
        </Box>
        <Box
          sx={{
            fontSize: { xs: "10px", sm: "12px", md: "14px", lg: "16px" },
            fontWeight: "600",
            lineHeight: "1.8",
            marginTop: "40px",
            color: "#666",
          }}
        >
          ERC-6551 is the new standard for initial accounts in the Ethereum
          ecosystem <br />
          Token-bound accounts allow you to lock your tokens or restrict them to
          specific accounts <br />
          Tokens can only be used within specific conditions or parameters
          defined by the issuer
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Link to="/community">
            <Button
              variant="contained"
              color="primary"
              sx={{
                position: "relative",
                width: "170px",
                height: "45px",
                fontSize: { xs: "12px", sm: "12px", md: "13px", lg: "13px" },
                fontWeight: "600",
                backgroundColor: "#576ff6",
                textTransform: "none",
                borderRadius: "20px",
                transition: "transform 0.3s",
                "&:hover": {
                  backgroundColor: "#4c64eb",
                  boxShadow: "0 0 15px 5px rgba(87, 111, 246, 0.7)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: -1,
                    borderRadius: "inherit",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                },
              }}
            >
              Get Started
            </Button>
          </Link>

          <Box
            sx={{
              fontSize: { xs: "12px", sm: "12px", md: "14px", lg: "14px" },
              fontWeight: "bold",
              color: "#fff",
              marginTop: { xs: "0px", sm: "7px", md: "7px", lg: "7px" },
              marginLeft: "50px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
              transition: "color 0.3s",
              "&:hover": {
                color: "#576ff6",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "#000",
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 0.3s",
              },
              "&:hover::before": {
                opacity: 0.2,
              },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={scrollToFinalSection}
          >
            Learn More
            <img
              width="12vw"
              src={isHovered ? "/downarrowcolor.png" : "/downarrow.png"}
              alt="Down Arrow"
              style={{ marginLeft: "10px" }}
              onDragStart={preventCopy}
              onMouseDown={preventCopy}
              onContextMenu={preventRightClick}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          height: "600px",
          width: "600px",
          overflow: "hidden",
          position: "relative",
          "@media (max-width: 1000px)": {
            display: "none",
          },
        }}
      >
        <Box
          component="video"
          src="/Ethereum.mp4"
          autoPlay
          loop
          muted
          onContextMenu={preventRightClick}
          sx={{
            position: "absolute",
            height: "600px",
            width: "600px",
            top: "50%",
            left: "50%",
            marginLeft: {
              xs: "50px",
              sm: "50px",
              md: "-10px",
              lg: "40px",
            },
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default HomePageZero;
