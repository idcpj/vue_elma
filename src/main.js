// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'
/* eslint-disable*/
import App from './App'

import "./common/stylus/index.styl"
import "./common/stylus/icon.styl"

Vue.use(VueRouter)
Vue.use(VueResource)


Vue.config.productionTip = false
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]

const router = new VueRouter({
  lineActiveClass: 'active',
  routes // (缩写) 相当于 routes: routes
})

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)

})
