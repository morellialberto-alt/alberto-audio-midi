# M04 / G4 — B1: contratto temporale e primo fixture
Data: 2026-11-04
Stato: IMPLEMENTAZIONE B1 IN VERIFICA. NON FQ PASS.

## Approvazioni
Il Product Owner ha approvato separatamente D1-D7 e in seguito ha autorizzato espressamente la Fase B.
D1 Electron PoC; D2 PPQ 480 e tick interi; D3 MIDI SMF Type 1 e mapping GM solo di prova;
D4 @tonejs/midi + parser indipendente Mido; D5 Web Audio API senza asset esterni;
D6 progetto JSON versionato; D7 lotti B1-B4, CI Windows e FQ.
D1 non costituisce approvazione definitiva del framework desktop.

## Recovery Audit live (precedente alle scritture)
Repository pubblico morellialberto-alt/alberto-audio-midi, permessi admin/push/pull.
main SHA 48085fd53e7580f56dbab22a86818b1f6e6859df.
PR #2 CLOSED/MERGED, run G3 41415947067 SUCCESS; governance 41415947005 SUCCESS.
Ruleset protect-main 26311423 ACTIVE, g3-head-windows + g3-merge-windows required, nessun bypass.
PR aperte: zero. Staging persistente NON CONFIGURATO. Drive Product Charter v1.1, DECISION_LOG e PROJECT_INDEX letti e coerenti; decisioni D1-D7 da riportare su Drive.
Audit classificato: CONSISTENTE, con snapshot README/CI_GATES precedenti a G3 da preservare come storico.
Un audit remoto non prova assenza di modifiche locali non pubblicate.

## Single-Writer Epoch
ID: M04-20261104-B1-01
Writer: ChatGPT / operatore tecnico delegato dal PO
Branch: work/M04-windows-midi-poc
Scope: soltanto core tempo/tracce/eventi, fixture, test, documenti di stato, package script B1.
Baseline main: 48085fd53e7580f56dbab22a86818b1f6e6859df
Acquired_at: 2026-11-04, dopo audit live.
Status: ACQUIRED al momento di preparazione B1; il rilascio richiede handoff verificato.
Non rappresenta un lock distribuito; nessuna scrittura a main autorizzata.

## Perimetro B1
Includere PPQ 480, conversione da tick a secondi, metrica, struttura di tracce con sectionId/laneId opzionale,
validazione di nomi/canali/eventi e reject di sovrapposizioni ambigue identico canale/pitch.
Fixture a 120 BPM, 4/4, 4 battute, due tracce, percussion reference sul canale 10 (indice 9).
Note Off prima di Note On al medesimo tick; ordinamento stabile e assenza di mutazione degli input.

## Vincoli B2-B4
Nessuna dipendenza audio/MIDI nuova installata nel lotto B1. B2: serializer, parser indipendente e persistenza.
B3: Electron Web Audio e packaging Windows. B4: report, CI/head+merge, handoff, prove manuali Windows/Studio One.
Nessuna funzionalita generativa M05, implementazione PD-0001 limitata alla futura estendibilita.
Nessuna spesa o licenza di distribuzione autorizzata. CI G4 e prove Windows NON ANCORA ESEGUITE.

## Verifica lotto B1 (2026-11-04)
Commit iniziale: b49b087cebbc05f86a156bbf0a3fdc6d811fd19c — CI run 41826507891 FAILED nella fase Test.
Causa verificata sui log: Node.js 24 esegue anche i test TypeScript sorgente con il comando node --test,
i cui import .js non esistono nel sorgente. Non e un difetto del core.
Correzione: npm test esegue esplicitamente i file di test compilati in dist/tests.
Candidato riqualificato: 773b8b95e54247b98b4fa97c78e3958ea6326ad1.
CI run 41826734789 COMPLETED/SUCCESS: g3-head-windows e g3-merge-windows SUCCESS,
entrambi con npm ci, typecheck, build e test. Governance run 41826734804 SUCCESS.
Il batch B1 e tecnicamente CI GREEN, non implica FQ G4 PASS o merge.
Single-Writer Epoch M04-20261104-B1-01: RELEASED dopo verifica remota del lotto B1;
questo addendum documentale completa l'handoff, la CI sullo SHA del nuovo addendum va verificata.
NEXT: Recovery Audit nuovo, nuova epoch B2; nessuna modifica a main.
