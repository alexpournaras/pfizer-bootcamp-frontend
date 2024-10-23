<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>

import Navbar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
// any js code goes here
</script>

<style scoped>
h1 {
  color: red;
}
</style>