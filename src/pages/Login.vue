<template>
  <q-page>
    <q-linear-progress
      v-show="spinner"
      class="fixed-top"
      indeterminate
      color="pink-8"
      style="z-index: 2000; display: none"
    />
    <div class="bg-wave flex justify-center content-center">
      <div class="text-white flex justify-center content-center column">
        <div
          class="flex justify-center q-mb-lg"
          style="height: 130px; width: 130px"
        >
          <q-img src="../assets/logo.png" />
          <p class="text-h6 text-uppercase text-center q-mb-lg">
            {{ appName }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex content-center justify-center" style="height: fit-content">
      <form
        @submit.prevent="submit"
        style="width: 420px; max-width: 100%; margin: 0px auto"
      >
        <q-card class="q-py-lg q-px-lg q-mx-lg q-mb-lg">
          <p class="text-h6 q-mx-md">Login account</p>
          <div class="q-mb-lg q-mx-md">
            <q-input
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="email"
              required
              label="Account Number"
            >
              <template v-slot:prepend>
                <q-icon name="email" />
              </template>
            </q-input>
          </div>
          <div class="q-my-lg q-mx-md">
            <q-input
              outlined
              :rules="nameRules"
              v-model="password"
              required
              label="Password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="flex">
            <q-toggle v-model="remenberMe" label="Remenber Me" />
            <router-link to="#" class="q-mx-sm q-my-sm"
              >Forgot Password</router-link
            >
          </div>
          <div class="q-my-lg q-mx-md">
            <q-btn
              color="pink-8"
              type="submit"
              label="submit"
              size="17px"
              elevated
              :disable="disable"
            />
          </div>
          <div class="q-mx-md flex">
            <p class="text-subtitle1">Don't Have an account?</p>
            <router-link to="/register"
              ><p class="text-subtitle1 q-mx-sm text-pink-8 border">
                Register
              </p></router-link
            >
          </div>
        </q-card>
      </form>
    </div>
    <q-ajax-bar
      ref="bar"
      position="top"
      color="red-8"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>
<script>
import { ref, defineComponent } from "vue";
import { userSignin } from "../stores/signin";
import { notification } from "../stores/notification";

export default defineComponent({
  setup() {
    const email = ref(null);
    const password = ref(null);
    const appName = import.meta.env.VITE_APP_NAME;
    const bar = ref(null);
    const notify = notification();
    const { signin } = userSignin();
    let spinner;
    const disable = ref(false);

    const submit = () => {
      const barRef = bar.value;
      disable.value = true;

      barRef.start();

      signin({ email: email.value, password: password.value }, (data) => {
        const { error, success, isAdmin } = data;
        const barRef = bar.value;

        if (error) {
          disable.value = false;
          if (barRef) {
            barRef.stop();
          }
          return notify.alert("negative", "report_problem", error);
        }
        if (isAdmin) {
          if (barRef) {
            barRef.stop();
          }
          return (
            notify.alert("positive", "check", success),
            (location.href =
              location.protocol + "//" + location.host + "/admin")
          );
        }
        if (success) {
          if (barRef) {
            barRef.stop();
          }
          return (
            notify.alert("positive", "check", success),
            (location.href =
              location.protocol + "//" + location.host + "/dashboard")
          );
        }
      });
    };

    return {
      disable,
      bar,
      spinner,
      email,
      appName,
      password,
      remenberMe: ref(false),
      nameRules: [
        (val) => (val && val.length > 0) || "Please fill out this field",
      ],
      submit,
      isPwd: ref(true),
    };
  },
});
</script>
<style>
.bg-wave {
  background: url("../assets/wave.svg") no-repeat center;
  background-size: cover;
  height: 300px;
  width: 100%;
}
a {
  text-decoration: none;
}
</style>
