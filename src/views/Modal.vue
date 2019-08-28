<template>
  <div class="modal">
    <div class="content-frame">
      <div class="modal__close">
        <router-link :to="{ name: 'index' }" v-focus></router-link>
      </div>
      <CipherAbout :cipher-key="cipherKey" />
    </div>
  </div>
</template>

<script>
import CipherAbout from '@/components/cipher/CipherAbout.vue'

export default {
  name: 'modal',
  props: ['cipherKey'],
  components: { CipherAbout },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      },
      update: function (el) {
        el.focus()
      },
      componentUpdated: function (el) {
        el.focus()
      }
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

.modal {
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
}
</style>
