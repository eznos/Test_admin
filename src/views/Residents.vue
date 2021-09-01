<template>
<!-- <h1 class="subheading grey--text">หน้าแรก</h1> -->
<v-card elevation="6">
    <v-data-table item-key="name" :headers="headers" :items="data" :sort-desc="[false, true]" :search="search" :custom-filter="filter" loading="loading" v-model="selected" show-select :single-select="singleSelect">
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
                <v-toolbar-title>ตารางผู้อยู่อาศัย</v-toolbar-title>

                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <!-- ฟังก์ชั้นการค้นหา -->
                <v-text-field v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
                <!-- จบ -->
                &nbsp;&nbsp;
                <v-dialog v-model="dialog" max-width="650px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#f5696c" class="mr-2" v-bind="attrs" v-on="on">
                            เพิ่มผู้อยู่อาศัย
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
                                        <v-text-field v-model="editedItem.rank" label="ยศ" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.name" label="ชื่อ-นามสกุล" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.affiliation" :items="Affiliation" label="สังกัด" required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.building" :items="building" label="อาคาร" required></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-select v-model="editedItem.roomnumber" :items="roomnumber" label="เลขห้อง" required>
                                        </v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.wnumber" label="เลขผู้ใช้น้ำ" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editedItem.enumber" label="เลขผู้ใช้ไฟ" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto" required>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field v-model="editedItem.date" label="วันที่เข้าอาศัย" prepend-icon="mdi-calendar" v-bind="attrs" v-on="on" required></v-text-field>
                                            </template>
                                            <v-date-picker v-model="editedItem.date" :active-picker.sync="activePicker" @change="savea" locale="th-TH"></v-date-picker>
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
                <v-dialog max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="#f07d7f" class="mr-2" v-bind="attrs" v-on="on">
                            Export ข้อมูล
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="text-h5">ต้องการ Export ข้อมูลหน้านี้ไหม</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">ต้องการลบผู้อยู่อาศัยชื่อ</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <!-- viewer -->
                <v-tooltip bottom> </v-tooltip>
                <v-dialog v-model="dialog1" max-width="500px">
                    <v-card-title>
                        <span class="text-h5">{{ viewchart }}</span>
                    </v-card-title>
                    <v-card>
                        <v-card class="mx-auto text-center" color="green" max-width="600">
                            <v-card-text>
                                <GChart type="LineChart" :data="chartData" :options="chartOptions" />
                            </v-card-text>
                            <v-card-text> </v-card-text>
                        </v-card>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeDelete">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon small class="mr-2" @click="editItem(item)" v-bind="attrs" v-on="on">
                        mdi-pencil
                    </v-icon>
                </template>
                <span>แก้ไขข้อมูล</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon small class="mr-2" @click="deleteItem(item)" v-bind="attrs" v-on="on">
                        mdi-delete
                    </v-icon>
                </template>
                <span>ลบข้อมูล</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon small @click="viewer(item)" v-bind="attrs" v-on="on">
                        mdi-chart-areaspline
                    </v-icon>
                </template>
                <span>ดูกราฟของผู้อยู่อาศัย</span>
            </v-tooltip>
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
import {
    GChart
} from "vue-google-charts";
export default {
    name: "App",
    components: {
        GChart,
    },
    data: () => ({
        Affiliation: ["ภ.3", "บก.สส.ภ.3", "ภ.จว.นคราชสีมา", "ศพฐ.3"],
        building: ["1-1", "1-2", "1-3", "1-4"],
        roomnumber: ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8", ],
        date: "",
        menu: false,
        search: "",
        dialog: false,
        dialog1: false,
        dialogDelete: false,
        viewer: false,
        singleSelect: false,
        selected: [],
        export: false,
        headers: [{
                text: "ชื่อ-นามสกุล",
                align: "start",
                sortable: false,
                value: "name",
            },
            {
                text: "สังกัด",
                value: "affiliation"
            },
            {
                text: "เลขที่ห้อง",
                value: "roomnumber"
            },
            {
                text: "อาคาร",
                value: "building"
            },
            {
                text: "เลขผู้ใช้ไฟ",
                value: "enumber"
            },
            {
                text: "เลขผู้ใช้น้ำ",
                value: "wnumber"
            },
            {
                text: "วันเข้าอยู่อาศัย",
                value: "date"
            },
            {
                text: "",
                value: "actions",
                sortable: false
            },
        ],
        value: [423, 446, 675, 510, 590, 610, 760],
        data: [],
        editedIndex: -1,
        editedItem: {
            name: "",
            affiliation: "",
            roomnumber: "",
            building: "",
            enumber: "",
            date: "",
        },
        defaultItem: {
            name: "",
            affiliation: "",
            roomnumber: "",
            building: "",
            enumber: "",
            date: "",
        },
        chartData: [
            ["เดือน", "ค่าน้ำ(บาท)", "ค่าไฟ(บาท)"],
            ["1", 300, 350],
            ["2", 350, 450],
            ["3", 480, 150],
            ["4", 350, 720],
            ["5", 940, 480],
            ["6", 120, 350],
            ["7", 740, 480],
            ["8", 490, 350],
            ["9", 340, 150],
            ["10", 900, 600],
            ["11", 400, 700],
            ["12", 600, 400],
        ],
        chartOptions: {
            chart: {
                title: "Testchart",
            },
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Edit Item";
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
        viewer(val) {
            val || this.close();
        },
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.data = [{
                    name: "a b",
                    affiliation: "FF",
                    roomnumber: "60/4",
                    building: "21-7",
                    enumber: "112345874841",
                    wnumber: "136584952484",
                    date: "	2021-09-23",
                },
                {
                    name: "a b",
                    affiliation: "FF",
                    roomnumber: "60/4",
                    building: "21-7",
                    enumber: "112345874841",
                    wnumber: "136584952484",
                    date: "	2021-09-23",
                },
            ];
        },

        editItem(item) {
            this.editedIndex = this.data.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        // view() {
        //   this.viewer = true;
        //   this.$nextTick(() => {
        //     this.editedItem = Object.assign({}, this.defaultItem);
        //     this.editedIndex = -1;
        //   });
        // },

        deleteItem(item) {
            this.editedIndex = this.data.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.data.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            // this.viewer = false;
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
                Object.assign(this.data[this.editedIndex], this.editedItem);
            } else {
                this.data.push(this.editedItem);
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
@import url("https://fonts.googleapis.com/css2?family=Prompt&display=swap");
</style>
