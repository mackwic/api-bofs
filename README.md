# api-bofs

Le code de l'API qui expose les données des sessions Bof, passées et futures.

## Conventions

Les Bofs sont parisiennes donc on parle Français. On code en Anglais.

## Liens utiles

- Kanban du projet: https://github.com/mackwic/api-bofs/projects/1
- Slack du projet: #bofs-api sur le slack octo-tech
- URL de l'API: https://bofs-api.scalingo.io

#### Configuration

Les informations relatives aux Bofs sont stockées dans une `spreadsheet` Google. Pour exploiter cette dernière, il est nécessaire de :
* Fournir l'identifiant du document via la variable d'environnement `DOCUMENT_ID`
* Fournir les identifiants permettant de requêter le document via les variables d'environnement `CLIENT_EMAIL` et `PRIVATE_KEY`

#### Installation

```bash
npm install
```

#### Run

```bash
npm start
```

#### Test

```bash
npm test
```
