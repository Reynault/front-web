# Cookie Book : Front-End

## Cookie Book

Cookie Book est une application web permettant à l'utilisateur de gérer et partager ses
recettes de cuisine. Les fonctionnalités sont alors les suivantes:

- Créer un compte
- Se connecter
- Créer une recette
- Modifier une recette
- Supprimer une recette
- Modifier son compte
- Supprimer son compte
- Lister toutes les recettes
- Lister ses recettes

L'application utilise le concept des JWT pour permettre à l'API d'identifier les
utilisateurs.

## Description des dépôts

Ce dépôt git contient la partie Front du projet de l'unité d'enseignement 
"Nouvelles technologies du web".

Pour installer et lancer Cookie Book:
- Commencez par installer et lancer la partie [Back-End](https://github.com/Reynault/back-web).
- Installez et lancez le [Front-End](https://github.com/Reynault/front-web).

Chaque dépôt contient les informations permettant l'installation et le lancement de 
sa partie respective. Le back a été réalisé avec Nest JS et le front avec Angular.


## Dépendances requises


```bash
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / o \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 10.1.7
Node: 14.15.1
OS: win32 x64

Angular: 10.1.6
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1001.7
@angular-devkit/build-angular   0.1100.2
@angular-devkit/core            10.1.7
@angular-devkit/schematics      10.1.7
@angular/cdk                    10.2.7
@angular/cli                    10.1.7
@angular/material               10.2.7
@schematics/angular             10.1.7
@schematics/update              0.1001.7
rxjs                            6.6.3
typescript                      4.0.5
```

- Il vous faut également une installation Docker fonctionnelle avec docker-compose

## Installation du Front

Pour pouvoir installer la partie Front:

- Installation du git
```bash
$ git clone https://github.com/Reynault/front-web.git
```

- Installation des dépendances (npm ou yarn)
```bash
$ npm install
```
```
$ yarn install
```

## Lancement du front

- Lancer le projet Angular
```bash
$ ng serve
```

- Vous pouvez désormais accéder au Front sur http://localhost:4200/

## Équipe de développement

- Angela Ipseiz
- Reynault Sies
