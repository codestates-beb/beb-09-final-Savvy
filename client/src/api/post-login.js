import axios from 'axios';

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
      method: 'post',
      url: 'http://localhost:8080/user/login',
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
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return;
  }
};
