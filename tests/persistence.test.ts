import test from "node:test";
import assert from "node:assert/strict";
import { createG4Fixture, parseG4Project, serializeG4Project, isG4Project } from "../src/core/index.js";

test("G4 JSON: project round-trip preserves metadata, notes and tracks", () => {
  const fixture = createG4Fixture();
  const stored = serializeG4Project(fixture);
  const loaded = parseG4Project(stored);
  assert.deepEqual(loaded,fixture);
  assert.equal(stored,serializeG4Project(loaded));
  assert.equal(loaded.ppq,480);
  assert.equal(loaded.tracks[1].channel,9);
});

test("G4 JSON: canonical sorting is permutation independent and non-mutating", () => {
  const fixture = createG4Fixture();
  const reversed = {
    ...fixture,
    tracks: [{ ...fixture.tracks[0], notes: [...fixture.tracks[0].notes].reverse() },fixture.tracks[1]],
  };
  const before = JSON.stringify(reversed);
  assert.equal(isG4Project(reversed),true);
  assert.equal(serializeG4Project(reversed),serializeG4Project(fixture));
  assert.equal(JSON.stringify(reversed),before);
});

test("G4 JSON: damaged, future-version and musically invalid files fail safely", () => {
  const fixture = createG4Fixture();
  for (const data of [
    "not-json",
    "{}",
    JSON.stringify({ ...fixture,schemaVersion:2 }),
    JSON.stringify({ ...fixture,ppq:960 }),
    JSON.stringify({ ...fixture,tracks:[{...fixture.tracks[0],notes:[
      {start:0,duration:100,pitch:60,velocity:100},
      {start:90,duration:100,pitch:60,velocity:100},
    ]}]}),
  ]) assert.throws(()=>parseG4Project(data),RangeError);
});

test("G4 JSON: future drum lane identity survives the round-trip", () => {
  const fixture = createG4Fixture();
  const drums = {...fixture.tracks[1],laneId:"kick-reference"};
  const source = {...fixture,tracks:[fixture.tracks[0],drums]};
  const loaded = parseG4Project(serializeG4Project(source));
  assert.equal(loaded.tracks[1].sectionId,"drums");
  assert.equal(loaded.tracks[1].laneId,"kick-reference");
});

test("G4 JSON: unknown properties do not get persisted", () => {
  const fixture = createG4Fixture();
  const loaded = parseG4Project(JSON.stringify({...fixture,secretMetadata:"excluded"}));
  assert.equal(Object.prototype.hasOwnProperty.call(loaded,"secretMetadata"),false);
});
