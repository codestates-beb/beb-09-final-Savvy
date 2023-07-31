import axios from "axios";

export const getTbaById = async (tbaId) => {
  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/tbaAdmin/detail/${tbaId}`,
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
