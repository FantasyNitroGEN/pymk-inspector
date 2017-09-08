'use strict'

import { testing } from '../renderer/scripts/scrape'
import { app, ipcMain } from 'electron'
import menubar from 'menubar'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mb
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

ipcMain.on('async', (arg, event) => {
  testing(event, arg)
})

function createMenuBar () {
  mb = menubar({icon: require('path').join(__static, 'facebook-inspector.png'),
    index: winURL,
    alwaysOnTop: true
  })
  mb.on('ready', function () {
    console.log('app is ready')
  })
  // mb.on('after-create-window', function () {
  //   mb.window.webContents.openDevTools()
  // })
}

app.on('ready', createMenuBar)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mb === null) {
    createMenuBar()
  }
})

// import { app, BrowserWindow, ipcMain } from 'electron'
// let mainWindow
// function createWindow () {
//   /**
//    * Initial window options
//    */
//   mainWindow = new BrowserWindow({
//     height: 563,
//     useContentSize: true,
//     width: 1000
//   })

//   mainWindow.loadURL(winURL)
//   mainWindow.openDevTools()
//   mainWindow.on('closed', () => {
//     mainWindow = null
//   })
// }
// app.on('ready', createWindow)
// if (mainWindow === null) {
// createWindow()
// }
