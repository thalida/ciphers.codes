<template>
  <div class="about">
    learn about {{cipher}}
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
  components: {
    // HelloWorld
  }
}
</script>
