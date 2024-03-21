# Documentation de l'API Movies

Ce projet est conçu pour offrir une interface API permettant d'accéder à une base de données stockée sur MongoDB, qui contient des films et leurs commentaires associés.

## Comment Utiliser

Pour commencer avec cette application, vous devez avoir Node.js en version 20.11.0 ou ultérieure installé. Vous aurez également besoin de MongoDB pour l'hébergement de la base de données, qui peut être hébergé localement ou sur Atlas.

1. Installez toutes les dépendances nécessaires en exécutant la commande suivante :
```bash
npm install
```

2. Créez un fichier `.env.local` à la racine du projet et complétez la variable d'environnement suivante en remplaçant les valeurs entre les chevrons par les informations de connexion à votre base de données MongoDB:
```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<host>/
```

3. Ensuite, lancez l'application en local avec la commande suivante :
```bash	
npm run dev
```

L'application fonctionnera sur le port 3000. Assurez-vous d'avoir configuré une connexion MongoDB et d'avoir une copie de la base de données. Cela devrait être une base de données MongoDB de base avec le dataset par défaut d'Atlas (mflix).

## Points de Terminaison

L'API propose 12 points de terminaison, chacun étant minutieusement décrit dans la documentation Swagger disponible ici : [Swagger](http://localhost:3000/api-docs)

Ces points de terminaisons permettent de récupérer des données, de les mettre à jour, de les supprimer ou d'en ajouter.

## Technologies Utilisées

- Node.js
- Next.js
- MongoDB
- Swagger

## Auteur

- Julien FLUSIN