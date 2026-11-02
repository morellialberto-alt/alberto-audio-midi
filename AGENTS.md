# AGENTS.md — Contratto normativo degli operatori

## Gerarchia
1. Sicurezza, policy GitHub e autorizzazioni.
2. Approvazioni e decisioni attuali del Product Owner.
3. Contratti tecnici versionati nel repository, salvo conflitti col PO.
4. Documenti autorevoli approvati su Drive: Product Charter v1.1, DECISION_LOG, PROJECT_INDEX.
5. Snapshot e handoff, mai sostitutivi delle verifiche live.

## Prodotto
Applicazione Windows offline per generare MIDI di batteria, accordi, basso, melodia; playback locale, progetto persistente, motore musicale separato da UI. Prototipo funzionale e MVP esteso distinti. Riproducibilità con seed e conservazione degli eventi bloccati obbligatorie.

Non approvati: stack specifico, licenza di distribuzione, spese ricorrenti, framework, architettura definitiva prima della prova M04.

## Protocollo di scrittura
- Recovery Audit live all'avvio di ciascuna sessione: repository, main, branch, PR, SHA, job e Drive.
- Prima delle scritture definire Single-Writer Epoch: ID, writer, branch, ambito, baseline SHA, data, lotto e stato.
- Operare solo su branch autorizzato, per lotti coerenti; niente force push o overwrite non giustificati.
- Branch work/Mxx-tema con Pull Request Draft; staging solo se realmente presente.
- main è di integrazione: niente commit diretti dopo l'inizializzazione autorizzata.
- Required checks configurabili soltanto se reali e stabili.
- Nessun merge senza CI sul SHA candidato, FQ positiva e approvazione esplicita del PO.
- Per ogni risultato indicare PREPARED, VERIFIED, CI GREEN, FQ PASS, BLOCKED, come effettivamente rilevato.

## Sicurezza pubblicazione
Niente chiavi, password, token, dati personali non necessari, documenti Drive privati, sample, soundfont o asset commerciali non verificati.
Nessuna LICENSE senza decisione PO; nessuna spesa ricorrente senza autorizzazione.

## Test e rilascio
CI G3 solo dopo toolchain approvata. Non attribuire CI o esiti a questo bootstrap.
Test futuri: seed/versione deterministici, invarianti locked parts, round-trip progetto, MIDI letto da parser indipendente, preview senza note sospese, test manuali Studio One.
Rileggere docs/OPERATIONAL_HANDOFF_CONTRACT.md e docs/CI_GATES.md.

## Decisione transitoria approvata M03/G3 (2026-11-02)
L'originaria clausola "stack specifico non approvato" riguarda l'architettura definitiva. Il Product Owner ha approvato TypeScript e Node.js 24 LTS solo come toolchain scaffold G3, registrata in ADR-0003 Drive. Framework desktop/audio, licenza e scelte PPQ/formato restano NON approvati. Nessun merge M03 autorizzato.
