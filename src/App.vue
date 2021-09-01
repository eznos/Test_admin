<template>
  <v-app id="app">
    <Navbar />

    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>

    <Footer />
  </v-app>
</template>
<style>
#app {
  background-color: var(--v-background-base);
}
</style>
<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "App",

  components: {
    Navbar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
