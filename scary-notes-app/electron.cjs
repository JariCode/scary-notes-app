const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#0b0f0c",
    autoHideMenuBar: true, // piilottaa valikkorivin Windowsissa
  });

  // Poistetaan menu kokonaan
  Menu.setApplicationMenu(null);

  // Avaa koko näytölle
  win.maximize();

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "dist", "index.html"));
  } else {
    win.loadURL("http://localhost:5173");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
