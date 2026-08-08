# Synchronisation Google Sheets — configuration

Cette fonctionnalité permet de synchroniser tes tâches, sous-tâches, compteurs de sessions et temps passé entre plusieurs ordinateurs, via une feuille Google Sheets que **toi seul** contrôles. Personne d'autre ne peut y accéder sans connaître l'URL générée à l'étape 4 — elle fait office de clé d'accès privée, donc ne la partage pas.

## Mise en place (une seule fois)

1. **Créer une feuille Google Sheets vierge** (ex: "Pomodoro Sync"). Elle reste privée — pas besoin de la partager avec qui que ce soit pour que la synchro fonctionne.

2. Dans cette feuille : menu **Extensions → Apps Script**. Un éditeur de code s'ouvre dans un nouvel onglet.

3. Supprime le contenu par défaut de `Code.gs` et colle à la place le contenu du fichier [`google-apps-script/Code.gs`](google-apps-script/Code.gs) de ce dépôt. Sauvegarde (Ctrl+S).

4. **Déployer → Nouveau déploiement** :
   - Type : **Application Web**
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
   - Clique sur **Déployer**.
   - Google va demander une autorisation ("Cette application n'est pas vérifiée") — c'est normal pour un script personnel non publié. Clique sur **Paramètres avancés** puis **Accéder à [nom du projet] (non sécurisé)**, et autorise l'accès à la feuille.
   - Copie l'**URL de l'application Web** générée (elle se termine par `/exec`).

5. Dans le pomodoro (sur chaque ordinateur à synchroniser) : **⚙️ Réglages → Synchronisation (Google Sheets)** → colle l'URL → **Connecter**.

C'est tout. Les deux onglets `Tasks` et `Meta` sont créés automatiquement dans la feuille au premier appel — rien à préparer manuellement dedans.

## Fonctionnement

- Chaque modification locale (tâche, sous-tâche, temps, session) est poussée vers la feuille après ~2-3 secondes d'inactivité.
- L'app vérifie la feuille toutes les ~45 secondes pour récupérer les changements faits depuis un autre ordinateur.
- En cas de divergence (modifs sur deux machines avant une synchro), c'est la version la plus récente (horodatage) qui l'emporte intégralement — pas de fusion tâche par tâche.
- Sans URL configurée, rien ne change : aucun appel réseau, comportement identique à avant cette fonctionnalité.
- En cas d'erreur réseau ou de mauvaise configuration, la synchro échoue silencieusement (statut affiché dans les réglages) sans jamais bloquer l'usage local de l'app.

## Si tu modifies le script plus tard

Éditer `Code.gs` dans script.google.com ne suffit pas à mettre à jour l'URL déjà déployée. Il faut : **Déployer → Gérer les déploiements → ✏️ (modifier) → Version : Nouvelle version → Déployer**.

## "Réinitialiser tout" et synchro

Le bouton de réinitialisation complète des réglages (Réglages → Réinitialiser) déclenche aussi une synchro : si une feuille est connectée, la remise à zéro sera poussée dessus (et donc sur les autres ordinateurs synchronisés) à la synchro suivante.
