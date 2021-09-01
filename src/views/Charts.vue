<template>
<v-app>
    <template v-slot:top> </template>
    <v-card-title class="card-header">
        <h1>ภาพรวมของหอพัก</h1>
    </v-card-title>

    <v-container>
        <v-row>
            <v-col cols="12" sm="6" md="4">

                <v-card class="small" elevation="6">

                    <v-list-item>
                        <v-responsive>
                            <bar-chart :chart-data="datacollection" :options="options" chart-id="projectedCumulativeSavings" responsive: true></bar-chart>
                        </v-responsive>
                    </v-list-item>

                    <v-card-actions>
                        <v-icon text class="ma-2">mdi-chart-bar</v-icon>
                        <!-- <div class="overline">ค่าน้ำ</div> -->
                        <h2>ค่าไฟ</h2>
                    </v-card-actions>
                </v-card>

            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="small" elevation="6">
                    <v-list-item>
                        <v-responsive>
                            <bar-chart :chart-data="datacollection" :options="options" chart-id="projectedCumulativeSavings" responsive: true></bar-chart>
                        </v-responsive>

                    </v-list-item>
                    <v-card-actions>
                        <v-icon text class="ma-2">mdi-chart-bar</v-icon>
                        <!-- <div class="overline">ค่าไฟ</div> -->
                        <h2>ค่าน้ำ</h2>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-responsive>
                    <v-card class="small" elevation="6">
                        <br>
                        <v-list-item>
                            <v-data-table :headers="headers" :items="dataresident" item-key="name" :search="search" :custom-filter="filterOnlyCapsText" :items-per-page="5">
                            </v-data-table>
                        </v-list-item>
                        <v-card-actions>
                            <v-icon text class="ma-2">mdi-chart-arc</v-icon>
                            <h2>ผู้เข้าอยู่อาศัยล่าสุด</h2>
                        </v-card-actions>
                    </v-card>
                </v-responsive>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="small" elevation="6">
                    <v-list-item>
                        <v-responsive>
                            <Pie-chart :chart-data="databill" :options="options" chart-id="projectedCumulativeSavings" responsive: true></Pie-chart>
                        </v-responsive>
                    </v-list-item>
                    <v-card-actions>
                        <v-icon text class="ma-2">mdi-chart-arc</v-icon>
                        <h2>อัตราส่วนการใช้</h2>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="small" elevation="6">
                    <v-list-item>
                        <v-responsive>
                            <Line-chart :chart-data="dataperson1" :options="options" chart-id="projectedCumulativeSavings" responsive: true></Line-chart>
                        </v-responsive>
                    </v-list-item>
                    <v-card-actions>
                        <v-icon text class="ma-2">mdi-chart-arc</v-icon>
                        <h2>จำนวนผู้อยู่อาศัยในแต่ล่ะหอพัก</h2>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-card class="small" elevation="6">
                    <v-list-item>
                        <v-responsive>
                            <Pie-chart :chart-data="dataperson" :options="options" responsive: true></Pie-chart>
                        </v-responsive>
                    </v-list-item>
                    <v-card-actions>
                        <v-icon text class="ma-2">mdi-chart-arc</v-icon>
                        <h2>จำนวนผู้อยู่อาศัยในแต่ล่ะปี</h2>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog transition="dialog-bottom-transition" max-width="450px" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="#F07D7F" class="mb-2" v-bind="attrs" v-on="on" :loading="loading" :disabled="loading" @click="loader = 'loading'">
                    Download ข้อมูลกราฟ<v-icon right dark>
                        mdi-download
                    </v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    Download ข้อมูลกราฟ
                </v-card-title>
                <v-card-subtitle>
                    เลือกข้อมูลกราฟที่ต้องการ
                </v-card-subtitle>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-select :items="datachart" label="เลือกข้อมูล"> </v-select>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Download
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>

</v-app>
</template>

