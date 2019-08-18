<template>
  <div class="index">
    <h1><a href="/">cipher.codes</a></h1>

    <div
      class="toggle"
      :class=[toggleClass]>
      <label
        for="encoding-toggle"
        class="toggle__label">
        <span class="toggle__text toggle__text--before">encode</span>
        <span class="toggle__symbol"></span>
        <span class="toggle__text toggle__text--after">decode</span>
      </label>

      <input
        id="encoding-toggle"
        class="toggle__input"
        type="checkbox"
        v-model="isEncoding" />
    </div>

    <textarea
      :placeholder="textareaPlaceholder"
      v-model="inputStr">
    </textarea>

    <div class="ciphers">
      <Cipher
        v-for="cipherKey in cipherKeys"
        :key="cipherKey"
        :cipher-key="cipherKey" />
    </div>

    <router-view :key="$route.path"></router-view>
  </div>
</template>

<script>
import { CIPHER_KEYS } from '@/ciphers'
import Cipher from '@/components/Cipher.vue'

export default {
  name: 'index',
  components: {
    Cipher
  },
  data () {
    return {
      cipherKeys: CIPHER_KEYS
    }
  },
  computed: {
    inputStr: {
      get () {
        return this.$store.state.inputStr
      },
      set (inputStr) {
        this.$store.commit('setInputStr', inputStr)
      }
    },
    isEncoding: {
      get () {
        return this.$store.state.isEncoding
      },
      set (isEncoding) {
        this.$store.commit('setIsEncoding', isEncoding)
      }
    },
    toggleClass () {
      const state = (this.isEncoding) ? 'yes' : 'no'
      return `toggle--${state}`
    },
    textareaPlaceholder () {
      const action = (this.isEncoding) ? 'encode' : 'decode'
      return `Enter text to ${action}...`
    }
  }
}
</script>
