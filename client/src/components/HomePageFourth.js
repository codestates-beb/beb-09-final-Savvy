import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const HomePageFourth = () => {
  const [industryFontSize, setIndustryFontSize] = useState(33);
  const [gridFontSize, setGridFontSize] = useState(25);
  const [nftFontSize, setNftFontSize] = useState(25);
  const [universeFontSize, setUniverseFontSize] = useState(25);
  const [etherFontSize, setEtherFontSize] = useState(25);
  const [isDisplayImage, setIsDisplayImage] = useState(false);
  const [marginTopValue, setMarginTopValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    setIsDisplayImage(screenWidth > 900);
    if (screenWidth >= 1280) {
      setIndustryFontSize(38);
      setGridFontSize(30);
      setNftFontSize(38);
      setUniverseFontSize(40);
      setEtherFontSize(36);
    } else if (screenWidth >= 960) {
      setIndustryFontSize(35);
      setGridFontSize(28);
      setNftFontSize(35);
      setUniverseFontSize(38);
      setEtherFontSize(31);
    } else if (screenWidth > 900) {
      setIndustryFontSize(30);
      setGridFontSize(25);
      setNftFontSize(30);
      setUniverseFontSize(33);
      setEtherFontSize(26);
    } else if (screenWidth > 700) {
      setIndustryFontSize(25);
      setGridFontSize(20);
      setNftFontSize(25);
      setUniverseFontSize(23);
      setEtherFontSize(21);
    } else {
      setIndustryFontSize(23);
      setGridFontSize(15);
      setNftFontSize(20);
      setUniverseFontSize(18);
      setEtherFontSize(15);
    }
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position > 1800) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 0%, #0b0b0b 10%, #0b0b0b 80%, rgba(0,0,0,1) 100%)",
        height: "145vh",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" padding="100px">
          <Grid
            item
            sx={{
              backgroundColor: "rgba(22, 22, 23, 0.8)",
              alignItems: "center",
              height: "40vh",
              borderRadius: "30px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <video
              controls={false}
              width="100%"
              height="100%"
              style={{
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              autoPlay
              loop
              muted
              onContextMenu={(e) => e.preventDefault()}
              draggable="false"
            >
              <source src="/earth.mp4" type="video/mp4" />
            </video>

            <Typography
              variant="h4"
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: `${industryFontSize}px`,
                textAlign: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                userSelect: "none",
                background: "linear-gradient(to right, #576ff6, #c91bf4 )",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transform: "translate(-50%, -50%)",
                lineHeight: "1.5",
                whiteSpace: "nowrap",
              }}
            >
              The World's Best <br /> Community Platform
            </Typography>

            <Link to="/community">
              <Button
                variant="outlined"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "10px",
                  border: "none",
                  borderRadius: "100%",
                  position: "absolute",
                  bottom: "1%",
                  left: "5.2%",
                  transform: "translate(-50%, -50%)",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
              >
                <img
                  width="28vw"
                  src={"/leftarrow.png"}
                  alt="Down Arrow"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
              </Button>
            </Link>
          </Grid>

          <Grid container item xs={6} sm={6} md={6} lg={6}>
            <Grid
              item
              xs={6}
              sm={6}
              md={6}
              lg={6}
              sx={{
                backgroundColor: "#000",
                marginTop: "30px",
                height: "50vh",
                borderRadius: "35px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: `${nftFontSize}px`,
                  textAlign: "center",
                  position: "absolute",
                  top: "25%",
                  left: "50%",
                  width: "100%",
                  userSelect: "none",
                  background: "linear-gradient(to right, #576ff6, white)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transform: "translate(-50%, -50%)",
                  lineHeight: "1.5",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 1s",
                }}
              >
                Unique NFT Ticket
              </Typography>
              <Link to="/community">
                <Button
                  variant="outlined"
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "10px",
                    border: "none",
                    borderRadius: "100%",
                    position: "absolute",
                    bottom: "1%",
                    left: "10%",
                    transform: "translate(-50%, -50%)",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 1s",
                    zIndex: "10",
                  }}
                >
                  <img
                    width="28vw"
                    src={"/leftarrow.png"}
                    alt="Down Arrow"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </Button>
              </Link>

              <video
                src="/NFTticket.mp4"
                style={{
                  width: "70%",
                  height: "70%",
                  objectFit: "cover",
                  position: "absolute",
                  top: "45%",
                  left: "15%",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 1s",
                }}
                autoPlay
                loop
                muted
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
            </Grid>

            <Grid container item xs={6} sm={6} md={6} lg={6}>
              <Grid
                item
                xs={12}
                sx={{
                  marginTop: "30px",
                  marginLeft: "30px",
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: `${gridFontSize}px`,
                    textAlign: "center",
                    position: "absolute",
                    top: "30%",
                    left: "28%",
                    userSelect: "none",
                    background: "linear-gradient(to right, #576ff6, white)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    transform: "translate(-50%, -50%)",
                    lineHeight: "1.5",
                  }}
                >
                  What is
                  <br />
                  ERC-6551
                </Typography>

                <Link to="/community">
                  <Button
                    variant="outlined"
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "none",
                      borderRadius: "100%",
                      position: "absolute",
                      bottom: "1%",
                      left: "10%",
                      transform: "translate(-50%, -50%)",
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 1s",
                    }}
                  >
                    <img
                      width="28vw"
                      src={"/leftarrow.png"}
                      alt="Down Arrow"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </Button>
                </Link>

                <div
                  style={{
                    backgroundColor: "#000",
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(/grid2.png)`,
                    backgroundPosition: "calc(50% + 80px) calc(50% + 95px)",
                    backgroundSize: "280px",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  marginTop: "30px",
                  marginLeft: "30px",
                  borderRadius: "30px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: `${gridFontSize}px`,
                    textAlign: "right",
                    position: "absolute",
                    top: "70%",
                    left: "70%",
                    userSelect: "none",
                    transform: "translate(-50%, -50%)",
                    lineHeight: "1.5",
                  }}
                >
                  Solid Stability
                </Typography>

                <Link to="/community">
                  <Button
                    variant="outlined"
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "none",
                      borderRadius: "100%",
                      position: "absolute",
                      bottom: "1%",
                      left: "10%",
                      transform: "translate(-50%, -50%)",
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 1s",
                    }}
                  >
                    <img
                      width="28vw"
                      src={"/leftarrow.png"}
                      alt="Down Arrow"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </Button>
                </Link>

                <div
                  style={{
                    backgroundColor: "#000",
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(/cube.png)`,
                    backgroundPosition: "calc(50% + -60px) calc(50% + -60px)",
                    backgroundSize: "250px",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              sx={{
                backgroundColor: "#000",
                marginTop: "30px",
                height: "30vh",
                borderRadius: "30px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: `${etherFontSize}px`,
                  textAlign: "left",
                  position: "absolute",
                  top: "20%",
                  left: "50%",
                  userSelect: "none",
                  background: "linear-gradient(to right, #576ff6, #c91bf4 )",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transform: "translate(-50%, -50%)",
                  lineHeight: "1.5",
                }}
              >
                Another
                <br />
                Innovation
              </Typography>
              <Link to="/community">
                <Button
                  variant="outlined"
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "10px",
                    border: "none",
                    borderRadius: "100%",
                    position: "absolute",
                    bottom: "1%",
                    left: "14%",
                    transform: "translate(-50%, -50%)",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 1s",
                  }}
                >
                  <img
                    width="28vw"
                    src={"/leftarrow.png"}
                    alt="Down Arrow"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </Button>
              </Link>
              <div
                style={{
                  backgroundColor: "#000",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(/ether.jpg)`,
                  backgroundPosition: "calc(50% + 5px) calc(50% + 50px)",
                  backgroundSize: "280px",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Grid>

            <Grid container item xs={8} sm={8} md={8} lg={8}>
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: "#000",
                  marginTop: "30px",
                  marginLeft: "30px",
                  height: "30vh",
                  borderRadius: "30px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: `${universeFontSize}px`,
                    textAlign: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    userSelect: "none",
                    transform: "translate(-50%, -50%)",
                    lineHeight: "1.5",
                    zIndex: "1",
                    width: "100%",
                    opacity: isVisible ? 1 : 0,
                    transition: "opacity 1.5s",
                  }}
                >
                  Endless ways to use it
                </Typography>
                <Link to="/community">
                  <Button
                    variant="outlined"
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: "10px",
                      border: "none",
                      borderRadius: "100%",
                      position: "absolute",
                      bottom: "1%",
                      left: "7%",
                      transform: "translate(-50%, -50%)",
                      opacity: isVisible ? 1 : 0,
                      transition: "opacity 1s",
                      zIndex: "10",
                    }}
                  >
                    <img
                      width="28vw"
                      src={"/leftarrow.png"}
                      alt="Down Arrow"
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </Button>
                </Link>
                <video
                  src="/UNIVERSE.mp4"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  autoPlay
                  loop
                  muted
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePageFourth;
