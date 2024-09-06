import axios from "axios";

export async function login({ email, password }) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/v1/users/login",
      { email, password },
      { withCredentials: true, }
      
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/v1/users/me", {
      withCredentials: true, // Send cookies with the request
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}