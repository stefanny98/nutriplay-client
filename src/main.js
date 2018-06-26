// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import { store } from './store'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import PaperDashboard from './plugins/paperDashboard'
import VueSwal from 'vue-swal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueFire)
Vue.use(PaperDashboard)
Vue.use(BootstrapVue)
Vue.use(VueSwal)
Vue.config.productionTip = false
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created () {
      if (user) {
        store.dispatch('autoSignIn', user)
      }
    }
  })
  unsubscribe()
})
