<template>
  <q-page>
    <div style="max-width: 600px; height: 100vh; margin: auto">
      <q-card class="bg-grey-8 q-mx-md q-my-lg q-px-md text-white">
        <q-form @submit.prevent="submit" class="row">
          <div class="col-12 q-my-md">
            <q-input
              v-model="search"
              bottom-slots
              label="Enter account number or email"
              stack-label
              label-color="white"
              color="white"
              class="text-white"
            >
              <template v-slot:append>
                <q-icon
                  @click="submit"
                  class="cursor-pointer text-white"
                  name="search"
                />
              </template>
            </q-input>
          </div>
        </q-form>
      </q-card>
      <q-card
        v-show="show"
        class="bg-grey-8 q-mx-md q-my-lg q-px-md text-white text-center"
      >
        <div class="flex justify-between items-center q-py-md">
          <div class="text-white text-center">
            <span style="font-size: 24px">{{ name }}</span>
            <br />
            <small>{{ email }}</small>
          </div>
          <div class="">
            <q-btn label="Send" @click="icon = true" color="positive" />
          </div>
        </div>
      </q-card>
      <q-card
        v-show="showF"
        class="bg-grey-8 q-mx-md q-my-lg q-px-md text-white text-center"
      >
        <h5 class="q-pt-md">No Result Found!</h5>
        <q-icon size="200px" name="search" />
      </q-card>
    </div>

    <q-dialog v-model="icon">
      <q-card class="bg-grey-8 text-white">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Transfer</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="confirmTrans = true" class="row bg-grey-8">
            <h6>You're about to transfer money to {{ name }}</h6>
            <div class="col-12 q-mb-md">
              <q-input
                outlined
                lazy-rules
                label-color="white"
                class="text-white"
                v-model="amt"
                required
                unmasked-value
                label="Amount"
                prefix="$"
              >
                <template v-slot:prepend>
                  <q-icon color="white" name="payments" />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-btn
                type="submit"
                label="submit"
                color="positive"
                class="full-width q-my-md"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmTrans">
      <q-card class="bg-grey-8 text-white">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Transfer</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <p>
            You're about to transfer ${{ amt }} to
            <span class="font-weigth-bold text-uppercase">{{ name }}</span
            >, click the confirm button below to execute this transaction.
          </p>
          <div class="flex justify-between">
            <q-btn
              color="negative"
              @click="(confirmTrans = false), (icon = false)"
              label="Cancel"
            />
            <q-btn color="positive" @click="send" label="Confirm" />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import axios from "redaxios";
import { notification } from "../../stores/notification";
import { currentUser } from "../../stores/user";
const { alert } = notification();
const { getUser } = currentUser();

const name = ref("");
const email = ref("");
const id = ref("");
const myID = ref("");
const show = ref(false);
const showF = ref(true);
const search = ref("");
const userBal = ref("");
const icon = ref(false);
const confirmTrans = ref(false);
const amount = ref("");
const amt = ref("");

const send = async () => {
  if (parseInt(amt.value) > parseInt(amount.value)) {
    return alert("negative", "report_problem", "Insuficent fund!");
  }
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_CONNECTION_URL + "/user/send-money",
      { myID: myID.value, id: id.value, amt: amt.value, balance: amount.value, userBal: userBal.value }
    );

    if (data.success) {
      confirmTrans.value = false;
      icon.value = false
      return alert("positive", "check", data.success);
    }
  } catch (error) {
    console.log(error);
  }
};

const submit = async () => {
  try {
    const { data } = await axios.post(
      import.meta.env.VITE_CONNECTION_URL + "/user/inter-transfer",
      { search: search.value }
    );
    name.value = data.fullname;
    email.value = data.email;
    userBal.value = data.balance;
    id.value = data._id;
    if (data.email) {
      showF.value = false;
      show.value = true;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  const user = await getUser();
  myID.value = user._id;
  amount.value = user.balance;
})
</script>
<style scoped>
a {
  text-decoration: none;
  color: #fff;
}
</style>
