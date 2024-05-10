import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;

export const login = async (userInfo) => {
  try {
    const { data } = await axios.post(`${URL}/auth/login`, userInfo);
    console.log("data", data.data);
  } catch (error) {
    console.log(error);
  }
};
