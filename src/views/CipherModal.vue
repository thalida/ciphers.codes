<template>
  <div
    class="cipher-modal"
    role="dialog"
    :aria-label="modalAriaLabel">
    <div class="content-frame">
      <div class="cipher-modal__close">
        <router-link
          :to="{ name: 'index' }"
          aria-label="Close modal"></router-link>
      </div>

      <h1>{{cipher.NAME}}</h1>
      <div>
        <p>{{cipher.ABOUT.text}}</p>
        <a :href="cipher.ABOUT.source.url" target="_blank">
          {{cipher.ABOUT.source.title}}
        </a>
      </div>

      <div class="cipher-modal__inputs" v-if="cipherHasInputs">
        <h2>Inputs</h2>
        <div
          class="cipher-modal__input"
          v-for="(input, index) in cipher.INPUTS"
          :key="index">
          <h3>{{input.label}}</h3>
          <p>{{input.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// https://github.com/davidtheclark/focus-trap
import createFocusTrap from 'focus-trap'

import { getCipherByKey } from '@/ciphers'

export default {
  name: 'modal',
  props: ['cipherKey'],
  data () {
    let cipher = getCipherByKey(this.cipherKey)
    return {
      cipher,
      cipherHasInputs: (
        typeof cipher.INPUTS !== 'undefined' &&
        cipher.INPUTS !== null &&
        Array.isArray(cipher.INPUTS)
      ),
      modalAriaLabel: `${cipher.NAME} informational modal`,
      focusTrap: null
    }
  },
  mounted () {
    let $body = document.getElementsByTagName('body')[0]
    $body.classList.add('body--with-modal')

    this.focusTrap = createFocusTrap(this.$el, {})
    this.focusTrap.activate()
  },
  beforeDestroy () {
    this.focusTrap.deactivate()

    let $body = document.getElementsByTagName('body')[0]
    $body.classList.remove('body--with-modal')
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/_variables';

.cipher-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color__background;

  .body--with-modal & {
    display: flex;
  }

  &__close {
    display: flex;
    align-self: flex-end;
    margin: 3.2em 0;

    a {
      display: flex;
      position: relative;
      justify-content: center;
      height: 2em;
      width: 2em;
      font-size: 1.2em;

      &::before,
      &::after {
        content: "";
        display: block;
        position: absolute;
        height: 2em;
        width: 0.2em;
        background-color: $color__link;
        border-radius: 0.2em;
        transition: all 300ms ease;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }

      &:hover {
        &::before {
          transform: rotate(90deg);
        }

        &::after {
          transform: rotate(-90deg);
        }
      }
    }
  }

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
