


<template>
  <div class="app-container">
    <!-- <h1 class="title">SuperFrog Scheduler</h1> -->
    <h1><router-link class="title" to="/">SuperFrog Scheduler</router-link></h1>
    
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Main from "@/views/Main.vue";


export default {
  name: "App",
  components: {
    Main,
  },
};
</script>

<style>

.title {
  color: white;
}
</style>
