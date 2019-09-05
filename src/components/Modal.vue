<template>
  <div
    class="modal"
    role="dialog"
    :aria-label="modalAriaLabel">
    <div class="header modal__header content-frame">
      <h1>
        <router-link class="site-link" :to="{ name: 'index' }">
          cipher.codes
        </router-link>
      </h1>
      <div class="modal__close">
        <router-link
          :to="{ name: 'index' }"
          aria-label="Close modal"></router-link>
      </div>
    </div>

    <div class="main content-frame">
      <slot></slot>
    </div>

    <!-- Unicorn footer -->
    <div class="footer">
      <a
        class="unicorn__link"
        title="Creator website"
        href="https://thalida.me"
        target="_blank"
        rel="noopener">
        <img alt="" src="../assets/night-unicorn.svg" />
      </a>
    </div>
  </div>
</template>

<script>
// https://github.com/davidtheclark/focus-trap
import createFocusTrap from 'focus-trap'

export default {
  name: 'modal',
  props: {
    modalAriaLabel: String
  },
  data () {
    return {
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
@import '~@/assets/css/_variables';

.modal {
  display: none;
  position: fixed;
  flex-flow: column nowrap;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $color__background;

  .body--with-modal & {
    display: flex;
    z-index: 1;
  }

  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 3.2em auto;
  }

  &__close {
    display: flex;
    align-self: flex-end;

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
