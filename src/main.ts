import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
  }
  });


  mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
  }));


  mainWindow.on("closed", () => {
  
  
  
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {


  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {


  if (mainWindow === null) {
    createWindow();
  }
});

