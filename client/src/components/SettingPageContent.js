import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Tabs, Tab, LinearProgress } from "@mui/material";

import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export default function SettingPageContent() {
  const [sector, setSector] = useState(0);

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
                <div className="pricing-card">
                  <div className="pricing-card-title">
                    <h3>Basic</h3>
                    <p className="pricing-card-subtitle">
                      Perfect Plan for Beginners.
                    </p>
                  </div>
                  <div className="pricing-card-price">
                    <div className="pricing-card-price-title">Free</div>
                    <div className="pricing-card-price-subtitle">
                      For a Life time
                    </div>
                  </div>
                  <div className="pricing-card-btn">
                    <Button
                      variant="outlined"
                      color="primary"
                      style={{ width: "13rem" }}
                      disabled
                    >
                      Current Plan
                    </Button>
                  </div>
                  <div className="pricing-card-content">
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 0",
                        }}
                      >
                        <DoneOutlineIcon
                          sx={{ color: "green", pr: "0.4rem" }}
                        />
                        <span>1 Community Available</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 0",
                        }}
                      >
                        <DoneOutlineIcon
                          sx={{ color: "green", pr: "0.4rem" }}
                        />
                        <span>10 TBAs per 1 Community</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pricing-card">
                  <div className="pricing-card-title">
                    <h3>Plus</h3>
                    <p className="pricing-card-subtitle">
                      For uses who want to do more with their community.
                    </p>
                  </div>
                  <div className="pricing-card-price">
                    <div className="pricing-card-price-title">0.05 ETH</div>
                    <div className="pricing-card-price-subtitle">/ month</div>
                  </div>
                  <div className="pricing-card-btn">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "13rem" }}
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="pricing-card-content">
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 0",
                        }}
                      >
                        <DoneOutlineIcon
                          sx={{ color: "green", pr: "0.4rem" }}
                        />
                        <span>3 Communities Available</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 0",
                        }}
                      >
                        <DoneOutlineIcon
                          sx={{ color: "green", pr: "0.4rem" }}
                        />
                        <span>100 TBAs per 1 Community</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pricing-card">
                  <div className="pricing-card-title">
                    <h3>Business</h3>
                    <p className="pricing-card-subtitle">
                      For enterprises and large organizations that need more.
                    </p>
                  </div>
                  <div className="pricing-card-price">
                    <div className="pricing-card-price-title">0.1 ETH</div>
                    <div className="pricing-card-price-subtitle">/ month</div>
                  </div>
                  <div className="pricing-card-btn">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "13rem" }}
                    >
                      Get Started
                    </Button>
                  </div>
                  <div className="pricing-card-content">
                    <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 0",
                        }}
                      >
                        <DoneOutlineIcon
                          sx={{ color: "green", pr: "0.4rem" }}
                        />
                        <span>Unlimited Communities</span>
                      </li>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.5rem 0",
                        }}
                      >
                        <DoneOutlineIcon
                          sx={{ color: "green", pr: "0.4rem" }}
                        />
                        <span>Unlimited TBAs</span>
                      </li>
                    </ul>
                  </div>
                </div>
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
