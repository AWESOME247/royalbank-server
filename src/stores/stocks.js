import { defineStore } from "pinia";
import axios from "redaxios"

export const buySell = defineStore("signup", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const Stock = async (form, next) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${url}/user/buy-stock`,
          data: form,
        });

        next(data)        
      } catch (error) {
        console.log(error);
      }
  };

  return { Stock };
});

export const cancelTrade = defineStore("close", () => {
  const url = import.meta.env.VITE_CONNECTION_URL;

  const closeTr = async (form, next) => {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${url}/user/cancel-stock`,
          data: form,
        });

        next(data)        
      } catch (error) {
        console.log(error);
      }
  };

  return { closeTr };
});
