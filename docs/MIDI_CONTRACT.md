# MIDI_CONTRACT — Contratto MIDI

Estratto tecnico dalla Product Charter v1.1, senza sostituirla.

Esportazione Standard MIDI File Type 1 multitraccia e file individuali.
Tracce: batteria, accordi, basso, melodia. Tempo/metrica ed eventi Note On/Off, pitch, velocity, durata/posizione, ordinamento e fine traccia corretti. Mappatura batteria, canali e PPQ da approvare prima di implementazione.

## Determinismo MUST
Stessi seed, versione esatta di motore e preset e parametri canonici producono gli stessi eventi. Conservare eventi reali, versioni e modifiche manuali anche se il generatore cambia.

## Parti bloccate
Mai rigenerare o trasporre automaticamente eventi di parti bloccate. BPM cambia solo la velocità del playback. Scala, tonalità e accordi globali possono generare un avviso di dissonanza, senza mutare gli eventi. Per conflitti di metrica/struttura richiedere scelta esplicita.

## Qualificazione
Fixture export -> parser indipendente -> confronto eventi, velocity, tempo e canali -> importazione manuale Studio One. Una prova manuale non si dichiara CI.
