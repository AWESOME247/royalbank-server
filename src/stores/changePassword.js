import { defineStore } from "pinia";
import axios from "redaxios";

export const userPasswordChange = defineStore("changeUserPassword", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const changeUserPassword = async (form, next) => {
    try {
      const { data } = await axios.post(
        `${url}/user/security`,
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

  return { changeUserPassword };
});
