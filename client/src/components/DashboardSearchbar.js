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

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const toggleInputTool = () => {
    setShowInputTool(!showInputTool);
  };

  const handleKeyPress = (char) => {
    setQuery((prevQuery) => prevQuery + char);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'KO' : 'EN');
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
        }

        .virtual-keyboard-button:hover {
          background-color: #e0e0e0;
        }

        .enter-key {
          width: 60px;
        }

        .lang-key {
          width: 60px;
        }

        .spacebar {
          width: 270px;
        }
      `}</style>

     <Box position="fixed" top={110} left={498} width="calc(100% - 324px)">
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" marginBottom={122} marginLeft={-26}>
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
                        style={{ marginTop: '3.5px', marginRight: '5px', marginLeft: '-8px', height: '40px', width: 'auto' }}
                      />
                    </Link>
                    <span style={{ borderLeft: '1px solid #bdbdbd', height: '24px', marginRight: '10px', marginLeft: '-4px' }}></span>
                    <SearchIcon 
                      color="disabled" 
                      onClick={handleSearch}
                    />
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
                borderRadius: '15px',
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#e9ecef',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&:focus-within': {
                  backgroundColor: '#fff',
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
              borderRadius: '8px', 
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              backgroundColor: '#fff', 
              width: 'auto', 
              height: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }
          }}
        >
          <DialogTitle sx={{ fontSize: "16px", fontWeight: "800", marginTop: "-10px", color: "#555454" }}>
            {language === 'EN' ? 'English' : '한글'}
            <IconButton 
              style={{ position: 'absolute', top: '8px', right: '8px' }} 
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
                    {`Q W E R T Y U I`.split(' ').map((char) => (
                      <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                        {char}
                      </Button>
                    ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    {`A S D F G H J K`.split(' ').map((char) => (
                      <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                        {char}
                      </Button>
                    ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    {`Z X C V B N M P`.split(' ').map((char) => (
                      <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                        {char}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="virtual-keyboard-row">
                    {`ㅂ ㅈ ㄷ ㄱ ㅅ ㅣ ㄴ ㅁ`.split(' ').map((char) => (
                      <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                        {char}
                      </Button>
                    ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    {`ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ`.split(' ').map((char) => (
                      <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                        {char}
                      </Button>
                    ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    {`ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ ㅎ`.split(' ').map((char) => (
                      <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                        {char}
                      </Button>
                    ))}
                  </div>
                </>
              )}
              <div className="virtual-keyboard-row">
                <Button className="virtual-keyboard-button lang-key" onClick={toggleLanguage}>
                  {language === 'EN' ? '한글' : 'English'}
                </Button>
                <Button className="virtual-keyboard-button spacebar" onClick={() => handleKeyPress(' ')}>
                  Space
                </Button>
                <Button className="virtual-keyboard-button enter-key" onClick={() => handleKeyPress('\n')}>
                  Enter
                </Button>
                <div className="virtual-keyboard-row">
                  {`O L`.split(' ').map((char) => (
                    <Button className="virtual-keyboard-button" key={char} onClick={() => handleKeyPress(char)}>
                      {char}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Draggable>
    </>
  );
};

export default DashboardSearchbar;