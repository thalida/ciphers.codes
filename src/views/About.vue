<template>
  <div class="about">
    <div class="about__close">
      <router-link :to="{ name: 'index' }" v-focus></router-link>
    </div>
    <h1>{{cipher.NAME}}</h1>
    <div class="about__text">
      <p>{{cipher.ABOUT.text}}</p>
      <a :href="cipher.ABOUT.source.url" target="_blank">
        {{cipher.ABOUT.source.title}}
      </a>
    </div>

    <div class="about__inputs" v-if="cipherHasInputs">
      <h2>Inputs</h2>
      <div
        class="about__input"
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
  },
  beforeCreate () {
    let $body = document.getElementsByTagName('body')[0]
    $body.classList.add('body--with-modal')
  },
  beforeDestroy () {
    let $body = document.getElementsByTagName('body')[0]
    $body.classList.remove('body--with-modal')
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/_variables';

.about {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  margin: 0 auto;
  width: 50%;
  min-width: 30.0em; // 300px
  max-width: 50.0em; // 500px
  opacity: 1;

  h3 {
    margin: 0;
  }

  p {
    margin: 0.4em 0;
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

  &__text a,
  &__input {
    font-size: 1.6em;
  }

  &__inputs {
    margin-top: 3.2em;
  }
}
</style>
