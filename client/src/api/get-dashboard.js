import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

const communityAddress = window.location.pathname.split("/")[2];

export const getDashboard = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/dashboard/${communityAddress}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
