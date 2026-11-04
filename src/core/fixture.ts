import { PPQ } from "./time.js";
import type { G4Project } from "./project.js";

/** Two-track four-bar G4 fixture; NOT a musical generator or drum-lane editor. */
export function createG4Fixture(): G4Project {
  return {
    schemaVersion: 1,
    engineVersion: "0.0.0-g4",
    ppq: PPQ,
    tempoBpm: 120,
    timeSignature: { numerator: 4, denominator: 4 },
    tracks: [
      { id: "melody", sectionId: "melody", name: "G4 Melody", channel: 0, notes: [
        { start: 0, duration: 480, pitch: 60, velocity: 96 },
        { start: 480, duration: 480, pitch: 64, velocity: 88 },
        { start: 960, duration: 960, pitch: 67, velocity: 100 },
        { start: 3840, duration: 960, pitch: 72, velocity: 90 },
        { start: 6720, duration: 960, pitch: 60, velocity: 80 },
      ] },
      { id: "drum-reference", sectionId: "drums", name: "G4 Drum Reference", channel: 9, notes: [
        { start: 0, duration: 120, pitch: 36, velocity: 110 },
        { start: 960, duration: 120, pitch: 38, velocity: 90 },
        { start: 1920, duration: 120, pitch: 36, velocity: 105 },
        { start: 2880, duration: 120, pitch: 38, velocity: 90 },
      ] },
    ],
  };
}
