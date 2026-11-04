import ToneMidi from "@tonejs/midi";
const { Midi } = ToneMidi;

/** SMF Type 1 adapter. Business events and project validation live in the core. */
export function exportProjectMidi(project) {
  if (!project || project.ppq !== 480 || !Array.isArray(project.tracks)) {
    throw new RangeError("Expected validated 480-PPQ G4 project");
  }
  const midi = new Midi();
  if (midi.header.ppq !== 480) throw new RangeError("Unexpected serializer PPQ");
  midi.header.name = "ALBERTO AUDIO MIDI - G4";
  midi.header.setTempo(project.tempoBpm);
  midi.header.timeSignatures.push({
    ticks: 0,
    timeSignature: [project.timeSignature.numerator, project.timeSignature.denominator],
  });
  midi.header.update();
  for (const source of project.tracks) {
    const track = midi.addTrack();
    track.name = source.name;
    track.channel = source.channel;
    for (const note of source.notes) {
      track.addNote({
        midi: note.pitch,
        ticks: note.start,
        durationTicks: note.duration,
        velocity: note.velocity / 127,
      });
    }
  }
  return midi.toArray();
}
