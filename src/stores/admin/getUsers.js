// /admin/get-all-users/
import { defineStore } from "pinia";
import axios from "redaxios";
const url = import.meta.env.VITE_CONNECTION_URL;

export const currentUser = defineStore("admin", () => {
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${url}/admin/get-all-users/`);
      console.log(data);
      return await data;
    } catch (error) {
      console.log(error);
    }
  };
  return { getUsers }
});
