# M04/G4 — Protocollo di test manuale Windows 11
Versione: 2026-11-04
Stato: TEST NON ESEGUITI. Questo protocollo non certifica PASS.

## Contesto e provenienza
Repository: https://github.com/morellialberto-alt/alberto-audio-midi
Pull Request: https://github.com/morellialberto-alt/alberto-audio-midi/pull/4 (DRAFT)
Branch: work/M04-windows-midi-poc.
CI Windows B3 per candidato pre-B4: https://github.com/morellialberto-alt/alberto-audio-midi/actions/runs/41831310018
La CI finale post-B4 dovra essere letta al suo SHA prima dei test; NON riutilizzare automaticamente
un artefatto generato per un SHA diverso come candidato qualificato.
Piattaforma richiesta: Windows 11 x64 con dispositivo di uscita audio funzionante.
Studio One puo essere usato come controllo integrativo; non e il sintetizzatore della preview.

## 1. Scaricamento e identificazione
1. Aprire la PR #4, prendere nota dello SHA HEAD qualificando lo stesso SHA sui job richiesti.
2. Nella pagina GitHub Actions del run G4 Windows Desktop Packaging relativo a questo SHA,
   scaricare l'artefatto g4-desktop-head-windows (richiede eventuale accesso GitHub).
3. Estrarre l'archivio di Actions. Contiene un pacchetto ZIP portabile e i file Squirrel
   (Setup.exe, .nupkg, RELEASES) della prova G4.
4. Conservare nome e SHA-256 del file scaricato: da PowerShell Get-FileHash -Algorithm SHA256.
5. Annotare data, winver, architettura di Windows, dispositivo audio e eventuali popup di sicurezza.
AVVISO: l'installer e NON FIRMATO. Non disabilitare SmartScreen o antivirus e non ignorare
avvisi inattesi: eseguire solo dopo verifica della provenienza del proprio artefatto CI.

## 2. Installazione / primo avvio (FQ-10)
1. Aprire Setup.exe estratto oppure usare la ZIP portabile su Windows 11.
2. Verificare che il programma avvii una finestra intitolata ALBERTO AUDIO/MIDI — G4.
3. La fixture deve indicare 120 BPM, 4/4, 480 PPQ, due tracce e nove note.
4. Chiudere completamente, riavviare e verificare che l'interfaccia torni disponibile.
5. Annotare errori di installazione, Windows SmartScreen, crash, tempi di avvio e RAM,
   senza attribuire alcun PASS se un passaggio non e stato eseguito.

## 3. Anteprima sonora (FQ-12)
1. Verificare volume di sistema e uscita audio attiva, poi premere Play.
2. Deve essere udibile una sequenza sintetica di circa otto secondi, non campioni esterni.
3. Premere Stop durante una nota: il suono deve interrompersi e non lasciare note sospese.
4. Abilitare Loop e Play: controllare la ripetizione senza voci sospese; interrompere con Stop.
5. Verificare che Play/Stop/Loop non cambino la fixture e che possano essere ripetuti.
Nessuna soglia di latenza/jitter viene certificata automaticamente; annotare osservazioni.

## 4. Persistenza locale (FQ-08/FQ-09)
1. Usare Salva JSON per creare alberto-g4.aam.json in una cartella scrivibile.
2. Chiudere e riaprire l'app; usare Apri JSON e verificare due tracce, nove note,
   480 PPQ, 120 BPM e 4/4.
3. Esportare un secondo JSON e confrontare i contenuti canonici; documentare differenze.
4. Fare una copia di un file JSON, danneggiarla intenzionalmente e tentare l'apertura.
   Deve comparire errore gestito senza sostituire il progetto valido in memoria.
5. Non usare la copia valida come file corrotto.

## 5. Export MIDI e Studio One (FQ-06/FQ-07)
1. Usare Esporta MIDI, salvare un file .mid e annotarne dimensione e SHA-256.
2. La CI Mido indipendente controlla SMF Type 1, PPQ480, tempo 120, metrica4/4,
   due tracce musicali, nove note, velocity e posizioni; il test manuale verifica il
   file esportato attraverso l'adapter desktop anziche solo la fixture CI.
3. Se disponibile, importarlo in Studio One su due tracce distinguibili, verificando
   tempo, posizione e allineamento. Riportare se l'importazione e effettivamente riuscita.
4. Non confondere suoni reference Web Audio con strumenti assegnati nella DAW.

## 6. Prova offline (FQ-11)
1. Dopo scaricamento/installazione e prima del test, chiudere completamente l'app.
2. Disconnettere Wi-Fi e cavo Ethernet: verificare che non ci sia connettivita Internet.
3. Riavviare ALBERTO AUDIO/MIDI e ripetere Play, Stop, Loop, Salva, Apri, Esporta MIDI.
4. Annotare eventuali errori, richieste di rete o asset mancanti. Riconnettersi dopo i test.

## 7. Evidenze richieste per il rapporto FQ
Compilare: data; utente/PC (senza dati personali sensibili); versione Windows 11;
SHA PR HEAD; URL run; SHA-256 artifact; programma ZIP/installer scelto; dispositivo audio;
FQ-08/09/10/11/12; durata/funzione Play/Stop/Loop; export MIDI e eventuale Studio One;
tempi startup, RAM osservata; bug/esiti PASS, FAIL o NOT RUN.
Registrare log/screenshot solo se necessari, evitando asset o documenti personali.
Qualsiasi FAIL bloccante impedisce il PASS di G4. Nessun merge prima di FQ e consenso PO distinto.
