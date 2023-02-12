import { defineStore } from "pinia";
import axios from "redaxios";

export const userSignin = defineStore("signin", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const signin = async (form, next) => {
    const { email, password } = form;
    try {
      const { data } = await axios.post(
        `${url}/signin`,
        {
          email, password
        }
      );

      next(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { signin };
});
