import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const createTbaGroup = async (communityAddress, groupName, tbaIds) => {
  try {
    const response = await axios({
      method: "post",
      url: `${apiUrl}/tbaAdmin/createGroup`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        communityAddress,
        groupName,
        tbaIds,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
