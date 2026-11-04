import { isNoteEvent, type NoteEvent } from "./events.js";
import { PPQ, isTimeSignature, type TimeSignature } from "./time.js";

/** A section is logical; a future drum section can own multiple independent lanes. */
export interface MidiTrack {
  readonly id: string;
  readonly sectionId: string;
  readonly laneId?: string;
  readonly name: string;
  /** Zero-based MIDI channel: GM drums normally use 9 (channel 10). */
  readonly channel: number;
  readonly notes: readonly NoteEvent[];
}

export interface G4Project {
  readonly schemaVersion: 1;
  readonly engineVersion: string;
  readonly ppq: typeof PPQ;
  readonly tempoBpm: number;
  readonly timeSignature: TimeSignature;
  readonly tracks: readonly MidiTrack[];
}

/** Reject invalid and ambiguous projects before saving, playback or MIDI export. */
export function isG4Project(value: unknown): value is G4Project {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const data = value as Record<string, unknown>;
  if (data.schemaVersion !== 1 || data.ppq !== PPQ ||
      typeof data.engineVersion !== "string" || data.engineVersion.length === 0 ||
      typeof data.tempoBpm !== "number" || !Number.isFinite(data.tempoBpm) || data.tempoBpm <= 0 ||
      !isTimeSignature(data.timeSignature) || !Array.isArray(data.tracks) || data.tracks.length === 0) return false;

  const ids = new Set<string>();
  const laneIds = new Set<string>();
  const keyedNotes = new Map<string, Array<{start:number;end:number}>>();
  for (const candidate of data.tracks) {
    if (typeof candidate !== "object" || candidate === null || Array.isArray(candidate)) return false;
    const track = candidate as Record<string, unknown>;
    if (typeof track.id !== "string" || !/^[a-zA-Z0-9._-]+$/.test(track.id) || ids.has(track.id) ||
        typeof track.sectionId !== "string" || !/^[a-zA-Z0-9._-]+$/.test(track.sectionId) ||
        typeof track.name !== "string" || track.name.trim().length === 0 ||
        !Number.isInteger(track.channel) || (track.channel as number) < 0 || (track.channel as number) > 15 ||
        !Array.isArray(track.notes)) return false;
    ids.add(track.id);
    if (track.laneId !== undefined) {
      if (typeof track.laneId !== "string" || !/^[a-zA-Z0-9._-]+$/.test(track.laneId)) return false;
      const scoped = String(track.sectionId) + "/" + track.laneId;
      if (laneIds.has(scoped)) return false;
      laneIds.add(scoped);
    }
    for (const note of track.notes) {
      if (!isNoteEvent(note)) return false;
      const key = String(track.channel) + "/" + note.pitch;
      const group = keyedNotes.get(key) ?? [];
      group.push({ start: note.start, end: note.start + note.duration });
      keyedNotes.set(key, group);
    }
  }
  // A Note Off can silence another voice with identical pitch/channel.
  // Reject overlaps rather than silently altering a track, including across tracks.
  for (const intervals of keyedNotes.values()) {
    intervals.sort((a,b) => a.start-b.start || a.end-b.end);
    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i].start < intervals[i-1].end) return false;
    }
  }
  return true;
}

export function assertG4Project(value: unknown): asserts value is G4Project {
  if (!isG4Project(value)) throw new RangeError("Invalid G4 project");
}
