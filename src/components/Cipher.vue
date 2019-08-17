<template>
  <div :id="cipherId" class="cipher">
    {{cipher.KEY}}
    {{cipher.NAME}}
  </div>
</template>

<script>
import * as ciphers from '@/ciphers'

export default {
  name: 'Cipher',
  props: {
    importKey: String
  },
  computed: {
    cipher () {
      return new ciphers[this.importKey]()
    },
    cipherId () {
      return `cipher-${this.cipher.KEY}`
    }
  }
}
</script>

<style scoped lang="scss">

</style>
