<template>
  <q-page>
    <div class="bg-dark" style="height: 100vh; widows: 100%">
      <div class="flex justify-center content-center" style="height: 80%">
        <q-card class="bg-dark" style="height: 200px; width: 200px;">
          <q-img src="../assets/logo.png" />
        </q-card>
      </div>
      <div class="row text-center">
        <div class="col-12">
          <router-link to="/register">
            <q-btn
              class="q-mb-md"
              unelevated
              elevated
              rounded
              color="pink-8"
              label="Get Started?"
              size="17px"
            />
          </router-link>
        </div>
        <div class="col-12 q-mb-lg">
          <router-link to="/login">
            <q-btn class="text-white" label="Login" />
          </router-link>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style scoped>
a {
  text-decoration: none;
}
</style>
