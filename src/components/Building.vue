<template>
<v-card elevation="6">
    <v-data-table item-key="zone" :headers="headers" :items="building" :sort-desc="[false, true]" multi-sort :search="search" :custom-filter="filter" loading loading-text="Loading... Please wait" class="elevation-1" :item-class="itemRowBackground">
        <!-- <template v-slot:top>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          class="mx-4"
          single-line
          hide-details
        ></v-text-field>
      </template> -->
        <!-- สี loading -->
        <!-- <template slot="progress">
        <v-progress-linear color="#f28385" indeterminate></v-progress-linear>
      </template> -->
        <!-- จบสี loading -->
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>สถานะหอพัก</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <!-- ฟังก์ชั้นการค้นหา -->
                <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                <!-- จบ -->
                &nbsp;&nbsp;
                <v-dialog v-model="dialog" max-width="650px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#f5696c" class="mb-2" v-bind="attrs" v-on="on">
                            เพิ่มผู้ใช้งาน
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
                                        <v-text-field v-model="editedItem.building_id" label="เลขหอพัก"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.building" label="หอพัก"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.roomnumber" label="เลขห้องพัก"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.status" :items="Status" label="สถานะห้องพัก">
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="date" label="วันที่แก้ไข" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" :active-picker.sync="activePicker" @change="savea" locale="th-TH"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn color="blue darken-1" text @click="save">
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
        Status: ["ว่าง", "ไม่ว่าง"],
        date: null,
        menu: false,
        search: "",
        dialog: false,
        dialogDelete: false,
        headers: [{
                text: "หอพัก",
                value: "building"
            },
            {
                text: "เลขหอพัก",
                value: "building_id"
            },
            {
                text: "เลขห้อง",
                value: "roomnumber"
            },
            {
                text: "สถานะ",
                value: "status"
            },
            {
                text: "",
                value: "actions",
                sortable: false
            },
        ],
        building: [{
                building_id: 159,
                building: "หอในเมือง",
                roomnumber: 24,
                status: "ไม่ว่าง",
            },
            {
                building_id: 237,
                building: "หอนอกเมือง",
                roomnumber: 37,
                status: "ว่าง",
            },
            {
                building_id: 262,
                building: "หอในเมือง",
                roomnumber: 23,
                status: "ไม่ว่าง",
            },
        ],
        editedIndex: -1,
        editedItem: {
            zone: "",
            building_id: "",
            building: "",
            roomnumber: "",
            status: "",
            date: null,
        },
        defaultItem: {
            zone: "",
            building_id: "",
            building: "",
            roomnumber: "",
            status: "",
            date: null,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "เพิ่มผู้ใช้งาน" : "แก้ไขผู้ใช้งาน";
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
        // สีของ cell
        itemRowBackground: function (item) {
            return item.status == "ไม่ว่าง" ? "style-1" : "style-2";
        },
        editItem(item) {
            this.editedIndex = this.building.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = this.building.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.building.splice(this.editedIndex, 1);
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
                Object.assign(this.building[this.editedIndex], this.editedItem);
            } else {
                this.building.push(this.editedItem);
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

<style>
.style-1 {
    background-color: ;
}

.style-2 {
    background-color: ;
}
</style>
