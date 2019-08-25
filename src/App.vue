<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
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
  background: #fff;
  font: normal normal 62.5%/1.2 'Signika', Arial, sans-serif;
  color: #001D56;
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
h3 {
  margin: 0;
  padding: 0;
}

h1,
h2 {
  font-size: 1.8em // 18px
}

h3 {
  font-size: 1.6em // 16px
}

a {
  color: #2B73FF;
  text-decoration: underline;

  &:hover {
    background-color: #FFEEC3;
  }
}
</style>
