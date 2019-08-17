<template>
  <div class="index">
    <h1><a href="/">cipher.codes</a></h1>

    <div class="ciphers">
      <Cipher
        v-for="importKey in cipherImportKeys"
        :key="importKey"
        :import-key="importKey" />
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>
</template>

<script>
import * as ciphers from '@/ciphers'
import Cipher from '@/components/Cipher.vue'

export default {
  name: 'index',
  components: {
    Cipher
  },
  data () {
    return {
      cipherImportKeys: Object.keys(ciphers)
    }
  }
}
</script>
