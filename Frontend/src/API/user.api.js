import { axiosInstance as ax } from "../utils/axiosInstance.js";

export const registerUser = async (name, email, password) => {
  try {
    const response = await ax.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await ax.post("/api/auth/login", { 
      email, 
      password 
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await ax.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await ax.get("/api/auth/me");
    return response.data;
  } catch (error) {
    console.error("GetMe error:", error);
    throw error;
  }
};

export const getAllUrls = async () => {
  try {
    const response = await ax.get("/api/user/urls");
    return response.data;
  } catch (error) {
    console.error("GetAllUrls error:", error);
    throw error;
  }
};
