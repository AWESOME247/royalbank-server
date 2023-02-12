<template>
  <q-page>
    <div style="max-width: 600px; margin: auto">
      <h4 class="text-white q-mx-lg">Admin</h4>
      <!-- <router-link :to="{ name: 'CreateCopyTrader' }">
        <q-btn class="q-mx-md" color="red-8" label="Create A Copy Trader" />
      </router-link> -->
      <q-card class="bg-grey-8 row q-mx-md q-my-lg q-px-md q-py-lg text-white">
        <table>
          <thead>
            <th class="text-center text-warning">Name & Email</th>
            <th class="text-center q-px-lg text-warning">Edit</th>
          </thead>
          <tbody>
            <tr class="q-my-lg" v-for="users in user" :key="users">
              <td class="text-center text-white q-py-md text-uppercase">
                {{ users.fullname }}
                <br />
                <small>
                  {{ users.email }}
                </small>
              </td>
              <td class="text-center text-success q-py-md text-uppercase">
                <q-btn @click="editUser(users.email)" class="bg-positive">
                  Edit
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    <strong
                      >Edit <q-icon color="amber-8" name="person"
                    /></strong>
                  </q-tooltip>
                </q-btn>
              </td>
            </tr>
          </tbody>
        </table>
        <q-dialog v-model="icon">
          <q-card class="bg-grey-8 text-white">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">Update User</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
              <div class="row">
                <div class="col-12">
                  <p class="text-h6">
                    Name:
                    <span class="text-positive text-uppercase">{{
                      fullname
                    }}</span>
                  </p>
                </div>
                <div class="col-12">
                  <q-select
                    outlined
                    v-model="trType"
                    :options="transType"
                    label="Transaction Type"
                    label-color="grey-12"
                  >
                    <template v-slot:prepend>
                      <q-icon name="payment" color="grey-12" />
                    </template>
                  </q-select>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    Active Balance:
                    <span class="text-h6 text-warning"
                      >${{ amount.toFixed(2) }}</span
                    >
                  </p>
                  <q-input
                    outlined
                    v-model="balance"
                    type="number"
                    label-color="grey-12"
                    label="Active Balance"
                  >
                    <template v-slot:append>
                      <q-icon class="cursor-pointer" color="grey-12" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    Active Earnings:
                    <span class="text-h6 text-warning"
                      >${{ profit.toFixed(2) }}</span
                    >
                  </p>
                  <q-input
                    outlined
                    v-model="editProfit"
                    type="number"
                    label-color="grey-12"
                    label="Active Earnings"
                  >
                    <template v-slot:append>
                      <q-icon class="cursor-pointer" color="grey-12" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 q-my-md">
                  <q-btn
                    :disable="disable"
                    @click="submit"
                    class="full-width bg-positive"
                    label="Update Balance"
                  />
                </div>
                <div class="col-12 q-my-lg">
                  <q-separator color="white" />
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    User verification accept or decline
                    <br />
                    Current Status:
                    <span
                      :class="{ 'text-green-11': verify }"
                      class="text-red-11"
                      >{{ verify ? "Verified" : "Not Verified" }}</span
                    >
                  </p>
                  <div class="col-12">
                    <q-select
                      outlined
                      v-model="very"
                      :options="verification"
                      label="Verification"
                      label-color="grey-12"
                    >
                      <template v-slot:prepend>
                        <q-icon name="payment" color="grey-12" />
                      </template>
                    </q-select>
                  </div>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">Account level: {{ lev }}</p>
                  <div class="col-12">
                    <q-select
                      outlined
                      v-model="accLevel"
                      :options="level"
                      label="Acount Level"
                      label-color="grey-12"
                    >
                      <template v-slot:prepend>
                        <q-icon name="payment" color="grey-12" />
                      </template>
                    </q-select>
                  </div>
                </div>
                <div class="col-12 q-my-md">
                  <q-btn
                    :disable="disable"
                    @click="verifyUser"
                    class="full-width bg-positive"
                    label="Submit"
                  />
                </div>
                <div class="col-12 q-my-lg">
                  <q-separator color="white" />
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">ID Front</p>
                  <q-img
                    :src="'data:' + CType + ';base64,' + image(IDFront)"
                    alt="thumb_nails"
                    height="250"
                    class="full-width"
                  />
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">ID Back</p>
                  <q-img
                    :src="'data:' + BType + ';base64,' + image(IDBack)"
                    alt="thumb_nails"
                    height="250"
                    class="full-width"
                  />
                </div>
                <div class="col-12 q-my-lg">
                  <q-separator color="white" />
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    Date Of Birth: {{ eUsr.dateOfBirth }}
                  </p>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">Sex: {{ eUsr.sex }}</p>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">Country: {{ eUsr.country }}</p>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">OTP: {{ eUsr.TFOPT }}</p>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    Phone Number: {{ eUsr.phone }}
                  </p>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    Marital Status: {{ eUsr.marital }}
                  </p>
                </div>
                <div class="col-12">
                  <p class="text-body1 q-my-md">
                    Home Address: {{ eUsr.homeAddress }}
                  </p>
                </div>
                <div class="col-12 q-my-md">
                  <q-btn
                    :disable="disable"
                    @click="deleteUsers(userID)"
                    class="full-width bg-negative"
                    label="Delete User"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-card>
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
<script setup>
import { ref } from "vue";
import { currentUser } from "../../stores/admin/getUsers";
import { findUser } from "../../stores/admin/findUser";
import { update } from "../../stores/admin/update";
import { userDelete } from "../../stores/admin/delete-user";
import { notification } from "../../stores/notification";
import axios from "redaxios";
const notify = notification();

