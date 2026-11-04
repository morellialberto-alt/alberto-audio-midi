// Browser-only audio adapter. Core notes remain untouched.
let project = null;
let audioContext = null;
let voices = new Set();
let cycleTimer = null;
let playing = false;

const byId = (id) => document.getElementById(id);
const status = (message) => { byId("status").textContent = message; };
const secondsFor = (ticks) => ticks * 60 / (project.ppq * project.tempoBpm);

function describe() {
  if (!project) return;
  const total = project.tracks.reduce((n, track) => n + track.notes.length, 0);
  byId("description").textContent =
    project.tempoBpm + " BPM · " + project.timeSignature.numerator + "/" +
    project.timeSignature.denominator + " · " + project.ppq + " PPQ · " +
    project.tracks.length + " tracce · " + total + " note";
  byId("tracks").textContent = project.tracks.map((track) =>
    track.name + " | MIDI " + (track.channel + 1) + " | " + track.notes.length + " note").join("\n");
}

async function stop() {
  playing = false;
  if (cycleTimer !== null) { clearTimeout(cycleTimer); cycleTimer = null; }
  const context = audioContext;
  audioContext = null;
  if (context) {
    for (const oscillator of voices) {
      try { oscillator.stop(); } catch { /* already stopped */ }
      try { oscillator.disconnect(); } catch { /* already disconnected */ }
    }
    voices.clear();
    await context.close().catch(() => {});
  }
  status("Riproduzione interrotta. Nessuna voce attiva.");
}

function scheduleCycle(context, startTime) {
  if (!playing || !project || context !== audioContext) return;
  const attacks = 0.008;
  const endTick = Math.max(7680, ...project.tracks.flatMap(t => t.notes.map(n => n.start + n.duration)));
  for (const track of project.tracks) for (const note of track.notes) {
    const onset = startTime + secondsFor(note.start);
    const duration = secondsFor(note.duration);
    const finish = onset + duration;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = track.channel === 9 ? "triangle" : "sine";
    oscillator.frequency.value = 440 * Math.pow(2, (note.pitch - 69) / 12);
    const amplitude = (note.velocity / 127) * (track.channel === 9 ? 0.10 : 0.075);
    gain.gain.setValueAtTime(0, onset);
    gain.gain.linearRampToValueAtTime(amplitude, onset + Math.min(attacks, duration / 4));
    gain.gain.setValueAtTime(amplitude, Math.max(onset + attacks, finish - 0.01));
    gain.gain.linearRampToValueAtTime(0, finish);
    oscillator.connect(gain).connect(context.destination);
    oscillator.onended = () => { voices.delete(oscillator); oscillator.disconnect(); gain.disconnect(); };
    voices.add(oscillator);
    oscillator.start(onset);
    oscillator.stop(finish + 0.005);
  }

  const endTime = startTime + secondsFor(endTick);
  if (byId("loop").checked) {
    const leadSeconds = 0.3;
    const delayMs = Math.max(0, (endTime - context.currentTime - leadSeconds) * 1000);
    cycleTimer = setTimeout(() => scheduleCycle(context, endTime), delayMs);
  } else {
    cycleTimer = setTimeout(() => {
      if (audioContext === context) {
        stop().catch(() => {});
        status("Riproduzione completata.");
      }
    }, Math.max(0, (endTime - context.currentTime + 0.03) * 1000));
  }
}

async function play() {
  if (!project) throw new Error("Nessun progetto caricato");
  await stop();
  const context = new AudioContext();
  audioContext = context;
  await context.resume();
  playing = true;
  scheduleCycle(context, context.currentTime + 0.06);
  status(byId("loop").checked ? "Riproduzione in loop" : "Riproduzione avviata");
}

async function run(action) {
  try { await action(); }
  catch (error) { status("ERRORE: " + (error?.message ?? String(error))); }
}

byId("play").addEventListener("click", () => run(play));
byId("stop").addEventListener("click", () => run(stop));
byId("fixture").addEventListener("click", () => run(async () => {
  await stop();
  project = await window.alberto.fixture();
  describe();
  status("Fixture G4 ripristinata.");
}));
byId("save").addEventListener("click", () => run(async () => {
  if (!project) throw new Error("Nessun progetto");
  const result = await window.alberto.save(project);
  status(result.canceled ? "Salvataggio annullato" : "Progetto salvato localmente.");
}));
byId("open").addEventListener("click", () => run(async () => {
  const result = await window.alberto.open();
  if (result.canceled) { status("Apertura annullata"); return; }
  await stop();
  project = result.project;
  describe();
  status("Progetto riaperto e validato.");
}));
byId("export").addEventListener("click", () => run(async () => {
  if (!project) throw new Error("Nessun progetto");
  const result = await window.alberto.exportMidi(project);
  status(result.canceled ? "Esportazione annullata" : "File MIDI Type 1 esportato.");
}));
run(async () => { project = await window.alberto.fixture(); describe(); status("Pronto. L'audio è sintetizzato localmente."); });
