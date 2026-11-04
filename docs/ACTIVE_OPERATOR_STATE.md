# ACTIVE_OPERATOR_STATE — M02 / Governance

Ultimo snapshot: 2026-11-01. Non sostituisce il Recovery Audit live.

## Stato verificato prima dell'ultimo aggiornamento
- Milestone: M02 / G2, preparazione della qualificazione.
- Repo: https://github.com/morellialberto-alt/alberto-audio-midi — Public.
- main: cc8f42d4512a7a9d002188010015d36244313923, non modificato dal bootstrap.
- Branch di lavoro: work/M02-governance.
- PR: https://github.com/morellialberto-alt/alberto-audio-midi/pull/1 (Draft, OPEN, NON MERGED).
- PR HEAD osservato prima di questo snapshot: 9e0e3d5cf06e865d05b8a905081dafcbf7631e26. Il commit di questo aggiornamento lo cambierà: rileggere sempre.
- Staging: NON CONFIGURATO. Non presumere una worktree locale persistente.
- Ruleset protect-main ID 26311423: ACTIVE, ~DEFAULT_BRANCH, deletion, non_fast_forward, pull_request (0 review richieste). Nessun bypass. Verificato con API.
- Required status checks: NON CONFIGURATI. Definirli solo quando i check sono stabili.
- Workflow governance .github/workflows/governance.yml: aggiunto alla PR; stato CI da controllare live. NON è la prima build/test applicativa G3.
- FQ G2: NON ANCORA APPROVATA. Nessun merge autorizzato.
- Licenza di distribuzione: DA DECIDERE. Nuove spese ricorrenti: NON AUTORIZZATE.
- Piano GitHub: NON VERIFICATO.

## Single-Writer Epoch
- ID: M02-20261101-governance-ci-02.
- Writer: ChatGPT, per il Product Owner.
- Ambito: workflow validazione governance e stato operatore su work/M02-governance.
- Baseline branch prima del lotto: bde7a6d9ed786ac1b04205e1900ba6978451c5ce.
- Acquisizione: 2026-11-01, dopo audit remoto di branch, PR, ruleset e assenza di writer concorrenti.
- Stato: RELEASED al termine di pubblicazione e verifica finale; non è un lock distribuito.
- Nessun altro commit concorrente osservato al momento dell'inserimento del workflow.

## Fonti autorevoli Drive
Product Charter v1.1:
https://docs.google.com/document/d/1wkdqx7RWQyWcO-T8MR3eE8wLHgqrTXEJBauI6NNTwYk/edit?usp=drivesdk
DECISION_LOG e ADR-0002:
https://docs.google.com/document/d/1R_Ibusa0DER1Jw98xkKgr9q0fC9EKkJUiwY2YWvqKyY/edit?usp=drivesdk
PROJECT_INDEX:
https://docs.google.com/document/d/1S3Ay3LWVZ2mY6huxGPoSCFtheb4Uboow6tB6feZ4sUs/edit?usp=drivesdk

## Next
1. Rileggere PR HEAD SHA dopo questo commit e lo stato della governance CI.
2. Se CI FAIL, verificare il job minimo necessario e correggere con lotto tracciato.
3. Qualificare M02/G2 distinguendo verifica documentale, CI e approvazione PO.
4. Non confondere la CI documentale con G3: toolchain/scaffold applicativo non approvati.
5. Nessun merge su main senza FQ positiva e autorizzazione esplicita del PO.

