<template>
  <v-data-table
    dense
    hide-default-footer
    disable-sort
    :headers="headers"
    :items="items"
  >
    <template #footer>
      <div class="d-flex align-center justify-end mt-5">
        <v-dialog
          v-model="dialog"
          overlay-opacity="0.5"
          max-width="500px"
        >
          <template #activator="{ on, attrs }">
            <v-btn
              fab
              x-small
              color="#e6e6e6"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="black">mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="justify-center">
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.descripcion"
                      hide-details
                      dense
                      solo
                      autofocus
                      label="Descripcion"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.ars"
                      hide-details
                      dense
                      solo
                      prefix="AR$"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.usd"
                      hide-details
                      dense
                      solo
                      prefix="USD"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions class="pb-4">
              <v-spacer></v-spacer>
              <button
                class="login-btn mr-5"
                @click="close"
              >
                Cancelar
              </button>
              <button
                class="login-btn"
                @click="save"
              >
                Guardar
              </button>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="300px" overlay-opacity="0.5">
          <v-card>
            <v-card-title class="text-h5 justify-center">Eliminar activo?</v-card-title>
            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <button class="login-btn mr-5" @click="closeDelete">Cancelar</button>
              <button class="login-btn mr-5" @click="deleteItemConfirm">Si</button>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <template #[`body.append`]>
      <tr class="font-weight-bold">
        <td>Total</td>
        <td class="text-right">{{ formatNumber(totalArs) }}</td>
        <td class="text-right">{{ formatNumber(totalUsd) }}</td>
        <td></td>
      </tr>
    </template>
    <template #[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template #[`item.ars`]="{ item }">
      {{ formatNumber(item.ars) }}
    </template>
    <template #[`item.usd`]="{ item }">
      {{ formatNumber(item.usd) }}
    </template>
  </v-data-table>
</template>

<script>

export default {
  props: {
    headers: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      items: [],
      editedIndex: -1,
      editedItem: {
        descripcion: '',
        ars: 0,
        usd: 0,
      },
      defaultItem: {
        descripcion: '',
        ars: 0,
        usd: 0,
      },
    };
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo activo' : 'Editar activo'
    },
    totalArs() {
      let sum = 0;
      this.items.forEach((e) => {
        sum += parseFloat(e.ars);
      });
      return sum;
    },
    totalUsd() {
      let sum = 0;
      this.items.forEach((e) => {
        sum += parseFloat(e.usd);
      });
      return sum;
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
    formatNumber(number) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(number);
    },
    initialize () {
      this.items = [
        {
          descripcion: 'Sueldo',
          ars: 0,
          usd: 1600,
        },
        {
          descripcion: 'Banco',
          ars: 35000,
          usd: 400,
        },
        {
          descripcion: 'Otros',
          ars: 0,
          usd: 900,
        },
      ]
    },
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1)
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
    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
};
</script>

<style lang="scss" scoped>
.v-data-table, .v-sheet {
  background-color: #e6e6e6 !important;
}
tr:hover {
  background: transparent !important;
}
::v-deep .v-input__slot {
  border-radius: 12px !important;
  background: #e6e6e6 !important;
  box-shadow:  inset 3px 3px 6px #cfcfcf,
              inset -3px -3px 6px #fdfdfd !important;
}
</style>
