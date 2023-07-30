import axios from "axios";

export const getContract = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:8080/contract/",
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
