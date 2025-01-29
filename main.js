

const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: (3 * width) / 4,
    height: (3 * height) / 4,
    x: width / 6,
    y: height / 6,
    icon: path.join(__dirname, './assets/icon.png'),
    titleBarStyle: 'hidden', // Hide the default title bar
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false // Ensure context isolation is disabled for node integration
    }
  });

  mainWindow.loadFile('index.html');

  // Handle minimize, maximize, and close events
  ipcMain.on('minimize-window', () => {
    mainWindow.minimize();
  });

  ipcMain.on('maximize-window', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('close-window', () => {
    mainWindow.close();
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});






