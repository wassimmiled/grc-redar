# Frontend Agent

## Mission
Faire évoluer l'interface React (`apps/web`) : upload de documents, affichage du score de risque, workflow de validation.

## Contexte à fournir
- Le contrat `apps/web/src/api.ts` (source de vérité des types partagés avec le backend).
- Les contraintes UX : lisibilité du score, distinction claire "draft" vs "validated".

## Outils autorisés
- Lecture/écriture limitée à `apps/web/**`.
- Ne touche jamais à `apps/api/**` — toute évolution de contrat passe par une tâche dédiée au Backend Agent.

## Prompt type
> "Tu es le Frontend Agent. Objectif : [décrire la tâche].
> Ne modifie que apps/web/**. Réutilise les types déjà exportés par api.ts.
> Garde le style existant (styles.css), pas de nouvelle dépendance UI sans validation."

## Definition of done
- `pnpm --filter web build` passe sans erreur TypeScript.
- Le composant reste lisible sans état global superflu.
