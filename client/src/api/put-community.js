import axios from "axios";

export const updateCommunity = async (id, type, communityName) => {
  try {
    const response = await axios({
      method: "put",
      url: "http://localhost:8080/manager/community/update",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        id,
        type,
        communityName,
      },
    });
    return response.data.CommunityData;
  } catch (error) {
    console.log(error);
    return;
  }
};
