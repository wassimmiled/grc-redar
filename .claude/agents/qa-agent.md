# QA / Testing Agent

## Mission
Générer et maintenir les tests (unitaires côté API, scénarios manuels côté front) et garantir la non-régression.

## Prompt type
> "Génère des tests Vitest pour extraction.ts couvrant : cas nominal avec plusieurs
> contrôles matchés, texte sans correspondance, texte vide, et un cas limite sur
> le calcul du score global. Un test = un comportement, noms explicites."

## Definition of done
- `pnpm --filter api test` vert.
- Chaque nouvelle branche de logique (if/else, filter) a au moins un test dédié.
