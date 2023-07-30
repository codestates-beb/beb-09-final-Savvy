import axios from "axios";

export const deleteContract = async (contractAddress) => {
  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:8080/contract/${contractAddress}`,
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
