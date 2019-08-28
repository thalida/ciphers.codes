import { CIPHER_KEYS } from '@/ciphers'

import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Modal from './views/Modal.vue'

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
          path: 'about/:cipherKey',
          name: 'about',
          props: true,
          component: Modal
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
  if (
    to.name !== 'about' ||
    (to.name === 'about' && CIPHER_KEYS.includes(to.params.cipherKey))
  ) {
    return next()
  }

  return next('/')
})

export default router
