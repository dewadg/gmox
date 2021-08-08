const { dialog } = require('electron')

function handleChooseSingleFile() {
  return async () => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ['openFile']
      })
  
      return (!result || !result.filePaths || !Array.isArray(result.filePaths))
        ? undefined
        : result.filePaths[0]
    } catch (error) {
      console.error('Error while opening file dialog', error)
    }
  }
}

module.exports = {
  handleChooseSingleFile
}
