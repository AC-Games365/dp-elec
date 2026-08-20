# DP Elec

Site vitrine de **DP Elec / Pierre Delobe**, électricien basé à **Velaine-sur-Sambre**.

Le projet est une application web **Vite + Tailwind CSS** pensée pour présenter les services, la zone d’intervention et le formulaire de contact.

## Prérequis

- **Node.js** 18 ou supérieur recommandé
- **npm** inclus avec Node.js

## Installation

Dans un terminal, placez-vous à la racine du projet puis installez les dépendances :

```bash
npm install
```

## Lancer en local

Pour démarrer le serveur de développement :

```bash
npm run dev
```

Vite affichera ensuite une adresse locale, généralement :

```bash
http://localhost:5173
```

## Générer la version de production

Pour compiler le site en version production :

```bash
npm run build
```

Le dossier généré sera `dist/`.

## Tester la version de production en local

Après le build, vous pouvez vérifier le rendu final avec :

```bash
npm run preview
```

## Déploiement

Le site est un **site statique**. Vous pouvez donc le déployer sur n’importe quel hébergement statique.

### Déploiement manuel

1. Lancer le build :
   ```bash
   npm run build
   ```
2. Envoyer le contenu du dossier `dist/` vers votre hébergement.
3. Configurer le serveur pour que `index.html` soit la page d’entrée du site.

### Exemples d’hébergeurs compatibles

- **Netlify**
- **Vercel**
- **Cloudflare Pages**
- **GitHub Pages**
- Hébergement mutualisé / FTP classique

### Points importants pour le déploiement

- Le projet est configuré avec une base Vite sur `/` dans `vite.config.js`.
- Si vous hébergez le site dans un **sous-dossier** plutôt qu’à la racine du domaine, il faudra adapter la valeur `base` dans `vite.config.js`.
- Le formulaire de contact envoie les messages via **FormSubmit**.
- Le site utilise aussi des services externes comme **Google Tag Manager** et **reCAPTCHA**.

## Fonctionnalités principales

- Présentation des services d’électricité générale
- Mise en avant des **bornes de recharge** et des partenaires
- Section **zone d’intervention** autour de Sambreville / Namur
- Formulaire de contact
- Navigation mobile et popups interactifs

## Structure du projet

```text
index.html
package.json
vite.config.js
postcss.config.js
tailwind.config.js
src/
  main.js
  style.css
  assets/
```

## Notes de développement

- Les images et logos sont stockés dans `src/assets/`.
- Le projet est principalement piloté depuis `index.html`.
- Les styles sont compilés via Tailwind CSS.

## Besoin d’une adaptation ?

Si vous voulez déployer le site sur un hébergement spécifique, il suffit généralement d’ajuster :

- le chemin de base dans `vite.config.js`
- la configuration du serveur pour servir `dist/`
- éventuellement les URLs externes utilisées par le formulaire ou le tracking

