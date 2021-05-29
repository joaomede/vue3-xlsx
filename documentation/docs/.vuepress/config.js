const path = require('path');

module.exports = {
  title: 'Vue3-XLSX',
  description: 'XLSX made friendly by Vue 3',
  base: '/vue3-xlsx/',
  dest: './../docs',
  themeConfig: {
    repo: 'joaomede/vue3-xlsx',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    sidebar: ['/', '/guide/', {
      title: 'Components',
      sidebarDepth: 1,
      children: [
        '/components/xlsx-to-js',
        '/components/js-to-xlsx'
      ]
    }],
    displayAllHeaders: true // Default: false
  },
};
