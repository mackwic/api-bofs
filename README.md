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

Demander à l'équipe bof les informations d'accès.

- Fournir l'identifiant du document via la variable d'environnement `DOCUMENT_ID`
- Fournir les identifiants permettant de requêter le document via les variables d'environnement `DOCUMENT_CREDENTIALS_CLIENT_EMAIL` et `DOCUMENT_CREDENTIALS_PRIVATE_KEY`




### Installation

```bash
npm install
```

### Test

```bash
npm test
```

### Run

```bash
npm start
```

#### Configuration (pour requêter Google Sheet)

##### Mise en place

La spreadsheet Octo Conf - Programme Bof étant privée, une étape d'authentification est donc nécessaire. Il faut :

- Créer via https://console.developers.google.com un Credentials de type Service account keys (choisir le type JSON)
- Extraire la clé client_email du fichier téléchargé et partager à cet email les droits de consultation
- A l'exécution de l'application, fournir l'email et la clé privée extraites de ce fichier via les bonnes variables d'environnement (voir ci-dessous).

##### Configuration des variables d'environnement

Nous utilisons ces variables d'environnement :

- DOCUMENT_ID : identifiant du document à interroger ;
- DOCUMENT_CREDENTIALS_CLIENT_EMAIL : identifiant du service autorisé à interroger l'API Google Drive et autorisé à consulter la spreadsheet (bien penser à partager la spreadsheet à l'email technique)
- DOCUMENT_CREDENTIALS_PRIVATE_KEY : clé privée identifiant le service évoqué ci-dessus.
