import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import Draggable from 'react-draggable';

const DashboardSearchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showInputTool, setShowInputTool] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [shiftActive, setShiftActive] = useState(false);

  const englishShiftMap = {
    'Q': 'q', 'W': 'w', 'E': 'e', 'R': 'r', 'T': 't', 'Y': 'y', 'U': 'u', 'I': 'i',
    'O': 'o', 'P': 'p', 'A': 'a', 'S': 's', 'D': 'd', 'F': 'f', 'G': 'g', 'H': 'h',
    'J': 'j', 'K': 'k', 'L': 'l', 'Z': 'z', 'X': 'x', 'C': 'c', 'V': 'v', 'B': 'b',
    'N': 'n', 'M': 'm',
  };

  const koreanShiftMap = {
    'ㄱ': 'ㄲ', 'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㅅ': 'ㅆ', 'ㅐ': 'ㅒ', 'ㅔ': 'ㅖ',
    'ㄴ': 'ㄴ', 'ㄹ': 'ㄹ', 'ㅁ': 'ㅁ', 'ㅊ': 'ㅊ', 'ㅋ': 'ㅋ', 'ㅌ': 'ㅌ', 'ㅍ': 'ㅍ',
    'ㅎ': 'ㅎ', 'ㅕ': 'ㅕ', 'ㅗ': 'ㅗ', 'ㅓ': 'ㅓ', 'ㅏ': 'ㅏ', 'ㅣ': 'ㅣ', 'ㅡ': 'ㅡ',
    'ㅜ': 'ㅜ', 'ㅠ': 'ㅠ', 'ㅇ': 'ㅇ', 'ㅑ': 'ㅑ', 'ㅛ': 'ㅛ', 
  };

  const handleDelete = () => {
    setQuery(prevQuery => prevQuery.slice(0, -1));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleInputTool = () => {
    setShowInputTool(!showInputTool);
  };
 
  const handleReset = () => {
    setQuery('');
  };

  const normalKeys = '1 2 3 4 5 6 7 8 9 0';
  const shiftedKeys = '! @ # $ % ^ & * ( )';

  const consonants = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  const vowels = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅒ', 'ㅖ'];
  
  const handleKeyPress = (char) => {
    let newQuery = query;

    if (shiftActive) {
      if (language === 'EN') {
        char = englishShiftMap[char] || char; 
      } else if (language === 'KO') {
        char = koreanShiftMap[char] || char;
      }
    }  

  if (vowels.includes(char) && consonants.includes(newQuery[newQuery.length - 1])) {
    newQuery = newQuery.slice(0, -1) + String.fromCharCode(newQuery[newQuery.length - 1].charCodeAt(0) + char.charCodeAt(0) - 0x3131 + 0xAC00);
  } else {
    newQuery += char;
  }
  
    setQuery(newQuery);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'KO' : 'EN');
  };

  const handleShiftToggle = () => {
    setShiftActive(prev => !prev);
  };

  return (
    <>
      <style jsx>{`
        .virtual-keyboard-row {
          display: flex;
          gap: 3px;
        }

        .virtual-keyboard-button {
          background-color: white;
          border: 1px solid #ccc;
          padding: 5px 6px;
          border-radius: 4px;
          color: #333;
          transition: background-color 0.3s;
          font-size: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-right: 3px;
          margin-bottom: 5px;
          text-transform: none; 
        }

        .virtual-keyboard-button:hover {
          background-color: #e0e0e0;
          transition: background-color 0.2s ease;
        }

        .virtual-keyboard-button.shift-active {
          background-color: #ededed;  
          color: #000;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15) inset;
          transform: translateY(1px);
          width: 99px;
        }

        .shift-key {
          width: 99px;
        }
      
        .virtual-keyboard-button, .control-key {
          text-transform: none; 
        }        
        
        .enter-key {
          width: 99px;
        }

        .lang-key {
          width: 60px;
        }

        .spacebar {
          width: 379px; !important;
          maxWidth="md";
        }
      `}</style>

      <Box position="fixed" top={110} left={498} width="calc(100% - 324px)">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          marginBottom={122}
          marginLeft={-26}
        >
          <Box flex="1">
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter the keyword"
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Link to="/main">
                      <img
                        src="/searchbarlogo.gif"
                        alt="Logo"
                        style={{
                          marginTop: "3.5px",
                          marginRight: "5px",
                          marginLeft: "-8px",
                          height: "40px",
                          width: "auto",
                        }}
                      />
                    </Link>
                    <span
                      style={{
                        borderLeft: "1px solid #bdbdbd",
                        height: "24px",
                        marginRight: "10px",
                        marginLeft: "-4px",
                      }}
                    ></span>
                    <SearchIcon color="disabled" onClick={handleSearch} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleInputTool}>
                      <KeyboardIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                borderRadius: "15px",
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#e9ecef",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:focus-within": {
                  backgroundColor: "#fff",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

  <Draggable>
  <Dialog
    open={showInputTool}
    onClose={toggleInputTool}
    BackdropProps={{ style: { backgroundColor: 'transparent' } }}
    PaperProps={{
      style: {
        cursor: "move",
        padding: '10px',
        borderRadius: '10px',
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        backgroundColor: '#fff',
        maxWidth: '800px',
        minWidth: '400px', 
        height: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }}
    maxWidth="md"
  >
    <DialogTitle sx={{ fontSize: "16px", fontWeight: "800", marginTop: "-10px", color: "#555454" }}>
      {language === 'EN' ? 'English' : '한글'}
      <IconButton
        style={{ position: 'absolute', top: '8px', right: '24px' }}
        onClick={toggleInputTool}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent>
      <div className="virtual-keyboard">
        {language === 'EN' ? (
          <>
            <div className="virtual-keyboard-row">
              {(shiftActive ? shiftedKeys : normalKeys).split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                  {char}
                </Button>
              ))}
            </div>
            <div className="virtual-keyboard-row">
              {`Q W E R T Y O P A`.split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(shiftActive ? englishShiftMap[char] : char)}>
                  {shiftActive ? englishShiftMap[char] : char}
                </Button>
              ))}
              <Button className="virtual-keyboard-button" onClick={handleDelete}>
                ⌫
              </Button>
            </div>
            <div className="virtual-keyboard-row">
              {`S D F G J K L Z X C`.split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(shiftActive ? englishShiftMap[char] : char)}>
                  {shiftActive ? englishShiftMap[char] : char}
                </Button>
              ))}
            </div>
            <div className="virtual-keyboard-row">
              <Button className={`virtual-keyboard-button shift-key ${shiftActive ? 'shift-active' : ''}`} onClick={handleShiftToggle}>
                ⇧
              </Button>
              {`N M I H B U V`.split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(shiftActive ? englishShiftMap[char] : char)}>
                  {shiftActive ? englishShiftMap[char] : char}
                </Button>
              ))}
              <Button className={`virtual-keyboard-button shift-key ${shiftActive ? 'shift-active' : ''}`} onClick={handleShiftToggle}>
                ⇧
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="virtual-keyboard-row">
              {(shiftActive ? shiftedKeys : normalKeys).split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                  {char}
                </Button>
              ))}
            </div>
            <div className="virtual-keyboard-row">
              {`ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅈ ㅊ ㅋ`.split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(shiftActive ? koreanShiftMap[char] : char)}>
                  {shiftActive ? koreanShiftMap[char] : char}
                </Button>
              ))}
              <Button className="virtual-keyboard-button" onClick={handleDelete}>
                ⌫
              </Button>
            </div>
            <div className="virtual-keyboard-row">
              {`ㅌ ㅍ ㅎ ㅕ ㅐ ㅔ ㅗ ㅓ ㅏ ㅣ`.split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(shiftActive ? koreanShiftMap[char] : char)}>
                  {shiftActive ? koreanShiftMap[char] : char}
                </Button>
              ))}
            </div>
            <div className="virtual-keyboard-row">
              <Button className={`virtual-keyboard-button shift-key ${shiftActive ? 'shift-active' : ''}`} onClick={handleShiftToggle}>
                ⇧
              </Button>
              {`ㅡ ㅜ ㅠ ㅇ ㅑ ㅛ ㅅ`.split(' ').map((char) => (
                <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(shiftActive ? koreanShiftMap[char] : char)}>
                  {shiftActive ? koreanShiftMap[char] : char}
                </Button>
              ))}
              <Button className={`virtual-keyboard-button shift-key ${shiftActive ? 'shift-active' : ''}`} onClick={handleShiftToggle}>
                ⇧
              </Button>
            </div>
          </>
        )}
        <div className="virtual-keyboard-row">
          <Button className="virtual-keyboard-button control-key">
            {language === 'EN' ? 'Ctrl' : '컨트롤'}
          </Button>
          <Button className="virtual-keyboard-button"
            onClick={handleReset}
            style={{ backgroundColor: '#eb6363', color: '#fff' }}>
            {language === 'EN' ? 'Reset' : '초기화'}
          </Button>
          <Button className="virtual-keyboard-button spacebar"
            onClick={() => handleKeyPress(' ')}>
          </Button>
          <Button className="virtual-keyboard-button lang-key" onClick={toggleLanguage}>
            {language === 'EN' ? '한글' : 'English'}
          </Button>
          <Button className="virtual-keyboard-button enter-key"
            onClick={() => handleKeyPress('\n')}
            style={{ backgroundColor: '#5270ff', color: '#fff' }}>
            {language === 'EN' ? 'Enter' : '검색'}
          </Button>
          </div>
         </div>
       </DialogContent>
      </Dialog>
    </Draggable>                                                                                         
    </>
  );
};

export default DashboardSearchbar;