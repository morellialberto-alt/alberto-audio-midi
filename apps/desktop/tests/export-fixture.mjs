import { mkdir, writeFile } from "node:fs/promises";
import { createG4Fixture, assertG4Project, serializeG4Project } from "../../../dist/src/core/index.js";
import { exportProjectMidi } from "../midi.mjs";

const project = createG4Fixture();
assertG4Project(project);
await mkdir(".ci", { recursive: true });
await writeFile(".ci/g4-fixture.mid", exportProjectMidi(project));
await writeFile(".ci/g4-project.json", serializeG4Project(project), "utf8");
console.log("G4 MIDI fixture written; tracks=" + project.tracks.length);
