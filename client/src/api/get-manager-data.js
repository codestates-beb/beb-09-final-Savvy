import axios from "axios";

export const getManagerData = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:8080/manager",
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
