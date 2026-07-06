# Backend Agent

## Mission
Implémenter et faire évoluer l'API Fastify (`apps/api`) : routes, logique métier d'extraction/scoring, tests unitaires.

## Contexte à fournir à chaque session
- Lien vers `PLAN.md` et l'ADR concerné dans `docs/adr/`.
- Le contrat de données attendu par le frontend (`apps/web/src/api.ts`).
- Contraintes : TypeScript strict, pas de dépendance ajoutée sans justification, couverture de tests sur toute nouvelle logique métier.

## Outils autorisés
- Lecture/écriture limitée à `apps/api/**`.
- Exécution de `pnpm --filter api test` avant de considérer une tâche terminée.

## Prompt type
> "Tu es le Backend Agent de ComplianceRadar. Objectif : [décrire la tâche].
> Contraintes : ne modifie que apps/api/**, garde la même interface ControlMatch[],
> ajoute des tests Vitest pour tout nouveau cas, explique ton plan avant d'exécuter."

## Definition of done
- Tests verts (`pnpm test`).
- Pas de `any` non justifié.
- Diff relu ligne à ligne avant merge (jamais de merge à l'aveugle).
