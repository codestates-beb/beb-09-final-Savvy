import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const deleteTbaGroup = async (groupId) => {
  try {
    const response = await axios({
      method: "delete",
      url: `${apiUrl}/tbaAdmin/group/${groupId}`,
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
