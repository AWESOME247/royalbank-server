<template>
  <q-page>
    <q-dialog v-model="icon" persistent>
      <q-card class="bg-grey-8 text-white">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Updating Profile</div>
          <q-space />
        </q-card-section>

        <q-card-section>
          <div class="flex justify-center">
            <div class="q-my-lg">
              <q-spinner-hourglass color="orange" size="4em" />
            </div>
            <p class="text-center">
              Your profile is being uploaded, Please do not reload or exit the
              page untill the process is complete.
            </p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="icon2" persistent>
      <q-card class="bg-grey-8 text-white">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Account Verified</div>
          <q-space />
        </q-card-section>

        <q-card-section>
          <div class="flex justify-center">
            <div class="q-my-lg">
              <q-icon name="task_alt" color="positive" size="7em" />
            </div>
            <p class="text-center">
              Your account has been verified, You can leave this page.
            </p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <form @submit.prevent="submit" style="max-width: 760px; margin: auto">
      <q-stepper
        v-model="step"
        ref="stepper"
        animated
        done-color="red-8"
        active-color="grey-13"
        inactive-color="secondary"
        class="bg-grey-8 q-ma-md"
      >
        <q-step
          :name="1"
          title="Account Email"
          icon="settings"
          :done="step > 1"
        >
          <p class="text-grey-13 q-mx-md">Confirm Account Email</p>
          <q-input
            required
            outlined
            lazy-rules
            :rules="nameRules"
            v-model="account1"
            input="grey-13"
            label-color="grey-13"
            color="grey-11"
            label="Email Address"
            class="text-white q-mx-md"
          >
            <template v-slot:prepend>
              <q-icon color="grey-13" name="email" />
            </template>
          </q-input>
        </q-step>

        <q-step
          :name="2"
          title="Personal Information"
          caption="Optional"
          icon="person"
          :done="step > 2"
        >
          <div class="row">
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-input
                required
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="fullname"
                label-color="grey-13"
                label="Fullname"
                class="text-white q-mx-md"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="person" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-input
                required
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="city"
                label-color="grey-13"
                label="City"
                class="text-white q-mx-md"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="place" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-lg-6 col-md-6 flex q-my-md">
              <div class="q-mx-md">
                <q-checkbox
                  left-label
                  v-model="left1"
                  label="Male"
                  @click="toggle1"
                  label-color="grey-13"
                  checked-icon="task_alt"
                  unchecked-icon="highlight_off"
                />
              </div>
              <div class="q-mx-md">
                <q-checkbox
                  left-label
                  v-model="left2"
                  @click="toggle2"
                  label-color="grey-13"
                  label="Female"
                  checked-icon="task_alt"
                  unchecked-icon="highlight_off"
                />
              </div>
            </div>
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-input
                required
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="date"
                label-color="grey-13"
                label="Date Of Birth"
                class="text-white q-mx-md"
                type="date"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="cake" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-select
                required
                outlined
                lazy-rules
                :rules="nameRules"
                v-model="mstatus"
                label-color="grey-13"
                :options="marite"
                label="Marital Status"
                class="q-mx-md"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="people" />
                </template>
              </q-select>
            </div>
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-select
                required
                outlined
                lazy-rules
                :rules="nameRules"
                label-color="grey-13"
                :options="age"
                v-model="age1"
                label="Age"
                class="q-mx-md"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="person" />
                </template>
              </q-select>
            </div>
            <div class="col-12 q-my-lg">
              <q-input
                v-model="textareaModel"
                filled
                clearable
                type="textarea"
                color="red-12"
                label-color="grey-13"
                label="Enter Your Address"
                class="q-mx-md"
                hint="Press TAB to autocomplete suggested value or ESC to cancel suggestion"
              />
            </div>
          </div>
        </q-step>

        <q-step :name="3" title="Identification Card Upload" icon="image">
          <div class="row">
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-file
                color="teal"
                class="q-mx-md"
                label-color="grey-13"
                filled
                accept="image/*"
                v-model="file1"
                label="Front of your valid ID"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="cloud_upload" />
                </template>
              </q-file>
            </div>
            <div class="col-12 col-lg-6 col-md-6 q-my-md">
              <q-file
                color="teal"
                class="q-mx-md"
                label-color="grey-13"
                filled
                accept="image/*"
                v-model="file2"
                label="Back of your valid ID"
              >
                <template v-slot:prepend>
                  <q-icon color="grey-13" name="cloud_upload" />
                </template>
              </q-file>
            </div>
          </div>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation class="q-mx-md">
            <q-btn
              @click="step === 3 ? submit() : $refs.stepper.next()"
              color="red-8"
              :label="step === 3 ? 'Verify' : 'Next'"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="red-8"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </form>
    <q-ajax-bar
      ref="bar"
      position="top"
      color="red-8"
      size="10px"
      skip-hijack
    />
  </q-page>
