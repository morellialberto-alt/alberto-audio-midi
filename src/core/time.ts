/** G4 musical-time contract. Values are integer ticks until the playback boundary. */
export const PPQ = 480 as const;

export interface TimeSignature {
  readonly numerator: number;
  readonly denominator: number;
}

export function isTimeSignature(value: unknown): value is TimeSignature {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const { numerator, denominator } = value as Record<string, unknown>;
  return typeof numerator === "number" && Number.isSafeInteger(numerator) && numerator > 0 && numerator <= 255 &&
    typeof denominator === "number" && Number.isSafeInteger(denominator) && denominator > 0 && denominator <= 128 &&
    (denominator & (denominator - 1)) === 0 &&
    Number.isSafeInteger(PPQ * 4 * numerator / denominator);
}

export function ticksPerBar(signature: TimeSignature): number {
  if (!isTimeSignature(signature)) throw new RangeError("Invalid time signature");
  return PPQ * 4 * signature.numerator / signature.denominator;
}

export function ticksToSeconds(ticks: number, bpm: number): number {
  if (!Number.isSafeInteger(ticks) || ticks < 0 || !Number.isFinite(bpm) || bpm <= 0) {
    throw new RangeError("Invalid ticks or tempo");
  }
  const seconds = ticks / PPQ * 60 / bpm;
  if (!Number.isFinite(seconds)) throw new RangeError("Time overflow");
  return seconds;
}
