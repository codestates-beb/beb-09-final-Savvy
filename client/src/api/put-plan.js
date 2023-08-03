/* global BigInt */
import axios from "axios";
import { ethers } from "ethers";

// Savvy Token address
const svyTokenAddress = "0xcDfeDA168EFA10D07a1B88a4e8087209e6B598dF";
// Server Wallet address
const serverWalletAddress = "0xAdeb833eee668e50761B4BC8b3Ef476Dc2C86946";

const SUBCRIBE_PERIOD = 12;

export const updatePlan = async (web3Auth, adminEmail, plan) => {
  let approveAmount = BigInt(10 ** 18);

  if (plan === "basic") {
    // send approve response to server
    const response = await axios({
      method: "put",
      url: "http://localhost:8080/plan",
      data: {
        adminEmail,
        plan,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } else if (plan === "plus") {
    approveAmount = BigInt(10 * SUBCRIBE_PERIOD * 10 ** 18);
  } else if (plan === "business") {
    approveAmount = BigInt(100 * SUBCRIBE_PERIOD * 10 ** 18);
  }

  try {
    // approve SVY token
    // init web3authProvider
    const web3authProvider = await web3Auth.connect();
    const provider = new ethers.providers.Web3Provider(web3authProvider);
    const signer = provider.getSigner();
    const svyToken = new ethers.Contract(
      svyTokenAddress,
      [
        "function approve(address spender, uint256 amount) public returns (bool)",
      ],
      signer
    );

    const approveTx = await svyToken.approve(
      serverWalletAddress,
      approveAmount
    );
    const txReceipt = await approveTx.wait();
    console.log(txReceipt);
    if (txReceipt.status !== 1) {
      return;
    } else {
      // send approve response to server
      const response = await axios({
        method: "put",
        url: "http://localhost:8080/plan",
        data: {
          adminEmail,
          plan,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
