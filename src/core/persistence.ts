import { assertG4Project, type G4Project } from "./project.js";
import { sortNoteEvents } from "./events.js";

/**
 * The G4 JSON format is a probe of recoverability, not the final M05 project schema.
 * Always project to a known allowlist of fields; ignore untrusted object extensions.
 */
export function serializeG4Project(project: G4Project): string {
  assertG4Project(project);
  const data = {
    schemaVersion: 1,
    engineVersion: project.engineVersion,
    ppq: project.ppq,
    tempoBpm: project.tempoBpm,
    timeSignature: {
      numerator: project.timeSignature.numerator,
      denominator: project.timeSignature.denominator,
    },
    tracks: project.tracks.map(track => ({
      id: track.id,
      sectionId: track.sectionId,
      ...(track.laneId === undefined ? {} : { laneId: track.laneId }),
      name: track.name,
      channel: track.channel,
      notes: sortNoteEvents(track.notes).map(note => ({
        start: note.start, duration: note.duration,
        pitch: note.pitch, velocity: note.velocity,
      })),
    })),
  };
  return JSON.stringify(data, null, 2) + "\n";
}

/** Reject malformed, unsupported and ambiguous projects before replacing the active project. */
export function parseG4Project(json: string): G4Project {
  if (typeof json !== "string") throw new TypeError("Expected JSON text");
  let candidate: unknown;
  try {
    candidate = JSON.parse(json) as unknown;
  } catch {
    throw new RangeError("Malformed project JSON");
  }
  assertG4Project(candidate);
  // Return a detached, canonical, validated project with no extra input fields.
  return JSON.parse(serializeG4Project(candidate)) as G4Project;
}
