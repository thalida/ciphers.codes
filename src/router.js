import { CIPHER_KEYS } from '@/ciphers'

import Vue from 'vue'
import Router from 'vue-router'
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
  if (
    to.name !== 'cipher' ||
    (to.name === 'cipher' && CIPHER_KEYS.includes(to.params.cipherKey))
  ) {
    return next()
  }

  return next('/')
})

export default router
