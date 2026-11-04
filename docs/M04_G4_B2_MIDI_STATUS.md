# M04 / G4 — B2 MIDI independent parser
Data: 2026-11-04
Stato: IMPLEMENTED / CI TO VERIFY. G4 NOT FQ PASS.

## Recupero remoto prima del lotto
main SHA 48085fd53e7580f56dbab22a86818b1f6e6859df.
PR Draft #4 e sola PR aperta; HEAD e5221f6257bf49728e1bce76af11b81a57279954.
G3 Windows CI e governance SUCCESS sul candidato precedente; ruleset main ACTIVE.
Product Charter v1.1, ADR-0004 D1-D7, PD-0001, PROJECT_INDEX verificati.
Classificazione: CONSISTENTE, nessuno staging persistente.

## Single-Writer Epoch
ID: M04-20261104-B2-midi-02
Writer: ChatGPT
Branch: work/M04-windows-midi-poc
Scope: adapter @tonejs/midi, fixture export, parser Mido indipendente, test Windows,
lockfile delle sole dipendenze PoC e documentazione del lotto B2.
Baseline branch: e5221f6257bf49728e1bce76af11b81a57279954.
Stato: ACQUIRED fino a verifica, handoff e successivo RELEASED.
Non e un lock distribuito.

## Verifiche
Il codice crea un file Standard MIDI File Type 1 da una fixture G4,
con due tracce musicali, canali 1 e 10 (indici 0 e 9), tempo 120 BPM,
metrica 4/4, PPQ 480, Note On e Note Off e velocity preservati.
La validazione indipendente e eseguita con Mido 1.3.3 in GitHub Actions Windows.
Il package-lock dell'app viene generato una sola volta sul runner e riportato sul branch
dall'operatore dopo verifica, non dal bot; finche non e committato, B2 non e stabilizzato.
Nessun sample o asset sonoro esterno e incluso.

## Non ancora dimostrato
Pacchetto Electron Windows, audio, persistenza file su disco,
offline e import manuale Studio One; tutti M04 in progresso.

## CI indipendente dopo lockfile versionato
Lo SHA 5d5c8153f9be47e4d5d53ac78f0358f7c636a4fe ha superato:
- G4 MIDI Independent Validation run 41828744090 SUCCESS
- G3 Application CI run 41828744159 SUCCESS (head/merge)
- G2 Governance Validation run 41828744077 SUCCESS
apps/desktop/package-lock.json e stato verificato in lettura: npm lockfile v3, Tonejs MIDI 2.0.28.
Il nuovo workflow G4 richiede ora due job separati, g4-midi-head-windows e g4-midi-merge-windows,
su PR HEAD e merge candidate, senza risoluzione dinamica delle dipendenze.
La pubblicazione di tale workflow richiede nuova verifica CI su SHA aggiornato.

## Chiusura sottolotto B2 MIDI (evidenze remote)
Ultimo candidato funzionale: 65c07ef7a3c00af6acf7d73cc135ce0bbf660411.
G4 MIDI Independent Validation run 41829131840 SUCCESS sullo stesso HEAD:
g4-midi-head-windows SUCCESS e g4-midi-merge-windows SUCCESS.
G3 Application CI run 41829131980 SUCCESS, governance 41829131837 SUCCESS.
Il lockfile npm V3 apps/desktop/package-lock.json è presente nel branch.
La verifica indipendente Mido conserva tutte le 9 note della fixture, velocity,
durata, tempo, metrica, canali e due tracce musicali in SMF Type 1.
B2 livello core/persistenza in memoria e export/parser CI è CI GREEN.
Ancora NON qualificata l'apertura/salvataggio file tramite UI/Windows, che è B3.
Epoch M04-20261104-B2-midi-02: RELEASED con questo handoff.
G4 FQ NON ESEGUITA e nessun merge autorizzato.
