import { defineStore } from "pinia";
import axios from "redaxios";

export const update = defineStore("updateUser", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const updateUser = async (form, next) => {
    try {
      const { data } = await axios.post(
        `${url}/admin/update/user/`,
          form
        ,
        {
          withCredentials: true,
        }
      );

      next(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { updateUser };
});
