import { defineStore } from "pinia";
import axios from "redaxios";
const url = import.meta.env.VITE_CONNECTION_URL;

export const currentUser = defineStore("user", () => {
  const getUser = async () => {
    try {
      const { data } = await axios.get(`${url}/user`);
      return await data;
    } catch (error) {
      console.log(error);
    }
  };
  return { getUser }
});
