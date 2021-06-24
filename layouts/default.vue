<template>
  <div>
    <div class="wrapper">
      <div class="wrapper-top">
        <Header :title="'主页'" />
      </div>
      <div class="wrapper-content">
        <Nuxt />
      </div>
      <div class="wrapper-footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper-top {
  height: 104px;
}
.wrapper-content {
  min-height: calc(100vh);
  box-sizing: border-box;
  padding-bottom: 227px;
  padding-top: 104px;
  margin-top: -104px;
}
.wrapper-footer {
  width: 100%;
  position: relative;
  z-index: 1;
  height: 227px;
  margin-top: -227px;
}
</style>
