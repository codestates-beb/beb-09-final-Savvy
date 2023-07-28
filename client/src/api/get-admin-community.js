import axios from "axios";

export const getAdminCommunity = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:8080/admin/community",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data.community;
  } catch (error) {
    console.log(error);
    return;
  }
};
