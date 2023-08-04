import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const createCommunity = async (address, type, communityName) => {
  try {
    const response = await axios({
      method: "post",
      url: `${apiUrl}/manager/community/create`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        address,
        type,
        communityName,
      },
    });
    console.log(response.data.CommunityData);
    return response.data.CommunityData;
  } catch (e) {
    console.log(e);
    return e.response.status;
  }
};
