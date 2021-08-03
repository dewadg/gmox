const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  },
  configureWebpack: {
    plugins: [
      new MonacoEditorPlugin({
        languages: ['javascript', 'css', 'html', 'typescript', 'json']
      })
    ]
  }
}
