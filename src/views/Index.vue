<template>
  <div class="index">
    <h1>
      <router-link :to="{ name: 'index' }">
        cipher.codes
      </router-link>
    </h1>

    <section class="input-area">
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
        class="textarea textarea--fancy"
        :placeholder="textareaPlaceholder"
        v-model="inputStr">
      </textarea>
    </section>

    <section class="ciphers">
      <Cipher
        v-for="cipherKey in cipherKeys"
        :key="cipherKey"
        :cipher-key="cipherKey"
        @copy-success="handleCopySuccess"
        @copy-error="handleCopyError" />
    </section>

    <div
      class="toast"
      v-show="toast.isVisible">
      {{ toast.message }}
    </div>

    <footer>
      <a href="https://thalida.me" target="_blank">uni</a>
    </footer>

    <div class="modal">
      <router-view :key="$route.path"></router-view>
    </div>
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
      cipherKeys: CIPHER_KEYS,
      toast: {
        isVisible: false,
        timeout: null,
        message: null
      }
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
  },
  methods: {
    renderToast (type, res) {
      if (this.timeoutID !== null) {
        window.clearTimeout(this.toast.timeout)
      }

      let message = ''
      if (type === 'copy:success') {
        message = `Copied ${res.cipher.NAME} text to clipboard`
      } else if (type === 'copy:error') {
        message = `Error copying ${res.cipher.NAME} text`
      }

      this.toast.isVisible = true
      this.toast.message = message

      this.toast.timeout = window.setTimeout(() => {
        this.toast.isVisible = false
        this.toast.message = null
        this.toast.timeout = null
      }, 3000)
    },
    handleCopySuccess (cipher) {
      this.renderToast('copy:success', {cipher})
    },
    handleCopyError (cipher) {
      this.renderToast('copy:error', {cipher})
    }
  }
}
</script>
