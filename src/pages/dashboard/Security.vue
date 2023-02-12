<template>
  <q-page>
    <div style="max-width: 600px; margin: auto">
      <q-card class="q-mx-md q-py-md bg-grey-8 q-my-lg">
        <q-card-section>
          <div class="row">
            <p class="text-h5 text-white">Password Change</p>
            <div class="col-12">
              <q-input
                outlined
                :rules="nameRules"
                v-model="password"
                required
                label-color="grey-12"
                label="Old Password"
                class="text-grey-12"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="grey-12"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-my-sm">
              <q-separator color="grey-12" />
            </div>
            <div class="col-12">
              <q-input
                outlined
                label-color="grey-12"
                :rules="nameRules"
                v-model="newPassword"
                required
                label="New Password"
                :type="isPwd2 ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd2 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd2 = !isPwd2"
                    color="grey-12"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input
                outlined
                :rules="nameRules"
                v-model="conPassword"
                label-color="grey-12"
                required
                label="Confirm Password"
                :type="isPwd3 ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd3 ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    color="grey-12"
                    @click="isPwd3 = !isPwd3"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-12 q-mt-lg">
              <q-btn
                class="full-width bg-positive text-white"
                @click="submit"
                label="submit"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-ajax-bar
        ref="bar"
        position="top"
        color="red-8"
        size="10px"
        skip-hijack
      />
    </div>
  </q-page>
</template>
<script>
import { ref, computed } from "vue";
import { userPasswordChange } from "../../stores/changePassword";
import { notification } from "../../stores/notification";

export default {
  setup() {
    const password = ref(null),
      newPassword = ref(null),
      conPassword = ref(null),
      bar = ref(null),
      { alert } = notification(),
      { changeUserPassword } = userPasswordChange(),
      submit = () => {
        const barRef = bar.value;

        // confirmPassword, password, oldPassword
        barRef.start();

        changeUserPassword(
          {
            confirmPassword: conPassword.value,
            password: newPassword.value,
            oldPassword: password.value,
          },
          (data) => {
            if (data.error)
              return alert("negative", "report_problem", data.error);
            if (data.success) return alert("positive", "check", data.success);
            if (data)
              setTimeout(() => {
                if (barRef) {
                  barRef.stop();
                }
              }, Math.random() * 3000 + 1000);
          }
        );
      };

    return {
      bar,
      password,
      newPassword,
      conPassword,
      remenberMe: ref(false),
      submit,
      isPwd: ref(true),
      isPwd2: ref(true),
      isPwd3: ref(true),
      nameRules: [
        (val) => (val && val.length > 0) || "Please fill out this field",
      ],
    };
  },
};
</script>
