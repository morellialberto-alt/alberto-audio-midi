"use strict";
const { contextBridge, ipcRenderer } = require("electron");

// Narrow IPC API; renderer cannot access arbitrary Node APIs or filesystem paths.
contextBridge.exposeInMainWorld("alberto", Object.freeze({
  fixture: () => ipcRenderer.invoke("g4:fixture"),
  open: () => ipcRenderer.invoke("g4:load"),
  save: (project) => ipcRenderer.invoke("g4:save", project),
  exportMidi: (project) => ipcRenderer.invoke("g4:export", project),
}));
