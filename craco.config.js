const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@blocks': path.resolve(__dirname, 'src/application/_blocks'),
      '@layout': path.resolve(__dirname, 'src/application/layout'),
      '@constants': path.resolve(__dirname, 'src/application/constants'),
      '@utils': path.resolve(__dirname, 'src/application/utils'),
      '@pages': path.resolve(__dirname, 'src/application/pages'),
    },
  },
}
