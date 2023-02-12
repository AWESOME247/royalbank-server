<template>
  <q-page>
    <div style="max-width: 600px; margin: auto">
      <q-card class="bg-grey-8 row q-mx-md q-my-lg q-px-md text-white">
        <p class="text-h5 col-12 q-py-lg">Deposit</p>
        <div
          class="col-12"
          style="
            width: 300px;
            height: 300px;
            margin: 0 auto;
            border-radius: 5px;
          "
        >
          <q-img
            src="../../assets/fred.jpg"
            style="width: 100%; height: 100%"
          />
        </div>
        <div class="col-12 q-my-lg flex-inline">
          <input
            outlined
            lazy-rules
            v-model="copy"
            required
            label="Email"
            readonly
            class="q-pa-sm text-center text-weight-bold"
            style="width: 100%"
          />
        </div>
        <div class="col-12 q-mb-md">
          <q-btn
            class="full-width bg-positive"
            label="copy"
            @click="copyText"
          />
        </div>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import { ref, computed } from "vue";
import copy from "copy-to-clipboard";
import { notification } from "../../stores/notification";
export default {
  setup() {
    const { alert } = notification();
    const walletAddress = import.meta.env.VITE_WALLET_ADDRESS

    const copyText = () => {
      copy(walletAddress);
      alert("positive", "check", "Address has been copied!");
    };
    return {
      copy: ref(walletAddress).value,
      copyText,
    };
  },
};
</script>
