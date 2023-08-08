import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDashboardData } from "../reducers/dashboardReducer";
import { Box } from "@mui/material";
import { DASHBOARD_NFT_LIST } from "../assets/DUMMY_DATA";
import { ResponsiveLine } from "@nivo/line";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import KeyboardIcon from "@mui/icons-material/Keyboard";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";

// api
import { getDashboard } from "../api/get-dashboard";

const data = [
  {
    id: "Polygon",
    color: "hsl(253, 70%, 50%)",
    data: [
      { x: "0:00", y: 38 },
      { x: "2:00", y: 167 },
      { x: "4:00", y: 55 },
      { x: "6:00", y: 127 },
      { x: "8:00", y: 187 },
      { x: "10:00", y: 107 },
      { x: "12:00", y: 206 },
      { x: "14:00", y: 151 },
      { x: "16:00", y: 205 },
      { x: "18:00", y: 292 },
      { x: "20:00", y: 101 },
      { x: "22:00", y: 10 },
    ],
  },
  {
    id: "Solna",
    color: "hsl(253, 70%, 50%)",
    data: [
      { x: "0:00", y: 105 },
      { x: "2:00", y: 226 },
      { x: "4:00", y: 387 },
      { x: "6:00", y: 206 },
      { x: "8:00", y: 210 },
      { x: "10:00", y: 248 },
      { x: "12:00", y: 287 },
      { x: "14:00", y: 200 },
      { x: "16:00", y: 211 },
      { x: "18:00", y: 209 },
      { x: "20:00", y: 203 },
      { x: "22:00", y: 281 },
    ],
  },
  {
    id: "Klaytn",
    color: "hsl(82, 70%, 50%)",
    data: [
      { x: "0:00", y: 190 },
      { x: "2:00", y: 220 },
      { x: "4:00", y: 150 },
      { x: "6:00", y: 290 },
      { x: "8:00", y: 220 },
      { x: "10:00", y: 350 },
      { x: "12:00", y: 290 },
      { x: "14:00", y: 200 },
      { x: "16:00", y: 255 },
      { x: "18:00", y: 241 },
      { x: "20:00", y: 159 },
      { x: "22:00", y: 195 },
    ],
  },
  {
    id: "Ethereum",
    color: "hsl(250, 70%, 50%)",
    data: [
      { x: "0:00", y: 125 },
      { x: "2:00", y: 391 },
      { x: "4:00", y: 205 },
      { x: "6:00", y: 295 },
      { x: "8:00", y: 255 },
      { x: "10:00", y: 175 },
      { x: "12:00", y: 365 },
      { x: "14:00", y: 280 },
      { x: "16:00", y: 385 },
      { x: "18:00", y: 380 },
      { x: "20:00", y: 205 },
      { x: "22:00", y: 337 },
    ],
  },
  {
    id: "Bitcoin",
    color: "hsl(9, 70%, 50%)",
    data: [
      { x: "0:00", y: 290 },
      { x: "2:00", y: 460 },
      { x: "4:00", y: 290 },
      { x: "6:00", y: 390 },
      { x: "8:00", y: 400 },
      { x: "10:00", y: 280 },
      { x: "12:00", y: 405 },
      { x: "14:00", y: 389 },
      { x: "16:00", y: 290 },
      { x: "18:00", y: 480 },
      { x: "20:00", y: 290 },
      { x: "22:00", y: 418 },
    ],
  },
];

const boxStyle = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "15rem",
  marginLeft: "0.5rem",
  marginTop: "1.5rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  zIndex: "1",
};

const grephStyle = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "20rem",
  marginLeft: "0.5rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  userSelect: "none",
  zIndex: "1",
};

const textStyle = {
  fontFamily: "'tektur', sans-serif",
  fontSize: "1.1rem",
  fontWeight: "800",
  color: "#576ff6",
  backgroundColor: "#fff",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid transparent",
  borderImage: "linear-gradient(100deg, #f8f8f8, #576ff6, #f8f8f8)",
  borderImageSlice: 1,
  textAlign: "center",
  margin: "0 auto",
  userSelect: "none",
};

const styles = {
  pageContent: {
    display: "flex",
    color: "#576ff6",
    fontSize: "38px",
    fontWeight: "bold",
    marginTop: "-7px",
    marginLeft: "10px",
    userSelect: "none",
    fontFamily: "'tektur', sans-serif",
    userSelect: "none",
  },
  textWithBackground: {
    display: "inline-block",
    background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    marginTop: "2rem",
  },
};

