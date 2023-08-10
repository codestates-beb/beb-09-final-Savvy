import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const getTbaById = async (tbaId) => {
  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/tbaAdmin/detail/${tbaId}`,
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
