module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: []  // 用于配置js、css等后缀名，一般不需要配置，有默认值
      alias: {
        // '@': 'src',  // 默认配置
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }

    }

  }
}