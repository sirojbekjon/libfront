<template>
  <div>
  <MyLogin />
  <Statistic v-if="$store.state.token==='token'"/>
  </div>
</template>

<script>
  // import SideBar from '../components/SideBar'
  import MyLogin from "./MyLogin";
import Statistic from "./Statistic";
  export default {
    name: 'Home',
 data () {
      return {
        width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      fill: false,
      type: 'trend',
      autoLineWidth: false,
        orders: [
          {
            price: 89.03,
            amount: 0.15,
          },
          {
            price: 94.03,
            amount: 0.18,
          },
           {
            price: 92.03,
            amount: 0.22,
          },
           {
            price: 94.03,
            amount: 0.18,
          },
           {
            price: 33.03,
            amount: 0.19,
          },
        ],
      }
    },
    components: {
       MyLogin, Statistic
    },
  }
</script>
<style scoped>
</style>
