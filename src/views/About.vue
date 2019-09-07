<template>
  <Modal
    class="about"
    :modal-aria-label="modalAriaLabel">
    <component v-bind:is="cipherAbouComponent" :cipher="cipher"></component>
  </Modal>
</template>

<script>
import 'highlight.js/styles/a11y-light.css'

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

  h2 {
    font-size: 2.0em;
  }

  h3 {
    font-size: 1.8em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1em 0 0.25em;
  }

  hr {
    margin: 3.2em 0;
    border: 0;
    height: 0.4em;
    background-color: $color__gray;
  }

  p,
  pre {
    line-height: 1.4em;
    font-size: 1.6em; // 16px
  }

  p {
    margin: 0.5em 0 1em 0;
  }

  pre,
  code {
    font: normal normal 1.6em / 2 'Fira Code', monospace;
    overflow: auto;
  }

  pre {
    padding: 1em;
    margin: 2em 0;
    border-radius: 0.5em;
    box-shadow: 0 0 2em $color__blue--darker--faded;
    // background: $color__gray;
  }

  code {
    font-size: 1em;
    padding: 0.25em 0.5em;
    background-color: $color__purple--xtra-faded;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  ul,
  ol {
    font-size: 1.6em;
  }

  li * {
    font-size: 1em;
  }

  &__section {
    margin-top: 3.2em;
  }

  &__sub-section {
    margin-top: 1.6em;
  }
}
</style>
