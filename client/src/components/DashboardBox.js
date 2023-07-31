import React, { useEffect } from "react";
import { Box } from "@mui/material";

const boxStyle = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "55%",
  height: "24rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  position: "relative",
  marginTop: "2rem",
  marginRight: "2.5rem",
};

const textStyle = {
  fontFamily: "'tektur', sans-serif",
  fontSize: "1.1rem",
  fontWeight: "800",
  color: "#576ff6",
  textAlign: 'center',
};

const dummyData = [
  {
    number: "#8754",
    image: process.env.PUBLIC_URL + "/Dashboarddummy1.png",
    name: "Pixel1",
    price: "$123",
  },
  {
    number: "#8755",
    image: process.env.PUBLIC_URL + "/Dashboarddummy2.png",
    name: "Pixel2",
    price: "$211",
  },
  {
    number: "#8756",
    image: process.env.PUBLIC_URL + "/Dashboarddummy3.png",
    name: "Pixel3",
    price: "$939",
  },
  {
    number: "#8757",
    image: process.env.PUBLIC_URL + "/Dashboarddummy4.png",
    name: "Pixel4",
    price: "$587",
  },
  {
    number: "#8758",
    image: process.env.PUBLIC_URL + "/Dashboarddummy1.png",
    name: "Pixel5",
    price: "$787",
  },
  {
    number: "#8759",
    image: process.env.PUBLIC_URL + "/Dashboarddummy2.png",
    name: "Pixel6",
    price: "$187",
  },
];

export default function DashboardBox() {
  useEffect(() => {
    function disableTextSelection(event) {
      event.preventDefault();
    }

    function addEventListeners() {
      document.addEventListener("selectstart", disableTextSelection);
    }

    function removeEventListeners() {
      document.removeEventListener("selectstart", disableTextSelection);
    }

    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <div className="page-content">
      <div className="content">
        <div style={{ margin: "47rem -14.7rem 0rem", display: "flex", justifyContent: "space-between" }}>
          <Box sx={boxStyle}>
            <div style={textStyle}>Recent Created TBAs</div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.7rem",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#666",
            }}>
              <div style={{ flex: 2, paddingLeft: "0.9rem", whiteSpace: "nowrap" }} className="nft-category">Item no</div>
              <div style={{ flex: 3.5, textAlign: "center", paddingLeft: "0.5rem", whiteSpace: "nowrap" }} className="nft-category">Item name</div>
              <div style={{ flex: 2, textAlign: "right", paddingRight: "2.8rem", whiteSpace: "nowrap" }} className="nft-category">Price</div>
            </div>
            <div style={{ 
                borderBottom: "1px solid transparent", 
                marginBottom: "0.5rem",
                borderImage: 'linear-gradient(100deg, #f8f8f8, #576ff6, #f8f8f8)',
                borderImageSlice: 1,
              }}>
            </div>
            <div style={{ overflow: "auto", height: "19rem" }}>
              {dummyData.map((data) => (
                <div key={data.name} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                  height: "3.9rem",
                  padding: "0rem",
                  marginTop: "0.5rem",
                  marginBottom: "0.8rem",
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  background: "linear-gradient(to left, rgba(0,0,0,0.01) 30%, rgba(211,211,211,0.1) 50%, rgba(223,220,220,0.05) 70%)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  color: "#666"
                }}>
                  <div style={{ flex: 2, fontSize: "0.8rem", fontWeight: "700", marginLeft: "1rem" }}>{data.number}</div>
                  <div style={{
                    flex: 3.5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                    <img style={{
                      width: "3.2rem",
                      height: "auto",
                      borderRadius: "0.5rem",
                      marginRight: "0.5rem",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }} src={data.image} alt={data.name} />
                    <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>{data.name}</div>
                  </div>
                  <div style={{
                    flex: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginRight: "1.5rem",
                    borderRadius: "5px",
                  }}>
                    <div style={{
                      backgroundColor: "#576ff6",
                      color: "#fff",
                      fontSize: "0.8rem",
                      fontWeight: "700",
                      borderRadius: "5px",
                      padding: "0.3rem 0.5rem",
                    }}>
                      {data.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Box>
  
          <Box sx={boxStyle}>
            <div style={textStyle}>Top item holding TBA</div>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.7rem",
              marginBottom: "1rem",
              fontSize: "0.9rem",
              fontWeight: "600",
              color: "#666"
            }}>
              <div style={{ flex: 2, paddingLeft: "0.9rem", whiteSpace: "nowrap" }} className="nft-category">Item no</div>
              <div style={{ flex: 3.5, textAlign: "center", paddingLeft: "0.5rem", whiteSpace: "nowrap" }} className="nft-category">Item name</div>
              <div style={{ flex: 2, textAlign: "right", paddingRight: "2.8rem", whiteSpace: "nowrap" }} className="nft-category">Price</div>
            </div>
              <div style={{ 
                borderBottom: "1px solid transparent", 
                marginBottom: "0.5rem",
                borderImage: 'linear-gradient(100deg, #f8f8f8, #576ff6, #f8f8f8)',
                borderImageSlice: 1,
              }}>
            </div>
            <div style={{ overflow: "auto", height: "19rem" }}>
              {dummyData.map((data) => (
                <div
                  key={data.name + 'second'}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    height: "3.9rem",
                    marginTop: "0.5rem",
                    marginBottom: "0.8rem",
                    backgroundColor: "rgba(0, 0, 0, 0.01)",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    background: "linear-gradient(to left, rgba(0,0,0,0.01) 30%, rgba(211,211,211,0.1) 50%, rgba(223,220,220,0.05) 70%)",
                    borderRadius: "10px",
                    cursor: "pointer",
                    color: "#666"
                  }}
                >
                  <div style={{ flex: 2, fontSize: "0.8rem", fontWeight: "700", marginLeft: "1rem" }}>{data.number}</div>
                  <div
                    style={{
                      flex: 3.5,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "3.2rem",
                        height: "auto",
                        borderRadius: "0.5rem",
                        marginRight: "0.5rem",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                      }}
                      src={data.image}
                      alt={data.name + 'second'}
                    />
                    <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>{data.name}</div>
                  </div>
                  <div
                    style={{
                      flex: 2,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      marginRight: "1.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#576ff6",
                        color: "#fff",
                        fontSize: "0.8rem",
                        fontWeight: "700",
                        borderRadius: "5px",
                        padding: "0.3rem 0.5rem",
                      }}
                    >
                      {data.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}  