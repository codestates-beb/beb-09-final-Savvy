import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setManagerData } from "../reducers/managerReducer";
import {
  Button,
  Box,
  Tabs,
  Tab,
  LinearProgress,
  Dialog,
  CircularProgress,
  Typography,
} from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

// api
import { updatePlan } from "../api/put-plan";
import { getManagerData } from "../api/get-manager-data";
import zIndex from "@mui/material/styles/zIndex";

const tabStyles = {
  marginTop: "38px",
};

const tabTitleStyles = {
  backgroundColor: "#fff",
  borderRadius: "1rem",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  fontSize: "12px",
  fontWeight: "bold",
  marginRight: "20px",
  marginBottom: "10px",
  userSelect: "none",
};

const tabTitleHoverStyles = {
  ...tabTitleStyles,
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
};

const activeTabStyle = {
  ...tabTitleHoverStyles,
  border: "2px solid #3774cb",
  borderRadius: "1rem",
};

const PLAN_INFO = [
  {
    title: "Basic",
    subtitle: "Perfect Plan for Beginners.",
    price: "Free ",
    priceSubtitle: "/ For a Life time",
    content: ["1 Community Available", "10 TBAs per 1 Community"],
    image: "Planet1.png",
  },
  {
    title: "Plus",
    subtitle: "For uses who want to do more with their community.",
    price: "10 SVY",
    priceSubtitle: "/ month",
    content: ["3 Communities Available", "100 TBAs per 1 Community"],
    image: "Planet2.png",
  },
  {
    title: "Business",
    subtitle: "For enterprises and large organizations that need more.",
    price: "100 SVY",
    priceSubtitle: "/ month",
    content: ["Unlimited Communities", "Unlimited TBAs"],
    image: "Planet3.png",
  },
];

const getDynamicStyles = (planPrice) => {
  if (planPrice === "100 SVY") {
    return {
      ...styles.textWithBackground,
      marginTop: 10,
    };
  }
  return {};
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
  pricingCardTitle: {
    fontSize: "24px",
  },
};

