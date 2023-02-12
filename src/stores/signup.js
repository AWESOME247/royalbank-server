import { defineStore } from "pinia";
import axios from "redaxios"

export const userSignup = defineStore("signup", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const signup = async (form, next) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${url}/signup`,
          data: form,
        });
        if(!data) return (location.href = location.protocol + "//" + location.host + "/login");
        next(data)        
      } catch (error) {
        console.log(error);
      }
  };

  return { signup };
});
