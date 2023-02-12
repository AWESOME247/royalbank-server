<template>
  <q-page style="background-color: #ccc">
    <div class="flex justify-center items-center column q-mx-md q-py-lg">
      <q-icon size="84px" color="green-10" name="check_circle" />
      <p class="text-h6 text-green-10 q-my-md">
        Your account has been verified
      </p>
      <p>You'll be redirected in {{ timer }}sec</p>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { currentUser } from "../stores/user";
import { useRoute } from "vue-router";
import axios from "redaxios";

const { params } = useRoute();

const { getUser } = currentUser();

getUser().then(async user => {
    const { data } = await axios.post(`${import.meta.env.VITE_CONNECTION_URL}/verify/email/address`, { id: user._id, token: params.token });
    if(data) {
       location.href = location.protocol + "//" + location.host + "/dashboard"
    }
})

const timer = ref("");
let timeleft = 100;
let downloadTimer = setInterval(function () {
  if (timeleft <= 0) {
    clearInterval(downloadTimer);
  }
  timer.value = 100 - timeleft;
  timeleft -= 1;
}, 1000);


</script>
