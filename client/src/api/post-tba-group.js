import axios from "axios";

export const createTbaGroup = async (groupName, tbaIds) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/tbaAdmin/createGroup",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        groupName,
        tbaIds,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
