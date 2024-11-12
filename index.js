// commonjs
// const { app, BrowserWindow } = require('electron')
// const path = require('node:path')
// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })
//   // console.log(path.join(__dirname, 'preload.js'))
//   // D:\\WorkSpace\\1MOM\\my-electron-app\\preload.js
//   win.loadFile('index.html')
// }


//esm
import { fileURLToPath } from 'node:url'
import {app, BrowserWindow} from "electron"
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: fileURLToPath(new URL('./preload.js',import.meta.url).href)
      // preload: fileURLToPath(import.meta.resolve('./preload.js'))
    }
  })
  // console.log(new URL('./preload.js',import.meta.url))
  // console.log(import.meta.resolve('./preload.js'))
  win.loadFile('index.html')
}
// 共同
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
