import { defineStore } from "pinia";
import axios from "redaxios";

export const userLogout = defineStore("logout", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const logout = async (next) => {
    try {
      const { data } = await axios.get(
        `${url}/logout`);

      next(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { logout };
});
