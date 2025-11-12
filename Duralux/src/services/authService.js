import { api } from "./api";

export const logout = async () => {
  await api.post("/logout");
};

export const getCurrentuser = async () => {
  try {
    const response = await api.get("/currentUser");
    return response.data;
  } catch (error) {
    console.error("error getting user details", error);
  }
};
