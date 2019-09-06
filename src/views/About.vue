<template>
  <Modal
    class="about"
    :modal-aria-label="modalAriaLabel">
    <component v-bind:is="cipherAbouComponent" :cipher="cipher"></component>
  </Modal>
</template>

<script>
import 'highlight.js/styles/github.css'

import { getCipherByKey } from '@/ciphers'
import Modal from '@/components/Modal'

export default {
  name: 'about',
  props: ['cipherKey'],
  components: { Modal },
  data () {
    let cipher = getCipherByKey(this.cipherKey)
    return {
      cipher,
      modalAriaLabel: `${cipher.NAME} informational modal`,
      cipherAbouComponent: {
        props: ['cipher'],
        template: `<div>${cipher.ABOUT_TEMPLATE}</div>`
      }
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/_variables';
.about {
  h1 {
    font-size: 2.4em;
  }

  p {
    margin: 0.5em 0 1em;
  }

  &__section {
    margin-top: 3.2em;
  }

  &__sub-section {
    margin-top: 1.6em;
  }
}
</style>
