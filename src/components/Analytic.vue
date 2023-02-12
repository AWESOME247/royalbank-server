<template>
  <div class="q-mx-md q-my-md">
    <ForexHeatMap
      :options="{
        interval: '1m',
        width: '100%',
        isTransparent: true,
        height: '100%',
        symbol: 'NASDAQ:AAPL',
        showIntervalTabs: true,
        locale: 'en',
        colorTheme: 'dark',
      }"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  Chart,
  CryptoMarket,
  Snaps,
  Screener,
  TechnicalAnalysis,
} from "vue-tradingview-widgets";

export default defineComponent({
  name: "TradingView",
  components: {
    TechnicalAnalysis,
  },
});
</script>
