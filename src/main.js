import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.use(VueClipboard)

Vue.config.productionTip = false

// Vue.directive('focus', {
//   // When the bound element is inserted into the DOM...
//   inserted: function (el) {
//     // Focus the element
//     el.focus()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
