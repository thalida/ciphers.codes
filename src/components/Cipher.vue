<template>
  <div :id="cipherId" class="cipher">
    {{cipher.NAME}}
    {{outputStr}}
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
    isEncoding () {
      return this.$store.state.isEncoding
    },
    inputStr () {
      return this.$store.state.inputStr
    },
    outputStr () {
      return this.cipher.run({
        isEncoding: this.isEncoding,
        inputStr: this.inputStr
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
