<template>
  <v-app>
    <SideBar />
    <v-main class="styleapp">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SideBar from "./components/SideBar";
export default {
  components:{
    SideBar
  },
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
.styleapp{
  background-color: black;
}

</style>
