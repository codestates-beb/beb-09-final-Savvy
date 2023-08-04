import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const getContract = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/contract/`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
