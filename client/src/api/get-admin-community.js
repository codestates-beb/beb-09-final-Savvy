import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const getAdminCommunity = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/admin/community`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.community;
  } catch (error) {
    console.log(error);
    return;
  }
};
