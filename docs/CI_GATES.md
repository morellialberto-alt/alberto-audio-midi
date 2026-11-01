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
