import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";

Vue.use(BootstrapVue);
new Vue({
  render: h => h(App),
}).$mount('#app')
