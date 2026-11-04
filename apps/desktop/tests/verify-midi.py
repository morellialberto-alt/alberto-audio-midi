"""Independent Mido parser check, not the serializer's own decoder."""
import json
from pathlib import Path

import mido

project = json.loads(Path(".ci/g4-project.json").read_text(encoding="utf-8"))
midi = mido.MidiFile(".ci/g4-fixture.mid")
assert midi.type == 1, f"Expected SMF type 1, got {midi.type}"
assert midi.ticks_per_beat == 480, midi.ticks_per_beat
assert len(midi.tracks) == len(project["tracks"]) + 1
assert any(m.type == "set_tempo" and m.tempo == 500000 for m in midi.tracks[0])
assert any(m.type == "time_signature" and (m.numerator, m.denominator) == (4, 4) for m in midi.tracks[0])

actual = {}
for track in midi.tracks:
    tick = 0
    name = None
    pending = {}
    notes = []
    for event in track:
        tick += event.time
        if event.type == "track_name":
            name = event.name
        if event.type == "note_on" and event.velocity > 0:
            key = (event.channel, event.note)
            assert key not in pending, f"Overlapping repeated note: {key}"
            pending[key] = (tick, event.velocity)
        elif event.type == "note_off" or (event.type == "note_on" and event.velocity == 0):
            key = (event.channel, event.note)
            assert key in pending, f"Unmatched note off: {key}"
            start, velocity = pending.pop(key)
            notes.append((start, tick - start, event.note, velocity, event.channel))
    assert not pending, f"Notes left playing in track {name}"
    if notes:
        assert name not in actual, f"Repeated track: {name}"
        actual[name] = sorted(notes)

expected = {}
for track in project["tracks"]:
    expected[track["name"]] = sorted(
        (note["start"], note["duration"], note["pitch"], note["velocity"], track["channel"])
        for note in track["notes"]
    )
assert actual == expected, f"Independent parser mismatch: actual={actual}; expected={expected}"
print(f"PASS: SMF Type 1, {len(actual)} tracks, tempo/meter, {sum(len(v) for v in actual.values())} exact notes")
