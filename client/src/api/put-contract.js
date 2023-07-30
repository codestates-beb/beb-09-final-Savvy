import axios from "axios";

export const updateContract = async (id, ercType, contractName) => {
  try {
    const response = await axios({
      method: "put",
      url: "http://localhost:8080/contract/update",
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
