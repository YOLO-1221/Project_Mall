<template>
  <div id="app">
    <router-view></router-view>
    <main-tabbar class="main-tabbar"></main-tabbar>
  </div>
</template>

<script>
  import MainTabbar from "components/content/mainTabbar/MainTabbar";

  export default {
    name: 'App',
    components: {
      MainTabbar,
    }
  }
</script>

<style>
  @import "assets/css/base.css";

  /*.main-tabbar {*/
  /*  z-index: 999;*/
  /*}*/
</style>
