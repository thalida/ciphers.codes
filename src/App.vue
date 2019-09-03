<template>
  <router-view id="app" />
</template>

<style lang="scss">
@import './assets/css/_variables';

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
}

/**
 * Render the `main` element consistently in IE.
 */

main {
  display: block;
}

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
  ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

// =============================================================================

// https://www.paulirish.com/2012/box-sizing-border-box-ftw/
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}

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
.content-frame {
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  width: 50%;
  min-width: 30.0em; // 300px
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

p {
  font-size: 1.6em; // 16px
}

a {
  color: $color__link;
  font-size: 1.6em; // 16px
  text-decoration: underline;
  backgorund-color: transparent;
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
    height: 4.8em;
    width: 4.8em;

    img {
      height: 100%;
    }
  }
}
</style>
