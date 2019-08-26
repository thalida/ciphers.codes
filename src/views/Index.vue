<template>
  <div class="index">
    <h1>
      <router-link :to="{ name: 'index' }">
        cipher.codes
      </router-link>
    </h1>

    <section class="input-section">
      <div
        class="toggle"
        :class=[toggleClass]>
        <label
          for="encoding-toggle"
          class="toggle__label"
          tabindex="0"
          v-on:keyup.enter="handleToggleEnter()">
          <span class="toggle__text toggle__text--on">encode</span>
          <span class="toggle__symbol"></span>
          <span class="toggle__text toggle__text--off">decode</span>
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

    <transition name="toast-fade" mode="out-in">
      <div
        class="toast"
        v-show="toast.isVisible">
        {{ toast.message }}
      </div>
    </transition>

    <footer>
      <a class="unicorn__link" href="https://thalida.me" target="_blank">
        <img src="../assets/unicorn.svg" />
      </a>
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
      const state = (this.isEncoding) ? 'on' : 'off'
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
        this.toast.timeout = null
      }, 3000)
    },
    handleCopySuccess (cipher) {
      this.renderToast('copy:success', { cipher })
    },
    handleCopyError (cipher) {
      this.renderToast('copy:error', { cipher })
    },
    handleToggleEnter () {
      this.isEncoding = !this.isEncoding
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/_variables';

.index {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  h1 {
    margin: 1.6em 0;
    text-align: center;

    // make the main header link look like normal text
    a {
      color: $color__text;
      text-decoration: none;
    }
  }

  footer {
    display: flex;
    width: 100%;
    justify-content: flex-end;

    .unicorn__link {
      height: 3.2em;
      width: 3.2em;

      img {
        height: 100%;
      }
    }
  }

  .input-section {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    overflow: hidden;
    margin-bottom: 3.2em;

    box-shadow: 0px 0px 3.2em $color__blue--darker--faded;
    border-radius: 1.6em;
  }

  .toggle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4.8em;
    background: $color__pink;

    &__input {
      visibility: hidden;
    }

    &__label {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      cursor: pointer;
    }

    &__text {
      font-size: 1.6em;
      opacity: 0.5;
      transition: all 300ms ease;
    }

    &__symbol {
      display: flex;
      position: relative;
      flex-flow: row nowrap;
      align-items: center;
      width: 3.2em;
      height: 0.4em;
      margin: 0 0.8em;
      border-radius: 0.4em;
      background-color: $color__purple;

      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 1.6em;
        height: 1.6em;
        border-radius: 50%;
        background-color: $color__pink--darker;
        transition: all 300ms ease;
      }
    }

    &.toggle--on .toggle__text--on,
    &.toggle--off .toggle__text--off {
        opacity: 1;
    }

    &.toggle--on .toggle__symbol::after {
      left: 0;
    }

    &.toggle--off .toggle__symbol::after {
      left: 1.6em;
    }

    // Highlight the state that'll be selected after enter / submit
    &.toggle--on .toggle__label:hover .toggle__text--off,
    &.toggle--off .toggle__label:hover .toggle__text--on {
      opacity: 1;
      text-shadow: 0 0 0.2em $color__yellow--darker;
    }
  }

  .textarea.textarea--fancy {
    border: 0;
    // Allow the text area to be resized vertically only
    resize: vertical;
    height: 8.0em;
    min-height: 4.0em;
    max-height: 16.0em;
    padding: 1.0em;
    border: 0.4em solid $color__white;
    font: normal normal 1.8em/1.2 'Signika', Arial, sans-serif;
    color: $color__text;
    transition: border 300ms cubic-bezier(0.65, 0.05, 0.36, 1);

    &:focus {
      outline: none !important;
      border: 0.4em solid $color__yellow;
    }
  }

  .toast {
    display: flex;
    position: fixed;
    align-self: center;
    bottom: 1.6em;
    margin: 0 auto;
    padding: 0.8em 1.6em;
    font-size: 1.4em;
    background-color: $color__blue--darker;
    color: $color__white;
    border-radius: 2em;
    box-shadow: 0px 0px 16px $color__blue--darker--faded;
    transition: all 300ms cubic-bezier(0.65, 0.05, 0.36, 1);
    opacity: 1;
  }

  .toast-fade-enter-active,
  .toast-fade-leave-active {
    transition: all 300ms ease;
  }

  .toast-fade-enter,
  .toast-fade-leave-active {
    bottom: -6.0em;
    opacity: 0;
  }

  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $color__background;
  }

  .body--with-modal & {
    .modal {
      display: flex;
    }
  }
}
</style>
