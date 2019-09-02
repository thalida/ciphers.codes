import { CIPHER_KEYS } from '@/ciphers'

import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import Index from './views/Index.vue'
import CipherModal from './views/CipherModal.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/:cipherKey',
          name: 'cipher',
          props: true,
          component: CipherModal
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isModalVisible = false
  let redirect = false

  if (to.name === 'cipher') {
    if (CIPHER_KEYS.includes(to.params.cipherKey)) {
      isModalVisible = true
    } else {
      redirect = true
    }
  }

  store.commit('setIsModalVisible', isModalVisible)

  return (redirect) ? next('/') : next()
})

export default router
