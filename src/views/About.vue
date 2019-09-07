<template>
  <Modal
    class="about"
    :modal-aria-label="modalAriaLabel">
    <component v-bind:is="cipherAbouComponent" :cipher="cipher"></component>
  </Modal>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Prism from 'prismjs'

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
        components: { VueMarkdown },
        template: `<vue-markdown>${cipher.ABOUT_TEMPLATE}</vue-markdown>`
      }
    }
  },
  mounted () {
    Prism.highlightAll()
  }
}
</script>

<style lang="scss">
@import '~@/assets/css/prism_theme';
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

  p {
    margin: 0.5em 0 1em 0;
    font-size: 1.6em; // 16px
  }

  pre,
  code {
    font: normal normal 1.4em / 1.6 'Fira Code', monospace;
    overflow: auto;
  }

  pre {
    padding: 1em;
    margin: 2em 0;
    border-radius: 0.5em;
    box-shadow: 0 0 2em $color__blue--darker--faded;
  }

  code {
    font-size: 0.9em;
    line-height: 2em;
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
}
</style>
