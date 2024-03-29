const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const api = require('./API/api.js')
const express = require('express');
const appExpress = express();
// ...
api(appExpress)


//const appExpress = require('./API/api.js')
//const appExpress = express();


//Import the Routes -> index.js
appExpress.get('/', function(req, res){
	res.send('Server is listening');
});



appExpress.listen(8000, () => {
  console.log("Sever is Running");
})




// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    
    width: 1200,
    height: 900,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
      }

  });



 // and load the index.html of the app.
 mainWindow.loadFile(path.join(__dirname, 'views/html/index.html'));
 // Open the DevTools.
 mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
 if (process.platform !== 'darwin') {
   app.quit();
 }
});

app.on('activate', () => {
 // On OS X it's common to re-create a window in the app when the
 // dock icon is clicked and there are no other windows open.
 if (BrowserWindow.getAllWindows().length === 0) {
   createWindow();
 }
});


ipcMain.on("open-new-window", function(event, arg) {
  var x = BrowserWindow.getCurrentWindow;
  x.loadFile(path.join(__dirname, 'views/html/sessionMain.html'));
});















