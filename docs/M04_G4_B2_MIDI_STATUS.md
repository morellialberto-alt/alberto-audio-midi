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
