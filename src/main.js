import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Ant Design
import './plugins/ant-design-vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
