<template>
  <div class="q-mx-md q-my-md">
    <Chart
      :options="{
        autosize: true,
        symbol: pairs,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
      }" style="height: 100vh;"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Chart,
} from "vue-tradingview-widgets";

export default defineComponent({
  name: "TradingView",
  props: [ 'pairs' ],
  components: {
    Chart,
  }
});
</script>
