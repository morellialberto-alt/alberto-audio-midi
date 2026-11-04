import test from "node:test";
import assert from "node:assert/strict";
import { PPQ, ticksPerBar, ticksToSeconds, isTimeSignature,
  assertG4Project, isG4Project, createG4Fixture, toTimedNoteMessages } from "../src/core/index.js";

test("G4: 480 PPQ, 4/4 tick conversions and 4 bars", () => {
  assert.equal(PPQ, 480);
  assert.equal(ticksPerBar({numerator:4,denominator:4}), 1920);
  assert.equal(ticksToSeconds(480,120),0.5);
  assert.equal(ticksToSeconds(7680,120),8);
  assert.equal(ticksToSeconds(480,60),1);
});

test("G4: reject invalid time and unsupported meter encodings", () => {
  for (const v of [-1,0.5,Infinity,NaN,Number.MAX_SAFE_INTEGER+1]) assert.throws(()=>ticksToSeconds(v,120), RangeError);
  for (const bpm of [0,-20,Infinity,NaN]) assert.throws(()=>ticksToSeconds(480,bpm),RangeError);
  for (const denominator of [0,3,256]) assert.equal(isTimeSignature({numerator:4,denominator}),false);
});

test("G4: validate fixture, stable track ids and future lane ids", () => {
  const fixture=createG4Fixture();
  assertG4Project(fixture);
  assert.equal(fixture.tracks.length,2);
  assert.equal(fixture.tracks[1].channel,9);
  assert.equal(isG4Project({...fixture, ppq:960}),false);
  assert.equal(isG4Project({...fixture, tracks:[fixture.tracks[0],fixture.tracks[0]]}),false);
  assert.equal(isG4Project({...fixture, tracks:[{...fixture.tracks[0], laneId:"kick"},
    {...fixture.tracks[1], sectionId:"melody", laneId:"kick"}]}),false);
});

test("G4: ambiguous same-pitch channel overlap rejected, contiguous notes accepted", () => {
  const fixture=createG4Fixture();
  const base=fixture.tracks[0];
  assert.equal(isG4Project({...fixture,tracks:[{...base,notes:[
    {start:0,duration:480,pitch:60,velocity:100},
    {start:479,duration:480,pitch:60,velocity:100},
  ]}]}),false);
  assert.equal(isG4Project({...fixture,tracks:[{...base,notes:[
    {start:0,duration:480,pitch:60,velocity:100},
    {start:480,duration:480,pitch:60,velocity:100},
  ]}]}),true);
});

test("G4: note-off before simultaneous note-on, preserving original data", () => {
  const fixture=createG4Fixture();
  const before=JSON.stringify(fixture);
  const messages=toTimedNoteMessages(fixture);
  const boundary=messages.filter(x=>x.tick===480 && x.channel===0);
  assert.deepEqual(boundary.map(x=>x.type),["off","on"]);
  assert.equal(messages.length,18);
  assert.equal(messages.at(-1)?.tick,7680);
  assert.equal(JSON.stringify(fixture),before);
  assert.deepEqual(toTimedNoteMessages(fixture),messages);
});
