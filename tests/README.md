# Test G3 — Core eventi
Suite: tests/core.test.ts; TypeScript + node:test senza UI/audio.
Eseguire npm ci, npm run typecheck, npm run build, npm test in Node.js 24 LTS.
Verifiche: validazione runtime, pitch/velocity, start/duration, overflow, ordinamento canonico, immutabilità, input invalido.
Non interpretare i test G3 come qualificazione determinismo della generazione, MIDI export, persistenza, playback o Studio One.
