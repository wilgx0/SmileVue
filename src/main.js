// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import {Tabbar,TabbarItem,Stepper,PullRefresh, Tab,Tabs,Button,Row,Col,Search , Swipe , SwipeItem ,Lazyload,List,Field,NavBar} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(Lazyload).use(List)

import VueAwesomeSwiper from 'vue-awesome-swiper'
 
// require styles
import 'swiper/dist/css/swiper.css'
 
Vue.use(VueAwesomeSwiper, /* { default global options } */)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
