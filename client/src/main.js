import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

import ProfileComponent from './components/ProfileComponent.vue'
import CreateComponent from './components/CreateComponent.vue'
import EditComponent from './components/EditComponent.vue'
import IndexComponent from './components/IndexComponent.vue'
import ExpenseComponent from './components/ExpenseComponent.vue'
import RevenueComponent from './components/RevenueComponent.vue'
import StoreComponent from './components/StoreComponent.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: ProfileComponent
  },
  {
    name: 'create',
    path: '/create',
    component: CreateComponent
  }, 
  {
    name: 'stores',
    path: '/stores',
    component: IndexComponent
  },
  {
    name: 'store',
    path: '/store/:id',
    component: StoreComponent
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: EditComponent
  },
  {
    name: 'reportExpense',
    path: '/report_expense/:id?',
    component: ExpenseComponent
  },
  {
    name: 'reportRevenue',
    path: '/report_revenue/:id?',
    component: RevenueComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes})

new Vue(Vue.util.extend({ router }, App)).$mount('#app')
