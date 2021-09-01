import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Projects from '../views/Projects.vue'
import Team from '../views/Team.vue'
import Table from '../views/Table.vue'
import Charts from '../views/Charts.vue'
import Residents from '../views/Residents.vue'
import Login from '../components/Login.vue'
import Building from '../components/Building.vue'
import Report from '../views/Report.vue'
import Playground from '../components/Playground.vue'
import Edit from '../components/Edituser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: Team
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/chart',
    name: 'chart',
    component: Charts
  },
  {
    path: '/residents',
    name: 'residents',
    component: Residents
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/building',
    name: 'Building',
    component: Building
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/playground',
    name: 'Playground',
    component: Playground
  },
  {
    path: '/edit',
    name: 'Edituser',
    component: Edit
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
