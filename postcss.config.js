module.exports = {
    plugins: [
    require('cssnano')({
      preset: 'default',
    }),
    require('autoprefixer'),
    require('postcss-sort-media-queries')({
      sort: 'mobile-first',
    }),
  ],
}
