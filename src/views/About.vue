<template>
  <div class="about">
    <router-link :to="{ name: 'index' }">X</router-link>
    {{cipher.ABOUT.text}}
    {{cipher.ABOUT.source.url}}
    {{cipher.INPUTS}}
  </div>
</template>

<script>
import { getCipherByKey } from '@/ciphers'

export default {
  name: 'about',
  props: ['cipherKey'],
  data () {
    return {
      cipher: getCipherByKey(this.cipherKey)
    }
  },
  beforeCreate () {
    let $body = document.getElementsByTagName('body')[0]
    $body.classList.add('body--with-modal')
  },
  beforeDestroy () {
    let $body = document.getElementsByTagName('body')[0]
    $body.classList.remove('body--with-modal')
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 50%;
  min-width: 30.0em; // 300px
  max-width: 50.0em; // 500px
}
</style>
