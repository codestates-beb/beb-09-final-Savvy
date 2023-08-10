import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const updateContract = async (id, ercType, contractName) => {
  try {
    const response = await axios({
      method: "put",
      url: `${apiUrl}/contract/update`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        id,
        ercType,
        contractName,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
