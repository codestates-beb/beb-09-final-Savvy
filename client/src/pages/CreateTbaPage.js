import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import CreateTbaMain from "../components/CreateTbaMain";
import CreateTbaSignup from "../components/CreateTbaSignup";
import { styled } from "@mui/system";

const Container = styled("div")({
  position: "relative",
  zIndex: 0,
  backgroundColor: "#000",
});

const SignupContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  width: "100%",
  height: "auto",
  marginLeft: "0%",
  marginBottom: "-50px",
  zIndex: 1,
  [theme.breakpoints.only("xs")]: {
    position: "relative",
    width: "90%",
    marginLeft: "3%",
    marginTop: "-25%",
  },
  [theme.breakpoints.only("sm")]: {
    position: "relative",
    width: "80%",
    marginLeft: "8.5%",
    marginTop: "-14%",
  },
  [theme.breakpoints.up("md")]: {
    width: "80%",
    marginLeft: "8%",
    marginTop: "-6%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "85%",
    marginLeft: "5.5%",
    marginTop: "0%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "55%",
    marginLeft: "21.5%",
    marginTop: "0%",
  },
}));

const MainContainer = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 0,
  [theme.breakpoints.only("xs")]: {
    display: "none",
  },
  [theme.breakpoints.only("sm")]: {
    display: "none",
  },
}));

const StyledMainFooter = styled(MainFooter)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.up("xs")]: {
    width: "90%",
    marginLeft: "4%",
  },
}));

const HeaderContainer = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.only("xs")]: {
    marginBottom: "150px",
  },
  [theme.breakpoints.only("sm")]: {
    marginBottom: "140px",
  },
}));

export default function CreateTbaPage() {
  useEffect(() => {
    document.body.style.backgroundColor = "#000";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <MainHeader />
      </HeaderContainer>
      <SignupContainer>
        <CreateTbaSignup />
      </SignupContainer>
      <MainContainer>
        <CreateTbaMain />
      </MainContainer>
      <StyledMainFooter />
    </Container>
  );
}
