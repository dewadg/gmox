const { dialog } = require('electron')

function handleChooseSingleFile() {
  return async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile']
    })

    return (!result || !result.filePaths || !Array.isArray(result.filePaths))
      ? undefined
      : result.filePaths[0]
  }
}

module.exports = {
  handleChooseSingleFile
}
