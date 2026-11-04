# M04 / G4 — B4: candidate handoff / FQ preparation
Data: 2026-11-04
Stato: PREPARED, NON FQ PASS, Fase C non autorizzata.
Repository: https://github.com/morellialberto-alt/alberto-audio-midi
PR Draft #4: https://github.com/morellialberto-alt/alberto-audio-midi/pull/4
Main SHA: 48085fd53e7580f56dbab22a86818b1f6e6859df.
Branch: work/M04-windows-midi-poc.

## Recovery Audit B4, prima delle scritture
Baseline SHA branch: a0a7e8f7d52165ac67aa10f3ff0b7972b51ae338.
PR #4 unica PR aperta, DRAFT. Ruleset protect-main 26311423 ACTIVE.
g3-head-windows / g3-merge-windows required; no bypass, main invariata.
G4 desktop run 41831310018 SUCCESS head/merge; G4 MIDI 41831309971
SUCCESS head/merge; G3 run 41831309933 SUCCESS; governance 41831309801 SUCCESS.
Decisioni Charter v1.1, ADR-0004 e PROJECT_INDEX verificate su Drive.
Staging/workspace persistente NON CONFIGURATO, writer concorrenti non rilevati sul remoto.
Audit classification: CONSISTENTE.

## Single-Writer Epoch B4
ID: M04-20261104-B4-01
Writer: ChatGPT / PO delegated technical operator.
Branch: work/M04-windows-midi-poc
Scope: documentazione QA, protocollo prove PC, FQ preparatoria, stato operatore e PR metadata.
Baseline SHA: a0a7e8f7d52165ac67aa10f3ff0b7972b51ae338.
ACQUIRED dopo Recovery Audit B4.
RELEASED al termine del lotto documentale, subordinato al readback verificato
della pubblicazione e all'assenza di errori; se fallisce il readback, lo stato
operativo corretto resta ACQUIRED/UNKNOWN e richiede reconciliation.
Non e un lock distribuito.

## Handoff
Documenti di test: docs/M04_G4_WINDOWS_MANUAL_TEST.md e
docs/M04_G4_FQ_PREPARATION.md.
CI su commit precedente non trasferibile automaticamente al nuovo SHA;
il report finale deve rileggere CI/head/merge e artefatto dell'ultimo SHA.
NESSUN MERGE senza FQ approvata e autorizzazione PO separata.
Manual Windows 11/audio/offline/Studio One: NON ESEGUITI.
Nessun costo, sample commerciale, LICENSE o implementazione M05.
NEXT: manual PO Windows 11, rapporto FQ, decisione separata.
