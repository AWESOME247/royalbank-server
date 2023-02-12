<template>
  <div class="col-12 col-md-6 col-lg-6">
    <q-card
      class="bg-grey-9 flex justify-center content-center text-white q-mx-lg q-my-md"
    >
      <div class="text-h6">
        <q-item clickable v-ripple>
          <q-item-section side>
            <q-avatar rounded size="48px">
              <img src="../assets/icons8-withdraw-67.png" />
              <q-badge floating color="red">$</q-badge>
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Pending Transfer:</q-item-label>
            <q-item-label class="text-amber-8 flex text-weight-bold"
              >{{ curr }}
              <p class="text-amber-8">{{ amount }}</p>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  TechnicalAnalysis,
  ForexCrossRates,
  SingleTicker,
  Snaps,
  EconomicCalendar,
} from "vue-tradingview-widgets";

export default defineComponent({
  name: "TradingView",
  props: ["amount", "curr"],
  components: {
    ForexCrossRates,
    TechnicalAnalysis,
    SingleTicker,
    Snaps,
    EconomicCalendar,
  },
});
</script>
