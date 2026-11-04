# M04/G4 — B3: Electron Windows PoC / Web Audio
Data: 2026-11-04
Stato: IMPLEMENTATION / CI UNVERIFIED. FQ G4 NOT APPROVED.

## PO authorization
D1-D7 APPROVED, then Fase B explicitly approved in the M04 operational chat.
Electron only for Windows 11 technical feasibility, not the definitive desktop architecture.
No new spending, distribution LICENSE, commercial sample, M05 features or merge authorized.

## Recovery Audit B3
main SHA 48085fd53e7580f56dbab22a86818b1f6e6859df, PR Draft #4 only open PR,
branch work/M04-windows-midi-poc HEAD ef28d6fd10b73776543bb128688c4ceadf543f5f.
Ruleset protect-main ACTIVE with required g3-head-windows + g3-merge-windows.
B2 MIDI run 41829131840 SUCCESS, B2 handoff run 41829396323 SUCCESS;
G3 run 41829396389 SUCCESS; governance 41829396370 SUCCESS.
Product Charter v1.1, ADR-0004 and PROJECT_INDEX consulted on Drive.
Audit classification: CONSISTENTE. Staging persistent: NOT CONFIGURED.

## Single-Writer Epoch
ID M04-20261104-B3-01
Writer: ChatGPT, PO-authorized technical operator.
Scope: Electron shell, IPC file adapters, Web Audio, Windows packaging, app dependency lock,
tests/CI and handoff only on work/M04-windows-midi-poc.
Baseline SHA: ef28d6fd10b73776543bb128688c4ceadf543f5f.
Status: ACQUIRED on 2026-11-04 after live Recovery Audit.
No distributed lock; RELEASED only after readback and handoff.

## Scope/limitations
Electron main in CJS, sandboxed context-isolated renderer, allowlisted IPC.
Filesystem operations only after Windows native file dialogs; validated project first.
Write temp+rename to avoid partial overwrite. JSON and MIDI payload from B2 modules.
Browser Web Audio oscillators locally synthesized, no soundfonts or assets and no cloud calls.
UI: Play/Stop/Loop, new fixture, Open/Save JSON and Export MIDI.
Not a synth product, no MIDI input hardware, no multitrack editor or M05 drum generator.
Electron Forge proof-of-concept packaging targets Windows ZIP and unsigned Squirrel Setup.exe.
Unsigned installers can show Microsoft SmartScreen; no code-signing certificates purchased.
First dependency lock generated in read-only GitHub Actions, must be published to branch by
authorized single writer then verified with npm ci; no CI PASS until checked on final SHA.

## B3 verification pending
Windows CI can prove package generated. It cannot prove physical audio, Windows 11
installation, network-disabled launch, human hearing or actual Studio One import.
Those require PO manual qualification with exact SHA and downloaded artifacts.
