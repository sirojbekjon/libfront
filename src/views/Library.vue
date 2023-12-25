<template>
  <div class="container">
    <v-row justify="center">
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
              <v-toolbar-title style="color: white">Ijtimoiy tarmoqlar</v-toolbar-title>
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
                    Create
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
                            sm="12"
                            md="12"
                        >
                          <v-text-field
                              outlined
                              color="#009688"
                              v-model="editedItem.name"
                              label="name"
                          ></v-text-field>
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
                  <v-card-title class="text-h5" style="color:#1D1D26">Siz rostan ham ushbu ma'lumotni o'chirmoqchimisiz ?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn    color="#009688" text @click="closeDelete">Close</v-btn>
                    <v-btn    color="#009688" text @click="deleteItemConfirm">Yes</v-btn>
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
  name:'Library',
  data: () => ({
    deleteId:'',
    search:'',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Kutubxona nomi',
        align: 'start',
        sortable: false,
        value: 'name',

      },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name:''
    },
    defaultItem: {
      name: '',
    },
  }),


  mounted: async function () {
    const response = await axios.get('library/view/all')
    console.log(response.data)
    this.desserts = response.data
    // this.$store.commit('setTypeProduct',this.desserts)
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
      await axios.delete('library/delete/' + this.deleteId)
      this.desserts.splice(this.editedIndex, 1)
      // this.$store.commit('setTypeProduct',this.desserts)
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

    async save() {
      if (this.editedIndex > -1) {
        await axios.put('library/edit/' + this.editedItem.id, this.editedItem)
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
        // this.$store.commit('setTypeProduct',this.desserts)
      } else {
        await axios.post('library/add', this.editedItem)
        this.desserts.push(this.editedItem)
        // this.$store.commit('setTypeProduct',this.desserts)
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
</style>
