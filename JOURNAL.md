# Journal — Johns_pomodoro

## Documentation

App web Pomodoro (HTML/JS/CSS, mono-fichier `index.html`, sans build), déployée sur Netlify. Dépôt GitHub dédié : `PhoenixWoodys/Johns_pomodoro` (branche `main`).

Structure :
- `index.html` — version 1 (colorée), branche `main`. Toute la logique JS est inline, variables globales, pas de framework.
- `index-v2.html` — version 2 (sombre, minimaliste), sur la branche `dev`.
- `netlify/functions/visit-counter.js` — fonction serverless Netlify (compteur de visites, Netlify Blobs).
- `google-apps-script/Code.gs` — script à déployer côté utilisateur (Web App) pour la synchro Google Sheets.
- `SHEETS_SYNC_SETUP.md` — guide de configuration de la synchro.

Fonctionnalités principales : minuteur Pomodoro/pause, gestion tâches + sous-tâches avec suivi du temps, statistiques, import/export CSV, arrière-plan/musique/alarme personnalisables, i18n (fr/ja).

État actuel : synchro multi-ordinateurs via Google Sheets déployée et validée en conditions réelles (voir session du 2026-08-26).

---

## Session du 2026-08-26

**Contexte** : Premier déploiement réel de la synchro Google Sheets par l'utilisateur (feature implémentée le 2026-08-08, jamais testée en conditions réelles jusqu'ici). Objectif : fusionner les tâches déjà présentes sur une machine avec celles restées locales sur une autre.

### Échanges
- **User** : demande la procédure pour fusionner les tâches locales avec celles déjà synchronisées dans le Sheet.
- **Claude** : explique que le mécanisme est "dernier écrit gagne" (remplacement intégral, pas de fusion champ par champ) et propose une procédure de contournement via export/import CSV (l'import ajoute au lieu de remplacer).
- **User** : erreur de synchronisation à la connexion.
- **Claude** : diagnostic depuis les logs console fournis — l'URL collée était celle de la feuille (`docs.google.com/spreadsheets/.../edit`) et non l'URL de déploiement Web App (`script.google.com/macros/s/.../exec`), d'où un blocage CORS/ServiceLogin. Correction indiquée : récupérer l'URL via Apps Script → Déployer → Gérer les déploiements.
- **User** : URL corrigée, connexion fonctionnelle ; import CSV effectué, fusion confirmée réussie.

### Actions réalisées
- Aucune modification de code — session de test/diagnostic côté utilisateur, assistée en chat.
- Mise à jour de ce JOURNAL.md (section Documentation + présente session).

### État en fin de session
- Synchro Google Sheets validée en conditions réelles pour la première fois : connexion, pull, et fusion via export/import CSV fonctionnels.
- Point de vigilance identifié pour `SHEETS_SYNC_SETUP.md` : le risque de confusion entre URL de la feuille et URL de déploiement Web App n'est pas explicitement mis en garde dans le guide — cause d'erreur probable pour un futur redéploiement ou une autre machine.

---

## Session du 2026-08-08

**Contexte** : L'utilisateur veut synchroniser tâches/sous-tâches/compteurs de sessions/temps écoulé entre plusieurs ordinateurs pour un même utilisateur, sans que d'autres utilisateurs de l'app n'aient accès à ces données. Demande explicite d'utiliser un Google Sheets partagé comme backend.

### Échanges
- **User** : synchro multi-ordinateurs via Google Sheets, confidentialité entre utilisateurs.
- **Claude** : exploration du code existant (modèle de données tâches, `saveData()`/`loadData()`, panneau de réglages, CSV import/export, i18n) via agents Explore + Plan.
- **User** (via AskUserQuestion) : choix — mécanisme = Google Apps Script Web App (pas d'OAuth/Cloud) ; déclenchement = automatique (push débouncé + pull périodique) ; conflits = dernier écrit gagne.
- **Claude** : plan détaillé validé (mode plan), puis implémentation complète.

### Actions réalisées
- Création `google-apps-script/Code.gs` — `doGet`/`doPost`, onglets `Tasks`/`Meta` auto-créés, `LockService`, réponse JSON.
- Création `SHEETS_SYNC_SETUP.md` — procédure de déploiement pour l'utilisateur.
- `index.html` — nouvelles variables globales de sync ; `saveData()` stamp `lastModified` + déclenche `scheduleSyncPush()` ; nouvelle `persistLocalOnly()` pour les données reçues du pull ; bloc de fonctions sync (`applySyncUrl`, `disconnectSync`, `tasksToFlatRows`/`flatRowsToTasks` avec préservation des ID, `pushToRemote`, `pullFromRemote`, `startSyncPolling`, `updateSyncStatusUI`, `initSync`) ; nouvelle section réglages "Synchronisation (Google Sheets)" ; clés i18n fr/ja ; `initSync()` ajouté au boot.
- Vérification manuelle via navigateur (Browser pane) avec `fetch` simulé : aucun appel réseau sans URL configurée, connexion à une feuille vierge déclenche un push de seed, un pull avec `lastModified` distant plus récent remplace l'état local en préservant les ID, un pull avec `lastModified` distant plus ancien déclenche une réconciliation (push) sans blocage.
- Commit `cde815b` — "feat: add Google Sheets sync for tasks/sessions across devices" — poussé sur `origin/main`.

### Décisions et justifications
- Apps Script Web App plutôt que OAuth navigateur ou fonction Netlify + compte de service : aucune configuration Google Cloud/OAuth côté utilisateur, pas de fonction serveur supplémentaire à maintenir. Confidentialité assurée par le caractère privé de la feuille + le fait que l'URL du script agit comme un secret.
- POST envoyé en `Content-Type: text/plain` (pas `application/json`) pour éviter le preflight CORS qu'Apps Script ne sait pas gérer (pas de support OPTIONS).
- Reconstruction des tâches depuis la feuille distante préserve les ID d'origine (contrairement à l'import CSV qui en génère de nouveaux) — nécessaire pour que le remplacement "dernier écrit gagne" soit cohérent.
- Deux corrections apportées au design initial pendant la revue du plan : (1) connexion à une feuille vierge avec des tâches locales existantes → push immédiat au lieu de rester inactif ; (2) réconciliation "on est en avance" appelée via la version débouncée du push, pas directement, pour éviter un blocage silencieux causé par le flag `syncInProgress`.

### État en fin de session
- Fonctionnel côté client, vérifié par simulation (mock de `fetch`) — logique de push/pull/dernier-écrit-gagne/seed validée.
- Pas encore testé avec un vrai déploiement Apps Script + Google Sheet réel, ni sur deux ordinateurs physiques. Prochaine étape pour l'utilisateur : suivre `SHEETS_SYNC_SETUP.md`.
- Aucun changement de comportement pour les utilisateurs n'ayant pas configuré d'URL de synchro.

---
