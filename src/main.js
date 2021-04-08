import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import axios from 'axios'
import VueCookies from 'vue-cookies'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { BSidebar } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import Button from 'ant-design-vue/lib/button';

import VDistpicker from 'v-distpicker'

import customer_layout from './components/customer_layout'
import admin_layout from './components/admin_layout'
import admin from './components/admin/admin'
import first_page from './components/customer_management/first_page'
import flight_filter_show from './components/customer_management/flight_filter_show'
import customer_info_management from './components/customer_management/customer_info_management'
import vip_register from './components/customer_management/vip_register'
import success_ticket from './components/customer_management/success_ticket'
import ticket_show from './components/customer_management/ticket_show'
import choose_seat from './components/customer_management/choose_seat'
import company_admin_info from './components/admin_management/company_admin_info'
import plane_info_management from './components/admin_management/plane_info_management'
import add_airport_info from './components/admin_management/add_airport_info'
import show_airport_info from './components/admin_management/show_airport_info'
import add_airline_info from './components/admin_management/add_airline_info'
import add_flight_info from './components/admin_management/add_flight_info'
import show_airline_info from './components/admin_management/show_airline_info'
import show_flight_info from './components/admin_management/show_flight_info'

import test from './components/test'




Vue.use(VueRouter)
Vue.use(VueCookies)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(Antd)
Vue.use(require('vue-moment'));

Vue.component('b-sidebar', BSidebar) //???
Vue.component('v-disctpicker', VDistpicker)

Vue.config.productionTip = false
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios
Vue.prototype.serverURL = 'http://127.0.0.1:5000/'


const routes = [
  {
    path: '/',
    component: admin,
    metadata: {
      title: '民航订票管理系统'
    }
  },

  {
    path: '/customer_layout',
    component: customer_layout,
    children: [
      {
        path: '/first_page',
        component: first_page,
        metadata: {
          title: '订票首页'
        }
      },
      {
        path: '/flight_filter_show',
        component: flight_filter_show,
        metadata: {
          title: '航班展示'
        }
      },
      {
        path: '/customer_info_management',
        component: customer_info_management,
        metadata: {
          title: '用户信息管理'
        }
      },
      {
        path: '/vip_register',
        component: vip_register,
        metadata: {
          title: 'VIP注册'
        }
      },
      {
        path: '/test',
        component: test,
        metadata: {
          title: '测试路由'
        }
      },
      {
        path: '/success_ticket',
        component: success_ticket,
        metadata: {
          title: '订票成功'
        }
      },
      {
        path: '/ticket_show',
        component: ticket_show,
        metadata: {
          title: '订票页面'
        }
      },
      {
        path: '/choose_seat',
        component: choose_seat,
        metadata: {
          title: '选座'
        }
      }, 
    ]
  },

  {
    path: '/admin_layout',
    component: admin_layout,
    children:[
      {
        path: '/company_admin_info',
        component: company_admin_info,
        metadata: {
          title: '公司信息管理'
        }
      }, 
      {
        path: '/plane_info_management',
        component: plane_info_management,
        metadata: {
          title: '飞机信息管理'
        }
      },
      {
        path: '/add_airport_info',
        component: add_airport_info,
        metadata: {
          title: '增加机场信息'
        }
      },
      {
        path: '/show_airport_info',
        component: show_airport_info,
        metadata: {
          title: '展示机场信息'
        }
      },
      {
        path: '/add_airline_info',
        component: add_airline_info,
        metadata: {
          title: '添加航线信息'
        }
      },
      {
        path: '/add_flight_info',
        component: add_flight_info,
        metadata: {
          title: '添加航班信息'
        }
      },
      {
        path: '/show_airline_info',
        component: show_airline_info,
        metadata: {
          title: '展示航线'
        }
      },
      {
        path: '/show_flight_info',
        component: show_flight_info,
        metadata: {
          title: '展示航班'
        }
      },
    ]
  }


]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
