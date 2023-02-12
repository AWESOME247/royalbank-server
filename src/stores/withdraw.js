import { defineStore } from "pinia";
import axios from "redaxios";

export const userWithdraw = defineStore("withdraw", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const withdraw = async (form, next) => {
    console.log(form);
    try {
      const { data } = await axios.post(
        `${url}/user/withdrawal`,
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

  const createCopyTrade = async (form, next) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${url}/admin/create/copy`,
        data: form,
      });

      next(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { withdraw, createCopyTrade };
});
