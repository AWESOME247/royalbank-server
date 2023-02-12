<template>
  <q-page>
    <div class="flex content-center column justify-center">
      <div class="flex content-center justify-center" style="height: 300px">
        <q-card class="bg-dark q-pa-md" style="margin: auto;">
            <q-icon name="sensor_occupied"  color="white" size="150px" class="q-my-md q-mx-md" />
        </q-card>
      </div>
      <div class="row">
        <div class="col-12">
          <q-card
            class="bg-grey-9 text-white q-my-md"
            v-for="user in user"
            :key="user"
          >
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Fullname:</span>
                  <span
                    class="text-subtitle1 text-h6 text-uppercase text-green-13 q-ml-md"
                  >
                    {{ user.fullname }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Account Num:</span>
                  <span
                    class="text-subtitle1 text-h6 text-uppercase text-green-13 q-ml-md"
                  >
                    {{ user.accountNumber }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Email:</span>
                  <span class="text-subtitle1 text-h6 text-green-13 q-ml-md">
                    {{ user.email }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Mobile:</span>
                  <span class="text-subtitle1 text-h6 text-green-13 q-ml-md">
                    {{ user.phone }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Country:</span>
                  <span class="text-subtitle1 text-h6 text-green-13 q-ml-md">
                    {{ user.country }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Account Status:</span>
                  <span
                    :class="{ 'text-green-13': user.isVerify }"
                    class="text-subtitle1 text-weight-bold text-h6 text-red-8 q-ml-md"
                  >
                    {{ !user.isVerify ? "Not Verified" : "Verified" }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Refferals:</span>
                  <span class="text-subtitle1 text-h6 text-green-13 q-ml-md">
                    {{ user.referred }}<q-icon name="people" size="23px" />
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Account Level:</span>
                  <span :class="{ 'text-amber-8': user.level === 2, 'text-amber-11': user.level === 3, 'text-green-8': user.level === 4 }" class="text-subtitle1 text-h6 text-red-8 text- q-ml-md">
                    {{ user.level }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Refferal Code:</span>
                  <span
                    class="text-subtitle1 text-h6 text-green-13 text- q-ml-md"
                  >
                    {{ user.ref }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item>
            <!-- <q-item clickable v-ripple>
              <q-item-section>
                <q-item-label>
                  <span class="text-h6">Social Media:</span>
                  <span
                    class="text-subtitle1 text-h6 text-green-13 text- q-ml-md"
                  >
                    {{ user.social }}
                  </span>
                </q-item-label>
              </q-item-section>
            </q-item> -->
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import { currentUser } from "../stores/user";
import { verify } from "../stores/verifyAza";  

export default defineComponent({
  name: "Profile",
  setup() {
    const user = ref([]);
    const avatar = ref(null)
    const store = currentUser();
    
    const users = async () => {
      user.value.push(await store.getUser());
    };

    const change = () => {
      const form = new FormData();
      form.append("avatar", avatar.value)
      console.log(avatar);
      // avarta(form, (data) => {
      // })
    }

    onMounted(async () => {
      const c = await store.getUser()
      // if(c.isVerifyEmail === false) {
      //   return location.href = location.protocol + "//" + location.host +"/verify-your-account"
      // }
      users();
      if (!c) {
          location.href = location.protocol + "//" + location.host + "/login";
      }
    });

    return {
      user,
      avatar,
      change
    };
  },
});
</script>
