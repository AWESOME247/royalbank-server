<template>
  <q-page>
    <div
      class="flex justify-center content-center bg-dark"
      style="height: 100vh"
    >
      <div class="" style=" max-width: 600px; margin: auto">
        <q-card class="bg-dark text-white q-mx-md">
        <p class="text-h5 text-center q-my-md">Withdrawal Pending</p>
        <q-card class="bg-dark column justify-center content-center bg-dark">
          <q-avatar size="150px" class="q-my-md q-mx-md">
            <img src="../assets/download-5.webp" />
          </q-avatar>
          <p
            style="color: #fab005"
            class="text-h5 text-weight-bold text-center text-uppercase"
          >
            {{ name.fullname }}
          </p>
          <p
            style="color: #fab005"
            class="text-h5 text-weight-bold text-center"
          >
            ${{ name.withdrawAmount }}
          </p>
        </q-card>
        <p class="q-mx-lg q-pb-lg text-center">
          Congratulation <span class="text-weight-bold">{{ name.fullname }}</span>, Your transaction of <span class="text-weight-bold">${{ name.withdrawAmount }}</span> is beeing processed. Please
          contact our customer service for immediate withdraw.
        </p>
      </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { currentUser } from "../stores/user";

export default defineComponent({
  setup() {
    const name = ref([]);
    const store = currentUser();

    const users = async () => {
      name.value = await store.getUser();
    };

    onMounted(() => users());
    return {
      name,
    };
  },
});
</script>
