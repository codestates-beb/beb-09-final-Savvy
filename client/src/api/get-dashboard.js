import axios from "axios";

const communityAddress = window.location.pathname.split("/")[2];

export const getDashboard = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/dashboard/${communityAddress}`,
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
