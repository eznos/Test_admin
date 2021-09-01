<template>
  <v-card elevation="6">
    <v-data-table
      item-key="name"
      :headers="headers"
      :items="datas"
      :sort-desc="[false, true]"
      multi-sort
      :search="search"
      :custom-filter="filter"
      loading
      loading-text="Loading... Please wait"
      show-select
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          class="mx-4"
          single-line
          hide-details
        ></v-text-field>
      </template>
      <!-- สี loading -->
      <!-- <template slot="progress">
        <v-progress-linear color="#f28385" indeterminate ></v-progress-linear>
      </template> -->
      <!-- จบสี loading -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>ตารางค่าน้ำ-ค่าไฟฟ้า</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-spacer></v-spacer>

          <!-- ค้นหาด้วย เดือน -->
          <v-menu>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Picker in dialog"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" type="month" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="#F07D7F" @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn text color="#F07D7F" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
            <!-- <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon:mdi-music-note-whole>
                ตัวเลือก
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="onClick">
                <v-list-item-title>ค้นหาด้วยเดือน</v-list-item-title>
                
              </v-list-item>

              <v-list-item disabled>
                <v-list-item-title>Option 2</v-list-item-title>
              </v-list-item>

              <v-list-item @click="onClick">
                <v-list-item-title>ค้นหาด้วยอาคาร</v-list-item-title>
              </v-list-item>
            </v-list> -->
          </v-menu>
          <!-- <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
            class="mx-3"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="editedItem.date"
                label="วันที่เรียกเก็บ"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="editedItem.date"
              :active-picker.sync="activePicker"
              @change="savea"
            ></v-date-picker>
          </v-menu> -->
          <!-- จบ -->

          <!-- ฟังก์ชั้นการค้นหา -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
          &nbsp; &nbsp;
          <!-- จบ -->
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#f5696c" class="mr-2" v-bind="attrs" v-on="on">
                เพิ่มค่าน้ำค่าไฟ
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.rank"
                        :items="Rank"
                        label="ยศ"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="ชื่อ นามสกุล"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.affiliation"
                        :items="Affiliation"
                        label="สังกัด"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.building"
                        label="อาคาร"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.roomnumber"
                        label="เลขห้อง"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.wcost"
                        label="ค่าน้ำ "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.wcostdif"
                        label="ค่าน้ำส่วนต่าง"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.date"
                            label="วันที่เรียกเก็บ"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.date"
                          :active-picker.sync="activePicker"
                          @change="savea"
                          locale="th-TH"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#F07D7F" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="#F07D7F" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#f07d7f" class="mr-2" v-bind="attrs" v-on="on">
                Export ข้อมูล
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5"
                >ต้องการ Export ข้อมูลหน้านี้ไหม</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#F07D7F" text @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="#F07D7F" text @click="dialog = false">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    Affiliation: ["ภ.3", "บก.สส.ภ.3", "ภ.จว.นคราชสีมา", "ศพฐ.3"],
    Rank: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    date: null,
    menu: false,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "ยศ", value: "rank" },
      {
        text: "ชื่อ-นามสกุล",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "สังกัด", value: "affiliation" },
      { text: "อาคาร", value: "building" },
      { text: "เลขที่ห้อง", value: "roomnumber" },
      { text: "ค่าน้ำ", value: "wcost" },
      { text: "ค่าน้ำส่วนต่าง", value: "wcostdif" },
      { text: "ค่าไฟ", value: "ecost" },
      { text: "วันเรียกเก็บ", value: "date" },
      { text: "", value: "actions", sortable: false },
    ],
    datas: [],
    editedIndex: -1,
    editedItem: {
      rank: "",
      name: "",
      affiliation: "",
      roomnumber: "",
      wcost: "",
      wcostdif: "",
      ecost: "",
      date: null,
    },
    defaultItem: {
      rank: "",
      name: "",
      affiliation: "",
      roomnumber: "",
      wcost: "",
      wcostdif: "",
      ecost: "",
      date: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มค่าน้ำ ค่าไฟ" : "แก้ไขข้อมูล";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.datas = [
        {
          rank: "1",
          name: "AA G",
          affiliation: "บก.สส.ภ.3",
          roomnumber: "6",
          wcost: "555",
          wcostdif: "40",
          ecost: "60",
          date: "2021-08-28",
        },
        {
          rank: "5",
          name: "FF V",
          affiliation: "ภ.จว.นคราชสีมา",
          roomnumber: "9",
          wcost: "37",
          wcostdif: "77",
          ecost: "60",
          date: "2021-08-28",
        },
        {
          rank: "4",
          name: "VI SA",
          affiliation: "ภ.3",
          roomnumber: "16",
          wcost: "23",
          wcostdif: "66",
          ecost: "60",
          date: "2021-08-28",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.datas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.datas.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.datas[this.editedIndex], this.editedItem);
      } else {
        this.datas.push(this.editedItem);
      }
      this.close();
    },
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
      );
    },
    ormatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    savea(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>
