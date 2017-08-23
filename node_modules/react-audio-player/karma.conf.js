module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: [
      './spec/*_spec.js',
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      './spec/*_spec.js': ['webpack'],
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['react', 'es2015']
            }
          },
          {
            test: /\.ogg/,
            loader: 'file'
          }
        ],
        query: {
          presets: ['es2015']
        },
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
