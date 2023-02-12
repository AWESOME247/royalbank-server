<template>
  <q-page>
    <div style="max-width: 768px; margin: auto">
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'AUDCAD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-audcad.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">AUD/CAD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'AUDCHF' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-audchf.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">AUD/CHF</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'AUDJPY' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-audjpy.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">AUD/JPY</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'AUDNZD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-audnzd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">AUD/NZD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'AUDUSD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-audusd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">AUD/USD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'CADCHF' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-cadchf.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">CAD/CHF</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'CADJPY' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-cadjpy.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">CAD/JPY</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURAUD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-euraud.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/AUD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURCAD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-eurcad.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/CAD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURCHF' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-eurchf.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/CHF</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURGBP' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-eurgbp.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/GBP</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURJPY' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-eurjpy.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/JPY</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURNZD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-eurnzd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/NZD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'EURUSD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-eurusd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">EUR/USD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'GBPAUD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-gbpaud.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">GBP/AUD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'GBPCAD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-gbpcad.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">GBP/CAD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'GBPNZD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-gbpnzd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">GBP/NZD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'GBPUSD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-gbpusd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">GBP/USD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'NZDCAD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-nzdcad.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">NZD/CAD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'NZDCHF' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-nzdchf.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">NZD/CHF</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'NZDJPY' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-nzdjpy.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">NZD/JPY</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'NZDUSD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-nzdusd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">NZD/USD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'USDCAD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-usdcad.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">USD/CAD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'USDCHF' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-usdchf.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">USD/CHF</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'USDJPY' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-usdjpy.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">USD/JPY</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'USDMXN' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-usdmxn.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">USD/MXN</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'USDSGD' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-usdsgd.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">USD/SGD</h5>
            </div>
          </div>
        </q-card>
      </router-link>
      <router-link
        :to="{ name: 'TradingVue', params: { pairs: 'USDTRY' } }"
        style="text-decoration: none"
      >
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-lg">
            <div class="q-px-md">
              <q-avatar size="65px" class="q-mx-md">
                <img src="../../assets/pair-icon-usdtry.img.svg" />
              </q-avatar>
            </div>
            <div class="q-px-md">
              <h5 class="text-white">USD/TRY</h5>
            </div>
          </div>
        </q-card>
      </router-link>
    </div>
  </q-page>
</template>
