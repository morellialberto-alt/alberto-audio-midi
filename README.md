# ALBERTO AUDIO/MIDI

**Stato osservato alla baseline M03/G3 (2026-11-02): M02/G2 FQ PASS e PR #1 MERGED. Fase B M03 autorizzata dal Product Owner; G3 NON QUALIFICATO.**

Software Windows 11 per generare, modificare, ascoltare e salvare composizioni MIDI con batteria, accordi, basso e melodia. Motore musicale indipendente dalla UI e dall'audio. Prototipo funzionale e MVP esteso restano distinti.

## Toolchain preliminare G3
TypeScript 5.9.3, Node.js 24.22.2 LTS per test/build; tipi Node 24.19.2. Questa scelta riguarda solo G3: non determina framework Windows, PPQ, formato progetto o runtime audio.

Core: `src/core/events.ts`, `src/core/index.ts`. Eventi in tempo intero astratto, validazione runtime e ordinamento canonico senza mutazione. Nessuna generazione musicale, playback, UI o esportazione MIDI implementati.

## Verifiche
- `npm ci` (richiede accesso al registro npm durante il setup)
- `npm run typecheck`
- `npm run build`
- `npm test`

La CI G3 verifica PR HEAD e candidato di merge su runner Windows, con esiti distinti. Un risultato CI non equivale a FQ del PO né autorizza il merge.

## Governance
- Product Charter v1.1 APPROVED e ADR su Google Drive; contratti tecnici su GitHub.
- Branch `work/Mxx-tema`, PR Draft, Single-Writer Epoch e Recovery Audit live prima delle scritture.
- Nessun commit diretto su `main`; nessun merge senza CI sul commit candidato, FQ positiva e consenso PO.
- Repository pubblico: niente segreti, dati personali non necessari o asset privati.
- Nessuna LICENSE o spesa ricorrente senza decisione del PO.

Leggere `AGENTS.md` e `docs/OPERATIONAL_HANDOFF_CONTRACT.md`. Lo stato Git live prevale su snapshot.
