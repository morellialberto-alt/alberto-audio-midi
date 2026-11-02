# CI_GATES — Contratto di qualità

Stato: M02 / G2. Nessuna CI del progetto configurata né verificata. I check obbligatori verranno fissati a G3, dopo la scelta della toolchain.

## Stati separati
PREPARED: file preparati senza certificazione remota.
CI RUNNING: run reale sul SHA candidato.
CI GREEN: tutti i job richiesti conclusi con successo sul SHA candidato.
CI RED: almeno un job richiesto fallito.
FQ PASS: test applicabili, audit e prove manuali, evidenze e approvazione del PO.
MERGED: integrazione su main, separata da CI/FQ.

## Gate G2
- Repository, default branch, accessi e visibilità verificati.
- AGENTS, handoff, stato, template PR e struttura test presenti e riletti sul remoto.
- work branch e PR Draft operativi; main invariato dopo inizializzazione.
- Protezioni main dichiarate attive solo se realmente verificate.
- PROJECT_INDEX Drive aggiornato con link reali.

## Gate G3
- Stack/toolchain approvata, scaffold minimo e primo workflow Actions attivo.
- Build/test minimi verdi sul PR HEAD SHA verificato.
- Required checks solo dopo esistenza e stabilità del job e permessi adeguati.

## M04–M08
- Test unitari e integrazione secondo la Product Charter.
- MIDI: parser indipendente e importazione manuale Studio One.
- Audio: offline, Play/Stop/Loop, nessuna nota sospesa.
- Progetti: round-trip, errori, versioni.
- Determinismo: input/seed/versione riproducibili.
- FQ: prove, SHA e consenso PO. Nessuna promozione per supposizioni.

## Addendum corrente M03/G3 (2026-11-02)
La precedente affermazione "nessuna CI configurata" è fotografia pre-G2: workflow G2 governance-docs verificato SUCCESS sul PR HEAD 74a00c107d42f3da2a5b7fbd09449b141ac50ce3 (run 41347778777), PR #1 merged. Non prova build applicativa.
G3 definisce due check applicativi Windows: g3-head-windows (SHA esatto della PR) e g3-merge-windows (SHA del merge candidate). Ciascuno esegue npm ci, typecheck, build, test. Non dichiarare GREEN prima di run completed/success associati agli SHA osservati.
Required status checks: non configurati; eventuale attivazione soltanto dopo stabilità verificata e permessi adeguati.
FQ PASS e MERGED richiedono ulteriori decisioni esplicite del PO.
