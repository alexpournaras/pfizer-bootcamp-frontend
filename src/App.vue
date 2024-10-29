<template>
  <v-layout>
    <v-app-bar color="white" prominent>
      <v-container class="container navbar-container" max-width="1200px">
        <v-toolbar-title>
          <img class="logo" src="./assets/pfizer-bootcamp.png">
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn @click="goToHome" class="navbar-buttons" variant="text">Home</v-btn>
          <v-btn @click="goToProducts" class="navbar-buttons" variant="text">Products</v-btn>
        </template>
        <template v-else>
          <v-app-bar-nav-icon class="navbar-buttons" variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>

      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
      <v-list>
        <v-list-item @click="goToHome" link title="Home"></v-list-item>
        <v-list-item @click="goToProducts" link title="Products"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
  }),
  methods: {
    goToHome() {
      this.$router.push({
        name: "Home",
      });
    },
    goToProducts() {
      this.$router.push({
        name: "ListProducts",
      });
    },
  }
}
</script>

<style scoped>
.navbar-container {
  display: flex;
}
.logo {
  width: 120px;
  margin-top: 8px;
}
.navbar-buttons {
  height: unset !important;
  font-weight: 600;
}
</style>