import { defineStore } from "pinia";
import axios from "redaxios";

export const userDelete = defineStore("deleteUser", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const deleteUser = async (form, next) => {
    try {
      const { data } = await axios.post(
        `${url}/user/delete`,
        form,
        {
          withCredentials: true,
        }
      );

      next(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteUser };
});
