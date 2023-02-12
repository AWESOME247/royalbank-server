// /admin/get-all-users/
import { defineStore } from "pinia";
import axios from "redaxios";
const url = import.meta.env.VITE_CONNECTION_URL;

export const findUser = defineStore("findUser", () => {
  const foundUser = async (id) => {
    try {
      const { data } = await axios.post(`${url}/admin/user/id`, { user: id },
      {
        withCredentials: true,
      });
      return await data;
    } catch (error) {
      console.log(error);
    }
  };
  return { foundUser }
});
