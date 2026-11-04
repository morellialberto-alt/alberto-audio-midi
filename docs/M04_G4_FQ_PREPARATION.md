# M04 / G4 — Rapporto preparatorio FQ (non qualificazione)
Data: 2026-11-04
Stato: READY FOR PO MANUAL VERIFICATION, FQ NOT EXECUTED / NOT APPROVED.
Autorizzazioni: ADR-0004, D1–D7 approvate, Fase B separatamente approvata.
Repository: https://github.com/morellialberto-alt/alberto-audio-midi
PR: https://github.com/morellialberto-alt/alberto-audio-midi/pull/4, OPEN/DRAFT, NON MERGED.
Baseline main non modificata: 48085fd53e7580f56dbab22a86818b1f6e6859df.

## Evidenze al Recovery Audit B4
Ultimo SHA B3 handoff: a0a7e8f7d52165ac67aa10f3ff0b7972b51ae338.
G4 Windows Desktop Packaging run 41831310018 SUCCESS; job g4-desktop-head-windows
SUCCESS e g4-desktop-merge-windows SUCCESS.
G4 MIDI Independent Validation run 41831309971 SUCCESS, head e merge.
G3 Application CI run 41831309933 SUCCESS head e merge; governance run 41831309801 SUCCESS.
Questi run precedono il commit B4: CI finale e artefatto vanno riverificati sul nuovo HEAD.
Required checks main restano g3-head-windows e g3-merge-windows.
Staging persistente: NON CONFIGURATO. Nessuna spesa o LICENSE di distribuzione approvata.

## Matrice FQ G4 / evidenze
FQ-01 Baseline/PR/SHA: VERIFIED automaticamente; nuovo SHA da rileggere.
FQ-02 Build/typecheck Windows: CI GREEN su SHA B3, da ripetere su B4.
FQ-03 Core headless senza UI/audio: CI GREEN.
FQ-04 PPQ480/conversione tempo: CI unit PASS.
FQ-05 Note On/Off, durate, overlapping, ordinamento: CI unit PASS.
FQ-06 SMF Type1 e tracce: CI Mido PASS; export da UI da provare su PC.
FQ-07 Parser indipendente: CI Mido PASS, non sostituisce il controllo file reale della UI.
FQ-08 Persistenza: round-trip JSON in core CI PASS; salvataggio su file e riavvio PC NOT RUN.
FQ-09 JSON corrotto: parser CI PASS; UI e dati attivi su PC NOT RUN.
FQ-10 Packaging: ZIP/Setup.exe prodotto in CI; Windows 11 installazione/avvio NOT RUN.
FQ-11 Offline: NOT RUN su Windows 11.
FQ-12 Audio: Web Audio implementato; ascolto fisico Play/Stop/Loop NOT RUN.
FQ-13 PD-0001 estendibilita: track sectionId/laneId e round-trip CI PASS;
      nessuna implementazione delle lane batteria o rigenerazione, corretto scope G4.
FQ-14 Prestazioni: dimensione artifact osservata; RAM/startup, soglie approvate NOT RUN.
FQ-15 Licenze e sicurezza: app privata senza LICENSE/asset audio; review licenze
      transitive e distribuzione resta aperta prima della scelta definitiva.
FQ-16 Governance: ruleset active e PR draft, epoch controllate; finale da riverificare.

## Decisione
Il dossier e PREPARED. Non attribuire FQ PASS, PASS CON RISERVE o merge senza
i test reali Windows 11, offline, audio, persistenza e successiva decisione formale PO.
Se una prova e bloccante o fallisce, emettere FQ BLOCKED o FAIL e risolvere con nuova epoch.
La Fase C / FQ richiede una distinta valutazione del PO; nessun merge automatico.
Istruzioni: docs/M04_G4_WINDOWS_MANUAL_TEST.md.
