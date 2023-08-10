import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const ExperienceBar = () => {
  const [experience, setExperience] = useState(0);
  const MAX_EXP = 50000;

  useEffect(() => {
    const randomExp = Math.floor(Math.random() * 101);
    setExperience(randomExp);
  }, []);

  const currentExp = Math.floor((experience / 100) * MAX_EXP);

  return (
    <div 
      className="levelbox" 
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        outline: "none",
        width: "320px",
        textAlign: "center",
        position: "relative"
      }}
    >
      <Typography 
        variant="h6" 
        style={{
          position: "absolute",
          top: "-22px",
          left: "50%",
          color: "#576ff6",
          fontSize: "12px",
          fontWeight: "500",
          fontFamily: "'tektur', sans-serif",
          transform: "translateX(-50%)",
          zIndex: 4,
          whiteSpace: "nowrap",
        }}
      >
        Experience: {currentExp} / {MAX_EXP}
      </Typography>

      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: "10px",
          width: "100%",
          borderRadius: "10px",
          zIndex: 0,
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                position: "absolute",
                left: `${index * 25}%`,
                top: "50%",
                transform: "translateX(-50%) translateY(-50%)",
                height: "12px",
                width: "3px",
                borderRadius: "10px",
                backgroundColor: experience >= index * 25 ? "#576ff6" : "gray", 
                opacity: 0.3,
              }}
            ></div>
            
            <span 
              style={{
                position: "absolute",
                left: `${index * 25}%`,
                top: "150%",
                transform: "translateX(-50%)",
                backgroundColor: experience >= index * 25 ? "#576ff6" : "rgba(128, 128, 128, 0.2)",  
                borderRadius: "50%",
                padding: "1px 5.5px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography 
                variant="body2" 
                style={{
                  color: experience >= index * 25 ? "white" : "gray",  
                  fontWeight: "bold",
                  fontSize: "10px"
                }}
              >
                {index + 1} 
              </Typography>
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* 회색 바 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "35%",  
          transform: "translateY(-50%)",
          height: "15px",
          width: "100%",
          backgroundColor: "gray",  
          opacity: 0.3,
          borderRadius: "10px",
          zIndex: 0,  
        }}
      ></div>

      {/* 보라색 경험치 바 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "35%",  
          transform: "translateY(-50%)",
          height: "15px",
          width: `${experience}%`,
          backgroundColor: "#576ff6",
          borderRadius: "10px",
          opacity: 0.85,
          zIndex: 1,
        }}
      ></div>

      {/* 라운드된 보라색 표시 */}
      <div
        style={{
          position: "absolute",
          left: `calc(${experience}% - 10px)`,
          top: "35%",  
          transform: "translateY(-50%)",
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          backgroundColor: "#576ff6",
          opacity: 1,
          zIndex: 2,
        }}
      ></div>

      <Typography 
        variant="body1" 
        style={{
          fontSize: "13px",
          fontWeight: "bold",
          color: "#fff",
          zIndex: 3,
          position: "relative",
          marginTop: "-15px",
          marginLeft: "10px"
        }}
      >
        {experience}%
      </Typography>
    </div>
  );
};

export default ExperienceBar;