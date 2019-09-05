<template>
  <Modal
    class="about-modal"
    :modal-aria-label="modalAriaLabel">
    <component v-bind:is="cipherComponent" :cipher="cipher"></component>
  </Modal>
</template>

<script>
import { getCipherByKey } from '@/ciphers'
import Modal from '@/components/Modal'
import * as AboutPartials from '@/components/_partials/about'

export default {
  name: 'about',
  props: ['cipherKey'],
  components: {
    Modal
  },
  data () {
    let cipher = getCipherByKey(this.cipherKey)
    return {
      cipher,
      cipherComponent: AboutPartials[this.cipherKey],
      modalAriaLabel: `${cipher.NAME} informational modal`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/_variables';
.about {
  p {
    margin: 0.5em 0 1em;
  }

  &__inputs {
    margin-top: 3.2em;
  }

  &__input {
    margin-top: 1.6em;
  }
}
</style>
