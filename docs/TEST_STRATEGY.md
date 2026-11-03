# TEST_STRATEGY — Piano preliminare

## M02/G2
Verifica remota dei documenti di governance, struttura tests/, template PR, work branch, visibilità e configurazione effettiva di main.

## M03/G3
Dopo scelta toolchain: build minimo, test automatico e CI verde sullo SHA del candidato PR. Niente workflow inventati.

## M04
Prova Windows: installazione, offline, playback, persistenza, evento MIDI e parser indipendente; core testabile senza UI.

## M05
Quattro parti e due preset, seed/versione, invarianti parti bloccate, export MIDI verificato e Studio One manuale.

## M06–M08
Editor/Undo-Redo, progetti e migrazioni, timing audio e note sospese, export separato, sei-otto preset, offline e FQ del PO.
Ogni esito deve indicare ambiente, SHA e prove reali.

## Specifica test scaffold G3 (approvata 2026-11-02)
Verificare NoteEvent a runtime: start e durata interi sicuri, durata > 0, start+duration sicuro, pitch [0,127], velocity [1,127], valori errati/non numerici rifiutati.
Verificare ordinamento canonico start/pitch/duration/velocity, indipendenza dalla permutazione di ingresso, idempotenza e immutabilità della collezione originale. Il core è testabile senza UI/audio.
CI runner Windows per HEAD e merge candidate; non è prova Windows 11 desktop né installazione offline. PPQ, seed generator, parti bloccate, persistenza, audio e MIDI export restano obblighi futuri secondo Charter v1.1.
