<template>
  <q-page>
    <div
      v-for="i in traders"
      :key="i.name"
      class="row"
      style="max-width: 768px; margin: auto"
    >
      <div class="col-12">
        <q-card class="bg-grey-7 q-mx-md q-my-md">
          <div class="flex justify-between items-center q-mx-sm q-py-sm">
            <div class="flex justify-between items-center">
              <div class="">
                <q-avatar size="80px" class="q-mx-sm">
                  <img
                    :src="
                      'data:' +
                      i.img.contentType +
                      ';base64,' +
                      i.img.data.toString('base64')
                    "
                  />
                </q-avatar>
              </div>
              <div class="">
                <span class="text-body1 text-green-13 text-weight-bold">{{
                  i.name
                }}</span>
                <br />
                <span class="text-body1 text-white">{{ i.being }}</span>
                <br />
                <span class="text-body1 text-white"
                  >{{ i.winRate }}% Win Rate</span
                >
                <br />
                <span class="text-body1 text-white"
                  >{{ i.profit }}% Profit Share</span
                >
                <br />
              </div>
            </div>
            <div class="q-my-md">
              <q-btn
                :class="{ 'text-white bg-amber-13': users === i.name }"
                :disable="users === i.name"
                class="text-white bg-green-13 q-mx-sm"
                @click="copyTrade(i.name)"
              >
                {{ users === i.name ? "Copying" : "Copy" }}</q-btn
              >
              <q-btn
                :class="{ 'text-white bg-red-13': users === i.name, 'hidden': users !== i.name }"
                class="text-white"
                @click="stopCopyTrade(i.name)"
              >
                Stop </q-btn
              >
            </div>
          </div>
        </q-card>
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
import { onMounted, ref } from "vue";
import axios from "redaxios";
import { notification } from "../../stores/notification";
import { currentUser } from "../../stores/user";

const traders = ref([]);
const { getUser } = currentUser();
const bar = ref(null);
const notify = notification();
const users = ref({});

const f = async (data) => {
  const user = await getUser();
  users.value = user.copyTrade.name;
};

const copyTrade = async (name) => {
  const barRef = bar.value;
  const user = await getUser();
  if(user.copyTrade.copying === true){
    return notify.alert("negative", "report_problem", "You are curently copying " + user.copyTrade.name + " trade");
  }
  const { data } = await axios.post(
    `${import.meta.env.VITE_CONNECTION_URL}/user/copy-trader-trade`,
    {
      name,
      id: user._id,
    }
  );
  const { error, success } = data;
  barRef.start();
  if (error) {
    barRef.stop();
    return notify.alert("negative", "report_problem", error);
  }

  if (success) {
    users.value = name
    barRef.stop();
    return notify.alert("positive", "check", success);
  }
};

const stopCopyTrade = async (name) => {
  const barRef = bar.value;
  const user = await getUser();
  const { data } = await axios.post(
    `${import.meta.env.VITE_CONNECTION_URL}/user/stop-copy-trade`,
    {
      name,
      id: user._id,
    }
  );
  const { error, success } = data;
  barRef.start();
  if (error) {
    barRef.stop();
    return notify.alert("negative", "report_problem", error);
  }

  if (success) {
    users.value = "stop"
    barRef.stop();
    return notify.alert("positive", "check", success);
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_CONNECTION_URL}/user/get-all-copy-treders`
    );
    traders.value = data;
    f(data);
  } catch (error) {
    console.log(error);
  }
});
</script>
