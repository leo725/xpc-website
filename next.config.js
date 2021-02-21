const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withCss = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
  require.extensions['.sass'] = file => {}
  require.extensions['.scss'] = file => {}
  require.extensions['.png'] = file => {}
  require.extensions['.jpg'] = file => {}
  require.extensions['.jpep'] = file => {}
  require.extensions['.gif'] = file => {}
}

const nextConfig = {
  distDir: 'build',
  cssModules: true,
  cssLoaderOptions: {
    localIdentName: '[local]___[hash:base64:5]',
  },
  poweredByHeader: false,
  webpack: (config) => {
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );
    return config;
  }
}


// const nextConfig = {
//   useFileSystemPublicRoutes: false,
//   distDir: 'build',
//   webpack: (config) => {
//     config.plugins.push(
//       new FilterWarningsPlugin({
//         exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
//       })
//     );
//     return config;
//   }
// };

// module.exports = withPlugins([

//   // add a plugin with specific configuration
//   [withSass, {
//     cssModules: true,
//     cssLoaderOptions: {
//       localIdentName: '[local]___[hash:base64:5]',
//     },
//   }],
//   [withCss, {
//     cssModules: true,
//     cssLoaderOptions: {
//       localIdentName: '[local]___[hash:base64:5]',
//     },
//   }],
//   withSourceMaps,
//   // add a plugin without a configuration
//   withImages,

// ], nextConfig);


module.exports = withPlugins([withSass(withCss(withSourceMaps())), withImages], nextConfig)

