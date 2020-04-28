// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    alwaysOnTop: true,
  })
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  //mainWindow.loadURL(`https://meet.google.com`);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  //mainWindow.webContents.send('message','test')
  mainWindow.loadURL('https://meet.google.com');
  mainWindow.focus();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.on('ready', () => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Alt+X', () => {
    mainWindow.webContents?.send('toggleMute')
  })

  const ret2 = globalShortcut.register('Alt+C', () => {
    mainWindow.webContents?.send('endCall')
  })

  if (!ret || !ret2) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('Alt+X'))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('Alt+X')
  globalShortcut.unregister('Alt+C')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})