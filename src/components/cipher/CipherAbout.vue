<template>
  <div class="cipher-about">
    <h1 class="cipher-about__header">{{cipher.NAME}}</h1>
    <div class="cipher-about__text">
      <p>{{cipher.ABOUT.text}}</p>
      <a :href="cipher.ABOUT.source.url" target="_blank">
        {{cipher.ABOUT.source.title}}
      </a>
    </div>

    <div class="cipher-about__inputs" v-if="cipherHasInputs">
      <h2>Inputs</h2>
      <div
        class="cipher-about__input"
        v-for="(input, index) in cipher.INPUTS"
        :key="index">
        <h3>{{input.label}}</h3>
        <p>{{input.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCipherByKey } from '@/ciphers'

export default {
  name: 'about',
  props: ['cipherKey'],
  data () {
    let cipher = getCipherByKey(this.cipherKey)
    const cipherHasInputs = (
      typeof cipher.INPUTS !== 'undefined' &&
      cipher.INPUTS !== null &&
      Array.isArray(cipher.INPUTS)
    )
    return {
      cipher,
      cipherHasInputs
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/_variables';

.cipher-about {
  p {
    margin: 0.5em 0 1em;
  }

  &__inputs {
    margin-top: 3.2em;
  }

  &__input {
    margin-top: 1.6em;
  }
}
</style>
