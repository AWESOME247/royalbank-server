<template>
  <q-page>
    <div class="q-py-md row justify-center">
      <div class="col-12">
        <q-card class="bg-grey-9 text-white q-mx-lg q-my-md">
          <q-card-section class="q-my-md content-center">
            <div class="text-h6">
              <p class="text-center q-my-md q-mb-lg">
                  Account Num: {{ aza  }} 
                  <q-icon name="copy_all" class="cursor-pointer text-positive" size="27px" @click="copyAza(aza)" />
              </p>
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="../../assets/icons8-investment-50.png" />
                    <q-badge floating color="red">{{ curr }} </q-badge>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Total Balance:</q-item-label>
                  <q-item-label class="text-white flex text-weight-bold"
                    >                    {{ curr }} <p class="text-white">{{ balance }}</p>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
            <q-separator inset color="white" />
            <div class="flex justify-between q-my-lg">
              <router-link :to="{ name: 'Card' }" class="text-center q-pa-sm">
                <div class="bg-red-13 rounded-borders">
                  <q-icon size="30px" color="white" class="q-pa-sm" name="payment" />
                </div>
                <small class="q-my-sm">Cards</small>
              </router-link>
              <router-link :to="{ name: 'Inter' }" class="text-center q-pa-sm">
                <div class="bg-green-13 rounded-borders">
                  <q-icon size="30px" color="white" class="q-pa-sm" name="swap_horiz" />
                </div>
                <small class="q-my-sm">Inter Transfer</small>
              </router-link>
              <router-link :to="{ name: 'Withdraw' }" class="text-center q-pa-sm">
                <div class="bg-blue-13 rounded-borders">
                  <q-icon size="30px" color="white" class="q-pa-sm" name="arrow_forward" />
                </div>
                <small class="q-my-sm">Transfer</small>
              </router-link>
              <router-link :to="{ name: 'Transaction' }" class="text-center q-pa-sm">
                <div class="bg-yellow-9 rounded-borders">
                  <q-icon size="30px" color="white" class="q-pa-sm" name="sync_alt" />
                </div>
                <small class="q-my-sm">Transactions</small>
              </router-link>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6 col-lg-6">
        <q-card class="bg-grey-9 text-white q-mx-lg q-my-md">
          <q-card-section class="q-my-md flex justify-center content-center">
            <p class="text-h6">
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img src="../../assets/icons8-investment-50.png" />
                    <q-badge floating color="red">{{ curr }}</q-badge>
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Current Credit:</q-item-label>
                  <q-item-label class="text-positive flex text-weight-bold"
                    >{{ curr }}
                    <p class="text-positive">{{ earnings }}</p>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </p>
          </q-card-section>
        </q-card>
      </div>
      
      <ForexHeatMap :amount="PendingWithdraw" :curr="curr" />
    </div>
  </q-page>
</template>
<script>
import { onMounted, defineComponent, ref } from "vue";
// import axios from "redaxios";
import { currentUser } from "../../stores/user";
import ForexHeatMap from "../../components/ForexMap.vue";
import LittleChart from "../../components/Little-line-chart.vue";
import { notification } from "../../stores/notification";
import copyTXT from "copy-to-clipboard";

export default defineComponent({
  components: { ForexHeatMap, LittleChart },
  setup() {
    const store = currentUser();
    const totalDeposit = ref(null);
    const earnings = ref(null);
    const balance = ref(null);
    const totalBalance = ref(null);
    const PendingWithdraw = ref(null);
    const totalWithdraw = ref(null);
    const notify = notification();
    const aza = ref(null);
    const curr = ref(null);
    const amtInBtc = ref(null)

    // const btc = async (amt) => {
    //   const { data } = await axios.get("https://blockchain.info/tobtc?currency=USD&value=" + amt);
    //   amtInBtc.value = data < 1 ? parseInt(await data).toFixed(2) : await data
    // }

    // store.fetchUsers();

    const copyAza = (num) => {
      copyTXT(num);
      notify.alert("positive", "check", "Account number copied to clipboard!");
    }

    const currentUsers = async () => {
      const user = await store.getUser();
      (() => {
        const amt = parseInt(!user.withdrawAmount ? 0 : user.withdrawAmount);
        PendingWithdraw.value = Intl.NumberFormat().format(amt) + ".00";
      })();

      const totBalance = () => {
        const amt = parseInt(user.balance) + user.profit;
        totalDeposit.value = parseInt(amt).toFixed(2);
        const sp = user.country.split('(')[1];
        curr.value = sp.split(")")[0]
      };

      const earning = () => {
        earnings.value = Intl.NumberFormat().format(user.profit) + ".00";
      };

      const balances = () => {
        const amt = parseInt(user.balance);
        balance.value = Intl.NumberFormat().format(amt) + ".00";
        // btc(amt)
      };

      const totDeposit = async () => {
        const sum = user.balance + user.profit;
        totalBalance.value = parseInt(sum).toFixed(2);
        aza.value = user.accountNumber;
      };

      const totWithdraw = async () => {
        const sum = await user.transactions.reduce((prev, curr) => {
          return prev, curr.withdraw;
        }, 0);
        totalWithdraw.value = parseInt(sum).toFixed(2);
      };

      totDeposit();
      balances();
      earning();
      totBalance();
      totWithdraw();
    };

    onMounted(() => {
      currentUsers();
    });

    return {
      PendingWithdraw,
      totalDeposit,
      totalBalance,
      totalWithdraw,
      balance,
      earnings,
      amtInBtc,
      aza,
      curr,
      copyAza,
    };
  },
});
</script>
<style scoped>
  a{
    text-decoration: none;
    color: #fff;
  }
  .rounded-borders{
    width: 50px;
    margin: 0 auto;
  }
</style>