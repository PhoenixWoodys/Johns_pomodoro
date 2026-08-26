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

   ⚠️ **Ne confonds pas cette URL avec l'URL de la feuille** (celle de ton onglet navigateur, `docs.google.com/spreadsheets/.../edit`). Coller l'URL `/edit` dans les réglages du pomodoro ne fonctionnera jamais — le navigateur tentera de charger la page Google Sheets elle-même et échouera avec une erreur CORS/connexion. La bonne URL commence par `script.google.com/macros/s/` et se termine par `/exec`.

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

## Connecter un deuxième ordinateur qui a déjà ses propres tâches

La synchro ne fusionne rien : à la connexion, le côté dont l'horodatage (`lastModified`) est le plus récent **remplace intégralement** l'autre — pas de fusion tâche par tâche, pas de choix proposé à l'écran. Si le deuxième ordinateur a des tâches en cours non encore synchronisées, elles seront **écrasées silencieusement** si la feuille distante est plus récente. Il faut donc les sauvegarder avant de connecter, puis les réintégrer à la main :

1. **Avant de coller l'URL de synchro** sur ce deuxième ordinateur : Réglages → **💾 Exporter tâches (CSV)**. Ça sauvegarde toutes ses tâches actuelles (et leur temps) dans un fichier local.
2. Colle l'URL de synchro et clique **Connecter**. Les tâches locales de cet ordinateur sont remplacées par celles de la feuille (c'est pour ça qu'on a exporté avant).
3. Ouvre le fichier CSV exporté à l'étape 1 et compare-le à la liste de tâches maintenant affichée (celle qui vient d'être synchronisée) :
   - **Tâche présente uniquement dans le CSV** (absente de la liste synchronisée) → sans risque, à réimporter telle quelle.
   - **Tâche présente des deux côtés** (même nom suivi indépendamment sur les deux ordinateurs, ex. "Japonais") → ne pas la réimporter directement, ça créerait un doublon. L'import CSV ne fait **aucune détection de doublon** par nom : il crée systématiquement une tâche avec un nouvel ID plutôt que de cumuler le temps sur la tâche existante ([index.html](index.html), fonction `importTasksCSV`).
4. Si besoin, édite le CSV pour ne garder que les lignes "tâches uniquement locales" (supprime les lignes en doublon), puis Réglages → **📂 Importer tâches (CSV)** → sélectionne ce fichier. L'import est additif (il ajoute aux tâches existantes, ne remplace rien), donc ça complète la liste synchronisée sans l'écraser.
5. Pour chaque tâche en doublon repérée à l'étape 3 : note le temps (colonne "Temps passé (min)") du CSV exporté, puis sur la tâche déjà synchronisée utilise Réglages → **Ajouter du temps manuellement** pour ajouter ce même nombre de minutes. Le temps des deux ordinateurs se retrouve ainsi cumulé sur une seule tâche.
