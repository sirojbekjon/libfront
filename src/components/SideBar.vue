<template>
<nav v-if="$store.state.token==='token'">
  <v-navigation-drawer

      app
      dark
      color="black"
    >
       <div class="text-center mt-5">
           <h1 class="white--text text-lg-h4 font-weight-bold ">Kubirnets</h1>
            <v-avatar class="my-5">
            <v-img src="../assets/kuber.jpg"></v-img>
            </v-avatar>
            <h5 class="grey--text ">Kutubxona paneli</h5>

        </div>
        <v-divider class="mx-10 mt-3" ></v-divider>
        <v-list flat  dense class="mt-5">
            <v-list-item-group v-model="selectedItem" color="teal" >
                <v-list-item v-for="(item, i) in items" :key="i" active-class="border" :to="item.path">
                    <v-list-item-icon class="ml-6">
                        <v-icon v-text="item.icon" ></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
            </v-list-item-group>
        </v-list>
        <div style="position: absolute; bottom: 0;
        margin-left: auto; margin-right: auto; left:0; right: 0; text-align: center;">
            <v-card
    class="mx-4 rounded-xl mb-1"
    color="gradient"
    dark
  >
    <v-card-title>
      <v-icon
        left
      >
       fas fa-history
      </v-icon>
     <v-spacer></v-spacer>
      <v-icon
        left
      >
      fas fa-ellipsis-v
      </v-icon>
    </v-card-title>

    <v-card-text class="text-h6 font-weight-bold">
     Hisobotlar mavjud

    </v-card-text>
    <v-card-text class="text-h6 mt-n8">
     Haftalik hisobotlarni tekshiring
    </v-card-text>


  </v-card>
        </div>
    </v-navigation-drawer>

    <v-app-bar app dark color="black">
      <v-text-field
            label="Search ..."
            append-icon="mdi-magnify"
            filled
            rounded
            dense
            class="mt-6"
          ></v-text-field>
      <v-spacer></v-spacer>
    <v-btn class="" fab dark small>
      <v-icon dark>
        fas fa-bell
      </v-icon>
    </v-btn>
    <v-btn class="ml-2" fab dark small>
      <v-icon dark>
        far fa-comment-dots
      </v-icon>
    </v-btn>
    <v-btn class="ml-2" fab dark small>
      <v-icon dark>
        fas fa-box
      </v-icon>
    </v-btn>
    <v-btn class="ml-2" fab dark small>
      <v-icon dark>
        fas fa-cog
      </v-icon>
    </v-btn>
    </v-app-bar>
</nav>
</template>

<script>
export default {
  name:'SideBar',
    data: () =>({
        selectedItem: 0,
        items: [
          {icon: 'fas fa-chart-bar', text: 'Statistika',path: '/statistic'},
          {icon: 'fas fa-building', text: 'Kutubxona nomi', path:'/library'},
          {icon: 'fas fa-exchange-alt', text: 'Kutubxona bo\'limlari', path: '/type'},
          {icon: 'fas fa-book', text: 'Kitoblar',path: '/books'},
        ],
    })
}
</script>

<style>
.border  {
    border-left: 4px solid teal
}
.gradient {
  background: rgb(27,31,28);
background: linear-gradient(90deg, rgba(27,31,28,1) 0%, rgba(9,121,11,1) 35%, rgba(5,83,45,1) 100%);
}
</style>
