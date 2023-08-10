import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const getAllTbaGroup = async () => {
  const currentCommunity = localStorage.getItem("currentCommunity");

  try {
    const response = await axios({
      method: "get",
      url: `${apiUrl}/tbaAdmin/group/allGroups/${currentCommunity}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.groups;
  } catch (error) {
    console.log(error);
    return;
  }
};
