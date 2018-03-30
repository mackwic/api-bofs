# api-bofs

Le code de l'API qui expose les données des sessions Bof, passées et futures.

## Conventions

Les Bof sont parisiennes donc on parle Français. On code en Anglais.

### Description du domaine

Bof: acronyme de “Birds Of a Feather”, qui est une contraction du proverbe anglais “Birds of a feather flock together”, littéralement “les oiseaux d'un même plumage volent ensemble” et se traduirait par “qui se ressemble s'assemble”.

Comme Bof est un acronyme, il n'a pas de pluriel ni de genre.

### Les termes du domaine

- **Bof**: tout seul ce n'est rien car c'est ambigu. Nous n'utilisons pas le mot Bof sans précision
- **Une présentation Bof** (_BofTalk_): c'est ce qui est présenté par quelqu'un. (_note: détails d'implem non défini_)
- **Un créneau de Bof** (_BofSlot_): c'est un emplacement libre ou réservé par une présentation, qui a une heure de début, de fin, et une salle
- **Un évènement Bof** (_BofEvent_): une période de la journée où des créneaux de Bof sont mis à disposition

## Liens utiles

- Kanban du projet: https://github.com/mackwic/api-bofs/projects/1
- Slack du projet: #bofs-api sur le slack octo-tech
- URL de l'API: https://bofs-api.scalingo.io

## Architecture

```text
src
├── domain/             Classes représentant le métier
├── infrastructure/     Implémentation des détails techniques (framework, lib, glue)
│   ├── adapters/       Transformation des structures externes en valeur métier et inversement
│   ├── repositories/   Couche de communication avec l'extérieur de l'application
│   └── routes.js       Branchement avec injection des différents composants
└── use-cases/          Cas métiers qui orchestrent l'infrastructure et le domaine
tests
├── e2e/                Tests qui appellent l'API Google Spreadsheet
├── unit/               Tests de fonction au niveau module qui reflètent l'architecture du projet
│   ├── domain/
│   ├── infrastructure/
│   └── use-cases/
└── utils.js            Module utilitaire qui configure les dépendances de test
```

## Utiliser

Les informations relatives aux Bofs sont stockées dans une `spreadsheet` Google. Pour exploiter cette dernière, il est nécessaire de :

- Fournir l'identifiant du document via la variable d'environnement `DOCUMENT_ID`
- Fournir les identifiants permettant de requêter le document via les variables d'environnement `CLIENT_EMAIL` et `PRIVATE_KEY`

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

### Test

```bash
npm test
```
