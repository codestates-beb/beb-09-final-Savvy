import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const deleteCommunity = async (communityAddress) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${apiUrl}/manager/${communityAddress}`,
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
