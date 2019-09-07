module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    config.module
      .rule('md')
      .use('markdown-loader')
      .loader('markdown-loader')
      .tap(() => {
        return {
          highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value
          },
          smartLists: true,
          smartypants: false,
          xhtml: false
        }
      })
  }
}
