module.exports = {
  presets: [
    '@vue/app'
  ],
  'plugins': [
    ['prismjs', {
      'languages': ['javascript', 'markup'],
      'plugins': ['autolinker', 'file-highlight'],
      'css': false
    }]
  ]
}
