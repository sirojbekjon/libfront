<template>
  <div class="container">
  <v-row  v-if="$store.state.token" justify="center">
    <v-col cols="8">
      <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
          class="myForm"

      >
        <template v-slot:top >
          <v-toolbar
              flat
              style="background-color: #141414"

          >
            <v-toolbar-title style="color: white">Kutubxonaning bo'limlari</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
                v-model="dialog"
                max-width="500px"
                persistent
                dark
                overlay-color="white"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="grey"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                >
                  Yangi Yaratish
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>

                      <v-col
                          cols="12"
                          sm="6"
                          md="12"
                      >
                        <v-text-field
                            outlined
                            color="#009688"
                            v-model="editedItem.title"
                            label="Kitub nomi"
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="6"
                          md="12"
                      >
                        <v-text-field
                            outlined
                            color="#009688"
                            v-model="editedItem.author"
                            label="Kitub muharriri"
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="6"
                          md="12"
                      >
                        <v-text-field
                            outlined
                            color="#009688"
                            v-model="editedItem.year"
                            label="Chop etilgan yili"
                        ></v-text-field>
                      </v-col>

                      <v-col
                          cols="12"
                          sm="6"
                          md="12"
                      >
                        <v-text-field
                            outlined
                            color="#009688"
                            v-model="editedItem.pages"
                            label="Varoqlar soni"
                        ></v-text-field>
                      </v-col>


                      <v-col
                          cols="12"
                          sm="6"
                          md="12"
                      >
                        <v-select
                            color="#009688"
                            outlined
                            :items="booksType"
                            item-text="name"
                            item-value="id"
                            v-model="editedItem.booksType"
                            label="Kitobning turi"
                            persistent-hint
                            single-line
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="grey"
                      text
                      @click="close"
                  >
                    Close
                  </v-btn>
                  <v-btn
                      color="green"
                      text
                      @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5" style="color:#1D1D26">Ushbu ma'lumotni o'chirmoqchimisiz ?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn    color="#009688" text @click="closeDelete">Yo'q</v-btn>
                  <v-btn    color="#009688" text @click="deleteItemConfirm">Ha</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
              color="gray"
          >
            fas fa-pen
          </v-icon>
          <v-icon
              small
              @click="deleteItem(item)"
              color="red"
          >
            fas fa-trash
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
              color="#009688"
              @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>

    </v-col>
  </v-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name:'books',
  data: () => ({
    book:[],
    files:'',
    library:'',
    deleteId:'',
    booksType:'',
    search:'',
    dialog: false,
    dialogDelete: false,
    token: 'Bearer ' + sessionStorage.getItem('token'),
    headers: [
      {
        text: 'Kitoblar',
        align: 'start',
        sortable: false,
        value: 'title',

      },
      {
        text: 'Kitob muharrir',
        align: 'start',
        sortable: false,
        value: 'author',

      },
      {
        text: 'Chiqarilgan yili',
        align: 'start',
        sortable: false,
        value: 'year',

      },
      {
        text: 'Varoqlar soni',
        align: 'start',
        sortable: false,
        value: 'pages',

      },
      {
        text: 'Kitob turi',
        align: 'start',
        sortable: false,
        value: 'booksType.name',

      },

     { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      title:'',
      author:'',
      year:'',
      pages:'',
      booksType:'',
    },
    defaultItem: {
      title:'',
      author:'',
      year:'',
      pages:'',
      booksType:'',
    },
  }),


  mounted: async function () {
   this.nextperson()
    const responseBooksType = await axios.get('type/all')
    this.booksType = responseBooksType.data
    console.log(responseBooksType.data)
    const responseLibrary = await axios.get('book/view/all')
    this.library = responseLibrary.data
    const response = await axios.get('book/all')
    console.log(response.data)
    this.book = response.data

  },


  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Create' : 'Edit'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {

   initialize () {

    },

    editItem (item) {

      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.deleteId = item.id
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      console.log(this.deleteId)
      await axios.delete('book/delete/' + this.deleteId)
      this.desserts.splice(this.editedIndex, 1)
      // this.$store.commit('setbookProduct',this.desserts)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },


    async nextperson() {

      const response = await axios.get('book/view/all')
      this.desserts = response.data
      console.log(response.data)
    },





    async save() {
      if (this.editedIndex > -1) {
        await axios.put('book/edit/' + this.editedItem.id, this.editedItem)
        Object.assign(this.desserts[this.editedIndex], this.editedItem)

        this.nextperson()
        // this.$store.commit('setbookProduct',this.desserts)
      } else {
        console.log(this.editedItem)
        await axios.post('book/add', this.editedItem)
        this.nextperson()

        // this.$store.commit('setbookProduct',this.desserts)
      }
      this.close()
    },
  },
}
</script>

<style scoped>
.myForm{
  border-radius: 10px !important;
  color: black !important;
  background-color: #a4a2a2 !important;
}
.myForm:hover{
  color: #1D1D26 !important;
}


.active {
  color: green;
}

.inactive {
  color: red;
}

</style>
