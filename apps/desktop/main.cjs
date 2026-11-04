"use strict";
const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const { readFile, writeFile, rename, unlink } = require("node:fs/promises");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { randomUUID } = require("node:crypto");

if (require("electron-squirrel-startup")) app.quit();

let window;
const openCore = () => import(pathToFileURL(path.join(__dirname, "core", "index.js")).href);
const openMidi = () => import(pathToFileURL(path.join(__dirname, "midi.mjs")).href);

async function saveSafely(filePath, content) {
  const temporary = filePath + "." + randomUUID() + ".tmp";
  try {
    await writeFile(temporary, content, { flag: "wx" });
    await rename(temporary, filePath);
  } catch (error) {
    await unlink(temporary).catch(() => {});
    throw error;
  }
}

function registerApi() {
  ipcMain.handle("g4:fixture", async () => (await openCore()).createG4Fixture());

  ipcMain.handle("g4:load", async () => {
    const selection = await dialog.showOpenDialog(window, {
      title: "Apri progetto G4",
      properties: ["openFile"],
      filters: [{ name: "Progetti ALBERTO", extensions: ["json"] }],
    });
    if (selection.canceled || !selection.filePaths[0]) return { canceled: true };
    const core = await openCore();
    const data = await readFile(selection.filePaths[0], "utf8");
    return { canceled: false, project: core.parseG4Project(data) };
  });

  ipcMain.handle("g4:save", async (_event, project) => {
    const core = await openCore();
    const payload = core.serializeG4Project(project);
    const selection = await dialog.showSaveDialog(window, {
      title: "Salva progetto G4",
      defaultPath: "alberto-g4.aam.json",
      filters: [{ name: "Progetti ALBERTO", extensions: ["json"] }],
    });
    if (selection.canceled || !selection.filePath) return { canceled: true };
    await saveSafely(selection.filePath, payload);
    return { canceled: false };
  });

  ipcMain.handle("g4:export", async (_event, project) => {
    const core = await openCore();
    core.assertG4Project(project);
    const selection = await dialog.showSaveDialog(window, {
      title: "Esporta Standard MIDI File Type 1",
      defaultPath: "alberto-g4.mid",
      filters: [{ name: "Standard MIDI File", extensions: ["mid", "midi"] }],
    });
    if (selection.canceled || !selection.filePath) return { canceled: true };
    const { exportProjectMidi } = await openMidi();
    await saveSafely(selection.filePath, Buffer.from(exportProjectMidi(project)));
    return { canceled: false };
  });
}

function createWindow() {
  window = new BrowserWindow({
    width: 850, height: 620, minWidth: 640, minHeight: 460,
    title: "ALBERTO AUDIO/MIDI — G4",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true, sandbox: true, nodeIntegration: false,
      webSecurity: true,
    },
  });
  window.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  window.webContents.on("will-navigate", (event) => event.preventDefault());
  window.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  registerApi();
  createWindow();
}).catch(error => {
  dialog.showErrorBox("Avvio G4 non riuscito", String(error));
  app.quit();
});
app.on("window-all-closed", () => app.quit());
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
