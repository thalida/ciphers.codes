<template>
  <div
    class="modal"
    role="dialog"
    :aria-label="modalAriaLabel">
    <div class="modal__header">
      <div class="modal__close">
        <router-link
          :to="{ name: 'index' }"
          aria-label="Close modal"></router-link>
      </div>
    </div>

    <div class="modal__main content-frame">
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

<style lang="scss">
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
    overflow: auto;
    z-index: 1;
  }

  &__header {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin: 1.6em 5%;
    padding: 1.6em;
    background-color: $color__background;
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

        @media (max-width: 50.0em) {
          box-shadow: 0 0 0.4em rgba($color__background, 0.3);
        }
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
