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
} from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

// api
import { updatePlan } from "../api/put-plan";
import { getManagerData } from "../api/get-manager-data";

const PLAN_INFO = [
  {
    title: "Basic",
    subtitle: "Perfect Plan for Beginners.",
    price: "Free",
    priceSubtitle: "For a Life time",
    content: ["1 Community Available", "10 TBAs per 1 Community"],
  },
  {
    title: "Plus",
    subtitle: "For uses who want to do more with their community.",
    price: "10 SVY",
    priceSubtitle: "/ month",
    content: ["3 Communities Available", "100 TBAs per 1 Community"],
  },
  {
    title: "Business",
    subtitle: "For enterprises and large organizations that need more.",
    price: "100 SVY",
    priceSubtitle: "/ month",
    content: ["Unlimited Communities", "Unlimited TBAs"],
  },
];

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
      <h1>Settings</h1>
      <div>
        <Tabs value={sector} onChange={(e, newValue) => setSector(newValue)}>
          <Tab label="Plans & Pricing" />
          <Tab label="Customization" />
        </Tabs>
      </div>
      <div>
        {/* Billing Modal */}
        <Dialog
          open={openPricing}
          onClose={() => setOpenPricing(false)}
          fullWidth
          maxWidth="sm"
        >
          <div className="order">
            <div className="order-content">
              <div className="order-content-title">{`Upgrate to ${PLAN_INFO[pricingInfo].title}`}</div>
              <div className="order-content-subtitle">
                {`You are about to upgrade to ${PLAN_INFO[pricingInfo].title} plan.
                You will be charged ${PLAN_INFO[pricingInfo].price} per month.`}
              </div>
              <hr />
              <div className="order-content-body">
                <div className="pricing-card-content">
                  <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                    {PLAN_INFO[pricingInfo].content.map((item, index) => {
                      return (
                        <li
                          key={item.title}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "0.5rem 0",
                          }}
                        >
                          <DoneOutlineIcon
                            sx={{ color: "green", pr: "0.4rem" }}
                          />
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="order-info">
              <div className="order-info-title">Order Summary</div>
              <div className="order-info-subtitle">
                <div>Price</div>
                <div>{PLAN_INFO[pricingInfo].price}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                }}
              >
                <div>
                  <div>{`${PLAN_INFO[pricingInfo].title} plan`}</div>
                  <div className="order-content-subtitle">{`${PLAN_INFO[pricingInfo].price} ${PLAN_INFO[pricingInfo].priceSubtitle}`}</div>
                </div>
                <div>{PLAN_INFO[pricingInfo].price}</div>
              </div>
              {isLoading ? (
                <div style={{ textAlign: "center", margin: "2rem 0" }}>
                  <CircularProgress />
                </div>
              ) : (
                <div style={{ textAlign: "center", margin: "1rem 0" }}>
                  <Button
                    variant="contained"
                    style={{ width: "13.5rem" }}
                    onClick={handlePayment}
                  >
                    Confirm changes
                  </Button>
                </div>
              )}

              <div
                className="order-content-subtitle"
                style={{ marginBottom: "0" }}
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
              <h2>Plans & Pricing</h2>
              <p>You can upgrade plans using ETH</p>
              <LinearProgress
                variant="determinate"
                value={50}
                sx={{ width: "70%", margin: "2rem auto" }}
              />
              <div className="pricing-content">
                {PLAN_INFO.map((plan, index) => {
                  return (
                    <div className="pricing-card" key={plan.title}>
                      <div className="pricing-card-title">
                        <h3>{plan.title}</h3>
                        <p className="pricing-card-subtitle">{plan.subtitle}</p>
                      </div>
                      <div className="pricing-card-price">
                        <div className="pricing-card-price-title">
                          {plan.price}
                        </div>
                        <div className="pricing-card-price-subtitle">
                          {plan.priceSubtitle}
                        </div>
                      </div>
                      <div className="pricing-card-btn">
                        <Button
                          variant={
                            currentPlan === plan.title.toLowerCase()
                              ? "outlined"
                              : "contained"
                          }
                          color="primary"
                          style={{ width: "13rem" }}
                          onClick={(e) => handleOpenPricing(e)}
                          value={plan.title.toLowerCase()}
                          disabled={currentPlan === plan.title.toLowerCase()}
                        >
                          {currentPlan === plan.title.toLowerCase()
                            ? "Current Plan"
                            : "Get Started"}
                        </Button>
                      </div>
                      <div className="pricing-card-content">
                        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                          {plan.content.map((item, index) => {
                            return (
                              <li
                                key={item}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0.5rem 0",
                                }}
                              >
                                <DoneOutlineIcon
                                  sx={{ color: "green", pr: "0.4rem" }}
                                />
                                <span>{item}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {sector === 1 && (
            <div>
              <h2>Customization</h2>
              <p>You can customize your community TBA levels.</p>
              <Button variant="contained" color="primary">
                Upgrade
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
