import axios from "axios";

require("dotenv").config();
const apiUrl = process.env.REACT_APP_API_ENDPOINT;

export const postLogin = async (
  address,
  balance,
  chainId,
  email,
  name,
  profileImage,
  appPubKey
) => {
  try {
    const response = await axios({
      method: "post",
      url: `${apiUrl}/admin/login`,
      data: {
        address,
        balance,
        chainId,
        email,
        name,
        profileImage,
        appPubKey,
      },
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
