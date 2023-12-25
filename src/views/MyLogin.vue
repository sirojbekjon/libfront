<template>
  <v-app v-if="$store.state.token!=='token'" id="inspire" style="background-color: #212022">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row justify="center">
          <v-col xs="12" sm="10" md="8" lg="6">
            <v-card class="elevation-12 mr-lg-16">
              <v-window>
                <v-window-item>
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-3">
                        <h4
                            class="text-center display-2 teal--text text--accent-3"
                        ></h4>
                        <div class="text-center mt-4">
                          <v-img
                              class="justify-content-center align-items-center"
                              lazy-src="../assets/web-development-4439345-3726916.webp"
                              max-height="150"
                              max-width="250"
                              src="../assets/web-development-4439345-3726916.webp"
                          ></v-img>
                        </div>
                        <v-form ref="submit" class="mt-3">
                          <v-text-field
                              label="Username"
                              v-model="data.username"
                              prepend-icon="email"
                              type="text"
                              color="#195641"
                          />

                          <v-text-field
                              id="password"
                              label="Password"
                              v-model="data.password"
                              prepend-icon="lock"
                              type="password"
                              color="#195641"

                          />
                          <div class="text-center mb-5">
                            <v-btn @click.prevent="submit" color="#195641" dark>SIGN IN</v-btn>
                          </div>
                        </v-form>

                      </v-card-text>

                    </v-col>
                    <v-col cols="12" md="4" class="card_color">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Milliy Uz Dastur loyihasi!</h1>
                        <h5
                            class="text-center"
                        >Foydalanish uchun o'zingizning shaxsiy ma'lumotlaringiz kiritilgan va ro'yxatdan o'tgan bo'lishingiz shart</h5>
                      </v-card-text>
                     </v-col>
                  </v-row>
                </v-window-item>

              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
export default {

name:"MyLogin",
  data(){
   return {
     data: {
       username: "",
       password: ""
     },
     token: 'Bearer ' + sessionStorage.getItem('token'),
   }
  },
  props: {
    source: String
  },
        methods:{
           submit () {
             sessionStorage.clear();
             sessionStorage.setItem('token',"token");
             window.location.reload()
             this.$router.push('/library');
          },
        },
      };
    </script>

<style>
.card_color{
  background: rgb(1,1,1);
  background: linear-gradient(90deg, rgba(1,1,1,1) 10%, rgba(29,34,30,1) 40%, rgba(19,158,112,1) 110%);
}
</style>
