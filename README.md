# ComplianceRadar — démo Agentic Native

Petite plateforme qui analyse un document (politique de sécurité, questionnaire
fournisseur) et détecte automatiquement les contrôles de conformité couverts
(ISO 27001 / NIS2), calcule un score de risque et propose un workflow de
validation. Le domaine est volontairement proche du Cyber-GRC.

L'intérêt principal de ce repo n'est pas la feature elle-même (volontairement
simple) mais **la façon dont il a été construit** : workflow agentic-native
avec Claude Code, git worktrees pour le développement parallèle, agents
spécialisés par rôle, et garde-fous qualité avant tout merge.

## Lancer le projet

```bash
pnpm install
pnpm dev:api    # terminal 1 — http://localhost:3333
pnpm dev:web    # terminal 2 — http://localhost:5173
pnpm test       # suite de tests de la logique de scoring
```

## Ce que ce repo démontre

### 1. Agents spécialisés (`.claude/agents/`)
Chaque rôle (Backend, Frontend, Reviewer, QA) a un prompt système documenté,
versionné comme du code, avec un périmètre de fichiers strict et une
*definition of done* explicite. Voir `.claude/agents/*.md`.

### 2. Git worktrees pour le développement parallèle
Ce projet a été développé en isolant chaque feature dans son propre worktree,
pour faire tourner plusieurs sessions Claude Code simultanément sans collision :

```bash
git worktree add ../compliance-backend-extraction -b feature/backend-extraction
git worktree add ../compliance-frontend-dashboard -b feature/frontend-dashboard
git worktree add ../compliance-tests -b feature/tests

# une session Claude Code par worktree, en parallèle :
cd ../compliance-backend-extraction && claude
cd ../compliance-frontend-dashboard && claude

git worktree list      # suivi des sessions actives
git worktree remove ../compliance-tests   # une fois mergé
```

Chaque worktree = un espace disque isolé (pas seulement une branche) : zéro
collision entre agents qui modifient des fichiers en parallèle. Le goulot
d'étranglement devient la revue humaine, pas l'exécution.

### 3. Point d'intégration LLM explicite
`apps/api/src/extraction.ts` utilise un moteur déterministe (mots-clés) pour
la démo — pas de dépendance à une clé API pour pouvoir la faire tourner
n'importe où, n'importe quand. Le commentaire dans le fichier documente
précisément où et comment brancher un appel à l'API Claude en gardant la même
interface `ControlMatch[]`, donc sans impact sur le frontend ni les tests.

### 4. Garde-fous qualité
- Tests unitaires sur toute la logique métier (`apps/api/test/`).
- ADR (`docs/adr/0001-architecture.md`) documentant les choix et alternatives
  rejetées — pratique reprise du Reviewer Agent qui exige une justification
  écrite pour tout choix structurant.
- Séparation stricte de périmètre entre agents (Backend Agent ne touche pas au
  front, Frontend Agent ne touche pas à l'API) pour permettre le travail
  parallèle sans conflit.

