import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setManagerData } from "../reducers/managerReducer";
import { Box, Slide } from "@mui/material";
import { ADMIN_NFT_LIST } from "../assets/DUMMY_DATA";

import "../assets/ManagerPageContent.css";

// api
import { getManagerData } from "../api/get-manager-data.js";

const boxStyle2 = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  padding: "1rem",
  minWidth: "20rem",
  height: "20rem",
  marginLeft: "0.5rem",
  marginTop: "44.5rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  overflowY: "auto",
  zIndex: "1",
};

const textStyle1 = {
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

export default function ManagerPageContent({ web3Auth }) {
  const managerData = useSelector((state) => state.manager.managerData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const data = await getManagerData();
        const { admin, communities, items } = data;
        dispatch(
          setManagerData({
            admin: admin,
            communities: communities,
            items: items,
          })
        );
      } catch (error) {
        console.log(error);
        alert("JWT expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("app_pub_key");
        navigate("/authentication");
        return;
      }
    };
    init();
    if (managerData) {
      setIsLoading(false);
    }
    console.log(managerData);
  }, [isLoading]);

  return (
    <div className="page-content">
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>Dashboard</span>
      </div>
      <div className="content">
        <Box sx={boxStyle2}>
          <div style={textStyle1}>Recent Created TBAs</div>
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
                Name
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
                Price
              </div>
            </div>
            <div style={{ overflow: "auto", height: "14.3rem" }}>
              {ADMIN_NFT_LIST.map((data) => {
                return (
                  <div
                    className="nft-list"
                    key={data.name}
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
                        src={data.image}
                      ></img>
                    </div>
                    <div style={{ color: "#666" }}>{data.name}</div>
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
                      {data.type}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
        <Box sx={boxStyle2}>
          <div style={textStyle1}>NFT list</div>
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
                Name
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
                Price
              </div>
            </div>
            <div style={{ overflow: "auto", height: "14.3rem" }}>
              {ADMIN_NFT_LIST.map((data) => {
                return (
                  <div
                    className="nft-list"
                    key={data.name}
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
                        src={data.image}
                      ></img>
                    </div>
                    <div style={{ color: "#666" }}>{data.name}</div>
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
                      {data.type}
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
