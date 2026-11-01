# OPERATIONAL_HANDOFF_CONTRACT

Contratto normativo tecnico. Ogni chat/sessione deve recuperare lo stato remoto reale. Memoria e riepiloghi non sono evidenza.

## Recovery Audit live
1. Leggere AGENTS.md, questo contratto, ACTIVE_OPERATOR_STATE.md, Product Charter v1.1, DECISION_LOG e PROJECT_INDEX su Drive.
2. Verificare visibilità, default branch, autorizzazioni e protezioni effettive del repository.
3. Leggere main, work branch, staging se esistente, PR Draft e SHA.
4. Leggere workflow, ultima CI conclusa e eventuale CI in corso.
5. Verificare Single-Writer Epoch e modifiche locali non pubblicate; non presumere workspace persistente.
6. Esaminare divergenze, distanze commit e antenati prima di scrivere.
7. Classificare CONSISTENTE, CONFLITTO, ACCESSO INSUFFICIENTE o DOCUMENTI MANCANTI.
8. In caso di baseline inaffidabile, bloccare le scritture.

## Branch e gate
main è integrazione; dopo bootstrap nessun commit diretto. work/Mxx-tema ospita PR Draft. staging non si inventa. CI GREEN, FQ PASS e MERGED sono stati distinti; PR non viene integrata senza FQ e assenso PO.

## Single-Writer Epoch
Registrare epoch_id, writer, branch/worktree, scope, baseline_sha, acquired_at, batch e status (ACQUIRED/RELEASED/ABORTED). Nessuna sovrapposizione nello stesso ambito. Al termine rilasciare o passare il controllo esplicitamente.

## Handoff
Aggiornare lo stato operatore su branch e, quando serve cambio chat, registrare handoff Drive in 04_HANDOFFS. Includere repo, PR, branch e SHA reali, CI, file modificati, decisioni PO, stato epoch, rischi, prossima azione. Rileggere il documento remoto.

## Report
STATO:
MILESTONE:
PR / URL:
SHA PR HEAD:
SHA STAGING:
CI / job / SHA:
GATE:
LOTTO:
NEXT:
RISCHI / BLOCCHI:

Se un dato manca, scrivere NON VERIFICATO o NON APPLICABILE.
