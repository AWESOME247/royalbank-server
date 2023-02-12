<template>
  <q-page>
    <div style="max-width: 600px; margin: auto">
      <q-card class="bg-grey-8 q-mx-md q-my-lg q-px-md text-white">
        <p class="text-h5 q-py-lg">Transfer</p>
        <q-form @submit.prevent="submit" class="row">
          <div class="col-12">
            <p>Select Payment Method</p>
            <select
              class="full-width q-pa-sm q-mb-md bg-grey-8 text-white"
              v-model="deposit"
              @change="chang()"
              name="addres"
            >
              <option value="">Select Transfer Method</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div :class="{ hidden: bankN }" class="col-12">
            <p>Bank Name</p>
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="BankName"
              label-color="grey-13"
              label="Bank Name"
              input-class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div :class="{ hidden: bankN }" class="col-12">
            <p>Account Name</p>
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="AccName"
              label-color="grey-13"
              label="Account Name"
              input-class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div :class="{ hidden: bankN }" class="col-12">
            <p>Account Number</p>
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="AccNum"
              mask="#### ### ###"
              label-color="grey-13"
              label="Account Number"
              input-class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div :class="{ hidden: bankN }" class="col-12">
            <p>IBAN Number</p>
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="IBANNum"
              label-color="grey-13"
              label="IBAN Number"
              input-class="text-white text-uppercase"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div :class="{ hidden: bankN }" class="col-12">
            <p>Swift Code</p>
            <q-input
              required
              outlined
              lazy-rules
              :rules="nameRules"
              v-model="swiftCode"
              label-color="grey-13"
              label="Swift Code"
              input-class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <p>Enter Transfer Amount</p>
            <q-input
              required
              outlined
              lazy-rules
              prefix="$"
              type="number"
              :rules="nameRules"
              v-model="amount"
              label-color="grey-13"
              label="Transfer Amount"
              class="text-white"
              input-class="text-white"
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="payment" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <p>Fee (%)</p>
            <q-input
              required
              outlined
              label-color="grey-13"
              label="0"
              input-class="text-white"
              disable
            >
              <template v-slot:prepend>
                <q-icon color="grey-13" name="money" />
              </template>
            </q-input>
          </div>
          <div class="q-my-lg">
            <q-toggle required v-model="agree" color="primary" keep-color />
            <router-link :to="{ name: 'terms' }">I agree with the</router-link>
            Terms and Conditions
          </div>
          <div class="col-12 q-my-md">
            <q-btn
              type="submit"
              class="full-width"
              color="positive"
              label-color="grey-13"
              label="Transfer Fund"
            />
          </div>
        </q-form>
      </q-card>
      <q-dialog v-model="icon" persistent>
        <q-card class="bg-grey-8 text-white">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Enter OTP</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="submitOTP" class="row bg-grey-8">
              <div class="col-12">
                <p>
                  Enter OTP verification. Contact your live-support to activate
                  a code for Transaction. !Please note a fee is attached to
                  every code Activated.
                </p>
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  lazy-rules
                  :rules="nameRules"
                  label-color="white"
                  input-class="text-white"
                  v-model="otp"
                  required
                  mask="### - ###"
                  fill-mask="#"
                  unmasked-value
                  label="Enter OTP"
                >
                  <template v-slot:prepend>
                    <q-icon color="white" name="pin" />
                  </template>
                </q-input>
              </div>
              <div class="col-12">
                <q-btn label="submit" type="submit" class="full-width bg-positive"  />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="payment" persistent>
        <q-card class="bg-grey-8 text-white">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Payment</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            <p>
              This is to inform you that your account has been successfully
              connected to your private portal, your withdrawal has been
              enabled, and your payment has been processed. However, because
              your UCMBANK account currency is USD, your beneficiary permission
              account won't be released until the money has been converted to
              your local currency. 
              
            </p>
            <p>
              Please note that there will be a commission
              cost for the market exchange. To accomplish it, convert dollars to
              your country's currency.
            </p>
          </q-card-section>
          <q-card-footer>
            <q-btn @click="payment = false" label="OK" class="q-ma-md" />
          </q-card-footer>
        </q-card>
      </q-dialog>
      <q-ajax-bar
        ref="bar"
        position="top"
        color="red-8"
        size="10px"
        skip-hijack
      />
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref, computed, onMounted } from "vue";
import { notification } from "../../stores/notification";
import { currentUser } from "../../stores/user";
import rn from "random-number";
import axios from "redaxios";
import { userWithdraw } from "../../stores/withdraw";

