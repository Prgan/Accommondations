import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import WelcomePage from './components/WelcomePage'
import PageNotFound from './components/PageNotFound'
import Accommondations from './components/Accommondations'
import Accommondation from './components/Accommondation'
import { store } from './store/store';

Vue.config.devtools = true;
Vue.use(VueRouter);

const routes = [
    {path: '/', component: WelcomePage},
    {path: '/Accommondations', name: 'Accommondations', component: Accommondations},
    {path: '/Accommondations/Accommondation', name: 'Accommondation', component: Accommondation},
    {path: '*', component: PageNotFound}
];

const router = new VueRouter ({
  routes,
  mode: 'history'
}) 

Vue.use(Element);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
