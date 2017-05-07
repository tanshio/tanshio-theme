console.log(process.env.NODE_ENV)
let plugins = [
  require('postcss-import')(),
  require('postcss-nesting')(),
  require('postcss-custom-properties')({
    preserve: false
  }),
  require('postcss-custom-media')(),
  require('postcss-flexbugs-fixes')(),
  require('autoprefixer')()
]

// if (process.env.NODE_ENV === 'production') {
//   plugins.push(require('cssnano')())
//   plugins.push(require('postcss-banner')({
//     banner: banner,
//     important: true
//   }))
// }

module.exports = {
  plugins: plugins
}