const { getUsers } = currentUser();
const { foundUser } = findUser();
const { updateUser } = update();
const { deleteUser } = userDelete();
const icon = ref(false);
const fullname = ref("");
const amount = ref("");
const editProfit = ref("");
const balance = ref("");
const profit = ref("");
const IDFront = ref("");
const CType = ref("");
const BType = ref("");
const IDBack = ref("");
const verify = ref("");
const bar = ref(null);
const user = ref([]);
const id = ref("");
const disable = ref(false);
const userID = ref("");
const trType = ref("");
const eUsr = ref("");
const very = ref("");
const accLevel = ref("");
const lev = ref("");
const display = ref(false);

const getUser = async () => {
  user.value = await getUsers();
};

const editUser = async (ctx) => {
  const barRef = bar.value;
  disable.value = true;
  const data = await foundUser(ctx);
  eUsr.value = data;
  if (data) {
    disable.value = false;
    barRef.stop();
    icon.value = true;
    fullname.value = data.fullname;
    amount.value = data.balance;
    profit.value = data.profit;
    id.value = data._id;
    userID.value = data._id;
    lev.value = data.level;
    verify.value = data.isVerify;
    IDFront.value = data.idFront.data.data;
    CType.value = data.idFront.contentType;
    BType.value = data.idBack.contentType;
    IDBack.value = data.idBack.data.data;
  }
};

function image(buffer) {
  buffer = new Uint8Array(buffer);
  return btoa(
    buffer.reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
}

const deleteUsers = (id) => {
  console.log(id);
  const barRef = bar.value;
  barRef.start();
  disable.value = true;

  deleteUser({ id }, ({ success, error }) => {
    if (error) {
      disable.value = false;
      barRef.stop();
      return notify.alert("negative", "report_problem", error);
    }
    if (success) {
      disable.value = false;
      barRef.stop();
      return (
        notify.alert("positive", "check", success), window.location.reload()
      );
    }
  });
};

const verifyUser = async () => {
  if (!accLevel.value)
    return notify.alert(
      "negative",
      "report_proble",
      "No account level selected!"
    );

  const {
    data: { success },
  } = await axios.post(
    import.meta.env.VITE_CONNECTION_URL + "/user/verification/update",
    {
      verify: very.value
        ? very.value
        : verify.value === true
        ? "Accept Verification"
        : "Decline Verification",
      level: accLevel.value,
      id: id.value,
    }
  );
  if (success) return notify.alert("positive", "check", success);
};

const submit = () => {
  const barRef = bar.value;

  barRef.start();
  if (!trType.value)
    return alert("Please select the type of transaction you want!");
  updateUser(
    {
      balance: balance.value ? balance.value : amount.value,
      botSpeed: 1,
      profit: editProfit.value ? editProfit.value : profit.value,
      ID: id.value,
      type: trType.value,
    },
    (data) => {
      const { error, success } = data;
      if (error) {
        barRef.stop();
        return notify.alert("negative", "report_problem", error);
      }
      if (success) {
        barRef.stop();
        return notify.alert("positive", "check", success);
      }
    }
  );
};

const transType = ["Deposit", "Profit"];
const verification = ["Accept Verification", "Decline Verification"];
const level = ["Level 1", "Level 2", "Level 3", "Level 4"];

getUser();
</script>
<style scoped>
tr:nth-child(even) {
  background: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  inline-size: 1px;
  overflow: hidden;
}

thead {
  border-radius: 5px;
}

thead th {
  padding: 0.3rem 0.1rem;
}

a {
  text-decoration: none;
}
</style>