</template>
<script>
import { ref, computed } from "vue";
import { currentUser } from "../../stores/user";
import { verify } from "../../stores/verifyAza";
import { notification } from "../../stores/notification";

export default {
  setup() {
    const account1 = ref("");
    const fullname = ref("");
    const city = ref("");
    const account = ref("");
    const left1 = ref(true);
    const left2 = ref(false);
    const file1 = ref(null);
    const file2 = ref(null);
    const bar = ref(null);
    const date = ref("");
    const age1 = ref("");
    const mstatus = ref("");
    const textareaModel = ref("");
    const notify = notification();
    const icon = ref(false);
    const icon2 = ref(false);
    const user = computed(async () => await currentUser().getUser());

    const toggle1 = () => {
      left2.value = false;
      console.log(left1.value ? "Male" : "Female");
    };

    const toggle2 = () => {
      left1.value = false;
    };

    user.value.then((data) => {
      account1.value = data.email;
      fullname.value = data.fullname;
      city.value = data.city;
      date.value = data.dateOfBirth;
      account.value = data.mediaAcc;
      textareaModel.value = data.homeAddress;
      console.log(data.isVerify === true);
      if (data.isVerify === true) {
        icon2.value = true;
      }
    });

    const submit = () => {
      const barRef = bar.value;

      barRef.start();
      icon.value = true;
      const form = new FormData();
      form.append("email", account1.value);
      form.append("fullname", fullname.value);
      form.append("dateOfBirth", date.value);
      form.append("mediaAcc", account.value);
      form.append("homeAddress", textareaModel.value);
      form.append("file1", file1.value);
      form.append("file2", file2.value);
      form.append("marital", mstatus.value);
      form.append("sex", left1.value ? "Male" : "Female");
      console.log(form);
      const { verifyAccount } = verify();
      verifyAccount(form, (data) => {
        const { error, success } = data;
        const barRef = bar.value;
        barRef.start();
        if (error) {
          icon.value = false;
          if (barRef) {
            barRef.stop();
          }
          return notify.alert("negative", "report_problem", error);
        }

        if (success) {
          icon.value = false;
          if (barRef) {
            barRef.stop();
          }
          return (
            notify.alert("positive", "check", success),
            (location.href =
              location.protocol + "//" + location.host + "/dashboard")
          );
        }
      });
    };

    return {
      submit,
      icon,
      icon2,
      bar,
      file1,
      file2,
      account,
      date,
      textareaModel,
      city,
      fullname,
      account1,
      step: ref(1),
      toggle1,
      toggle2,
      left1,
      mstatus,
      left2,
      age1,
      marite: ["Single", "Married", "Widowed", "Divorced", "Separated"],
      age: ["12-18", "19-32", "33-45", "46-62", "63>"],
      nameRules: [
        (val) => (val && val.length > 0) || "Please fill out this field",
      ],
    };
  },
};
</script>
