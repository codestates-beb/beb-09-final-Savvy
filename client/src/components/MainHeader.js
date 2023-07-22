import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const MainHeader = () => {
  const handleLogoClick = () => {
    window.location.href = 'http://localhost:3000';
  };

  const handleCreateTBAClick = () => {
    if (window.location.href.includes('erc6551')) {
      return;
    }
    window.location.href = 'http://localhost:3000/erc6551';
  };

  const isCreateTBAActive = window.location.href.includes('erc6551');

  const buttonText = isCreateTBAActive ? 'Connect Wallet' : 'Create TBA';

  const connectWalletStyles = isCreateTBAActive
    ? {
        fontFamily: 'Dongle',
        marginLeft: '-150px',
        marginTop: '24px',
        border: '2px solid #576ff6',
        borderRadius: '20px',
        width: '130px',
        height: '40px',
        fontSize: '12px',
      }
    : {};

    const loginButtonStyles = {
      backgroundColor: '#000',
      color: '#fff',
      marginTop: '24px',
      marginLeft: '10px',
      fontFamily: 'Dongle',
      fontWeight: '800',
      borderRadius: '20px',
      width: '80px',
      height: '40px',
      transition: 'background-color 0.5s, color 0.5s',
      '&:hover': {
        backgroundColor: '#000',
        color: '#b4b4b4',
      },
    };      

  const signUpButtonStyles = {
    backgroundColor: '#fff',
    color: '#000',
    marginTop: '23px',
    marginLeft: '8px',
    marginRight: '16px',
    fontFamily: 'Dongle',
    fontWeight: '800',
    borderRadius: '20px',
    width: '80px',
    height: '40px',
    transition: 'background-color 0.5s, color 0.5s',
    '&:hover': {
      backgroundColor: '#576ff6',
      color: '#fff',
    },
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', boxShadow: 'none', height: '85px' }}>
      <Toolbar>
        <img
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="Logo"
          style={{ width: '110px', height: 'auto', marginTop: '18px', marginLeft: '25px', cursor: 'pointer' }}
          onClick={handleLogoClick}
        />
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                backgroundColor: isCreateTBAActive ? '#000' : '#000',
                color: isCreateTBAActive ? '#576ff6' : '#fff',
                marginTop: '25px',
                fontFamily: 'Dongle',
                fontWeight: '800',
                transition: 'background-color 0.5s, color 0.5s',
                ...connectWalletStyles,
                '&:hover': {
                  backgroundColor: isCreateTBAActive ? '#576ff6' : '#000',
                  color: '#fff',
                },
              }}
              onClick={handleCreateTBAClick}
            >
              {buttonText}
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={loginButtonStyles}
            >
              Log in
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={signUpButtonStyles}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;