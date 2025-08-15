import axios from "axios";

const Api_Base_Url = "http://localhost:3000/api/v1/users";

export const RegisterUser = async (userDate) => {
  try {
    const res = await axios.post(`${Api_Base_Url}/register`, userDate);
    if (res.status === 201) {
      return res.data;
    } else {
      throw new Error("Failed to register user");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
