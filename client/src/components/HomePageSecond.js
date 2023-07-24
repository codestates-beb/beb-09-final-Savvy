import React, { useEffect, useState } from 'react';

const HomePageSecond = () => {
  const [containerHeight, setContainerHeight] = useState('4000px');

  const updateContainerHeight = () => {
    const windowWidth = window.innerWidth;
    const newHeight = windowWidth < 499 ? '3000px' : '4000px';
    setContainerHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateContainerHeight);
    updateContainerHeight();

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  const containerStyle = {
    background: 'linear-gradient(to bottom, #000 0%, #141414 10%, #212121 90%, #000 100%)',
    height: containerHeight,
    position: 'relative',
    overflow: 'hidden'
  };

  const textContainerStyle = {
    position: 'sticky',
    top: '20%',
    transform: 'translateY(-50%)',
  };

  const textStyle = {
    position: 'fixed',
    top: '60%',
    left: '100%',
    whiteSpace: 'nowrap',
    transform: 'translateY(-150%)',
    animation: 'moveText 50s linear infinite',
    WebkitTextStroke: '1px #fff',
    color: 'rgba(255, 255, 255, 0)',
    fontSize: '100px',
    fontWeight: '800',
    fontFamily: 'Dongle',
    userSelect: 'none',
    zIndex: 1,
  };

  const textStyle2 = {
    ...textStyle,
    animation: 'moveTextReverse 80s linear infinite',
    transform: 'translateY(-50%)',
  };

  const [isFixed, setIsFixed] = useState(false);
  const dynamicTextContainerStyle = isFixed
    ? {
        position: 'fixed',
        top: '40%',
        width: '100%',
        overflowX: 'hidden',
        zIndex: 1,
      }
    : textContainerStyle;

  useEffect(() => {
    const handleScroll = () => {
      const totalDocumentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY > totalDocumentHeight * 0.1 && window.scrollY < totalDocumentHeight * 0.7) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const spanStyle = {
    color: '#fff',
  };

  const [videoContainerWidth, setVideoContainerWidth] = useState('40%');
  const [videoPosition, setVideoPosition] = useState('0%');
  const [videoPosition3, setVideoPosition3] = useState('30%');
  const [videoContainerHeight, setVideoContainerHeight] = useState('40%');

  const updateVideoContainerWidth = () => {
    const windowWidth = window.innerWidth;
    let newVideoContainerWidth;
    let newVideoPosition;
    let newVideoPosition3;
    let newVideoContainerHeight;

    if (windowWidth < 400) {
      newVideoContainerWidth = '90%';
      newVideoPosition = '0%';
      newVideoPosition3 = '0%'; 
      newVideoContainerHeight = '0%'; 
    } else if (windowWidth >= 400 && windowWidth < 768) {
      newVideoContainerWidth = '80%';
      newVideoPosition = '0%';
      newVideoPosition3 = '0%';
      newVideoContainerHeight = '27%'; 
    } else if (windowWidth >= 768 && windowWidth < 1024) {
      newVideoContainerWidth = '50%';
      newVideoPosition = '0%';
      newVideoPosition3 = '60%'; 
      newVideoContainerHeight = '27%'; 
    } else if (windowWidth >= 1024 && windowWidth < 1200) {
      newVideoContainerWidth = '40%';
      newVideoPosition = '0%';
      newVideoPosition3 = '100%'; 
      newVideoContainerHeight = '30%'; 
    } else if (windowWidth >= 1200 && windowWidth < 1400) {
      newVideoContainerWidth = '40%';
      newVideoPosition = '0%';
      newVideoPosition3 = '100%'; 
      newVideoContainerHeight = '30%'; 
    } else if (windowWidth >= 1400 && windowWidth < 1600) {
      newVideoContainerWidth = '40%';
      newVideoPosition = '0%';
      newVideoPosition3 = '100%';
      newVideoContainerHeight = '35%'; 
    } else if (windowWidth >= 1400 && windowWidth < 1800) {
      newVideoContainerWidth = '30%';
      newVideoPosition = '0%';
      newVideoPosition3 = '170%';
      newVideoContainerHeight = '35%'; 
    } else {
      newVideoContainerWidth = '30%';
      newVideoPosition = '0%';
      newVideoPosition3 = '160%';
      newVideoContainerHeight = '47%'; 
    }

    setVideoContainerWidth(newVideoContainerWidth);
    setVideoPosition(newVideoPosition);
    setVideoPosition3(newVideoPosition3);
    setVideoContainerHeight(newVideoContainerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateVideoContainerWidth);
    updateVideoContainerWidth();

    return () => {
      window.removeEventListener('resize', updateVideoContainerWidth);
    };
  }, []);

  const videoContainerStyle = {
    width: videoContainerWidth,
    height: videoContainerHeight, 
    marginTop: '-20%',
    marginLeft: '10%',
    position: 'relative',
    zIndex: 2,
    left: videoPosition,
  };

  const videoStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    marginTop: '0%',
  };

  const videoStyle2 = {
    position: 'absolute',
    top: '60%',
    left: videoPosition3,
    width: '100%',
    height: '100%',
  };

  const videoStyle3 = {
    position: 'absolute',
    top: '120%',
    left: 0,
    width: '100%',
    height: '100%',
  };

  const videoStyle4 = {
    position: 'absolute',
    top: '160%',
    left: videoPosition3,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  };

  const [imageStyles, setImageStyles] = useState({
    imageStyle: {
      position: 'absolute',
      top: '63.3%',
      left: '115%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle2: {
      position: 'absolute',
      top: '123%',
      left: '136%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle3: {
      position: 'absolute',
      top: '177.2%',
      left: '115%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle4: {
      position: 'absolute',
      top: '217.2%',
      left: '136%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle5: {
      position: 'absolute',
      top: '38%',
      left: '135%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle6: {
      position: 'absolute',
      top: '98%',
      left: '132%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle7: {
      position: 'absolute',
      top: '164%',
      left: '121.5%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
    imageStyle8: {
      position: 'absolute',
      top: '204%',
      left: '133%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
      height: 'auto',
    },
  });

  const deepCopy = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map(deepCopy);
    }
  
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, deepCopy(value)])
    );
  };
  
  const updateImageStyles = () => {
    const windowWidth = window.innerWidth;
    let newImageStyles = deepCopy(imageStyles);
  
    if (windowWidth < 400) {
      newImageStyles.imageStyle.width = '0%';
      newImageStyles.imageStyle.top = '10%';
    } else if (windowWidth >= 400 && windowWidth < 768) {
      newImageStyles.imageStyle.width = '0%';
      newImageStyles.imageStyle2.width = '0%';
      newImageStyles.imageStyle3.width = '0%';
      newImageStyles.imageStyle4.width = '0%';
      newImageStyles.imageStyle5.width = '0%';
      newImageStyles.imageStyle6.width = '0%';
      newImageStyles.imageStyle7.width = '0%';
      newImageStyles.imageStyle8.width = '0%';
    } else if (windowWidth >= 768 && windowWidth < 1024) {
        newImageStyles.imageStyle.width = '80%';
        newImageStyles.imageStyle2.width = '80%';
        newImageStyles.imageStyle2.left = '37%';
        newImageStyles.imageStyle3.width = '80%';
        newImageStyles.imageStyle4.width = '80%';
        newImageStyles.imageStyle4.left = '37%';
        newImageStyles.imageStyle5.width = '80%';
        newImageStyles.imageStyle6.width = '80%';
        newImageStyles.imageStyle6.left = '33%';
        newImageStyles.imageStyle7.width = '80%';
        newImageStyles.imageStyle8.width = '80%';
        newImageStyles.imageStyle8.left = '33%';
    } else if (windowWidth >= 1024 && windowWidth < 1200) {
        newImageStyles.imageStyle.width = '80%';
        newImageStyles.imageStyle2.width = '80%';
        newImageStyles.imageStyle2.left = '77%';
        newImageStyles.imageStyle3.width = '80%';
        newImageStyles.imageStyle4.width = '80%';
        newImageStyles.imageStyle4.left = '77%';
        newImageStyles.imageStyle5.width = '80%';
        newImageStyles.imageStyle6.width = '80%';
        newImageStyles.imageStyle6.left = '73%';
        newImageStyles.imageStyle7.width = '80%';
        newImageStyles.imageStyle8.width = '80%';
        newImageStyles.imageStyle8.left = '73%';
    } else if (windowWidth >= 1200 && windowWidth < 1400) {
        newImageStyles.imageStyle.width = '80%';
        newImageStyles.imageStyle2.width = '80%';
        newImageStyles.imageStyle2.left = '77%';
        newImageStyles.imageStyle3.width = '80%';
        newImageStyles.imageStyle4.width = '80%';
        newImageStyles.imageStyle4.left = '77%';
        newImageStyles.imageStyle5.width = '80%';
        newImageStyles.imageStyle6.width = '80%';
        newImageStyles.imageStyle6.left = '73%';
        newImageStyles.imageStyle7.width = '80%';
        newImageStyles.imageStyle8.width = '80%';
        newImageStyles.imageStyle8.left = '73%';
    } else if (windowWidth >= 1400 && windowWidth < 1600) {
        newImageStyles.imageStyle.width = '80%';
        newImageStyles.imageStyle2.width = '80%';
        newImageStyles.imageStyle2.left = '77%';
        newImageStyles.imageStyle3.width = '80%';
        newImageStyles.imageStyle4.width = '80%';
        newImageStyles.imageStyle4.left = '77%';
        newImageStyles.imageStyle5.width = '80%';
        newImageStyles.imageStyle6.width = '80%';
        newImageStyles.imageStyle6.left = '73%';
        newImageStyles.imageStyle7.width = '80%';
        newImageStyles.imageStyle8.width = '80%';
        newImageStyles.imageStyle8.left = '77%';
    } else if (windowWidth >= 1400 && windowWidth < 1800) {
        newImageStyles.imageStyle.width = '80%';
        newImageStyles.imageStyle2.width = '80%';
        newImageStyles.imageStyle2.left = '146%';
        newImageStyles.imageStyle3.width = '80%';
        newImageStyles.imageStyle4.width = '80%';
        newImageStyles.imageStyle4.left = '146%';
        newImageStyles.imageStyle5.width = '80%';
        newImageStyles.imageStyle6.width = '80%';
        newImageStyles.imageStyle6.left = '142%';
        newImageStyles.imageStyle7.width = '80%';
        newImageStyles.imageStyle8.width = '80%';
        newImageStyles.imageStyle8.left = '142%';
    } else {
      newImageStyles.imageStyle.width = '80%';
      newImageStyles.imageStyle2.width = '80%';
      newImageStyles.imageStyle2.left = '137%';
      newImageStyles.imageStyle3.width = '80%';
      newImageStyles.imageStyle4.width = '80%';
      newImageStyles.imageStyle4.left = '137%';
      newImageStyles.imageStyle5.width = '80%';
      newImageStyles.imageStyle6.width = '80%';
      newImageStyles.imageStyle6.left = '133%';
      newImageStyles.imageStyle7.width = '80%';
      newImageStyles.imageStyle8.width = '80%';
      newImageStyles.imageStyle8.left = '134%';
    }
  
    setImageStyles(newImageStyles); 
  };

  useEffect(() => {
    window.addEventListener('resize', updateImageStyles);
    updateImageStyles();

    return () => {
      window.removeEventListener('resize', updateImageStyles);
    };
  }, []);

  const imageStyle = imageStyles.imageStyle;
  const imageStyle2 = imageStyles.imageStyle2;
  const imageStyle3 = imageStyles.imageStyle3;
  const imageStyle4 = imageStyles.imageStyle4;
  const imageStyle5 = imageStyles.imageStyle5;
  const imageStyle6 = imageStyles.imageStyle6;
  const imageStyle7 = imageStyles.imageStyle7;
  const imageStyle8 = imageStyles.imageStyle8;

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes moveText {
          100% {
            left: -100%;
          }
        }

        @keyframes moveTextReverse {
          0% {
            left: -303%;
          }
        }
      `}</style>
      <div style={videoContainerStyle}>
        <video autoPlay loop muted style={videoStyle}>
          <source src="/Second1.mp4" type="video/mp4" />
        </video>
        <video autoPlay loop muted style={videoStyle2}>
          <source src="/Second2.mp4" type="video/mp4" />
        </video>
        <video autoPlay loop muted style={videoStyle3}>
          <source src="/Second3.mp4" type="video/mp4" />
        </video>
        <video autoPlay loop muted style={videoStyle4}>
          <source src="/Second4.mp4" type="video/mp4" />
        </video>
        <img src="/SecondImage.png" alt="01/04" style={imageStyle} />
        <img src="/SecondImage2.png" alt="02/04" style={imageStyle2} />
        <img src="/SecondImage3.png" alt="03/04" style={imageStyle3} />
        <img src="/SecondImage4.png" alt="04/04" style={imageStyle4} />
        <img src="/SecondImage5.png" alt="Introduction" style={imageStyle5} />
        <img src="/SecondImage6.png" alt="Signature" style={imageStyle6} />
        <img src="/SecondImage7.png" alt="Effect" style={imageStyle7} />
        <img src="/SecondImage8.png" alt="Philosophy" style={imageStyle8} />
      </div>
      <div style={dynamicTextContainerStyle}>
        <span style={textStyle}>
          <span style={spanStyle}>CURRENTLY</span> THE MOST <span style={spanStyle}>PROGRESSIVE</span> NFT BLOCKCHAIN <span style={spanStyle}>COMMUNITY</span> MANAGEMENT {' '}
          <span style={spanStyle}>CURRENTLY</span> THE MOST <span style={spanStyle}>PROGRESSIVE</span> NFT BLOCKCHAIN <span style={spanStyle}>COMMUNITY</span> MANAGEMENT {' '}
          <span style={spanStyle}>CURRENTLY</span> THE MOST <span style={spanStyle}>PROGRESSIVE</span> NFT BLOCKCHAIN <span style={spanStyle}>COMMUNITY</span> MANAGEMENT
        </span>
        <span style={textStyle2}>
          <span style={spanStyle}>CURRENTLY</span> THE MOST <span style={spanStyle}>PROGRESSIVE</span> NFT BLOCKCHAIN <span style={spanStyle}>COMMUNITY</span> MANAGEMENT {' '} 
          <span style={spanStyle}>CURRENTLY</span> THE MOST <span style={spanStyle}>PROGRESSIVE</span> NFT BLOCKCHAIN <span style={spanStyle}>COMMUNITY</span> MANAGEMENT {' '}
          <span style={spanStyle}>CURRENTLY</span> THE MOST <span style={spanStyle}>PROGRESSIVE</span> NFT BLOCKCHAIN <span style={spanStyle}>COMMUNITY</span> MANAGEMENT
        </span>
      </div>
    </div>
  );
};

export default HomePageSecond;