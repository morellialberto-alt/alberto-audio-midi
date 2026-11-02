import test from "node:test";
import assert from "node:assert/strict";
import { isNoteEvent, sortNoteEvents, type NoteEvent } from "../src/core/index.js";

const note: NoteEvent = Object.freeze({ start: 0, duration: 24, pitch: 60, velocity: 100 });

test("accepts a valid note and exact boundary values", () => {
  assert.equal(isNoteEvent(note), true);
  assert.equal(isNoteEvent({ start: 0, duration: 1, pitch: 0, velocity: 1 }), true);
  assert.equal(isNoteEvent({ start: 0, duration: 1, pitch: 127, velocity: 127 }), true);
});

test("rejects malformed and non-numeric data", () => {
  for (const input of [null, undefined, [], "note", {}, { ...note, pitch: "60" }, { ...note, velocity: null }]) {
    assert.equal(isNoteEvent(input), false);
  }
});

test("rejects pitch and velocity outside valid note ranges", () => {
  for (const pitch of [-1, 128, 0.5, Number.NaN, Infinity]) {
    assert.equal(isNoteEvent({ ...note, pitch }), false);
  }
  for (const velocity of [0, 128, 0.5, Number.NaN, -Infinity]) {
    assert.equal(isNoteEvent({ ...note, velocity }), false);
  }
});

test("rejects negative, fractional, missing and overflowing time", () => {
  for (const start of [-1, 0.25, Number.NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
    assert.equal(isNoteEvent({ ...note, start }), false);
  }
  for (const duration of [0, -1, 0.5, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(isNoteEvent({ ...note, duration }), false);
  }
  assert.equal(isNoteEvent({ ...note, start: Number.MAX_SAFE_INTEGER - 24, duration: 24 }), true);
});

test("sorts by start, pitch, duration, velocity and is permutation-independent", () => {
  const values: NoteEvent[] = [
    { start: 2, duration: 1, pitch: 61, velocity: 80 },
    { start: 0, duration: 2, pitch: 60, velocity: 90 },
    { start: 0, duration: 2, pitch: 60, velocity: 50 },
    { start: 0, duration: 1, pitch: 60, velocity: 100 },
    { start: 0, duration: 1, pitch: 50, velocity: 100 },
  ];
  const canonical = sortNoteEvents(values);
  assert.deepEqual(canonical, [values[4], values[3], values[2], values[1], values[0]]);
  assert.deepEqual(sortNoteEvents([...values].reverse()), canonical);
  assert.deepEqual(sortNoteEvents(canonical), canonical);
});

test("preserves input order and original event objects", () => {
  const second = Object.freeze({ ...note, start: 2 });
  const input = Object.freeze([second, note]);
  const output = sortNoteEvents(input);
  assert.deepEqual(input, [second, note]);
  assert.notStrictEqual(output, input);
  assert.strictEqual(output[0], note);
  assert.strictEqual(output[1], second);
});

test("rejects invalid events rather than silently sorting them", () => {
  assert.throws(() => sortNoteEvents([{ ...note, velocity: 0 }]), RangeError);
});
