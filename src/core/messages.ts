import { assertG4Project, type G4Project } from "./project.js";

export interface TimedNoteMessage {
  readonly tick: number;
  readonly type: "on" | "off";
  readonly trackId: string;
  readonly channel: number;
  readonly pitch: number;
  readonly velocity: number;
}

/** Non-mutating playback/export boundary; note-offs precede note-ons at same tick. */
export function toTimedNoteMessages(project: G4Project): TimedNoteMessage[] {
  assertG4Project(project);
  const messages: TimedNoteMessage[] = [];
  for (const track of project.tracks) for (const note of track.notes) {
    messages.push({ tick: note.start, type: "on", trackId: track.id, channel: track.channel, pitch: note.pitch, velocity: note.velocity });
    messages.push({ tick: note.start + note.duration, type: "off", trackId: track.id, channel: track.channel, pitch: note.pitch, velocity: 0 });
  }
  return messages.sort((a,b) => a.tick - b.tick ||
    (a.type === b.type ? 0 : a.type === "off" ? -1 : 1) ||
    a.channel - b.channel || a.pitch - b.pitch ||
    (a.trackId < b.trackId ? -1 : a.trackId > b.trackId ? 1 : 0) ||
    a.velocity - b.velocity);
}
