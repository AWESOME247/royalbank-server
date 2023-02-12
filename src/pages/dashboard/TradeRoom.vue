<template>
  <q-page>
    <div class="row">
      <div class="col-12 col-md-10 col-lg-10">
        <p class="text-right text-white text-h5 q-ma-md">
          ${{ roundNum(balance || us.balance) }}
        </p>
      </div>
      <div class="col-12 col-md-10 col-lg-10">
        <Chart :pairs="$route.params.pairs" />
      </div>
      <div
        class="col-12 col-md-2 col-lg-2 bg-grey-10"
        style="max-height: 100vh; overflow-y: auto; scroll-behavior: auto;"
      >
        <div v-for="i in position" :key="i">
          <q-card
            :class="{ 'bg-negative': i.sell, 'bg-positive': i.buy }"
            class="text-white q-mx-sm q-my-md"
          >
            <q-card-section
              class="q-my-md flex justify-center content-center"
              :class="{ hidden: delete1 }"
            >
              <q-item clickable v-ripple>
                <q-item-section>
                  <q-item-label
                    ><span class="text-weight-bold">{{
                      i.sell ? "SELL" : "BUY"
                    }}</span>
                    ${{ i.amount }} {{ i.stock }}</q-item-label
                  >
                  <q-item-label class="text-gold flex text-weight-bold">
                    {{ i.sell ? i.sell : i.buy }} -
                    {{ i.sell ? i.sell : i.buy }}
                  </q-item-label>
                  <q-item-label class="q-mt-sm">
                    <q-btn
                      size="10px"
                      label="close"
                      class="q-mr-sm bg-red-11"
                      @click="
                        closeTrade(
                          i.id,
                          i.sell && i.sell >= buy
                            ? (i.amount % i.sell) / 500
                            : i.buy < buy
                            ? (i.amount % i.buy) / 500
                            : (i.amount % i.buy) / 500,
                          i.stock,
                          i.amount,
                          i
                        )
                      "
                    />
                    ${{
                      roundNum(
                        i.sell && i.sell >= buy
                          ? (i.amount % i.sell) / 500
                          : i.buy < buy
                          ? (i.amount % i.buy) / 500
                          : (i.amount % i.buy) / 500
                      )
                    }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6 q-my-md q-px-md">
        <q-btn @click="buyStock" class="full-width bg-positive text-white">
          <span class="q-mx-sm">BUY </span> {{ buy }}
        </q-btn>
      </div>
      <div class="col-6 q-my-md q-px-md">
        <q-btn @click="sellStock" class="full-width bg-red text-white">
          <span class="q-mx-sm">SELL </span> {{ sell }}
        </q-btn>
      </div>
      <div class="col-12 q-my-md q-px-md">
        <q-input
          class="full-width bg-white"
          v-model="amout"
          outlined
          filled
          rounded
          square
          label="$"
        />
      </div>
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
<script setup>
import { onMounted, reactive, readonly, ref } from "vue";
import Chart from "../../components/RealTimeChart.vue";
import { buySell, cancelTrade } from "../../stores/stocks";
import { useRoute } from "vue-router";
import { currencyPairs } from "../../stores/getMarket";
import { currentUser } from "../../stores/user";
import { notification } from "../../stores/notification";

const notify = notification();

// NO OPEN POSITIONS
const { getPairs } = currencyPairs();
const sell = ref("");
const buy = ref("");
const amout = ref("1000");
const { Stock } = buySell();
const { closeTr } = cancelTrade();
const { getUser } = currentUser();
const user = async () => await getUser();
const bar = ref(null);
const position = ref([]);
const barRef = bar.value;
const us = ref("");
const delete1 = ref(false);
const { params } = useRoute();
const balance = ref();

const roundNum = (num) => {
  return parseInt(num).toFixed(2);
};

console.log(us.value)

balance.value = us.value;
const time = Date.now();

const match = async () => {
  const users = us.value;
  return users.buyStock.filter((stk) => stk.stock === params.pairs);
};

const buyStock = async () => {
  if (parseInt(amout.value) < 1000) {
    return notify.alert(
      "negative",
      "report_problem",
      "Minimun trade amount is $1000"
    );
  }
  const users = await user();
  if (users.balance < amout.value) {
    if (barRef) {
      barRef.stop();
    }
    return notify.alert(
      "negative",
      "report_problem",
      "Insuficent funds, Pls deposit"
    );
  }
  Stock(
    {
      balance: users.balance,
      amount: amout.value,
      sell: "",
      buy: buy.value,
      stock: params.pairs,
      id: users._id,
      time,
    },
    ({ error, data }) => {
      if (error) return notify.alert("negative", "report_problem", error);
      if (data) {
        console.log(data, time);
        const sttk = {
          balance: users.balance,
          amount: amout.value,
          sell: "",
          buy: buy.value,
          stock: params.pairs,
          id: users._id,
          time,
        };
        position.value.unshift(sttk);
        console.log(sttk);
        balance.value = data.balance;
        return notify.alert("positive", "check", "Trade has been placed");
      }
    }
  );
};

const sellStock = async () => {
  if (parseInt(amout.value) < 1000) {
    return notify.alert(
      "negative",
      "report_problem",
      "Minimun trade amount is $1000"
    );
  }
  const users = await user();
  if (users.balance < amout.value) {
    if (barRef) {
      barRef.stop();
    }
    return notify.alert(
      "negative",
      "report_problem",
      "Insuficent funds, Pls deposit"
    );
  }
  Stock(
    {
      balance: users.balance,
      amount: amout.value,
      sell: sell.value,
      buy: "",
      stock: params.pairs,
      id: users._id,
      time,
    },
    ({ error, data }) => {
      if (error) return notify.alert("negative", "report_problem", error);
      if (data) {
        const sttk = {
          balance: users.balance,
          amount: amout.value,
          sell: sell.value,
          buy: "",
          stock: params.pairs,
          id: users._id,
          time,
        };
        position.value.unshift(sttk);
        console.log(sttk);
        balance.value = data.balance;
        return notify.alert("positive", "check", "Trade has been placed");
      }
    }
  );
};

// i.id, i.sell ? i.sell : i.buy, i.stock, i.amount

const closeTrade = async (pid, stk, stock, amount, i) => {
  const idx = position.value.indexOf(i);
  const users = await user();
  closeTr(
    { id: users._id, stk, stock, pid, amount, balance: users.balance },
    ({ error, success }) => {
      if (error) return notify.alert("negative", "report_problem", error);
      if (success)
        return (
          notify.alert("positive", "check", success),
          position.value.splice(idx, 1)
        );
    }
  );
};

onMounted(async () => {
  const original = reactive({ data: await getPairs(params.pairs) });
  const copy = readonly(original);
  us.value = await user();
  buy.value = original.data.spark.result[0].response[0].meta.regularMarketPrice;
  sell.value = copy.data.spark.result[0].response[0].meta.regularMarketPrice;
  position.value = await match();
  // if(sell.value){
  //   useRoute()
  // }
});
</script>
