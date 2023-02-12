<template>
  <q-page>
    <div style="max-width: 600px; margin: auto">
      <q-card class="q-mx-md q-py-md bg-dark q-my-lg">
        <table>
          <thead>
            <th class="text-center text-white">Transaction</th>
            <th class="text-center q-px-lg text-white">Amount</th>
            <th class="text-center q-px-lg text-white">Status</th>
            <th class="text-center text-white">Date</th>
          </thead>
          <tbody>
            <tr
              class="q-my-lg"
              v-for="trans in transaction"
              :key="trans"
            >
              <td class="text-center text-white q-py-md">
                {{ trans.transactionType }}
              </td>
              <td
                :class="{
                  'text-red': trans.transactionType === 'Withdraw',
                  'text-green': trans.transactionType === 'Deposit',
                }"
                class="text-center text-white q-py-md"
              >
                ${{ trans.withdrawAmount || trans.amount }}
              </td>
              <td
                :class="{ 'text-amber-8': trans.status === 'pending' }"
                class="text-center text-positive q-py-md text-uppercase"
              >
                <q-btn>
                  {{ trans.status }}
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong
                      >Contact customer service
                      <q-icon color="amber-8" name="person"
                    /></strong>
                  </q-tooltip>
                </q-btn>
              </td>
              <td class="text-center text-white q-py-md">{{ trans.date }}</td>
            </tr>
          </tbody>
        </table>
      </q-card>
      <div class="q-mx-md flex column flex-center">
        <q-pagination
          v-model="current"
          color="deep-orange"
          :max="3"
          boundary-links
        />
      </div>
    </div>
  </q-page>
</template>
<script>
import { onMounted, ref, computed } from "vue";
import { currentUser } from "../../stores/user";

export default {
  setup() {
    const transaction = ref([]);
    const store = currentUser();
    const comV = computed(() => store.getUser().then(data => data.transactions.reverse()))

    const mutate = async () => {
      transaction.value = await comV.value
    };

    onMounted(() => {
      mutate();
    });
    return {
      transaction,
      current: ref(1),
    };
  },
};
</script>
<style scoped>
tr:nth-child(even) {
  background: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-radius: 5px;
}

thead th {
  padding: 0.3rem 0.1rem;
}
</style>
