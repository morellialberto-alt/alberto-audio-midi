# ARCHITECTURE — Stato e vincoli

Stato: requisiti di prodotto APPROVED; implementazione/tecnologia NON APPROVATE.

Windows 11 desktop preferito, installazione/offline; core musicale indipendente da UI e audio; salvataggio locale; preview sonora e Standard MIDI File Type 1.

## Alternative da qualificare a M04
A: desktop Windows con interfaccia web incorporata, Electron/Tauri da confrontare, NON selezionati.
B: applicazione Windows nativa, candidate famiglie .NET/C# e C++.
C: browser/PWA offline come fallback.

## Moduli logici
1. Core MIDI, griglia temporale, eventi.
2. Generatori drums, chords, bass, melody.
3. Persistenza del progetto e versionamento.
4. Playback audio locale.
5. MIDI export e parser indipendente nei test.
6. UI/editor e parametri.

## Decisioni aperte
Framework Windows definitivo, librerie, PPQ, formato file progetto, benchmark, asset sonori e licenze. Niente API a pagamento, dipendenze o framework scelti automaticamente.
