import axios from "axios";

export const getAllTbaGroup = async () => {
  const currentCommunity = localStorage.getItem("currentCommunity");

  try {
    const response = await axios({
      method: "get",
      url: `http://localhost:8080/tbaAdmin/group/allGroups/${currentCommunity}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.groups;
  } catch (error) {
    console.log(error);
    return;
  }
};