export default function DashboardPageContent({ onSearch }) {
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);
  const [query, setQuery] = useState("");
  const [showInputTool, setShowInputTool] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [shiftActive, setShiftActive] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      const response = await getDashboard();
      if (
        response !== 401 ||
        response !== 404 ||
        response !== 422 ||
        response !== 500
      ) {
        const { TBAs, community, items } = response;
        dispatch(setDashboardData({ TBAs, community, items }));
      }
    };
    fetchDashboard();
    console.log("dashboardData:", dashboardData);
  }, []);

  const levelDescTba = dashboardData?.TBAs?.toSorted((a, b) => {
    return Number(b.level) - Number(a.level);
  });

  const englishShiftMap = {
    Q: "q",
    W: "w",
    E: "e",
    R: "r",
    T: "t",
    Y: "y",
    U: "u",
    I: "i",
    O: "o",
    P: "p",
    A: "a",
    S: "s",
    D: "d",
    F: "f",
    G: "g",
    H: "h",
    J: "j",
    K: "k",
    L: "l",
    Z: "z",
    X: "x",
    C: "c",
    V: "v",
    B: "b",
    N: "n",
    M: "m",
  };

  const koreanShiftMap = {
    ㄱ: "ㄲ",
    ㅂ: "ㅃ",
    ㅈ: "ㅉ",
    ㄷ: "ㄸ",
    ㅅ: "ㅆ",
    ㅐ: "ㅒ",
    ㅔ: "ㅖ",
    ㄴ: "ㄴ",
    ㄹ: "ㄹ",
    ㅁ: "ㅁ",
    ㅊ: "ㅊ",
    ㅋ: "ㅋ",
    ㅌ: "ㅌ",
    ㅍ: "ㅍ",
    ㅎ: "ㅎ",
    ㅕ: "ㅕ",
    ㅗ: "ㅗ",
    ㅓ: "ㅓ",
    ㅏ: "ㅏ",
    ㅣ: "ㅣ",
    ㅡ: "ㅡ",
    ㅜ: "ㅜ",
    ㅠ: "ㅠ",
    ㅇ: "ㅇ",
    ㅑ: "ㅑ",
    ㅛ: "ㅛ",
  };

  const handleDelete = () => {
    setQuery((prevQuery) => prevQuery.slice(0, -1));
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
    setQuery("");
  };

  const normalKeys = "1 2 3 4 5 6 7 8 9 0";
  const shiftedKeys = "! @ # $ % ^ & * ( )";

  const consonants = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const vowels = [
    "ㅏ",
    "ㅑ",
    "ㅓ",
    "ㅕ",
    "ㅗ",
    "ㅛ",
    "ㅜ",
    "ㅠ",
    "ㅡ",
    "ㅣ",
    "ㅐ",
    "ㅔ",
    "ㅒ",
    "ㅖ",
  ];

  const handleKeyPress = (char) => {
    let newQuery = query;

    if (shiftActive) {
      if (language === "EN") {
        char = englishShiftMap[char] || char;
      } else if (language === "KO") {
        char = koreanShiftMap[char] || char;
      }
    }

    if (
      vowels.includes(char) &&
      consonants.includes(newQuery[newQuery.length - 1])
    ) {
      newQuery =
        newQuery.slice(0, -1) +
        String.fromCharCode(
          newQuery[newQuery.length - 1].charCodeAt(0) +
            char.charCodeAt(0) -
            0x3131 +
            0xac00
        );
    } else {
      newQuery += char;
    }

    setQuery(newQuery);
  };

  const toggleLanguage = () => {
    setLanguage(language === "EN" ? "KO" : "EN");
  };

  const handleShiftToggle = () => {
    setShiftActive((prev) => !prev);
  };

  return (
    <div className="page-content">
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>Dashboard</span>
      </div>
      <></>
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

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        marginTop={3}
        marginLeft={0.8}
        marginRight={0}
        marginBottom={3}
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

      <Draggable>
        <Dialog
          open={showInputTool}
          onClose={toggleInputTool}
          BackdropProps={{ style: { backgroundColor: "transparent" } }}
          PaperProps={{
            style: {
              cursor: "move",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#fff",
              maxWidth: "800px",
              minWidth: "400px",
              height: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          maxWidth="md"
        >
          <DialogTitle
            sx={{
              fontSize: "16px",
              fontWeight: "800",
              marginTop: "-10px",
              color: "#555454",
            }}
          >
            {language === "EN" ? "English" : "한글"}
            <IconButton
              style={{ position: "absolute", top: "8px", right: "24px" }}
              onClick={toggleInputTool}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="virtual-keyboard">
              {language === "EN" ? (
                <>
                  <div className="virtual-keyboard-row">
                    {(shiftActive ? shiftedKeys : normalKeys)
                      .split(" ")
                      .map((char) => (
                        <Button
                          className="virtual-keyboard-button"
                          key={char}
                          onClick={() => handleKeyPress(char)}
                        >
                          {char}
                        </Button>
                      ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    {`Q W E R T Y O P A`.split(" ").map((char) => (
                      <Button
                        className="virtual-keyboard-button"
                        key={char}
                        onClick={() =>
                          handleKeyPress(
                            shiftActive ? englishShiftMap[char] : char
                          )
                        }
                      >
                        {shiftActive ? englishShiftMap[char] : char}
                      </Button>
                    ))}
                    <Button
                      className="virtual-keyboard-button"
                      onClick={handleDelete}
                    >
                      ⌫
                    </Button>
                  </div>
                  <div className="virtual-keyboard-row">
                    {`S D F G J K L Z X C`.split(" ").map((char) => (
                      <Button
                        className="virtual-keyboard-button"
                        key={char}
                        onClick={() =>
                          handleKeyPress(
                            shiftActive ? englishShiftMap[char] : char
                          )
                        }
                      >
                        {shiftActive ? englishShiftMap[char] : char}
                      </Button>
                    ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    <Button
                      className={`virtual-keyboard-button shift-key ${
                        shiftActive ? "shift-active" : ""
                      }`}
                      onClick={handleShiftToggle}
                    >
                      ⇧
                    </Button>
                    {`N M I H B U V`.split(" ").map((char) => (
                      <Button
                        className="virtual-keyboard-button"
                        key={char}
                        onClick={() =>
                          handleKeyPress(
                            shiftActive ? englishShiftMap[char] : char
                          )
                        }
                      >
                        {shiftActive ? englishShiftMap[char] : char}
                      </Button>
                    ))}
                    <Button
                      className={`virtual-keyboard-button shift-key ${
                        shiftActive ? "shift-active" : ""
                      }`}
                      onClick={handleShiftToggle}
                    >
                      ⇧
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="virtual-keyboard-row">
                    {(shiftActive ? shiftedKeys : normalKeys)
                      .split(" ")
                      .map((char) => (
                        <Button
                          className="virtual-keyboard-button"
                          key={char}
                          onClick={() => handleKeyPress(char)}
                        >
                          {char}
                        </Button>
                      ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    {`ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅈ ㅊ ㅋ`.split(" ").map((char) => (
                      <Button
                        className="virtual-keyboard-button"
                        key={char}
                        onClick={() =>
                          handleKeyPress(
                            shiftActive ? koreanShiftMap[char] : char
                          )
                        }
                      >
                        {shiftActive ? koreanShiftMap[char] : char}
                      </Button>
                    ))}
                    <Button
                      className="virtual-keyboard-button"
                      onClick={handleDelete}
                    >
                      ⌫
                    </Button>
                  </div>
                  <div className="virtual-keyboard-row">
                    {`ㅌ ㅍ ㅎ ㅕ ㅐ ㅔ ㅗ ㅓ ㅏ ㅣ`.split(" ").map((char) => (
                      <Button
                        className="virtual-keyboard-button"
                        key={char}
                        onClick={() =>
                          handleKeyPress(
                            shiftActive ? koreanShiftMap[char] : char
                          )
                        }
                      >
                        {shiftActive ? koreanShiftMap[char] : char}
                      </Button>
                    ))}
                  </div>
                  <div className="virtual-keyboard-row">
                    <Button
                      className={`virtual-keyboard-button shift-key ${
                        shiftActive ? "shift-active" : ""
                      }`}
                      onClick={handleShiftToggle}
                    >
                      ⇧
                    </Button>
                    {`ㅡ ㅜ ㅠ ㅇ ㅑ ㅛ ㅅ`.split(" ").map((char) => (
                      <Button
                        className="virtual-keyboard-button"
                        key={char}
                        onClick={() =>
                          handleKeyPress(
                            shiftActive ? koreanShiftMap[char] : char
                          )
                        }
                      >
                        {shiftActive ? koreanShiftMap[char] : char}
                      </Button>
                    ))}
                    <Button
                      className={`virtual-keyboard-button shift-key ${
                        shiftActive ? "shift-active" : ""
                      }`}
                      onClick={handleShiftToggle}
                    >
                      ⇧
                    </Button>
                  </div>
                </>
              )}
              <div className="virtual-keyboard-row">
                <Button className="virtual-keyboard-button control-key">
                  {language === "EN" ? "Ctrl" : "컨트롤"}
                </Button>
                <Button
                  className="virtual-keyboard-button"
                  onClick={handleReset}
                  style={{ backgroundColor: "#eb6363", color: "#fff" }}
                >
                  {language === "EN" ? "Reset" : "초기화"}
                </Button>
                <Button
                  className="virtual-keyboard-button spacebar"
                  onClick={() => handleKeyPress(" ")}
                ></Button>
                <Button
                  className="virtual-keyboard-button lang-key"
                  onClick={toggleLanguage}
                >
                  {language === "EN" ? "한글" : "English"}
                </Button>
                <Button
                  className="virtual-keyboard-button enter-key"
                  onClick={() => handleKeyPress("\n")}
                  style={{ backgroundColor: "#5270ff", color: "#fff" }}
                >
                  {language === "EN" ? "Enter" : "검색"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Draggable>
      <Box sx={grephStyle}>
        <div style={textStyle}>TBA increase/decrease</div>
        <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 95, bottom: 70, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 10,
            tickPadding: 7,
            tickRotation: 0,
            legend: "Time",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Value",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          colors={{ scheme: "blue_purple" }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableArea={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>

      <div className="content">
        <Box sx={boxStyle}>
          <div style={textStyle}>Recent Created TBAs</div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                justifyItems: "center",
                margin: "0.5rem",
              }}
            >
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Image
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Address
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Updated At
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Level
              </div>
            </div>
            <div style={{ overflow: "auto", height: "11rem" }}>
              {dashboardData?.TBAs?.toReversed().map((data) => {
                return (
                  <div
                    className="nft-list"
                    key={data?._id}
                    style={{
                      bgcolor: "transparent",
                      color: "#272727",
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                      marginTop: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                        src={"/Dashboarddummy3.png"}
                      ></img>
                    </div>
                    <div style={{ color: "#666" }}>{`${data?.address?.substring(
                      0,
                      4
                    )}...${data?.address?.substring(37)}`}</div>
                    <div style={{ color: "#666" }}>
                      {data?.updatedAt?.substring(0, 10)}
                    </div>
                    <div
                      style={{
                        color: "#fff",
                        backgroundColor: "#576ff6",
                        borderRadius: "6px",
                        padding: "1px",
                        width: "4rem",
                        height: "20px",
                        textAlign: "center",
                        marginTop: "23px",
                      }}
                    >
                      {data?.level}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
        <Box sx={boxStyle}>
          <div style={textStyle}>Top level TBA</div>
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                justifyItems: "center",
                margin: "0.5rem",
              }}
            >
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Image
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Address
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Updated At
              </div>
              <div
                className="nft-category"
                style={{
                  bgcolor: "transparent",
                  color: "#272727",
                  fontSize: "13px",
                  fontWeight: "bold",
                  userSelect: "none",
                  marginTop: "0.5rem",
                }}
              >
                Level
              </div>
            </div>
            <div style={{ overflow: "auto", height: "11rem" }}>
              {dashboardData?.TBAs?.map((data) => {
                return (
                  <div
                    className="nft-list"
                    key={data?._id}
                    style={{
                      bgcolor: "transparent",
                      color: "#272727",
                      fontSize: "12px",
                      fontWeight: "bold",
                      userSelect: "none",
                      marginTop: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                      borderRadius: "10px",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <div>
                      <img
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                        src={"/Dashboarddummy3.png"}
                      ></img>
                    </div>
                    <div style={{ color: "#666" }}>{`${data?.address?.substring(
                      0,
                      4
                    )}...${data?.address?.substring(37)}`}</div>
                    <div style={{ color: "#666" }}>
                      {data?.updatedAt?.substring(0, 10)}
                    </div>
                    <div
                      style={{
                        color: "#fff",
                        backgroundColor: "#576ff6",
                        borderRadius: "6px",
                        padding: "1px",
                        width: "4rem",
                        height: "20px",
                        textAlign: "center",
                        marginTop: "23px",
                      }}
                    >
                      {data?.level}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
