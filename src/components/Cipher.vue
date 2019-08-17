<template>
  <div :id="cipherId" class="cipher">
    {{cipher.KEY}}
    {{cipher.NAME}}
    {{inputStr}} {{isEncoding}}
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
    },
    inputStr () {
      console.log(this.$store.state.inputStr)
      return this.$store.state.inputStr
    },
    isEncoding () {
      console.log(this.$store.state.isEncoding)
      return this.$store.state.isEncoding
    }
  }
}
</script>

<style scoped lang="scss">

</style>
