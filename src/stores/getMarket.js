import { defineStore } from "pinia";
import axios from "redaxios";

export const currencyPairs = defineStore("pairs", () => {
  const getPairs = async (pairs) => {
    try {
      const { data } = await axios.get(`/api/v7/finance/spark?symbols=${ pairs }%3DX`);
      return await data;
    } catch (error) {
      console.log(error);
    }
  };
  return { getPairs }
});
