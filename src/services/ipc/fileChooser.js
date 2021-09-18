const { dialog } = require('electron')

function handleChooseFiles() {
  return async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
          {
            name: 'Proto',
            extensions: ['proto']
          }
        ]
      })

      return (!result || !result.filePaths || !Array.isArray(result.filePaths))
        ? undefined
        : result.filePaths
    } catch (error) {
      console.error('Error while opening file dialog', error)
    }
  }
}

module.exports = {
  handleChooseFiles
}
