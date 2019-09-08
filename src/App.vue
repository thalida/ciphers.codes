<template>
  <router-view id="app" />
</template>

<style lang="scss">
@import './assets/css/_variables';
@import './assets/css/normalize';

// body
// Base body styles including hiding scrollbars when modal is visible
// -----------------------------------------------------------------------------
body {
  padding: 0;
  margin: 0;
  font: normal normal 62.5%/1.2 'Signika', Arial, sans-serif;
  background: $color__background;
  color: $color__text;
}

.body--with-modal {
  overflow: hidden;
}

// .content-frame
// Wraps around all rendered content
// -----------------------------------------------------------------------------
.content-frame,
.index .input-form.vue-fixed-header--isFixed {
  display: flex;
  flex-flow: column nowrap;
  margin: 3.2em auto;
  width: 90%;
  max-width: 50.0em; // 500px
  opacity: 1;
}

// h1, h2, h3, p, a
// Reset and style the above base text styles
// -----------------------------------------------------------------------------
h1,
h2,
h3,
p,
header,
footer,
.header,
.footer {
  margin: 0;
  padding: 0;
  a {
    font-size: 1em;
  }
}

h1,
h2 {
  font-size: 1.8em; // 18px
  font-weight: 600;
}

h3 {
  font-size: 1.6em; // 16px
  font-weight: 600;
}

a {
  color: $color__link;
  font-size: 1.6em; // 16px
  text-decoration: underline;
  background-color: transparent;
  transition: background-color 300ms ease;

  &:hover {
    background-color: $color__link--hover;
  }
}

// ::selection
// Update text highlight / default selection color
// -----------------------------------------------------------------------------
::selection {
  background: $color__selection;
}

.site-title {
  margin: 1.6em 0;
  text-align: center;
}

footer,
.footer {
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  width: auto;
  justify-content: flex-end;

  .unicorn__link {
    height: 4em;
    width: 4em;

    img {
      height: 100%;
    }
  }
}
</style>