export default function SettingPageContent({ web3Auth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const managerData = useSelector((state) => state.manager.managerData);
  const [sector, setSector] = useState(0);
  const [openPricing, setOpenPricing] = useState(false);
  const [pricingInfo, setPricingInfo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const currentPlan = managerData?.admin.plan;

  useEffect(() => {
    const init = async () => {
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
    console.log(managerData);
  }, [isLoading]);

  const handleOpenPricing = (e) => {
    setOpenPricing(true);
    setPricingInfo(
      PLAN_INFO.findIndex((plan) => plan.title.toLowerCase() === e.target.value)
    );
    console.log(e.target.value);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    const response = await updatePlan(
      web3Auth,
      managerData.admin.email,
      PLAN_INFO[pricingInfo].title.toLowerCase()
    );
    if (response.error) {
      alert(response.error);
      return;
    } else if (response) {
      setIsLoading(false);
    }
    alert("Successfully updated plan");
    setOpenPricing(false);
  };

  return (
    <div className="page-content">
      <div style={styles.pageContent}>
        <span style={styles.textWithBackground}>Setting</span>
      </div>
      <div>
        <Tabs
          value={sector}
          onChange={(e, newValue) => setSector(newValue)}
          style={tabStyles}
          TabIndicatorProps={{ style: { display: "none" } }}
        >
          <Tab
            label="Plans & Pricing"
            sx={{
              ...tabTitleHoverStyles,
              color: sector === 0 ? "#3774cb" : "#8f8d8d",
              ...(sector === 0 ? activeTabStyle : {}),
              "& .MuiTab-wrapper": {
                color: sector === 0 ? "#3774cb" : "#8f8d8d",
              },
              marginLeft: "10px",
              userSelect: "none",
            }}
          />
          <Tab
            label="Customization"
            sx={{
              ...tabTitleHoverStyles,
              color: sector === 1 ? "#3774cb" : "#8f8d8d",
              ...(sector === 1 ? activeTabStyle : {}),
              "& .MuiTab-wrapper": {
                color: sector === 1 ? "#3774cb" : "#8f8d8d",
              },
            }}
          />
        </Tabs>
      </div>
      <div>
        {/* Billing Modal */}
        <Dialog
          open={openPricing}
          onClose={() => setOpenPricing(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <div className="order">
            <div className="order-content">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/Upgrade.png"
                  alt="Upgrade"
                  style={{
                    position: "absolute",
                    marginLeft: "-1px",
                    marginTop: "-19px",
                    width: "23px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="order-content-title"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#272727",
                    marginTop: "-10px",
                    marginBottom: "13px",
                    marginLeft: "25px",
                    userSelect: "none",
                  }}
                >{`Upgrade to ${PLAN_INFO[pricingInfo].title}`}</div>
              </div>
              <div
                className="order-content-subtitle"
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#a6a4a4",
                  lineHeight: "1.6",
                  userSelect: "none",
                }}
              >
                {`You are about to upgrade to ${PLAN_INFO[pricingInfo].title} plan.
             You will be charged ${PLAN_INFO[pricingInfo].price} per month.`}
              </div>

              <div style={{ height: "1.5px", backgroundColor: "#e4e4e4" }}>
                <ul
                  style={{
                    listStyle: "none",
                    paddingLeft: "0",
                    color: "#272727",
                    fontWeight: "bold",
                    fontSize: "14px",
                    border: "none",
                    userSelect: "none",
                  }}
                >
                  {PLAN_INFO[pricingInfo].content.map((item, index) => {
                    return (
                      <li
                        key={item.title}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          paddingTop: "1.2rem",
                          paddingBottom: "0rem",
                          userSelect: "none",
                        }}
                      >
                        <img
                          src="/check.png"
                          alt="check Icon"
                          style={{
                            width: "1.2rem",
                            paddingRight: "0.5rem",
                            userSelect: "none",
                            pointerEvents: "none",
                          }}
                        />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="order-info">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/mouse.png"
                  alt="mouse"
                  style={{
                    position: "absolute",
                    marginLeft: "-5px",
                    marginTop: "-25px",
                    width: "24px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="order-info-title"
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#272727",
                    marginLeft: "1.5rem",
                    marginBottom: "1.8rem",
                    userSelect: "none",
                  }}
                >
                  Order Summary
                </div>
              </div>
              <div
                className="order-info-subtitle"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000",
                  marginBottom: "15px",
                  userSelect: "none",
                }}
              >
                <div>Price</div>
                <div>{PLAN_INFO[pricingInfo].price}</div>
              </div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#000",
                  userSelect: "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#000",
                      marginBottom: "15px",
                      userSelect: "none",
                    }}
                  >{`${PLAN_INFO[pricingInfo].title} plan`}</div>
                  <div
                    className="order-content-subtitle"
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#a6a4a4",
                      marginTop: "-29px",
                      whiteSpace: "nowrap",
                      textAlign: "right",
                      userSelect: "none",
                    }}
                  >
                    {`${PLAN_INFO[pricingInfo].price} ${PLAN_INFO[pricingInfo].priceSubtitle}`}
                  </div>
                </div>
              </div>
              {isLoading ? (
                <div style={{ textAlign: "center", margin: "2rem 0" }}>
                  <CircularProgress />
                </div>
              ) : (
                <div style={{ textAlign: "center", margin: "1rem 0" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      width: "12rem",
                      height: "3rem",
                      borderRadius: "1rem",
                      backgroundColor: "#576ff6",
                      "&:hover": {
                        backgroundColor: "#4760ee",
                      },
                      marginTop: "1.5rem",
                      marginBottom: "0.5rem",
                      color: "#fff",
                      fontSize: "12.5px",
                      fontWeight: "bold",
                      userSelect: "none",
                    }}
                    onClick={handlePayment}
                  >
                    Confirm changes
                  </Button>
                </div>
              )}

              <div
                className="order-content-subtitle"
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "#a6a4a4",
                  marginTop: "0px",
                  textAlign: "center",
                  userSelect: "none",
                }}
              >
                By clicking "Confirm changes", you agree to the Savvy Terms and
                Conditions.
              </div>
            </div>
          </div>
        </Dialog>

        <div>
          {sector === 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/cloud.png"
                  alt="Cloud Icon"
                  style={{
                    marginTop: "20px",
                    marginRight: "10px",
                    marginLeft: "15px",
                    width: "30px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                />
                <h2
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    color: "#272727",
                    marginTop: "40px",
                    userSelect: "none",
                  }}
                >
                  Plans & Pricing
                </h2>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#a6a4a4",
                  marginTop: "-5px",
                  marginBottom: "40px",
                  marginLeft: "15px",
                  userSelect: "none",
                }}
              >
                You can upgrade plans using ETH
              </p>

              <div
                className="pricing-content"
                style={{
                  width: "100%",
                  height: "25rem",
                  justifyContent: "space-between",
                }}
              >
                {PLAN_INFO.map((plan, index) => {
                  return (
                    <div
                      className="pricing-card"
                      key={plan.title}
                      style={Object.assign(
                        {
                          height: "25rem",
                          marginLeft: "0.7rem",
                          justifyContent: "space-between",
                          border: "none",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.07)",
                        },
                        plan.title === "Business"
                          ? { backgroundColor: "#fff" }
                          : {}
                      )}
                    >
                      <div
                        className="pricing-card-title"
                        style={Object.assign(
                          {
                            color: "#272727",
                            height: "50px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "2rem",
                            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                            marginBottom: "2rem",
                            gap: "0.5rem",
                            userSelect: "none",
                          },
                          plan.title === "Business"
                            ? {
                                background: `url(${process.env.PUBLIC_URL}/AdminHeader.gif) center/cover no-repeat`,
                                color: "#fff",
                              }
                            : {}
                        )}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/${plan.image}`}
                          alt={plan.title}
                          style={{
                            width: "24px",
                            height: "24px",
                            userSelect: "none",
                            pointerEvents: "none",
                          }}
                        />
                        <h3>{plan.title}</h3>
                      </div>

                      <p
                        className="pricing-card-subtitle"
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          height: "20px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          userSelect: "none",
                        }}
                      >
                        {plan.subtitle}
                      </p>

                      <div
                        className="pricing-card-price"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          borderBottom: "1px solid #dbdbdb",
                          paddingBottom: "10px",
                          userSelect: "none",
                        }}
                      >
                        <div
                          className="pricing-card-price-title"
                          style={Object.assign(
                            {
                              fontSize: "33px",
                              fontWeight: "800",
                              marginTop: "10px",
                              marginBottom: "10px",
                              color: "#272727",
                              userSelect: "none",
                            },
                            getDynamicStyles(plan.price)
                          )}
                        >
                          {plan.price}
                        </div>

                        <div
                          className="pricing-card-price-subtitle"
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "#272727",
                            marginTop: "10px",
                            marginBottom: "10px",
                            userSelect: "none",
                          }}
                        >
                          {plan.priceSubtitle}
                        </div>
                      </div>

                      <div className="pricing-card-content">
                        <ul
                          style={{
                            listStyle: "none",
                            paddingLeft: "0",
                          }}
                        >
                          {plan.content.map((item, index) => {
                            return (
                              <li
                                key={item}
                                style={{
                                  fontSize: "14px",
                                  color: "#272727",
                                  fontWeight: "bold",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0.5rem 0",
                                  gap: "0.5rem",
                                  userSelect: "none",
                                }}
                              >
                                <img
                                  src={`${process.env.PUBLIC_URL}/check.png`}
                                  alt="Checkmark"
                                  style={{
                                    width: "16px",
                                    height: "16px",
                                    userSelect: "none",
                                    pointerEvents: "none",
                                  }}
                                />
                                <span>{item}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="pricing-card-btn">
                        <Button
                          variant={
                            currentPlan === plan.title.toLowerCase()
                              ? "outlined"
                              : "contained"
                          }
                          color="primary"
                          sx={{
                            width: "13rem",
                            height: "3rem",
                            borderRadius: "1rem",
                            backgroundColor: "#576ff6",
                            "&:hover": {
                              backgroundColor: "#4760ee",
                            },
                            position: "absolute",
                            top: "42rem",
                            marginLeft: "-6.6rem",
                            color:
                              currentPlan === plan.title.toLowerCase()
                                ? "#6adec3"
                                : "#fff",
                            fontSize: "12.5px",
                            fontWeight: "bold",
                            userSelect: "none",
                          }}
                          onClick={(e) => handleOpenPricing(e)}
                          value={plan.title.toLowerCase()}
                          disabled={currentPlan === plan.title.toLowerCase()}
                        >
                          {currentPlan === plan.title.toLowerCase()
                            ? "Current Plan"
                            : "Get Started"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sector === 1 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                <img
                  src="/Customization.png"
                  alt="Customization Icon"
                  style={{
                    marginTop: "21px",
                    marginRight: "10px",
                    marginLeft: "15px",
                    width: "26px",
                  }}
                />
                <h2
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    color: "#272727",
                    marginTop: "40px",
                    userSelect: "none",
                  }}
                >
                  Customization
                </h2>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#a6a4a4",
                  marginTop: "-5px",
                  marginBottom: "40px",
                  marginLeft: "15px",
                  userSelect: "none",
                }}
              >
                You can customize your community TBA levels
              </p>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: "13.6rem",
                  height: "3rem",
                  borderRadius: "1rem",
                  backgroundColor: "#576ff6",
                  "&:hover": {
                    backgroundColor: "#4760ee",
                  },
                  marginBottom: "0.5rem",
                  marginLeft: "15px",
                  color: "#fff",
                  fontSize: "12.5px",
                  fontWeight: "bold",
                  userSelect: "none",
                }}
              >
                Upgrade
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
