import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const getAllTba = async () => {
  const currentCommunity = localStorage.getItem("currentCommunity");

  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/tbaAdmin/${currentCommunity}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.TBAs;
  } catch (error) {
    console.log(error);
    return;
  }
};
