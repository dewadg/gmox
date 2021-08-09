const { Menu, BrowserWindow } = require('electron')
const { REMOVE_PROTO } = require('../../constants/ipcEvents')

function handleNavbarListItemClick() {
  return (event, args) => {
    try {
      const { protoName } = args

      const menu = Menu.buildFromTemplate([
        {
          label: 'Remove Proto',
          click: () => {
            event.sender.send(REMOVE_PROTO, { protoName })
          }
        }
      ])

      menu.popup(BrowserWindow.fromWebContents(event.sender))
    } catch (error) {
      console.error('Error while handling navbar list item click', error)
    }
  }
}

module.exports = {
  handleNavbarListItemClick
}
