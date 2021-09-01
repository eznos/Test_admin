<template>
  <div class="team">
    <h1 class="subheading grey--text">หน้าแรก</h1>
    <v-container>
      <v-carousel
        cycle
        height="600"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <template v-slot:prev="{ on, attrs }">
          <v-btn color="success" v-bind="attrs" v-on="on">Previous slide</v-btn>
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
        </template>
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
        </v-carousel-item>
      </v-carousel>

      <br />
      <v-layout row wrap>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar rounded class="mt-n7">
                <v-sheet color="green" width="80" height="80" elevation="10">
                  <v-icon dark large>store</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Article</div>
                <v-list-item-title class="headline mb-1 text-right"
                  >523614</v-list-item-title
                >
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2">person</v-icon>
              <div class="overline">Iyad</div>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="#F44336" width="80" height="80" elevation="10">
                  <v-icon dark large>subscriptions</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Abonné</div>
                <v-list-item-title class="headline mb-1 text-right"
                  >+700</v-list-item-title
                >
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2">subscriptions</v-icon>
              <div class="overline">AAE IdeaPro</div>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="#03A9F4" width="80" height="80" elevation="10">
                  <v-icon dark large>add_shopping_cart</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Shopping</div>
                <v-list-item-title class="headline mb-1 text-right"
                  >$34,245</v-list-item-title
                >
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2">credit_card</v-icon>
              <div class="overline">VISA Card</div>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12 md6 lg3>
          <v-card class="ma-3">
            <v-list-item>
              <v-list-item-avatar tile class="mt-n7">
                <v-sheet color="#FFC109" width="80" height="80" elevation="10">
                  <v-icon dark large>folder_shared</v-icon>
                </v-sheet>
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="overline text-right">Folder shared</div>
                <v-list-item-title class="headline mb-1 text-right"
                  >1730</v-list-item-title
                >
                <div><v-divider></v-divider></div>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-icon text class="ma-2">folder</v-icon>
              <div class="overline">Prodect</div>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card class="text-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="red lighten-2">
                <img :src="person.avatar" alt="" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn outlined color="orange">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "team",
  components: {},
  data: () => ({
    team: [
      { name: "Iyad", role: "web developer", avatar: "/img1.png" },
      { name: "Reda", role: "Graphic designer", avatar: "/img2.png" },
      { name: "Zineb", role: "web developer", avatar: "/img3.png" },
      { name: "Hu TechGroup", role: "Desktop developer", avatar: "/img4.png" },
    ],
    items: [
      // {
      //   src:
      //     "https://pbs.twimg.com/profile_banners/931440016579899393/1511505506/1500x500",
      // },
      // {
      //   src:
      //     "https://pbs.twimg.com/media/Elec_68VMAAw_4l?format=jpg&name=4096x4096",
      // },
      // {
      //   src:
      //     "http://www.pali.mcu.ac.th/wp-content/uploads/2019/05/59528654_343035049750239_8788394228905410560_o.jpg"
      // },
      {image: "../../../test_project/public/police3.png" }
    ],
  }),
};
</script>
