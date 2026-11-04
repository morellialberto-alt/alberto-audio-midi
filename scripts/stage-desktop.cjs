"use strict";
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname,"..");
const source = path.join(root,"dist","src","core");
const dest = path.join(root,"apps","desktop","core");
if (!fs.existsSync(path.join(source,"index.js"))) {
  throw new Error("Core has not been built; run npm run build");
}
fs.rmSync(dest,{recursive:true,force:true});
fs.cpSync(source,dest,{recursive:true});
console.log("Staged independent compiled G4 core for Electron packaging.");
