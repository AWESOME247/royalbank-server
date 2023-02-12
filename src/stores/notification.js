import { defineStore } from "pinia";
import { useQuasar } from "quasar";

export const notification = defineStore("alert", () => {
    const $q = useQuasar();

    const alert = (color, icon, message) => {
      $q.notify({
        color,
        icon,
        message,
        position: "top-left",
        progress: true,
        timeout: Math.random() * 5000 + 3000,
      });
    }

  return { alert };
});
