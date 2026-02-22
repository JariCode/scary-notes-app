const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const http = require("http");
const fs = require("fs");

let localServer = null;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#0b0f0c",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  Menu.setApplicationMenu(null);
  win.maximize();

  // 🔥 CSP - salli vain luotetut lähteet
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com https://apis.google.com; " +
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
          "font-src 'self' https://fonts.gstatic.com; " +
          "connect-src 'self' http://localhost:5173 http://localhost:3456 https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.firebase.com; " +
          "frame-src https://accounts.google.com https://*.firebaseapp.com; " +
          "img-src 'self' data: https:;"
        ]
      }
    });
  });

  // 🔥 Salli vain Firebase auth popupit (turvallisuus)
  win.webContents.setWindowOpenHandler(({ url }) => {
    // Salli vain Google/Firebase auth URLit
    if (url.includes("accounts.google.com") || 
        url.includes("firebaseapp.com") ||
        url.includes("googleapis.com")) {
      return { action: "allow" };
    }
    // Estä muut popupit
    return { action: "deny" };
  });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
  } else {
    // Asennusversio käyttää paikallista HTTP-serveria
    win.loadURL("http://localhost:3456");
  }
}

function startLocalServer() {
  return new Promise((resolve) => {
    if (!app.isPackaged) {
      resolve();
      return;
    }

    const distPath = path.join(__dirname, "dist");
    
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
    };

    localServer = http.createServer((req, res) => {
      // Estä path traversal hyökkäykset
      const sanitizedUrl = req.url.split("?")[0].replace(/\.\./g, "");
      let filePath = path.join(distPath, sanitizedUrl === "/" ? "index.html" : sanitizedUrl);
      
      // Varmista että polku on dist-kansiossa
      if (!filePath.startsWith(distPath)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }

      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distPath, "index.html");
      }

      const ext = path.extname(filePath);
      const contentType = mimeTypes[ext] || "application/octet-stream";

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
    });

    // Kuuntele VAIN localhost:ssa (127.0.0.1) - ei ulkoisesti
    localServer.listen(3456, "127.0.0.1", () => {
      console.log("Local server running on http://127.0.0.1:3456");
      resolve();
    });
  });
}

app.whenReady().then(async () => {
  await startLocalServer();
  createWindow();
});

app.on("window-all-closed", () => {
  if (localServer) {
    localServer.close();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});
