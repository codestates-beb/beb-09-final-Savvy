import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const StyledQuestionTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "bold",
  color: "#fff",
  [theme.breakpoints.up("xs")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "15px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "15px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "15px",
  },
}));

const StyledAnswerTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "bold",
  color: "#576ff6",
  background: "linear-gradient(to right, #576ff6, white)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.up("xs")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "14px",
  },
}));

const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "5px",
  color: "#576ff6",
  fontWeight: "bold",
  fontSize: "55px",
  textAlign: "center",
  background: "linear-gradient(to right, #576ff6, #c91bf4 )",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.up("xs")]: {
    fontSize: "40px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "45px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "50px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "55px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "55px",
  },
}));

const StyledSubheaderTypography = styled(Typography)(({ theme }) => ({
  marginBottom: "40px",
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
  fontSize: "18px",
  [theme.breakpoints.up("xs")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "15px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "18px",
  },
  [theme.breakpoints.up("xl")]: {
    fontSize: "18px",
  },
}));

const StyledExpandMoreIcon = styled(ExpandMoreIcon)(({ theme }) => ({
  color: "#fff",
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  "&.Mui-expanded": {
    borderBottom: "1px solid #4c4c4c",
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: "7px",
  backgroundColor: "#242424",
  marginBottom: "20px",
  width: "100%",
  "&.Mui-expanded": {
    marginBottom: "20px",
    marginTop: "0",
  },
  "& .MuiAccordionDetails-root": {
    padding: "10",
  },
  width: "100%",
  [theme.breakpoints.up("xs")]: {
    width: "80%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "80%",
  },
  [theme.breakpoints.up("md")]: {
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "100%",
  },
}));

const StyledImageWoman = styled("img")(({ theme }) => ({
  width: "300px",
  marginTop: "20px",
  marginRight: "200px",
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
    width: "300px",
  },
}));

const StyledImageMan = styled("img")(({ theme }) => ({
  width: "300px",
  marginTop: "20px",
  [theme.breakpoints.up("xs")]: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    display: "block",
    width: "300px",
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  marginTop: "5px",
}));

function HomePageFinal() {
  const faqs = [
    { question: "What is Savvy?", answer: "In reply to Savvy..." },
    {
      question: "Please tell me how to log in",
      answer: "The answer to how to log in...",
    },
    {
      question: "Can I use savvy on mobile?",
      answer: "In response to mobile usage...",
    },
    {
      question: "What features does the dashboard support?",
      answer: "In response to the Dashboard feature...",
    },
    {
      question: "How do I check my staking rewards?",
      answer: "The answer to the staking reward...",
    },
    {
      question: "What are the staking methods and procedures?",
      answer: "The answer to the staking method...",
    },
    {
      question: "How does the airdrop work?",
      answer: "The answer to the airdrop is...",
    },
    {
      question:
        "I have completed staking/unstaking, but I cannot view the transaction record",
      answer:
        "The contents of the response to the transaction record inquiry...",
    },
  ];

  useEffect(() => {
    document.addEventListener("contextmenu", preventFunction);

    document.addEventListener("mousedown", preventFunction);
    document.addEventListener("selectstart", preventFunction);

    return () => {
      document.removeEventListener("contextmenu", preventFunction);
      document.removeEventListener("mousedown", preventFunction);
      document.removeEventListener("selectstart", preventFunction);
    };
  }, []);

  const imageSrcWoman = "/personwoman.png";
  const imageSrcMan = "/personman.png";

  const [expanded, setExpanded] = useState(-1);

  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : -1);
  };

  const preventFunction = (e) => {
    e.preventDefault();
  };

  document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  document.addEventListener("mousedown", preventFunction);
  document.addEventListener("selectstart", preventFunction);

  return (
    <div
      id="homePageFinal"
      style={{
        height: "72vh",
        paddingTop: "50px",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StyledHeaderTypography variant="h4">Q&A</StyledHeaderTypography>
      <StyledSubheaderTypography>
        You can check out<span style={{ marginLeft: "5px" }}></span>
        <span
          style={{
            background: "linear-gradient(to left, #576ff6, white)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Savvy's FAQ
        </span>
      </StyledSubheaderTypography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <StyledImageWoman src={imageSrcWoman} alt="Person" />
          <StyledImageMan src={imageSrcMan} alt="Person" />
        </div>
        {faqs.map((faq, index) => (
          <StyledAccordion
            key={index}
            expanded={index === expanded}
            onChange={handleAccordionChange(index)}
          >
            <StyledAccordionSummary
              expandIcon={<StyledExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
            >
              <StyledQuestionTypography>
                {faq.question}
              </StyledQuestionTypography>
            </StyledAccordionSummary>

            <StyledAccordionDetails>
              <StyledAnswerTypography>{faq.answer}</StyledAnswerTypography>
            </StyledAccordionDetails>
          </StyledAccordion>
        ))}
      </div>
    </div>
  );
}

export default HomePageFinal;