<script>
import BarChart from "../JS/BarChart";
import PieChart from "../JS/PieChart";
import LineChart from "../JS/LineChart";
export default {
    components: {
        BarChart,
        PieChart,
        LineChart,
    },
    data() {
        return {
            height: 300,
            loader: null,
            loading: false,
            datacollection: null,
            dataperson: null,
            dialog: false,
            datachart: [
                "ค่าน้ำ 3 ปีย้อนหลัง",
                "ค่าไฟ 3 ปีย้อนหลัง",
                "อัตราส่วนการใช้ 3 ปีย้อนหลัง",
            ],
            dataresident: [{
                    name: 'GG ',
                    affiliation: 159,
                    building: 6.0,
                    roomnumber: 24,
                    startdate: 4.0,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },
                {
                    name: 'SS',
                    affiliation: 237,
                    building: 9.0,
                    roomnumber: 37,
                    startdate: 4.3,
                    iron: '1%',
                },

            ],
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
            },

        };
    },
    mounted() {
        this.fillData();
    },
    methods: {
        increase() {
            this.height += 10;
        },
        fillData() {
            this.datacollection = {
                labels: ["2019", "2020", "2021"],
                datasets: [{
                        label: "หอที่1",
                        backgroundColor: "#f9acc0",
                        labelsize: "20px",
                        data: [
                            this.getRandomInt(),
                            this.getRandomInt(),
                            this.getRandomInt(),
                        ],

                    },
                    {
                        label: "หอที่2",
                        backgroundColor: "#68a5c4",
                        data: [
                            this.getRandomInt(),
                            this.getRandomInt(),
                            this.getRandomInt(),
                        ],
                    },
                    {
                        label: "หอที่3",
                        backgroundColor: "#c4b3c3",
                        data: [
                            this.getRandomInt(),
                            this.getRandomInt(),
                            this.getRandomInt(),
                        ],
                    },
                    {
                        label: "หอที่4",
                        backgroundColor: "#eeb189",
                        data: [
                            this.getRandomInt(),
                            this.getRandomInt(),
                            this.getRandomInt(),
                        ],
                    },
                    {
                        label: "หอที่5",
                        backgroundColor: "#aad4e0",
                        data: [
                            this.getRandomInt(),
                            this.getRandomInt(),
                            this.getRandomInt(),
                        ],
                    },
                ],
            };
            this.databill = {
                labels: ["ค่าไฟ", "ค่าน้ำ"],
                datasets: [{
                    backgroundColor: ["#f2e913", "#00D8FF"],
                    chartsize: "200px",
                    data: ["999", "9999"],
                }, ],
            };

            this.dataperson = {
                labels: ["หอที่1", "หอที่2", "หอที่3"],
                datasets: [{
                    backgroundColor: ["#f2e913", "#00D8FF", "#41B883"],
                    chartsize: "20px",
                    data: [
                        this.getRandomInt(),
                        this.getRandomInt(),
                        this.getRandomInt(),
                    ],
                  
                }, 
                ],
            };
             this.dataperson1 = {
                labels: ["หอที่1", "หอที่2", "หอที่3"],
                datasets: [{
                    backgroundColor: ["#f2e913", "#00D8FF", "#41B883"],
                    chartsize: "20px",
                    data: [
                        this.getRandomInt(),
                        this.getRandomInt(),
                        this.getRandomInt(),
                    ],
                  
                }, 
                ],
            };
        },
        getRandomInt() {
            return Math.floor(Math.random() * (5000 - 5 + 1)) + 5;
        },
        chartoptions() {},
    },
    // aminetion ตอนกดปุ่ม
    watch: {
        dialog(val) {
            val || this.close();
        },
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
        },
    },
    computed: {
        headers() {
            return [{
                    text: 'ชื่อ-นามสกุล',
                    align: 'start',
                    sortable: false,
                    value: 'name',

                },
                {
                    text: 'สังกัด',
                    value: 'affiliation',
                    filter: value => {
                        if (!this.affiliation) return true

                        return value < parseInt(this.affiliation)
                    },
                },
                {
                    text: 'อาคาร',
                    value: 'building'
                },
                {
                    text: 'ห้องพัก',
                    value: 'roomnumber'
                },
                {
                    text: 'วันที่เข้าพัก',
                    value: 'startdate'
                },

            ]
        },
        myStyles() {
            return {
                height: `${this.height}px`,
                position: "relative",
            };
        },
    },
};
</script>

<style>
.small {
    max-width: 600px;
    margin: 10px auto;
    font-size: 28px;
}

.overline {
    font-family: "Helvetica", Arial;
    color: #464646;
    padding-bottom: 0px;
    font-size: 28px;
}

h1 {
    font-family: "Helvetica", Arial;
    color: #464646;
    text-transform: uppercase;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    font-size: 28px;
    margin-top: 0;
}

h2 {
    font-family: "Helvetica", Arial;
    color: #504d4d;
    text-transform: uppercase;
    border-bottom: 0px solid #f1f1f1;

    font-size: 24px;
    margin-top: 0;
}

.data {
    font-family: "Helvetica", Arial;
    color: #504d4d;
    text-transform: uppercase;

    font-size: 24px;
    margin-top: 0;
}
</style>
<style>
.mobile {
    color: #333;
}

@media screen and (max-width: 768px) {
    .mobile table.v-table tr {
        max-width: 100%;
        position: relative;
        display: block;
    }

    .mobile table.v-table tr:nth-child(odd) {
        border-left: 6px solid deeppink;
    }

    .mobile table.v-table tr:nth-child(even) {
        border-left: 6px solid cyan;
    }

    .mobile table.v-table tr td {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        height: auto;
        padding: 10px;
    }

    .mobile table.v-table tr td ul li:before {
        content: attr(data-label);
        padding-right: .5em;
        text-align: left;
        display: block;
        color: #999;

    }

    .v-datatable__actions__select {
        width: 50%;
        margin: 0px;
        justify-content: flex-start;
    }

    .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
        background: transparent;
    }

}

.flex-content {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}

.flex-item {
    padding: 5px;
    width: 50%;
    height: 40px;
    font-weight: bold;
}
</style>
