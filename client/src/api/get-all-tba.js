import axios from "axios";

export const getAllTba = async () => {
  const currentCommunity = localStorage.getItem("currentCommunity");

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/tbaAdmin/${currentCommunity}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.TBAs;
  } catch (error) {
    console.log(error);
    return;
  }
};
