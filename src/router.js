import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/learn/:cipher',
      name: 'learn',
      props: true,
      component: () => import(/* webpackChunkName: "learn" */ './views/Learn.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
