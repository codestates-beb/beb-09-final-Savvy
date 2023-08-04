import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const createContract = async (
  communityAddress,
  ercType,
  contractAddress,
  contractName
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${apiUrl}/contract/create`,
      data: {
        communityAddress,
        ercType,
        contractAddress,
        contractName,
      },
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
