import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { GChart } from 'vue-google-charts'


Vue.use(Vuetify);

// Translation provided by Vuetify (javascript)
import th from 'vuetify/lib/locale/th'


// Your own translation file


Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'th'
    },
  },
})

export default new Vuetify({
  lang: {
    locales: { th},
    current: 'th',
  },
  icons: {
    iconfont: 'md',
  },
  // dark: true,
  // theme: { dark: true },
  components: {
    GChart,
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#F07D7F',
        secondary: '#6c757d',
        accent: '#3ea2fb',
        error: '#dc3545',
        petrol: '#17a499',
        background: '#F5F6F8',
      },
      options: {
        customProperties: true
    },
    },
    
  },

});
