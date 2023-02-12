<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-uppercase" style="color: #f64c72; font-weight: 500;">
          <q-avatar size="60px">
            <img src="../../assets/logo.png" />
          </q-avatar>
          {{ appName }}
        </q-toolbar-title>

        <q-avatar dense flat round size="40px" @click="toggleRightDrawer">
          <q-icon name="sensor_occupied" size="40px" />
          <q-badge rounded floating color="pink-7" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-dark"
      v-model="rightDrawerOpen"
      side="right"
      behavior="mobile"
    >
      <!-- drawer content -->
      <Profile />
    </q-drawer>

    <q-page-container class="bg-dark" >
      <router-view class="bg-dark" />
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-9 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="flex justify-between content-center q-py-sm">
            <router-link to="/dashboard" class="flex column">
              <q-icon size="40px" name="dashboard" class="q-mx-md" style="color: #f64c72;" />
              <small class="text-caption text-white text-center text-uppercase"
                >Home</small
              >
            </router-link>
            <router-link to="/withdraw" class="flex column">
              <q-icon size="40px" name="payments" class="q-mx-md" style="color: #f64c72;" />
              <small class="text-caption text-white text-center text-uppercase"
                >Transfer</small
              >
            </router-link>
            <router-link :to="{ name: 'Transaction' }" class="flex column">
              <q-icon name="sync_alt" size="40px" class="q-mx-md" style="color: #f64c72;" />
              <small class="text-caption text-white text-center text-uppercase"
                >Trans</small
              >
            </router-link>
            <!-- <router-link :to="{ name: 'Deposit' }" class="flex column">
              <q-avatar size="30px" class="q-mx-md">
                <img src="../../assets/icons8-deposit.png" />
              </q-avatar>
              <small class="text-caption text-white text-center text-uppercase"
                >deposit</small
              >
            </router-link> -->
            <div class="flex column">
              <div class="q-mx-md">
                <q-icon size="40px" name="more_vert" style="color: #f64c72;" />
                <q-menu :style="{ backgroundColor: '#ccc'}" transition-show="rotate" transition-hide="rotate">
                  <q-list style="min-width: 200px">
                    <q-item clickable>
                      <q-item-section>
                      <router-link :to="{name: 'Security'}" class="text-body1 text-black">
                          Security 
                      </router-link>
                    </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>
                        <router-link :to="{name: 'Verify'}" class="text-body1 text-black">
                          Verify Account
                        </router-link>
                      </q-item-section>
                    </q-item>
                    <!-- <q-item clickable>
                      <router-link :to="{name: 'TradeCenter'}" class="text-body1 text-black">
                          Trade Center
                        </router-link>
                    </q-item> -->
                    <!-- <q-item clickable>
                      <router-link :to="{name: 'CopyTrade'}" class="text-body1 text-black">
                          Copy Trading
                        </router-link>
                    </q-item> -->
                    <q-separator />
                    <q-item clickable @click="logoutUser">
                      <q-item-section>
                          Logout
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </div>
              <small class="text-caption text-center text-uppercase"
                >More</small
              >
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import { ref, defineComponent, onMounted } from "vue";
import { TickerTape } from "vue-tradingview-widgets";
import Profile from "../../components/profile.vue";
import { userLogout } from "../../stores/logout";
import { notification } from "../../stores/notification";

export default defineComponent({
  components: { TickerTape, Profile },
  setup() {
    const rightDrawerOpen = ref(false);
    const appName = import.meta.env.VITE_APP_NAME;
    const {alert} = notification()
    const { logout } = userLogout()

    const logoutUser = () => {
      logout((data) => {
        alert("positive", "check", data.success)
        (location.href = location.protocol + "//" + location.host + "/login")
      })
    }

    return {
      logoutUser,
      rightDrawerOpen,
      appName,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
<style scoped>
  a{
    text-decoration: none;
  }
</style>
