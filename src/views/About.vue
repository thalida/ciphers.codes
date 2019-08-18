<template>
  <div class="about">
      <router-link :to="{ name: 'index' }">
        X
      </router-link>
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
  }
}
</script>
