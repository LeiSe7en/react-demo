const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (config, env) => {
  if (!config.plugins) {
    config.plugins = []
  }

  if (!config.optimization) {
    config.optimization = {}
  }

  config.optimization = { 
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: {
      name: 'runtime'
    }
  };

  if (env === 'production') {
    config.plugins.push(
      new BundleAnalyzerPlugin()
    )
  }
  return config
}