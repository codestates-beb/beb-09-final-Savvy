import React from "react";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  width: 'auto',
  height: '45px',
  marginTop: '-140px',
  marginRight: '110px',
  fontSize: '12px',
  fontWeight: '600',
  userSelect: 'none', 
  position: 'absolute',
  right: '0px', 
  top: '190%',   
  transform: 'translateY(-50%)',  
  boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  transition: 'background-color 0.5s ease', 
  backgroundColor: '#576ff6',
  '&:hover': {
    backgroundColor: '#3351e2',
  },
});

export default function TbaGroupButton() {
  return (
    <div className="page-content">
      <StyledButton variant="contained" color="primary">
        Create New Group
      </StyledButton>
    </div>
  );
}