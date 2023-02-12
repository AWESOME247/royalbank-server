import { defineStore } from "pinia";
import axios from "redaxios"
const url = import.meta.env.VITE_CONNECTION_URL;

export const verify = defineStore("verifyAccount", () => {

  const verifyAccount = async (form, next) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${url}/users/verifyAccount`,
          data: form,
        });
        if(!data) return (location.href = location.protocol + "//" + location.host + "/login");
        next(data)        
      } catch (error) {
        console.log(error);
      }
  };

  const avarta = async (form, next) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${url}/users/avarta`,
          data: form,
        });
        next(data)        
      } catch (error) {
        console.log(error);
      }
  };

  return { verifyAccount, avarta };
});