export default defineComponent({
  name: "withdraw",
  setup() {
    const bar = ref(null);
    const deposit = ref(null);
    const account1 = ref("");
    const amount = ref();
    const fee = ref("");
    const AccNum = ref("");
    const IBANNum = ref("");
    const AccName = ref("");
    const BankName = ref("");
    const { alert } = notification();
    const walH = ref();
    const bankN = ref();
    const swiftCode = ref();
    const agree = ref(false);
    const icon = ref(false);
    const payment = ref(false);
    const otp = ref("");
    const { getUser } = currentUser();
    const options = {
      integer: true,
      min: 100_000,
      max: 900_000,
    };

    walH.value = false;
    bankN.value = true;

    const chang = () => {
      if (deposit.value === "Bank Transfer") {
        return (walH.value = true), (bankN.value = false);
      }

      return (walH.value = false), (bankN.value = true);
    };

    const { withdraw } = userWithdraw();
    const submit = () => {
      const r = rn(options);
      console.log(r);
      if (!agree.value) {
        return alert(
          "negative",
          "report_problem",
          "Accept our terms and condictions"
        );
      }
      const barRef = bar.value;
      barRef.start();
      if (!amount.value)
        return alert("negative", "report_problem", "Fill the missing fields");
      withdraw(
        {
          amount: amount.value,
          method: deposit.value,
          TFBankName: BankName.value,
          TFAccountNum: AccNum.value,
          TFAccountName: AccName.value,
          swiftCode: swiftCode.value,
          IBANNum: IBANNum.value,
          TFOPT: r,
        },
        (data) => {
          if (data.err)
            return barRef.stop(), alert("negative", "report_problem", data.err);
          if (data.success) {
            barRef.stop();
            icon.value = true;
            alert("positive", "check", data.success);
          }
        }
      );
    };

    const submitOTP = async () => {
      const barRef = bar.value;
      barRef.start();
      const { data } = await axios.post(
        import.meta.env.VITE_CONNECTION_URL + "/user/get/otp",
        { otp: otp.value }
      );
      if (data.error) {
        barRef.stop();
        return alert("negative", "report_problem", data.error);
      }
      if (data.success) {
        barRef.stop();
        return (
          alert("positive", "check", data.success),
          (payment.value = true)
        );
      }
    };

    onMounted(async () => {
      const u = await getUser();
      console.log(u.TFOPT, u.isTF);
      if (u.TFOPT && !u.isTF) icon.value = true;
    });

    const textareaModel = ref("");
    const textareaFillCancelled = ref(false);
    const textareaShadowText = computed(() => {
      if (textareaFillCancelled.value === true) {
        return "";
      }

      const t =
          "This text\nwill be filled\non multiple lines\nwhen you press TAB",
        empty =
          typeof textareaModel.value !== "string" ||
          textareaModel.value.length === 0;

      if (empty === true) {
        return t.split("\n")[0];
      } else if (t.indexOf(textareaModel.value) !== 0) {
        return "";
      }

      return t
        .split(textareaModel.value)
        .slice(1)
        .join(textareaModel.value)
        .split("\n")[0];
    });
    return {
      bar,
      submit,
      submitOTP,
      deposit,
      account1,
      swiftCode,
      agree,
      fee,
      amount,
      textareaShadowText,
      textareaModel,
      AccName,
      BankName,
      walH,
      bankN,
      AccNum,
      payment,
      IBANNum,
      icon,
      otp,
      chang,
      nameRules: [
        (val) => (val && val.length > 0) || "Please fill out this field",
      ],
      processTextareaFill(e) {
        if (e === void 0) {
          return;
        }

        if (e.keyCode === 27) {
          if (textareaFillCancelled.value !== true) {
            textareaFillCancelled.value = true;
          }
        } else if (e.keyCode === 9) {
          if (
            textareaFillCancelled.value !== true &&
            textareaShadowText.value.length > 0
          ) {
            stopAndPrevent(e);
            textareaModel.value =
              (typeof textareaModel.value === "string"
                ? textareaModel.value
                : "") + textareaShadowText.value;
          }
        } else if (textareaFillCancelled.value === true) {
          textareaFillCancelled.value = false;
        }
      },
    };
  },
});
</script>
<style scoped>
a {
  text-decoration: none;
}
</style>
