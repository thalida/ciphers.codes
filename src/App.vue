<template>
  <div id="app">
    <router-view/>
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

#app {
  display: block;
  margin: 0 auto;
  width: 50%;
  min-width: 30.0em; // 300px
  max-width: 50.0em; // 500px
}

h1,
h2,
h3,
p {
  margin: 0;
  padding: 0;
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
  text-decoration: underline;
  backgorund-color: transparent;
  transition: background-color 300ms ease;

  &:hover {
    background-color: $color__link--hover;
  }
}

::selection {
  background: $color__selection;
}
</style>
