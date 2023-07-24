import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const HomePageZero = () => {
  const [fontSize, setFontSize] = useState(40);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxFontSize = 60; // You can adjust the maximum font size here
      const fontSizeIncrement = 0.1; // You can adjust the increment rate here

      // Calculate the new font size based on the scroll position
      const newFontSize = Math.max(40, maxFontSize - scrollY * fontSizeIncrement);

      setFontSize(newFontSize);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: `${fontSize}px`,
        fontWeight: 'bold',
        color: 'white',
      }}
    >
      We Prepare For The Future
    </Box>
  );
};

export default HomePageZero;