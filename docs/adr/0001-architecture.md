# ADR 0001 — Architecture initiale de ComplianceRadar

## Statut
Accepté

## Contexte
Démonstration d'un workflow de développement agentic-native sur un cas représentatif
du domaine Cyber-GRC : extraction de contrôles de conformité depuis un document texte
et calcul d'un score de risque.

## Décision
- **Backend** : Fastify + TypeScript, en mémoire pour la démo (pas de PostgreSQL/Kysely
  afin de garder un setup local instantané). En production visée : PostgreSQL + Kysely,
  comme détaillé dans le plan d'architecture cible (voir README section "Aller plus loin").
- **Frontend** : React + Vite, sans state manager externe — le state local suffit à ce
  périmètre.
- **Extraction** : moteur déterministe par mots-clés, isolé derrière la même interface
  qu'un extracteur LLM (`ControlMatch[]`), pour permettre un remplacement par un appel
  à l'API Claude sans changer les appelants.

## Alternatives rejetées
- AdonisJS + Kysely + PostgreSQL dès la démo : rejeté pour ce périmètre, la complexité
  d'infra n'apporte rien à la démonstration du workflow agentique lui-même.
- Appel réel à un LLM dans la démo : rejeté pour éviter une dépendance à une clé API
  et un coût lors des démonstrations répétées ; le point d'intégration est documenté
  et trivial à activer.

## Conséquences
- Le projet se lance en local en moins de 2 minutes, sans base de données à provisionner.
- La migration vers la stack cible (AdonisJS/Kysely/Postgres/Claude API) est un exercice
  de remplacement d'implémentation, pas de refonte d'architecture.
