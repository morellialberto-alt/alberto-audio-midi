# M04/G4 — B2: persistenza e percorso MIDI

Stato: IN CORSO / PARTIAL. NON FQ PASS.
PO ha approvato D1-D7 e separatamente autorizzato Fase B.
Baseline recuperata da remoto il 2026-11-04: main 48085fd53e7580f56dbab22a86818b1f6e6859df,
PR Draft #4 HEAD 60d0a06fa07cb23628c966e3c7f59df8be76445b.
Nessuna altra PR aperta, ruleset protect-main ACTIVE con g3-head-windows e g3-merge-windows.
CI HEAD 41827084333 SUCCESS, governance 41827084156 SUCCESS.
Drive Product Charter v1.1, DECISION_LOG ADR-0004 e PROJECT_INDEX verificati.
Audit B2: CONSISTENTE; staging persistente NON CONFIGURATO.

## Single-Writer Epoch
ID M04-20261104-B2-persistence-01.
Writer ChatGPT / operatore tecnico.
Scope: persistenza serializzazione JSON pura, test e documentazione B2, PR #4.
Branch work/M04-windows-midi-poc.
Baseline SHA 60d0a06fa07cb23628c966e3c7f59df8be76445b.
Status ACQUIRED al momento del lotto; RELEASED solo dopo handoff verificato.
Non rappresenta un lock distribuito.

## Sub-lotto B2-P
Aggiunta serializzazione canonica JSON e parsing/version validation senza dipendenze esterne,
nessuna operazione su filesystem e nessuna sostituzione del progetto attivo senza validazione.
Semantica e identita delle future lane conservate. Cinque test di round-trip, ordinamento,
dati corrotti, versione non supportata, estensioni inattese e lane ID.
Non dimostra salvataggio file su Windows, che richiede l'adapter desktop.

## Mancante in B2
Serializer @tonejs/midi, validazione con parser Mido indipendente, file SMF Type 1,
verifica su Windows/Studio One. Non dichiarare B2 completo senza tali evidenze.
Il lotto B3 con Electron/Web Audio e packaging non e iniziato.

## Chiusura sottolotto B2-P
HEAD verificata: 0d8f58b6c8b2d901d4dc90d9ce43baa93052e9a5.
Run 41827421626 COMPLETED/SUCCESS su g3-head-windows e g3-merge-windows
con npm ci, typecheck, build, tutti i test. Governance 41827421632 SUCCESS.
Il sottolotto B2-P e CI GREEN; questo non equivale a B2 completo.
Epoch M04-20261104-B2-persistence-01: RELEASED con questo handoff documentale;
verificare CI sul nuovo SHA prima di progressione. Nessuna modifica a main.