## Addendum M03/G3 — 2026-11-02 — lotto M03 scaffold
Lo snapshot M02 sopra è storico, non stato corrente.
- M02/G2: FQ PASS del PO, PR #1 MERGED (GitHub verified).
- Baseline main verificata prima del lotto: a1e75f279aabb11487720fcab3e92553aeb0fd03.
- PR G2 #1 head: 74a00c107d42f3da2a5b7fbd09449b141ac50ce3; merge SHA: a1e75f279aabb11487720fcab3e92553aeb0fd03.
- CI G2 governance SUCCESS sul PR HEAD G2, run 41347778777. Non è CI G3.
- Ruleset protect-main ID 26311423: ACTIVE, deletion/non_fast_forward/pull_request. Required checks non configurati.
- Product Owner (2026-11-02): APPROVED Fase B M03 con TypeScript/Node.js 24 LTS, event core e doppio test Windows; NO merge, spese o architettura desktop definitiva.
- ADR-0003 APPROVED registrata su DECISION_LOG Drive.
- Branch di lavoro M03: work/M03-first-green-ci; staging persistente: NON CONFIGURATO.
- Single-Writer Epoch: M03-20261102-first-green-ci-01; writer ChatGPT operatore tecnico; ambito scaffold/tests/CI/docs su branch M03; baseline SHA a1e75f279aabb11487720fcab3e92553aeb0fd03; acquired_at 2026-11-02 (sessione operativa); lotto M03-B scaffold; stato ACQUIRED fino alla successiva verifica e handoff. Non è un lock distribuito.
- CI G3 e PR Draft: verificare sul remoto dopo la pubblicazione; nessun SUCCESS preattribuito.
- Licenza di distribuzione: NON DECISA. Nuove spese ricorrenti: NON AUTORIZZATE.
- NEXT: controllare HEAD PR, CI head/merge, stato epoch, rapporto FQ; nessuna integrazione senza consenso PO.

## Chiusura lotto M03-B / Handoff tecnico 2026-11-02
Questo addendum sostituisce per lo stato corrente la precedente riga 'ACQUIRED' della epoch M03, conservata come storico di acquisizione.
- Branch PR Draft #2: https://github.com/morellialberto-alt/alberto-audio-midi/pull/2; OPEN / DRAFT / NON MERGED (verificato).
- Lotto pubblicato e verificato su HEAD 04ad2234d71f7c3d065b20e7671be873bf5404e4; main rimasta a a1e75f279aabb11487720fcab3e92553aeb0fd03.
- G3 Application CI: run 41415666162 COMPLETED/SUCCESS, jobs g3-head-windows e g3-merge-windows entrambi SUCCESS sul candidato PR. URL: https://github.com/morellialberto-alt/alberto-audio-midi/actions/runs/41415666162
- G2 Governance Validation sullo stesso HEAD: run 41415666054 SUCCESS.
- Preflight locale non certificante: TypeScript 5.8.3 / Node 22.16.0, sette test PASS. CI Windows usa Node 24.22.2 e dipendenze lockfile approvate.
- Nuovo commit di questo handoff aggiornera lo SHA PR: RIQUALIFICARE CI sui nuovi SHA, non riutilizzare automaticamente l'esito della run precedente.
- Single-Writer Epoch M03-20261102-first-green-ci-01: RELEASED al termine del lotto documentale; nessun writer concorrente osservato sul remoto. L'epoch non e un lock distribuito e ogni nuovo lotto richiede audit/acquisizione propria.
- Required status checks: NON CONFIGURATI. Licenza, costi, framework Windows: NON DECISI/AUTORIZZATI.
- Gate G3: NON FQ PASS; nessun merge autorizzato. NEXT: verificare ultimo HEAD CI, aggiornare indice Drive e presentare rapporto FQ al PO. 

## Stato corrente M04/G4 — 2026-11-04 — preparazione FQ
Le sezioni sopra rimangono storico M02–M03, non stato attuale.
PO approva D1–D7 e separatamente autorizza Fase B.
main: 48085fd53e7580f56dbab22a86818b1f6e6859df, invariato;
PR #4 DRAFT sul branch work/M04-windows-midi-poc, nessun merge.
B1 PPQ480/test core e B2 JSON/MIDI/parser indipendente: CI GREEN.
B3 Electron Web Audio e packaging Forge Windows: CI HEAD/MERGE GREEN
sul candidato a0a7e8f7d52165ac67aa10f3ff0b7972b51ae338;
run 41831310018 (desktop), 41831309971 (MIDI),
41831309933 (G3 core), 41831309801 (governance).
Nuova SHA B4 da qualificare prima della FQ; non riutilizzare vecchi run.
Epoch B1, B2-P, B2-MIDI, B3 RELEASED.
B4 PREPARED per test PO Windows 11: test hardware/offline/audio NON ESEGUITI.
Nessun framework definitivo, spese, LICENSE, M05 o merge autorizzati.
Recovery Audit live resta obbligatorio per ogni nuovo lotto.
