import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginBottom: '20px',
    width: '100%',
    '&.Mui-expanded': { 
        marginBottom: '20px',
        marginTop: '0',
    },
    '& .MuiAccordionDetails-root': {
        padding: '10', 
    },
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '80%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '100%',
    },
}));

const StyledImageWoman = styled('img')(({ theme }) => ({
    width: '300px',
    marginTop: '20px',
    marginRight: '200px',
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '300px',
    },
}));

const StyledImageMan = styled('img')(({ theme }) => ({
    width: '300px',
    marginTop: '20px',
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
      width: '300px',
    },
}));

function HomePageFinal() {
  const faqs = [
    { question: "What is Savvy?", answer: "In reply to Savvy..." },
    { question: "Please tell me how to log in", answer: "The answer to how to log in..." },
    { question: "Can I use savvy on mobile?", answer: "In response to mobile usage..." },
    { question: "What features does the dashboard support?", answer: "In response to the Dashboard feature..." },
    { question: "How do I check my staking rewards?", answer: "The answer to the staking reward..." },
    { question: "What are the staking methods and procedures?", answer: "The answer to the staking method..." },
    { question: "How does the airdrop work?", answer: "The answer to the airdrop is..." },
    { question: "I have completed staking/unstaking, but I cannot view the transaction record", answer: "The contents of the response to the transaction record inquiry..." }
  ];

  const imageSrcWoman = '/personwoman.png';
  const imageSrcMan = '/personman.png';

  const [expanded, setExpanded] = useState(-1);

  const handleAccordionChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : -1);
  };

  return (
    <div style={{ backgroundColor: '#000000', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Typography variant="h4" style={{ marginBottom: '5px', color: '#576ff6', fontWeight: 'bold', fontSize: '60px', textAlign: 'center' }}>Q&A</Typography>
      <Typography style={{ marginBottom: '40px', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>You can check out Savvy's FAQ</Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex' }}>
          <StyledImageWoman src={imageSrcWoman} alt="Person" />
          <StyledImageMan src={imageSrcMan} alt="Person" />
        </div>
        {faqs.map((faq, index) => (
          <StyledAccordion
            key={index}
            expanded={index === expanded}
            onChange={handleAccordionChange(index)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}a-content`}
              id={`panel${index + 1}a-header`}
            >
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </div>
    </div>
  );
}

export default HomePageFinal;