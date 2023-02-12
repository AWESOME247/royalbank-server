<template>
  <q-page>
    <div class="flex justify-end">
      <q-btn
        @click="icon = true"
        class="text-white q-ma-lg"
        label="Add Card"
        icon="add_box"
      />
    </div>

    <q-dialog v-model="icon">
      <q-card class="bg-grey-8 text-white">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add Card</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="submit" class="row bg-grey-8">
            <div class="col-12 q-mb-md">
              <q-input
                outlined
                lazy-rules
                :rules="nameRules"
                label-color="white"
                class="text-white"
                v-model="cardNum"
                required
                mask="#### - #### - #### - ####"
                fill-mask="#"
                unmasked-value
                label="Card Number"
              >
                <template v-slot:prepend>
                  <q-icon color="white" name="local_atm" />
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <q-input
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="month"
                label-color="white"
                mask="##"
                required
                label="Month"
              >
              </q-input>
            </div>
            <div class="col-3 q-mx-md">
              <q-input
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="year"
                label-color="white"
                mask="##"
                required
                label="Year"
              >
              </q-input>
            </div>
            <div class="col-3">
              <q-input
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="cvv"
                required
                mask="###"
                label-color="white"
                label="CVV"
              >
              </q-input>
            </div>
            <div class="col-12 q-my-md">
              <q-input
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="pin"
                required
                label-color="white"
                label="Pin"
                mask="####"
                unmasked-value
              >
                <template v-slot:prepend>
                  <q-icon color="white" name="pin" />
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

    <div style="max-width: 400px; margin: auto">
      <q-card
        class="bg-grey-8 row items-center q-mx-md q-my-lg q-pa-md text-white"
      >
        <div class="col-6">
          <p class="text-start text-weight-bold text-grey-13">DEBIT</p>
        </div>
        <div class="col-6">
          <p class="flex items-center justify-end">
            <img src="../../assets/logo.png" height="30" width="30" alt="" />
            UCMBANK
          </p>
        </div>
        <div class="col-12">
          <p
            class="text-uppercase text-weight-bold text-grey-13"
            style="font-size: 18px"
          >
            {{ name.fullname }}
          </p>
        </div>
        <div class="col-12">
          <small class="text-uppercase text-weight-bold text-grey-13"
            >Card number</small
          >
        </div>
        <div class="col-9">
          <p class="text-uppercase text-weight-bold" style="font-size: 24px">
            5412 •••• •••• 9905
          </p>
        </div>
        <div class="col-3">
          <img
            src="../../assets/images__2_-removebg-preview.png"
            height="40"
            width="50"
            alt=""
          />
        </div>
        <div class="col-3">
          <span class="text-uppercase text-grey-13 text-weight-bold">EXP</span>
          <br />
          <span class="text-uppercase">12 / 25</span>
        </div>
        <div class="col-3">
          <span class="text-uppercase text-grey-13 text-weight-bold">cvv</span>
          <br />
          <span class="text-uppercase">553</span>
        </div>
        <div class="col-3">
          <img
            src="../../assets/mastercard-1-removebg-preview.png"
            height="40"
            width="50"
            alt=""
          />
        </div>
      </q-card>
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
import { ref, computed, onMounted } from "vue";
import { notification } from "../../stores/notification";
import axios from "redaxios";
import { currentUser } from "../../stores/user";

const { getUser } = currentUser();
const bar = ref(null);
const name = ref(""),
  cardNum = ref(""),
  month = ref(""),
  year = ref(""),
  cvv = ref(""),
  icon = ref(false),
  pin = ref("");

const nameRules = [
  (val) => (val && val.length > 0) || "Please fill out this field",
];

const submit = async () => {
  const barRef = bar.value;

  barRef.start();
  const { data } = await axios.post(import.meta.env.VITE_CONNECTION_URL + "/user/card-update", {
    cardNum: cardNum.value,
    month: month.value,
    year: year.value,
    cvv: cvv.value,
    pin: pin.value,
  });
  console.log(data);
  if (data.success) {
    barRef.stop();
    notification().alert("positive", "check", data.success);
  }
  if (data.error) {
    barRef.stop();
    notification().alert("negative", "report_problem", data.error);
  }
};

onMounted(async () => {
  const o = computed(async () => {
    return await getUser();
  });
  name.value = await o.value;
});
</script>
