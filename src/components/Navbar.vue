<template>
  <nav>
    <v-app-bar color="rgb(131,49,51)" dark app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase ">
        <span class="font-weight-light">ระบบจัดการค่าน้ำ ค่าไฟฟ้า</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <!-- <v-btn text v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn> -->
          <v-spacer />
        </template>
        <v-list flat>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
            active-class="border"
          >
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- แถบเมนู logout -->
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item
            v-for="link in items"
            :key="link.text"
            router
            :to="link.route"
            active-class="border"
          >
            <v-list-item-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
          <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            width="800"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                แก้ไขผู้ใช้งาน
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                แก้ไขผู้ใช้งาน
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="2">
                       <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="ยศ"
                        value="rank"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                      <v-select
                        :items="['0-17', '18-29', '30-54', '54+']"
                        label="สังกัด"
                        value="affiliation"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="ชื่อ"
                        value="rank"
                        hint=""
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="นามสกุล"
                        value="rank"
                        hint=""
                        persistent-hint
                        required
                      ></v-text-field>
                    </v-col>
                    
                     
                    
                      <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Username"
                        type="username"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        label="Password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
               
                  
                  </v-row>
                </v-container>
              
              </v-card-text>
              <v-card-actions>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Disagree
                </v-btn>
                <v-btn color="green darken-1" text @click="dialog = false">
                  Agree
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- จบ -->
    <v-navigation-drawer v-model="drawer" dark app color="#572021">
      <!--old color  class="red darken-4" -->
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100" tile>
            <img src="/police3.png" alt="" />
          </v-avatar>
          <!-- <p class="white--text subheading mt-1 text-center">Username</p> -->
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <Popup />
        </v-flex>
      </v-layout>
      <!-- แถบเมนูด้านข้าง -->
      <v-list flat>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          active-class="border"
          dialog
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
// import { mapState } from "vuex";
import Popup from "./Popup.vue";
export default {
  name: "Toolbar",
  data: () => ({
    drawer: true,
    dialog: false,
    // แถบเมนู
    links: [
      // { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
      // { icon: "folder", text: "My Project", route: "/projects" },
      // { icon: "person", text: "Team", route: "/team" },
      { icon: "mdi-chart-arc", text: "ภาพรวม", route: "/chart" },
      { icon: "mdi-table", text: "ตารางค่าน้ำ ค่าไฟ", route: "/table" },
      { icon: "person", text: "ผู้อยู่อาศัย", route: "/residents" },
      { icon: " mdi-home-circle", text: "สถานะหอพัก", route: "/building" },
      { icon: "mdi-file-pdf-box", text: "แก้ไขผู้ใช้งาน", route: "/report" },
      { icon: " mdi-test-tube", text: "Playground", route: "/playground" },
      // playground
    ],
    items: [
      { icon: " mdi-account-edit", text: "แก้ไขข้อมูล", dialog: "false"},
      { icon: " mdi-logout", text: "ออกจากระบบ", route: "/" },
    ],
  }),
  components: {
    Popup,
    // ...mapState({
    //   themes: state => state.themes.themes
    // }),
    // theme: {
    //   get() {
    //     return this.$store.state.themes.theme;
    //   },
    //   set(newTheme) {
    //     this.$store.commit("setTheme", newTheme);
    //   }
    // }
  },
  methods: {
    // switchTheme() {
    //   if (this.theme === this.themes[0]) {
    //     this.theme = this.themes[1];
    //   } else if (this.theme === this.themes[1]) {
    //     this.theme = this.themes[0];
    //   }
    //   localStorage.setItem("theme", this.theme);
    // }
  },
};
</script>
<style scoped>
.border {
  border-left: 5px solid #a50b20;
}
</style>
