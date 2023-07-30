import axios from "axios";

export const createContract = async (
  communityAddress,
  ercType,
  contractAddress,
  contractName
) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/contract/create",
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
