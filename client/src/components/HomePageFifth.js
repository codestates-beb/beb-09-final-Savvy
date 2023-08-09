import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Button, styled } from "@mui/material";
import PropTypes from "prop-types";

const ResponsiveImage = styled("img")(({ theme }) => ({
  width: "890px",
  [theme.breakpoints.up("xs")]: {
    width: "430px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "530px",
  },
  [theme.breakpoints.up("md")]: {
    width: "800px",
  },
  [theme.breakpoints.up("lg")]: {
    width: "890px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "890px",
  },
}));

const ResponsiveText = styled("span")(({ theme }) => ({
  fontSize: "16px",
  marginTop: "0px",
  display: "inline-block",
  background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
  color: "transparent",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  [theme.breakpoints.up("xs")]: {
    fontSize: "10px",
    marginTop: "195px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "12px",
    marginTop: "140px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
    marginTop: "33px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "16px",
    marginTop: "0px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "16px",
    marginTop: "0px",
  },
}));

const ResponsiveBackground = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "3385px",
  width: "360px",
  left: "50%",
  transform: "translateX(-50%)",
  opacity: "0.22",
  zIndex: "0",
  [theme.breakpoints.up("xs")]: {
    top: "3600px",
    width: "240px",
  },
  [theme.breakpoints.up("sm")]: {
    top: "3520px",
    width: "270px",
  },
  [theme.breakpoints.up("md")]: {
    top: "3420px",
    width: "300px",
  },
  [theme.breakpoints.up("lg")]: {
    top: "3385px",
    width: "360px",
  },
  [theme.breakpoints.up("xl")]: {
    top: "3385px",
    width: "360px",
  },
}));

const ResponsiveLogo = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "22px",
  top: "3495px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "0",
  [theme.breakpoints.up("xs")]: {
    top: "3693px",
    width: "16px",
  },
  [theme.breakpoints.up("sm")]: {
    top: "3635px",
    width: "18px",
  },
  [theme.breakpoints.up("md")]: {
    top: "3525px",
    width: "20px",
  },
  [theme.breakpoints.up("lg")]: {
    top: "3495px",
    width: "22px",
  },
  [theme.breakpoints.up("xl")]: {
    top: "3495px",
    width: "22px",
  },
}));

const preventRightClick = (event) => {
  event.preventDefault();
};

const styles = {
  imgTransition: {
    transition: "opacity 0.5s",
    opacity: 0,
  },
  imgVisible: {
    opacity: 1,
  },
  pageContent: {
    position: "absolute",
    color: "#fff",
    fontSize: `16px`,
    fontWeight: "bold",
    whiteSpace: "nowrap",
    userSelect: "none",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    top: "3525px",
    zIndex: "1",
  },
  textWithBackground: {
    display: "inline-block",
    background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
  },
};

export default function HomePageFifth() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const preventCopy = (event) => {
    event.preventDefault();
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        paddingBottom: "230px",
        userSelect: "none",
      }}
    >
      <ResponsiveBackground
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
        component="img"
        src={`${process.env.PUBLIC_URL}/purplebackground.jpg`}
        alt="purplebackground Image"
      />
      <ResponsiveLogo
        onDragStart={preventCopy}
        onMouseDown={preventCopy}
        onContextMenu={preventRightClick}
        component="img"
        src={`${process.env.PUBLIC_URL}/logopurple.png`}
        alt="logopurple Image"
        sx={{
          position: "absolute",
          width: "22px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "0",
        }}
      />
      <div style={styles.pageContent}>
        <ResponsiveText>All categories and content</ResponsiveText>
      </div>
      <Typography
        variant="h4"
        sx={{
          fontSize: "30px",
          marginBottom: "50px",
          "@media (max-width:1919px)": {
            fontSize: "30px",
            marginBottom: "50px",
          },
          "@media (max-width:1279px)": {
            fontSize: "28px",
            marginBottom: "50px",
          },
          "@media (max-width:959px)": {
            fontSize: "24px",
            marginBottom: "55px",
          },
          "@media (max-width:599px)": {
            fontSize: "22px",
            marginBottom: "55px",
          },
          color: "#fff",
          fontWeight: "bold",
          zIndex: "1",
        }}
      >
        Various Contents of Savvy
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs"
        indicatorColor="none"
      >
        <Button
          variant="contained"
          onClick={() => setValue(0)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: value === 0 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 0 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          Dashboard
        </Button>

        <Button
          variant="contained"
          color={value === 1 ? "primary" : "secondary"}
          onClick={() => setValue(1)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: value === 1 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 1 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          TBAs
        </Button>

        <Button
          variant="contained"
          color={value === 2 ? "primary" : "secondary"}
          onClick={() => setValue(2)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            zIndex: "1",
            backgroundColor: "transparent",
            border: value === 2 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 2 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          Contracts
        </Button>

        <Button
          variant="contained"
          color={value === 3 ? "primary" : "secondary"}
          onClick={() => setValue(3)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: value === 3 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 3 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          Airdrop
        </Button>

        <Button
          variant="contained"
          color={value === 4 ? "primary" : "secondary"}
          onClick={() => setValue(4)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: value === 4 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 4 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          Manager
        </Button>

        <Button
          variant="contained"
          color={value === 5 ? "primary" : "secondary"}
          onClick={() => setValue(5)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: value === 5 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 5 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          Ticket
        </Button>

        <Button
          variant="contained"
          color={value === 6 ? "primary" : "secondary"}
          onClick={() => setValue(6)}
          sx={{
            marginX: {
              xs: 0.1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
            },
            padding: {
              xs: 1,
              sm: 1,
              md: 1,
              lg: 1,
              xl: 1,
            },
            width: {
              xs: "50px",
              sm: "62px",
              md: "87px",
              lg: "100px",
              xl: "100px",
            },
            fontSize: {
              xs: "4px",
              sm: "10px",
              md: "13px",
              lg: "14px",
              xl: "14px",
            },
            borderRadius: "10px",
            fontWeight: "bold",
            backgroundColor: "transparent",
            border: value === 6 ? "2px solid #576ff6" : "2px solid #212121",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "transparent",
              border: value === 6 ? "2px solid #425be8" : "2px solid #3a3a3a",
            },
          }}
        >
          Setting
        </Button>
      </Tabs>

      <TabPanel value={value} index={0}>
        <ResponsiveImage
          onLoad={handleImageLoad}
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/dashboardpage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 0 && isImageLoaded && styles.imgVisible),
          }}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ResponsiveImage
          onLoad={handleImageLoad}
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/TBApage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 1 && isImageLoaded && styles.imgVisible),
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ResponsiveImage
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/contractpage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 2 && styles.imgVisible),
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ResponsiveImage
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/airdroppage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 3 && styles.imgVisible),
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ResponsiveImage
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/managerpage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 4 && styles.imgVisible),
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ResponsiveImage
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/Ticketpage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 5 && styles.imgVisible),
          }}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ResponsiveImage
          onDragStart={preventCopy}
          onMouseDown={preventCopy}
          onContextMenu={preventRightClick}
          src="/settingpage.png"
          alt="Description"
          style={{
            marginTop: "10px",
            borderRadius: "20px",
            border: "2px solid #666",
            boxShadow: "5px 10px 120px rgba(87, 111, 246, 0.6)",
            ...styles.imgTransition,
            ...(value === 6 && styles.imgVisible),
          }}
        />
      </TabPanel>
    </div>
  );
}
