import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const updateCommunity = async (id, type, communityName) => {
  try {
    const response = await axios({
      method: "put",
      url: `${apiUrl}/manager/community/update`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        id,
        type,
        communityName,
      },
    });
    return response.data.CommunityData;
  } catch (error) {
    console.log(error);
    return;
  }
};
