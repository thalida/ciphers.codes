<template>
  <div class="index">
    index.
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import * as ciphers from '@/ciphers/collection'
console.log(ciphers)
console.log((new ciphers.Affine()).run({ string: 'Acdefghijkl. Mnopqrs! Tuvwxyz' }))

export default {
  name: 'index',
  components: {
    // HelloWorld
  }
}
</script>
