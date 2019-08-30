<template>
  <div id="app">
    <header class="content-frame">
      <h1 class="site-title">
        <router-link class="site-link" :to="{ name: 'index' }">
          cipher.codes
        </router-link>
      </h1>
    </header>

    <router-view class="content-frame" />

    <!-- Unicorn footer -->
    <footer>
      <a class="unicorn__link" href="https://thalida.me" target="_blank">
        <img alt="unicorn emoji" src="./assets/unicorn.svg" />
      </a>
    </footer>
  </div>
</template>

<style lang="scss">
@import './assets/css/_variables';

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
footer {
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

// make the main header link look like normal text
.site-link {
  color: $color__text;
  text-decoration: none;
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
</style>
