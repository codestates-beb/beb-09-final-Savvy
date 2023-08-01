import axios from "axios";

export const deleteCommunity = async (communityAddress) => {
  try {
    const response = await axios({
      method: "delete",
      url: `http://localhost:8080/manager/${communityAddress}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
