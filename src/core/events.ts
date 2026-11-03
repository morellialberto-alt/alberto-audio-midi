/** Canonical note values in abstract non-negative integer time units (PPQ not yet chosen). */
export interface NoteEvent {
  readonly start: number;
  readonly duration: number;
  readonly pitch: number;
  readonly velocity: number;
}

/** Validate untrusted values at runtime; TypeScript declarations alone are insufficient. */
export function isNoteEvent(value: unknown): value is NoteEvent {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  const { start, duration, pitch, velocity } = value as Record<string, unknown>;
  return (
    typeof start === "number" && Number.isSafeInteger(start) && start >= 0 &&
    typeof duration === "number" && Number.isSafeInteger(duration) && duration > 0 &&
    start + duration <= Number.MAX_SAFE_INTEGER &&
    typeof pitch === "number" && Number.isInteger(pitch) && pitch >= 0 && pitch <= 127 &&
    typeof velocity === "number" && Number.isInteger(velocity) && velocity >= 1 && velocity <= 127
  );
}

/** Return a new sorted array without modifying the caller's array or events. */
export function sortNoteEvents(events: readonly NoteEvent[]): NoteEvent[] {
  for (const event of events) {
    if (!isNoteEvent(event)) {
      throw new RangeError("Invalid NoteEvent");
    }
  }
  return [...events].sort(
    (a, b) => a.start - b.start || a.pitch - b.pitch || a.duration - b.duration || a.velocity - b.velocity,
  );
}
