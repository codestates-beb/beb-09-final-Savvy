import axios from "axios";

export const getAllTba = async () => {
  const communityAddress = window.location.pathname.split("/")[2];
  console.log(communityAddress);

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/tbaAdmin/${communityAddress}`,
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
