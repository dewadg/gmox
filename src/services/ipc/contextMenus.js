const { Menu, BrowserWindow } = require('electron')
const { REMOVE_PROTO } = require('../../constants/ipcEvents')

function handleNavbarListItemClick() {
  return (event, args) => {
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
  }
}

module.exports = {
  handleNavbarListItemClick
}
