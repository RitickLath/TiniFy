import axios from "axios";

export const handleSignup = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      { username, email, password }
    );

    if (response) {
      return { status: response.data.status, message: response.data.message };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { status: false, message: error.response.data.message };
  }
};

export const handleSignin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signin",
      { email, password }
    );

    if (response) {
      const { status, message, token } = response.data;
      if (token) {
        localStorage.setItem("authToken", `bearer ${token}`);
      }

      return { status, message, token };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      status: false,
      message: error.response?.data?.message || "Login failed.",
    };
  }
};
