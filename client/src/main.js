import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import 'buefy/dist/buefy.css';
import Http from './plugins/http';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(Http);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
