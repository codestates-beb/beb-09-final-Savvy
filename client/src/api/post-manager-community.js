import axios from "axios";

export const createCommunity = async (address, type, alias) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/manager/community/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        address,
        type,
        alias,
      },
    });
    console.log(response.data.CommunityData);
    return response.data.CommunityData;
  } catch (e) {
    console.log(e);
    return;
  }
};