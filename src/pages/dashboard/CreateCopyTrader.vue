<template>
  <q-page>
    <div style="max-width: 600px; margin: auto">
      <q-card class="bg-grey-8 q-mx-md q-my-lg q-px-md text-white">
        <p class="text-h5 q-py-lg">Create Copy Trader</p>
        <div class="row">
          <div class="col-12">
            <p>Select Trader</p>
            <q-select
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="trader"
              :options="address"
              label-color="grey-13"
              label="Select Trader"
              class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="diamond" />
              </template>
            </q-select>
          </div>
          <div class="col-12">
            <p>Enter Trader Name</p>
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="name"
              :options="address"
              label-color="grey-13"
              label="Enter Trader Name"
              class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="person" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <p>Enter Win Rate</p>
            <q-input
              required
              outlined
              lazy-rules
              type="number"
              :rules="nameRules"
              v-model="win"
              :options="address"
              label-color="grey-13"
              label="Enter Win Rate"
              class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="thumb_up" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <p>Enter Profit Share</p>
            <q-input
              required
              outlined
              lazy-rules
              type="number"
              :rules="nameRules"
              v-model="profit"
              :options="address"
              label-color="grey-13"
              label="Enter Profit Share"
              class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <p>Enter Trader Avarta</p>
            <q-file
              color="teal"
              class="q-mx-md"
              label-color="grey-13"
              filled
              accept="image/*"
              v-model="file2"
              label="Trader Pic"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="cloud_upload" />
              </template>
            </q-file>
          </div>
          <div class="col-12 q-my-md">
            <q-btn
              @click="submit"
              class="full-width"
              color="green-8"
              label-color="grey-13"
              label="Create"
            />
          </div>
        </div>
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
import { defineComponent, ref, computed, onMounted } from "vue";
import { notification } from "../../stores/notification";
import { userWithdraw } from "../../stores/withdraw";
import { currentUser } from "../../stores/user";

export default defineComponent({
  name: "withdraw",
  setup() {
    const { getUser } = currentUser();
    const bar = ref(null);
    const trader = ref("");
    const profit = ref("");
    const name = ref("");
    const win = ref("");
    const file2 = ref(null);
    const user = ref("");
    const { alert } = notification();

    const { createCopyTrade } = userWithdraw();
    const submit = () => {
      const barRef = bar.value;
      barRef.start();
    const form = new FormData();
      form.append("profit", profit.value);
      form.append("name", name.value);
      form.append("rate", win.value);
      form.append("being", trader.value);
      form.append("copyProfile", file2.value);
      form.append("id", "6380ecfcbd288d37d73519ad");

      if (!profit.value)
        return (
          barRef.stop(),
          alert("negative", "report_problem", "Fill the missing fields")
        );

      createCopyTrade(form, (data) => {
        if (data.err)
          return barRef.stop(), alert("negative", "report_problem", data.err);
        if (data.success) {
          return alert("positive", "check", data.success), barRef.stop();
        }
      });

      onMounted(async () => {
        user.value = await getUser();
      });
    };

    return {
      bar,
      file2,
      submit,
      trader,
      win,
      name,
      profit,
      nameRules: [
        (val) => (val && val.length > 0) || "Please fill out this field",
      ],
      address: ["Robot", "Human"],
    };
  },
});
</script>
