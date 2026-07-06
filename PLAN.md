# PLAN — ComplianceRadar

## Objectif
Démontrer un workflow de développement agentic-native (Claude Code, git worktrees,
agents spécialisés) sur un cas représentatif du domaine Cyber-GRC.

## Périmètre (MVP démo)
1. Upload d'un document texte (politique de sécurité).
2. Extraction des contrôles ISO 27001 / NIS2 couverts (moteur mots-clés, swap-ready
   vers un appel LLM réel).
3. Calcul d'un score de risque global + liste des écarts.
4. Workflow de validation "draft → validated" (esquisse du 4-eyes).
5. Historique des documents analysés.

## Découpage en tâches (tel qu'exécuté avec des agents en parallèle)
| Tâche | Agent | Worktree |
|---|---|---|
| API extraction + scoring + tests | Backend Agent | `feature/backend-extraction` |
| Endpoints CRUD documents | Backend Agent | `feature/backend-api` |
| UI upload + dashboard | Frontend Agent | `feature/frontend-dashboard` |
| Revue de sécurité et de cohérence | Reviewer Agent | (sur chaque PR) |
| Tests unitaires extraction | QA Agent | `feature/tests` |

## Hors périmètre (assumé, pour rester réaliste en quelques jours)
- Persistance PostgreSQL réelle (voir ADR 0001).
- Appel LLM réel (point d'intégration documenté dans `extraction.ts`).
- Authentification (Better Auth / Keycloak) — à ajouter dans une itération suivante.

## Definition of done du MVP
- `pnpm test` vert.
- `pnpm dev:api` + `pnpm dev:web` fonctionnels en local.
- README permettant à un tiers de reproduire le setup en < 5 minutes.
